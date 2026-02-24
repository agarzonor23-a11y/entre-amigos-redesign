import { useState, useCallback, useEffect } from 'react';
import { createConversation, sendMessage, type Message, type SimulatorData, type ChatErrorResponse } from '@/services/aiApi';

export function useAIChat(simulatorData?: SimulatorData, isActive = false) {
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Helper: crear una nueva conversación y devolver el nuevo ID
    const createNewConversation = useCallback(async (): Promise<string | null> => {
        const shouldGreet = !!simulatorData && (simulatorData.monto > 0);
        const response = await createConversation('anonymous', simulatorData, shouldGreet);

        if (response.success && response.conversationId) {
            setConversationId(response.conversationId);

            if (response.greeting) {
                setMessages([{ role: 'assistant', content: response.greeting }]);
            }
            return response.conversationId;
        }
        return null;
    }, [simulatorData]);

    // Crear conversación cuando el usuario abre el chat (con los datos actuales del simulador)
    useEffect(() => {
        if (!isActive || conversationId) return;
        createNewConversation().then((id) => {
            if (!id) setError('Error al iniciar la conversación');
        });
    }, [isActive, simulatorData]);

    const send = useCallback(
        async (messageContent: string) => {
            if (!conversationId) {
                setError('No hay una conversación activa');
                return;
            }

            if (!messageContent.trim()) {
                return;
            }

            // Add user message immediately
            const userMessage: Message = {
                role: 'user',
                content: messageContent,
            };
            setMessages((prev) => [...prev, userMessage]);
            setIsLoading(true);
            setError(null);

            try {
                // Send message to API
                let response = await sendMessage(conversationId, messageContent, simulatorData);

                // Si la conversación se perdió (reinicio del backend), recrearla y reintentar
                if (!response.success && (response as ChatErrorResponse).code === 'CONVERSATION_NOT_FOUND') {
                    const newId = await createNewConversation();
                    if (newId) {
                        response = await sendMessage(newId, messageContent, simulatorData);
                    } else {
                        setError('Error al reconectar la conversación. Intenta recargar la página.');
                        return;
                    }
                }

                if (response.success && response.message) {
                    // Add AI response
                    const aiMessage: Message = {
                        role: 'assistant',
                        content: response.message,
                    };
                    setMessages((prev) => [...prev, aiMessage]);
                } else {
                    setError(response.error || 'Error al obtener respuesta');
                }
            } catch (err) {
                console.error('Error sending message:', err);
                setError('Error al enviar el mensaje');
            } finally {
                setIsLoading(false);
            }
        },
        [conversationId, simulatorData, createNewConversation]
    );

    const clearMessages = useCallback(() => {
        setMessages([]);
        setError(null);
    }, []);

    return {
        messages,
        isLoading,
        error,
        send,
        clearMessages,
        conversationId,
    };
}
