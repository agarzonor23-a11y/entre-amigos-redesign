const Anthropic = require('@anthropic-ai/sdk');

// Initialize Anthropic client
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

const AI_MODEL = process.env.AI_MODEL || 'claude-3-5-haiku-20241022';

// System prompt that defines the AI's persona and capabilities
const SYSTEM_PROMPT = `Eres un asesor financiero experto especializado en microcréditos y finanzas personales para usuarios colombianos de Entre Amigos. Tu objetivo es ayudar a las personas a tomar decisiones financieras responsables.

CAPACIDADES:
1. Calcular capacidad de pago basada en ingresos y gastos
2. Crear presupuestos personalizados
3. Diseñar planes de pago realistas
4. Educar sobre finanzas personales de manera clara y práctica
5. Analizar gastos y recomendar estrategias de ahorro
6. Evaluar si un crédito es adecuado para la situación del usuario

REGLAS:
- Usa un lenguaje claro, amigable y profesional en español colombiano
- Sé directo pero empático al dar consejos
- Pregunta por información relevante si falta contexto
- Proporciona ejemplos concretos con números cuando sea útil
- Advierte sobre riesgos de sobreendeudamiento
- Enfócate en educación financiera práctica
- Usa emojis ocasionalmente para hacer la conversación más amigable (máximo 2 por mensaje)

- Respuestas concisas (máximo 150 palabras por mensaje)
- NO uses asteriscos (*), guiones ni formato markdown.
- NO uses negritas. Escribe en texto plano.
- Usa listas numeradas simples si es necesario (1. 2. 3.)
- Incluye números y cálculos cuando sean relevantes
- Termina con una pregunta o llamado a la acción cuando sea útil`;

/**
 * Calculate payment capacity based on income and expenses
 */
function calculatePaymentCapacity(monthlyIncome, monthlyExpenses) {
    const availableIncome = monthlyIncome - monthlyExpenses;
    // Recommended max debt payment: 30-40% of available income
    const maxRecommendedPayment = availableIncome * 0.35;
    const safePayment = availableIncome * 0.25; // More conservative

    return {
        availableIncome,
        maxRecommendedPayment: Math.round(maxRecommendedPayment),
        safePayment: Math.round(safePayment),
        riskLevel: availableIncome < 0 ? 'high' : availableIncome < monthlyIncome * 0.3 ? 'medium' : 'low'
    };
}

/**
 * Create a simple budget template
 */
function createBudget(monthlyIncome) {
    return {
        essentials: Math.round(monthlyIncome * 0.50), // 50% - Housing, food, utilities, transport
        financialGoals: Math.round(monthlyIncome * 0.20), // 20% - Savings, debt payments
        lifestyle: Math.round(monthlyIncome * 0.30), // 30% - Entertainment, dining out, hobbies
        recommendation: '50/30/20 rule: 50% necesidades, 30% estilo de vida, 20% ahorros y deudas'
    };
}

/**
 * Analyze credit affordability
 */
function analyzeCreditAffordability(creditData, userIncome) {
    const { monto, plazo, cuota, totalPagar, totalIntereses } = creditData;
    const monthlyPaymentRatio = (cuota / userIncome) * 100;

    let affordability = 'bueno';
    let recommendation = 'El crédito parece manejable con tu ingreso actual.';

    if (monthlyPaymentRatio > 40) {
        affordability = 'riesgoso';
        recommendation = '⚠️ La cuota representa más del 40% de tu ingreso. Considera un monto menor o plazo más largo.';
    } else if (monthlyPaymentRatio > 30) {
        affordability = 'moderado';
        recommendation = '⚠️ La cuota es alta (>30% del ingreso). Asegúrate de tener margen para imprevistos.';
    }

    return {
        monthlyPaymentRatio: monthlyPaymentRatio.toFixed(1),
        affordability,
        recommendation,
        totalInterestPercentage: ((totalIntereses / monto) * 100).toFixed(1)
    };
}

/**
 * ADVANCED FEATURE: Analyze payment health based on income
 * Returns detailed assessment of payment sustainability
 */
