const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('../db');
const aiService = require('../services/aiService');

const router = express.Router();

const MAX_ASSISTANT_RESPONSES = 6;
const MAX_PROMPT_CHARS = 500;

/**
 * POST /api/ai/conversations/new
 * Create a new conversation
 */
router.post('/conversations/new', async (req, res) => {
    try {
        const { userIdentifier, simulatorData, generateGreeting } = req.body;
        const conversationId = uuidv4();

        await db.query(
            `INSERT INTO ai_conversations (id, user_identifier, simulator_data) 
       VALUES ($1, $2, $3)`,
            [conversationId, userIdentifier || 'anonymous', JSON.stringify(simulatorData || {})]
        );

        let greetingMessage = null;

        // Generate initial greeting if requested
        if (generateGreeting && simulatorData) {
            const { monto, plazo, totalIntereses } = simulatorData;

            // Create a specific prompt for the greeting
            const greetingPrompt = [
                {
                    role: 'user',
                    content: `Acabo de simular un crédito de $${monto?.toLocaleString('es-CO')} a ${plazo} meses. Salúdame y explícame de forma sencilla qué significan los $${totalIntereses?.toLocaleString('es-CO')} de intereses en términos de inversión para mi negocio. Dame un ejemplo concreto.`
                }
            ];

            const aiResponse = await aiService.generateFinancialAdvice(greetingPrompt, simulatorData);

            if (aiResponse.success) {
                greetingMessage = aiResponse.message;

                // Save to DB
                await db.query(
                    `INSERT INTO ai_messages (conversation_id, role, content) 
           VALUES ($1, $2, $3)`,
                    [conversationId, 'assistant', greetingMessage]
                );
            }
        }

        res.json({
            success: true,
            conversationId,
            greeting: greetingMessage,
            message: 'Conversation created successfully'
        });
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({
            success: false,
            error: 'Error al crear la conversación'
        });
    }
});

/**
 * POST /api/ai/chat
 * Send a message and get AI response
 */
router.post('/chat', async (req, res) => {
    try {
        const { conversationId, message, simulatorData: bodySimulatorData } = req.body;

        if (!conversationId || !message) {
            return res.status(400).json({
                success: false,
                error: 'conversationId y message son requeridos'
            });
        }

        if (typeof message !== 'string' || message.length > MAX_PROMPT_CHARS) {
            return res.status(400).json({
                success: false,
                error: `El mensaje no puede superar ${MAX_PROMPT_CHARS} caracteres.`
            });
        }

        // Obtener conversación para simulator_data y validar límite
        const convResult = await db.query(
            `SELECT * FROM ai_conversations WHERE id = $1`,
            [conversationId]
        );
        if (convResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Conversación no encontrada'
            });
        }

        const conversation = convResult.rows[0];
        let simulatorData = bodySimulatorData;
        const stored = conversation.simulator_data;
        if ((!simulatorData || (typeof simulatorData === 'object' && !simulatorData.monto && !simulatorData.cuota)) && stored) {
            const parsed = typeof stored === 'string' ? JSON.parse(stored) : stored;
            if (parsed && (parsed.monto > 0 || parsed.cuota > 0)) {
                simulatorData = parsed;
            }
        }

        // Obtener historial y contar respuestas del asistente (máx 6)
        const historyResult = await db.query(
            `SELECT role, content FROM ai_messages 
       WHERE conversation_id = $1 
       ORDER BY created_at ASC`,
            [conversationId]
        );
        const assistantCount = historyResult.rows.filter((r) => r.role === 'assistant').length;
        if (assistantCount >= MAX_ASSISTANT_RESPONSES) {
            return res.status(429).json({
                success: false,
                error: `Has alcanzado el límite de ${MAX_ASSISTANT_RESPONSES} respuestas en esta sesión. Inicia una nueva conversación para continuar.`
            });
        }

        await db.query(
            `INSERT INTO ai_messages (conversation_id, role, content) 
       VALUES ($1, $2, $3)`,
            [conversationId, 'user', message]
        );

        if (simulatorData && Object.keys(simulatorData).length > 0) {
            await db.query(
                `UPDATE ai_conversations 
         SET simulator_data = $1, updated_at = CURRENT_TIMESTAMP 
         WHERE id = $2`,
                [JSON.stringify(simulatorData), conversationId]
            );
        }

        const messages = [...historyResult.rows, { role: 'user', content: message }];

        // Get AI response
        const aiResponse = await aiService.generateFinancialAdvice(messages, simulatorData);

        if (!aiResponse.success) {
            const status = aiResponse.code === 'QUOTA_EXCEEDED' ? 429 : 500;
            return res.status(status).json(aiResponse);
        }

        // Save AI response to database
        await db.query(
            `INSERT INTO ai_messages (conversation_id, role, content) 
       VALUES ($1, $2, $3)`,
            [conversationId, 'assistant', aiResponse.message]
        );

        res.json({
            success: true,
            message: aiResponse.message,
            usage: aiResponse.usage
        });
    } catch (error) {
        console.error('Error in chat:', error);
        res.status(500).json({
            success: false,
            error: 'Error al procesar tu mensaje. Intenta de nuevo.'
        });
    }
});

