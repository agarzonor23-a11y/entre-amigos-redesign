import { useState, useCallback, useEffect } from 'react';
import { createConversation, sendMessage, type Message, type SimulatorData } from '@/services/aiApi';

export function useAIChat(simulatorData?: SimulatorData, isActive = false) {
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Crear conversación cuando el usuario abre el chat (con los datos actuales del simulador)
    useEffect(() => {
        if (!isActive || conversationId) return;

        const initConversation = async () => {
            const shouldGreet = !!simulatorData && (simulatorData.monto > 0);

            const response = await createConversation('anonymous', simulatorData, shouldGreet);

            if (response.success && response.conversationId) {
                setConversationId(response.conversationId);

                if (response.greeting) {
                    setMessages([{
                        role: 'assistant',
                        content: response.greeting
                    }]);
                }
            } else {
                setError(response.error || 'Error al iniciar la conversación');
            }
        };

        initConversation();
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
                const response = await sendMessage(conversationId, messageContent, simulatorData);

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
        [conversationId, simulatorData]
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