function analyzePaymentHealth(cuota, monthlyIncome) {
    if (!monthlyIncome || monthlyIncome <= 0) {
        return {
            canAnalyze: false,
            message: 'Necesito conocer tu ingreso mensual para evaluar si esta cuota es saludable para ti.'
        };
    }

    const paymentRatio = (cuota / monthlyIncome) * 100;
    const remainingIncome = monthlyIncome - cuota;
    const remainingPercentage = (remainingIncome / monthlyIncome) * 100;

    let healthLevel = 'safe'; // safe, moderate, risky
    let colorCode = 'green';
    let recommendation = '';
    let autoSuggestPlazoIncrease = false;

    if (paymentRatio > 40) {
        healthLevel = 'risky';
        colorCode = 'red';
        recommendation = `Tu cuota de $${cuota.toLocaleString('es-CO')} representa el ${paymentRatio.toFixed(1)}% de tu ingreso. Esto es muy alto y podría generar problemas de liquidez. Te recomiendo aumentar el plazo para reducir la cuota mensual.`;
        autoSuggestPlazoIncrease = true;
    } else if (paymentRatio > 30) {
        healthLevel = 'moderate';
        colorCode = 'yellow';
        recommendation = `Tu cuota representa el ${paymentRatio.toFixed(1)}% de tu ingreso. Está en el límite recomendado. Asegúrate de tener un fondo de emergencias antes de comprometerte.`;
    } else {
        healthLevel = 'safe';
        colorCode = 'green';
        recommendation = `¡Excelente! Tu cuota de $${cuota.toLocaleString('es-CO')} representa solo el ${paymentRatio.toFixed(1)}% de tu ingreso. Tendrás $${remainingIncome.toLocaleString('es-CO')} disponibles para otros gastos.`;
    }

    return {
        canAnalyze: true,
        healthLevel,
        colorCode,
        paymentRatio: paymentRatio.toFixed(1),
        remainingIncome,
        remainingPercentage: remainingPercentage.toFixed(1),
        recommendation,
        autoSuggestPlazoIncrease
    };
}

/**
 * ADVANCED FEATURE: Translate total interest into understandable monthly terms
 */
function translateInterestCost(totalIntereses, plazo, monto) {
    const monthlyInterest = totalIntereses / plazo;
    const interestAsPercentOfPrincipal = (totalIntereses / monto) * 100;

    // Calculate what the user would need to earn monthly to justify the credit
    const breakEvenMonthlyRevenue = monthlyInterest;

    return {
        totalIntereses,
        monthlyInterest: Math.round(monthlyInterest),
        monthlyInterestFormatted: monthlyInterest.toLocaleString('es-CO'),
        interestAsPercent: interestAsPercentOfPrincipal.toFixed(1),
        plazo,
        explanation: `Los $${totalIntereses.toLocaleString('es-CO')} en intereses equivalen a pagar aproximadamente $${monthlyInterest.toLocaleString('es-CO')} por mes durante ${plazo} meses.`,
        businessAdvice: `Es como "alquilar" el dinero. Si inviertes bien estos $${monto.toLocaleString('es-CO')}, deberías generar más de $${breakEvenMonthlyRevenue.toLocaleString('es-CO')}/mes adicionales para que el crédito valga la pena. 💡`,
        opportunityCost: `Estás pagando ${interestAsPercentOfPrincipal.toFixed(1)}% sobre el monto original por el beneficio de tener el dinero hoy.`
    };
}

/**
 * ADVANCED FEATURE: Check liquidity risk
 * Warns if payment might compromise business operations
 */
