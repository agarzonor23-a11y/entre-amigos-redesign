import { motion } from "framer-motion";
import { CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PaymentBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-r from-teal-light to-pink-light rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <CreditCard className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">¿Ya tienes un crédito?</h3>
              <p className="text-muted-foreground text-sm md:text-base">Aprende cómo pagar tu crédito de forma fácil y rápida.</p>
            </div>
          </div>
          <Button
            size="lg"
            className="rounded-full px-8 py-6 font-bold gap-2 text-base shadow-xl shadow-primary/25 shrink-0"
            onClick={() => navigate("/como-pagar")}
          >
            ¿Cómo pagar? <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PaymentBanner;
