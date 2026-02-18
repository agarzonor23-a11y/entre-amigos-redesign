import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, AlertCircle, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAIChat } from '@/hooks/useAIChat';
import type { SimulatorData } from '@/services/aiApi';
import FinancialTopics from './FinancialTopics';

interface FinancialAssistantProps {
    simulatorData?: SimulatorData;
}

export default function FinancialAssistant({ simulatorData }: FinancialAssistantProps) {
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, isLoading, error, send } = useAIChat(simulatorData);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isActive]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        await send(inputValue);
        setInputValue('');
    };

    const handleTopicSelect = async (question: string) => {
        await send(question);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Helper to strip markdown/asterisks
    const cleanMessage = (text: string) => {
        return text.replace(/\*/g, '').replace(/#/g, '').trim();
    };

    if (!isActive) {
        return (
            <div className="w-full flex justify-center py-10">
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsActive(true)}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-teal-600 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all overflow-hidden"
                >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <MessageCircleQuestion className="w-6 h-6 relative z-10" />
                    <span className="relative z-10">Preguntarle a mi asesor financiero</span>
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse relative z-10" />
                </motion.button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-4 border border-primary/20">
                    <Sparkles className="w-4 h-4" />
                    Tu Asesor Financiero Personal
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-3">
                    Pregúntame sobre{' '}
                    <span className="text-gradient">tus finanzas</span>
                </h2>
                <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                    Obtén consejos personalizados sobre presupuestos, ahorros y responsabilidad financiera
                </p>
            </motion.div>

            {/* Chat Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Quick Topics (show only when no messages) */}
                {messages.length === 0 && (
                    <div className="p-6">
                        <p className="text-sm font-semibold text-muted-foreground mb-3">
                            Comienza con un tema:
                        </p>
                        <FinancialTopics onTopicSelect={handleTopicSelect} disabled={isLoading} />
                    </div>
                )}

                {/* Messages Area */}
                <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-muted/20">
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                {/* AI Avatar */}
                                {message.role === 'assistant' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center shrink-0 shadow-lg">
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                )}

                                {/* Message Bubble */}
                                <div
                                    className={`
                    max-w-[80%] rounded-2xl px-4 py-3 shadow-md
                    ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                                            : 'bg-card border border-border rounded-tl-sm'
                                        }
                  `}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {cleanMessage(message.content)}
                                    </p>
                                </div>

                                {/* User Avatar */}
                                {message.role === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3 items-center"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 h-2 bg-primary/60 rounded-full"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.5, 1, 0.5],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl px-4 py-3"
                        >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-muted/30 border-t border-border">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Escribe tu pregunta sobre finanzas..."
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 rounded-2xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        />
                        <Button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isLoading}
                            size="lg"
                            className="px-6 rounded-2xl gap-2 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                            <Send className="w-4 h-4" />
                            Enviar
                        </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                        Presiona Enter para enviar • Shift + Enter para nueva línea
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
