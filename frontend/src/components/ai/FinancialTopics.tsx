import { motion } from 'framer-motion';
import { Lightbulb, PiggyBank, TrendingUp, HelpCircle } from 'lucide-react';

interface FinancialTopicsProps {
    onTopicSelect: (question: string) => void;
    disabled?: boolean;
}

const topics = [
    {
        icon: HelpCircle,
        label: '¿Puedo pagar este crédito?',
        question: '¿Puedo pagar este crédito con mi situación financiera actual?',
        color: 'from-primary to-teal-dark',
    },
    {
        icon: PiggyBank,
        label: 'Crear un presupuesto',
        question: '¿Cómo puedo crear un presupuesto mensual efectivo?',
        color: 'from-secondary to-orange-500',
    },
    {
        icon: TrendingUp,
        label: 'Consejos para ahorrar',
        question: '¿Qué consejos me das para ahorrar dinero cada mes?',
        color: 'from-teal-500 to-primary',
    },
    {
        icon: Lightbulb,
        label: 'Mejorar mi crédito',
        question: '¿Cómo puedo mejorar mi historial crediticio?',
        color: 'from-amber-500 to-orange-600',
    },
];

export default function FinancialTopics({ onTopicSelect, disabled }: FinancialTopicsProps) {
    return (
        <div className="grid grid-cols-2 gap-3 mb-6">
            {topics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                    <motion.button
                        key={topic.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: disabled ? 1 : 1.05 }}
                        whileTap={{ scale: disabled ? 1 : 0.95 }}
                        onClick={() => !disabled && onTopicSelect(topic.question)}
                        disabled={disabled}
                        className={`
              relative overflow-hidden rounded-2xl p-4 text-left
              bg-gradient-to-br ${topic.color}
              text-white shadow-lg hover:shadow-xl
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              group
            `}
                    >
                        {/* Background gradient overlay */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-bold leading-tight">{topic.label}</p>
                            </div>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