/**
 * GET /api/ai/conversations/:id
 * Get conversation history
 */
router.get('/conversations/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Get conversation details
        const convResult = await db.query(
            `SELECT * FROM ai_conversations WHERE id = $1`,
            [id]
        );

        if (convResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Conversación no encontrada'
            });
        }

        // Get messages
        const messagesResult = await db.query(
            `SELECT role, content, created_at FROM ai_messages 
       WHERE conversation_id = $1 
       ORDER BY created_at ASC`,
            [id]
        );

        res.json({
            success: true,
            conversation: convResult.rows[0],
            messages: messagesResult.rows
        });
    } catch (error) {
        console.error('Error fetching conversation:', error);
        res.status(500).json({
            success: false,
            error: 'Error al obtener la conversación'
        });
    }
});

/**
 * POST /api/ai/analyze-credit
 * Analyze credit affordability (utility endpoint)
 */
router.post('/analyze-credit', async (req, res) => {
    try {
        const { creditData, userIncome } = req.body;

        if (!creditData || !userIncome) {
            return res.status(400).json({
                success: false,
                error: 'creditData y userIncome son requeridos'
            });
        }

        const analysis = aiService.analyzeCreditAffordability(creditData, userIncome);

        res.json({
            success: true,
            analysis
        });
    } catch (error) {
        console.error('Error analyzing credit:', error);
        res.status(500).json({
            success: false,
            error: 'Error al analizar el crédito'
        });
    }
});

// ==================== ADVANCED FEATURES - PHASE 1 ====================

/**
 * POST /api/ai/analyze-payment-health
 * Analyze if a payment is healthy based on user income
 */
router.post('/analyze-payment-health', async (req, res) => {
    try {
        const { cuota, monthlyIncome } = req.body;

        if (!cuota) {
            return res.status(400).json({
                success: false,
                error: 'Cuota is required'
            });
        }

        const analysis = aiService.analyzePaymentHealth(cuota, monthlyIncome);

        res.json({
            success: true,
            analysis
        });
    } catch (error) {
        console.error('Error analyzing payment health:', error);
        res.status(500).json({
            success: false,
            error: 'Error al analizar salud del pago'
        });
    }
});

/**
 * POST /api/ai/translate-interest
 * Translate total interest into understandable monthly terms
 */
router.post('/translate-interest', async (req, res) => {
    try {
        const { totalIntereses, plazo, monto } = req.body;

        if (!totalIntereses || !plazo || !monto) {
            return res.status(400).json({
                success: false,
                error: 'totalIntereses, plazo, and monto are required'
            });
        }

        const translation = aiService.translateInterestCost(totalIntereses, plazo, monto);

        res.json({
            success: true,
            translation
        });
    } catch (error) {
        console.error('Error translating interest:', error);
        res.status(500).json({
            success: false,
            error: 'Error al traducir intereses'
        });
    }
});

/**
 * POST /api/ai/check-liquidity
 * Check if payment creates liquidity risk
 */
router.post('/check-liquidity', async (req, res) => {
    try {
        const { monthlyIncome, proposedPayment, estimatedOtherExpenses } = req.body;

        if (!proposedPayment) {
            return res.status(400).json({
                success: false,
                error: 'proposedPayment is required'
            });
        }

        const riskCheck = aiService.checkLiquidityRisk(
            monthlyIncome,
            proposedPayment,
            estimatedOtherExpenses || 0
        );

        res.json({
            success: true,
            riskCheck
        });
    } catch (error) {
        console.error('Error checking liquidity:', error);
        res.status(500).json({
            success: false,
            error: 'Error al verificar liquidez'
        });
    }
});

module.exports = router;
