const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini client lazily so dotenv has time to load
let _gemini = null;
function getGeminiClient() {
    if (!_gemini) {
        _gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    return _gemini;
}

// Probado con tu API key: gemini-flash-lite-latest responde OK (otros dan 404 o 429)
const AI_MODEL = process.env.AI_MODEL || 'gemini-flash-lite-latest';

// System prompt - Asesor Financiero de Entre Amigos
const SYSTEM_PROMPT = `Eres el Asesor Financiero de Entre Amigos. Tu única función es ayudar a microempresarios colombianos con dudas sobre créditos, presupuestos, ahorro y el uso del simulador.

Regla estricta: Si el usuario pregunta sobre cualquier tema que no sea finanzas o el negocio de 'Entre Amigos', debes responder cortésmente: 'Lo siento, como tu asesor financiero solo puedo ayudarte con temas relacionados a tu economía y crecimiento empresarial'.

Cuando el usuario tenga datos del simulador (monto, plazo, cuota, total a pagar, intereses):
- USA ÚNICAMENTE esos valores exactos. NUNCA inventes ni cambies cifras.
- Todos tus cálculos y ejemplos deben basarse en los números del simulador proporcionados.
- Si no tienes datos del simulador, sugiere al usuario que use primero el simulador de crédito.

Formato: respuestas concisas, texto plano (sin asteriscos ni markdown), máximo 150 palabras.`;

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
 * Generate financial advice using Gemini (Google)
 */
async function generateFinancialAdvice(messages, simulatorContext = null) {
    try {
        // Build context message - OBLIGATORIO que el modelo use solo estos valores
        let contextMessage = '';
        if (simulatorContext && (simulatorContext.monto > 0 || simulatorContext.cuota > 0)) {
            const { monto, plazo, tasaAnual, cuota, totalPagar, totalIntereses } = simulatorContext;
            const fmt = (n) => (n != null && !isNaN(n) ? Number(n).toLocaleString('es-CO') : 'N/A');
            contextMessage = `

DATOS DEL SIMULADOR (USA SOLO ESTOS VALORES EXACTOS, NUNCA INVENTES CIFRAS):
- Monto del crédito: $${fmt(monto)}
- Plazo: ${plazo || 'N/A'} meses
- Tasa anual: ${tasaAnual != null ? tasaAnual : 'N/A'}% E.A.
- Cuota mensual: $${fmt(cuota)}
- Total a pagar: $${fmt(totalPagar)}
- Total intereses: $${fmt(totalIntereses)}

Todas tus respuestas deben usar ÚNICAMENTE estas cifras para cálculos y ejemplos.`;
        }

        const model = getGeminiClient().getGenerativeModel({
            model: AI_MODEL,
            systemInstruction: SYSTEM_PROMPT + contextMessage,
        });

        // Build Gemini chat history (all messages except the last user message)
        const history = [];
        for (let i = 0; i < messages.length - 1; i++) {
            const msg = messages[i];
            history.push({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.content }],
            });
        }

        const chat = model.startChat({ history });
        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const text = result.response.text();

        return {
            success: true,
            message: text,
            usage: {
                prompt_tokens: result.response.usageMetadata?.promptTokenCount || 0,
                completion_tokens: result.response.usageMetadata?.candidatesTokenCount || 0,
                total_tokens: result.response.usageMetadata?.totalTokenCount || 0,
            }
        };
    } catch (error) {
        console.error('Error generating financial advice:', error);
        console.error('Error details:', error.message);

        const msg = error.message || '';
        const isQuotaError = msg.includes('429') || msg.includes('quota') || msg.includes('Too Many Requests') || msg.includes('exceeded');

        if (isQuotaError) {
            const retryMatch = msg.match(/reintentar en (\d+(?:\.\d+)?) segundos/i) || msg.match(/retry in (\d+)/i);
            const retryAfterSeconds = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 60;
            return {
                success: false,
                error: `Se excedió la cuota de la API. Por favor espera unos minutos y vuelve a intentar. (Reintentar en ~${retryAfterSeconds} s)`,
                code: 'QUOTA_EXCEEDED',
                retryAfterSeconds,
            };
        }

        return {
            success: false,
            error: `Error de conexión con Gemini: ${msg}`,
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
