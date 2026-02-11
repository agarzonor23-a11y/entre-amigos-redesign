import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const SimuladorPage = () => {
  const [monto, setMonto] = useState(2000000);
  const [plazo, setPlazo] = useState(12);
  const [tasaAnual, setTasaAnual] = useState(28);

  const resultado = useMemo(() => {
    const tasaMensual = tasaAnual / 100 / 12;
    if (tasaMensual === 0) {
      const cuota = monto / plazo;
      return { cuota, totalPagar: monto, totalIntereses: 0, tasaMensual: 0 };
    }
    const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
    const totalPagar = cuota * plazo;
    const totalIntereses = totalPagar - monto;
    return { cuota, totalPagar, totalIntereses, tasaMensual: tasaMensual * 100 };
  }, [monto, plazo, tasaAnual]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <Calculator className="w-4 h-4" />
              Simulador de Crédito
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
              Calcula tu cuota <span className="text-primary">aproximada</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Ajusta el monto, plazo y tasa de interés para conocer el valor aproximado de tu cuota mensual.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-8">
              {/* Monto */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-3">
                  <DollarSign className="w-4 h-4 text-primary" /> Monto del crédito
                </label>
                <input
                  type="range"
                  min={300000}
                  max={35000000}
                  step={100000}
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">$300.000</span>
                  <span className="text-lg font-bold text-primary">{formatCurrency(monto)}</span>
                  <span className="text-xs text-muted-foreground">$35.000.000</span>
                </div>
              </div>

              {/* Plazo */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-3">
                  <Clock className="w-4 h-4 text-primary" /> Plazo (meses)
                </label>
                <input
                  type="range"
                  min={1}
                  max={36}
                  step={1}
                  value={plazo}
                  onChange={(e) => setPlazo(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">1 mes</span>
                  <span className="text-lg font-bold text-primary">{plazo} meses</span>
                  <span className="text-xs text-muted-foreground">36 meses</span>
                </div>
              </div>

              {/* Tasa */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-card-foreground mb-3">
                  <Percent className="w-4 h-4 text-primary" /> Tasa de interés anual (%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={0.5}
                  value={tasaAnual}
                  onChange={(e) => setTasaAnual(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">0%</span>
                  <span className="text-lg font-bold text-primary">{tasaAnual}% E.A.</span>
                  <span className="text-xs text-muted-foreground">60%</span>
                </div>
              </div>
            </motion.div>

            {/* Results */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-3xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-card-foreground mb-6">Resultado aproximado</h2>
                <div className="space-y-5">
                  <div className="bg-primary/10 rounded-2xl p-5">
                    <p className="text-sm text-muted-foreground mb-1">Cuota mensual estimada</p>
                    <p className="text-3xl md:text-4xl font-extrabold text-primary">{formatCurrency(resultado.cuota)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Total a pagar</p>
                      <p className="text-lg font-bold text-card-foreground">{formatCurrency(resultado.totalPagar)}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Total intereses</p>
                      <p className="text-lg font-bold text-card-foreground">{formatCurrency(resultado.totalIntereses)}</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Tasa mensual</p>
                      <p className="text-lg font-bold text-card-foreground">{resultado.tasaMensual.toFixed(2)}%</p>
                    </div>
                    <div className="bg-muted rounded-xl p-4">
                      <p className="text-xs text-muted-foreground mb-1">Plazo</p>
                      <p className="text-lg font-bold text-card-foreground">{plazo} meses</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://incursor.entreamigos.co/solicita-tu-credito"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl hover:opacity-90 transition-opacity"
              >
                Solicitar crédito <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-xs text-muted-foreground mt-4">
                * Este simulador es solo una referencia. Los valores reales pueden variar según tu perfil crediticio y las condiciones vigentes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SimuladorPage;
