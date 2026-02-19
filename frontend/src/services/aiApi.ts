// AI Chat API Types and Functions

export interface Message {
    role: 'user' | 'assistant';
    content: string;
    created_at?: string;
}

export interface SimulatorData {
    monto: number;
    plazo: number;
    tasaAnual: number;
    cuota: number;
    totalPagar: number;
    totalIntereses: number;
}

export interface ConversationResponse {
    success: boolean;
    conversationId?: string;
    message?: string;
    greeting?: string;
    error?: string;
}


export interface ChatResponse {
    success: boolean;
    message?: string;
    error?: string;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface ConversationHistoryResponse {
    success: boolean;
    conversation?: {
        id: string;
        user_identifier: string;
        simulator_data: SimulatorData;
        created_at: string;
        updated_at: string;
    };
    messages?: Message[];
    error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


/**
 * Create a new AI conversation
 */
export async function createConversation(
    userIdentifier?: string,
    simulatorData?: SimulatorData,
    generateGreeting?: boolean
): Promise<ConversationResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai/conversations/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userIdentifier,
                simulatorData,
                generateGreeting,
            }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating conversation:', error);
        return {
            success: false,
            error: 'Error al crear la conversación',
        };
    }
}

/**
 * Send a message to the AI and get a response
 */
export interface ChatErrorResponse extends ChatResponse {
    code?: 'QUOTA_EXCEEDED';
    retryAfterSeconds?: number;
}

export async function sendMessage(
    conversationId: string,
    message: string,
    simulatorData?: SimulatorData
): Promise<ChatResponse | ChatErrorResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conversationId,
                message,
                simulatorData,
            }),
        });

        const data = await response.json();

        if (!response.ok && data.error && response.status === 429) {
            return {
                success: false,
                error: data.error,
                code: 'QUOTA_EXCEEDED',
                retryAfterSeconds: data.retryAfterSeconds ?? 60,
            };
        }

        return data;
    } catch (error) {
        console.error('Error sending message:', error);
        return {
            success: false,
            error: 'Error al enviar el mensaje',
        };
    }
}

/**
 * Get conversation history
 */
export async function getConversationHistory(
    conversationId: string
): Promise<ConversationHistoryResponse> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/ai/conversations/${conversationId}`
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching conversation:', error);
        return {
            success: false,
            error: 'Error al obtener el historial',
        };
    }
}
