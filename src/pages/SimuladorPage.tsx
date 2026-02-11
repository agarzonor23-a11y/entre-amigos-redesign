import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Clock, ArrowRight, TrendingUp, PiggyBank, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Shield, ShieldCheck } from "lucide-react";
import AlliesModal from "@/components/landing/AlliesModal";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

const SimuladorPage = () => {
  const [monto, setMonto] = useState(2000000);
  const [plazo, setPlazo] = useState(12);
  const [tasaAnual, setTasaAnual] = useState(28);
  const [showAllies, setShowAllies] = useState(false);

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

  // Seguro: 0.3% a 2% mensual sobre el monto
  const seguroMin = monto * 0.003;
  const seguroMax = monto * 0.02;
  // Fianza FNG: 0.3% a 10% del monto total (pago único)
  const fianzaMin = monto * 0.003;
  const fianzaMax = monto * 0.10;

  const cuotaTotalMin = resultado.cuota + seguroMin;
  const cuotaTotalMax = resultado.cuota + seguroMax;

  const porcentajeInteres = resultado.totalPagar > 0 ? (resultado.totalIntereses / resultado.totalPagar) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AlliesModal open={showAllies} onClose={() => setShowAllies(false)} />

      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-5xl mx-auto relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/20"
            >
              <Calculator className="w-4 h-4" />
              Simulador de Crédito
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 tracking-tight">
              Calcula tu cuota{" "}
              <span className="text-gradient">aproximada</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Ajusta los valores y descubre cuánto pagarías mensualmente por tu crédito.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Sliders panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Monto */}
              <div className="bg-card border border-border rounded-3xl p-6 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-card-foreground">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-primary" />
                    </div>
                    Monto del crédito
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatCurrency(monto)}
                    onChange={(e) => {
                      const num = Number(e.target.value.replace(/\D/g, ""));
                      if (!isNaN(num)) setMonto(Math.min(35000000, Math.max(0, num)));
                    }}
                    className="text-2xl font-extrabold text-primary bg-transparent text-right border-b-2 border-transparent focus:border-primary outline-none w-48 transition-colors"
                  />
                </div>
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
                  <span className="text-xs text-muted-foreground">$35.000.000</span>
                </div>
              </div>

              {/* Plazo */}
              <div className="bg-card border border-border rounded-3xl p-6 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-card-foreground">
                    <div className="w-8 h-8 rounded-xl bg-secondary/30 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    Plazo
                  </label>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={plazo}
                      onChange={(e) => {
                        const num = Number(e.target.value.replace(/\D/g, ""));
                        if (!isNaN(num)) setPlazo(Math.min(36, Math.max(0, num)));
                      }}
                      className="text-2xl font-extrabold text-primary bg-transparent text-right border-b-2 border-transparent focus:border-primary outline-none w-16 transition-colors"
                    />
                    <span className="text-base font-semibold text-muted-foreground">meses</span>
                  </div>
                </div>
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
                  <span className="text-xs text-muted-foreground">36 meses</span>
                </div>
              </div>

              {/* Tasa */}
              <div className="bg-card border border-border rounded-3xl p-6 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-card-foreground">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Percent className="w-4 h-4 text-primary" />
                    </div>
                    Tasa de interés anual
                  </label>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={tasaAnual}
                      onChange={(e) => {
                        const num = Number(e.target.value.replace(/[^0-9.]/g, ""));
                        if (!isNaN(num)) setTasaAnual(Math.min(60, Math.max(0, num)));
                      }}
                      className="text-2xl font-extrabold text-primary bg-transparent text-right border-b-2 border-transparent focus:border-primary outline-none w-16 transition-colors"
                    />
                    <span className="text-base font-semibold text-muted-foreground">% E.A.</span>
                  </div>
                </div>
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
                  <span className="text-xs text-muted-foreground">60%</span>
                </div>
              </div>
            </motion.div>

            {/* Results panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div className="bg-gradient-to-br from-primary via-teal-dark to-primary rounded-3xl p-6 text-primary-foreground relative overflow-hidden flex-1">
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-[60px]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full blur-[50px]" />
                <div className="relative">
                  <p className="text-primary-foreground/70 text-sm font-medium mb-1">Tu cuota mensual estimada</p>
                  <motion.p
                    key={resultado.cuota}
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
                  >
                    {formatCurrency(resultado.cuota)}
                  </motion.p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-primary-foreground/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <PiggyBank className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-primary-foreground/80">Total a pagar</span>
                      </div>
                      <span className="font-bold">{formatCurrency(resultado.totalPagar)}</span>
                    </div>
                    <div className="flex items-center justify-between bg-primary-foreground/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-primary-foreground/80">Intereses</span>
                      </div>
                      <span className="font-bold">{formatCurrency(resultado.totalIntereses)}</span>
                    </div>
                    <div className="flex items-center justify-between bg-primary-foreground/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-primary-foreground/80">Tasa mensual</span>
                      </div>
                      <span className="font-bold">{resultado.tasaMensual.toFixed(2)}%</span>
                    </div>
                  </div>

                  {/* Seguro y Fianza */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">Costos adicionales aprox.</p>
                    <div className="flex items-center justify-between bg-secondary/20 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-primary-foreground/80">Seguro (mensual)</span>
                      </div>
                      <span className="text-xs font-bold">{formatCurrency(seguroMin)} – {formatCurrency(seguroMax)}</span>
                    </div>
                    <div className="flex items-center justify-between bg-secondary/20 rounded-xl px-4 py-2.5 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-primary-foreground/80">Fianza FNG (pago único)</span>
                      </div>
                      <span className="text-xs font-bold">{formatCurrency(fianzaMin)} – {formatCurrency(fianzaMax)}</span>
                    </div>
                    <div className="flex items-center justify-between bg-primary-foreground/20 rounded-xl px-4 py-3 backdrop-blur-sm border border-primary-foreground/10">
                      <span className="text-sm font-bold text-primary-foreground">Cuota total estimada</span>
                      <span className="text-sm font-extrabold">{formatCurrency(cuotaTotalMin)} – {formatCurrency(cuotaTotalMax)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => setShowAllies(true)}
                className="w-full text-base py-7 rounded-2xl gap-2 font-bold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-[1.02]"
              >
                Solicitar crédito
                <ArrowRight className="w-5 h-5" />
              </Button>

            </motion.div>
          </div>

          {/* Disclaimers - full width below grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-10 grid sm:grid-cols-2 gap-4"
          >
            <div className="flex items-start gap-3 bg-card border border-border rounded-2xl p-5">
              <span className="text-xl mt-0.5">⚠️</span>
              <div>
                <p className="text-sm font-bold text-card-foreground">Simulación de referencia</p>
                <p className="text-sm text-muted-foreground mt-1">Los valores reales dependen de tu perfil crediticio y las condiciones vigentes.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-card border border-border rounded-2xl p-5">
              <span className="text-xl mt-0.5">💡</span>
              <div>
                <p className="text-sm font-bold text-card-foreground">La tasa no incluye seguros ni fianza</p>
                <p className="text-sm text-muted-foreground mt-1">Estos valores se suman a tu cuota mensual. Tenlo en cuenta al solicitar tu crédito.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SimuladorPage;