function checkLiquidityRisk(monthlyIncome, proposedPayment, estimatedOtherExpenses = 0) {
    if (!monthlyIncome || monthlyIncome <= 0) {
        return {
            canAnalyze: false,
            message: 'Necesito conocer tus ingresos para evaluar el riesgo de liquidez.'
        };
    }

    const totalCommitments = proposedPayment + estimatedOtherExpenses;
    const remainingCashFlow = monthlyIncome - totalCommitments;
    const remainingPercentage = (remainingCashFlow / monthlyIncome) * 100;

    let hasRisk = false;
    let riskLevel = 'low'; // low, medium, high
    let alertMessage = '';
    let suggestAdjustment = false;
    let suggestedMaxPayment = 0;

    if (remainingPercentage < 20) {
        hasRisk = true;
        riskLevel = 'high';
        suggestAdjustment = true;
        suggestedMaxPayment = monthlyIncome * 0.35; // Max 35% of income
        alertMessage = `⚠️ ALERTA DE LIQUIDEZ: Esta cuota de $${proposedPayment.toLocaleString('es-CO')} podría comprometer tus operaciones del negocio. Solo te quedarían $${remainingCashFlow.toLocaleString('es-CO')} (${remainingPercentage.toFixed(1)}%) para inventario, imprevistos y otros gastos.`;
    } else if (remainingPercentage < 30) {
        hasRisk = true;
        riskLevel = 'medium';
        alertMessage = `⚠️ Margen ajustado: Con esta cuota tendrás $${remainingCashFlow.toLocaleString('es-CO')} (${remainingPercentage.toFixed(1)}%) disponible mensualmente. Asegúrate de tener reservas.`;
    } else {
        riskLevel = 'low';
        alertMessage = `✅ Liquidez saludable: Tendrás $${remainingCashFlow.toLocaleString('es-CO')} (${remainingPercentage.toFixed(1)}%) disponible para operar tu negocio.`;
    }

    return {
        canAnalyze: true,
        hasRisk,
        riskLevel,
        remainingCashFlow,
        remainingPercentage: remainingPercentage.toFixed(1),
        alertMessage,
        suggestAdjustment,
        suggestedMaxPayment: suggestAdjustment ? Math.round(suggestedMaxPayment) : null
    };
}

/**
 * Generate financial advice using Claude (Anthropic)
 */
async function generateFinancialAdvice(messages, simulatorContext = null) {
    try {
        // Build context message if simulator data is available
        let contextMessage = '';
        if (simulatorContext) {
            const { monto, plazo, tasaAnual, cuota, totalPagar, totalIntereses } = simulatorContext;
            contextMessage = `\n\nCONTEXTO DEL SIMULADOR:
- Monto del crédito: $${monto?.toLocaleString('es-CO')}
- Plazo: ${plazo} meses
- Tasa anual: ${tasaAnual}% E.A.
- Cuota mensual estimada: $${cuota?.toLocaleString('es-CO')}
- Total a pagar: $${totalPagar?.toLocaleString('es-CO')}
- Total intereses: $${totalIntereses?.toLocaleString('es-CO')}

Usa esta información para dar consejos personalizados.`;
        }

        // Build messages array for Claude API (user/assistant alternating)
        const claudeMessages = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
        }));

        // Generate response using Claude
        const response = await anthropic.messages.create({
            model: AI_MODEL,
            max_tokens: 512,
            system: SYSTEM_PROMPT + contextMessage,
            messages: claudeMessages,
        });

        const text = response.content[0]?.text || '';

        return {
            success: true,
            message: text,
            usage: {
                prompt_tokens: response.usage?.input_tokens || 0,
                completion_tokens: response.usage?.output_tokens || 0,
                total_tokens: (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0),
            }
        };
    } catch (error) {
        console.error('Error generating financial advice:', error);
        console.error('Error details:', error.message);

        // Return specific error for API key issues
        if (error.status === 401 || error.message?.includes('API key') || error.message?.includes('authentication')) {
            return {
                success: false,
                error: 'Error de configuración de API Key. Contacta a soporte.'
            };
        }

        return {
            success: false,
            error: `Error de conexión con Claude: ${error.message}`
        };
    }
}


module.exports = {
    generateFinancialAdvice,
    calculatePaymentCapacity,
    createBudget,
    analyzeCreditAffordability,
    // Advanced Features - Phase 1
    analyzePaymentHealth,
    translateInterestCost,
    checkLiquidityRisk,
};
