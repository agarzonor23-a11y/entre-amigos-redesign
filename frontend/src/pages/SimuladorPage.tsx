import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Percent, Clock, ArrowRight, TrendingUp, PiggyBank, BarChart3, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import Breadcrumbs from "@/components/landing/Breadcrumbs";
import { Shield, ShieldCheck } from "lucide-react";
import AlliesModal from "@/components/landing/AlliesModal";
import FinancialAssistant from "@/components/ai/FinancialAssistant";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);


const SimuladorPage = () => {
  const [monto, setMonto] = useState(1000000); // Default adjusted for Nanocrédito range example
  const [plazo, setPlazo] = useState(30); // Default adjusted (days?)
  const [tasaAnual, setTasaAnual] = useState(28);
  const [showAllies, setShowAllies] = useState(false);
  const [frequency, setFrequency] = useState<'mensual' | 'semanal' | 'diario'>('mensual');

  const ALLIES = [
    // ─── PRODUCTS (Generic) ───
    { id: 'estandar', name: 'Estándar', rates: { min: 28, max: 28 }, color: 'bg-primary/10 text-primary border-primary/20' },
    { id: 'libreInversion', name: 'Libre Inversión', rates: { min: 24.99, max: 24.99 }, color: 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20' },
    { id: 'comercial', name: 'Comercial', rates: { min: 24.99, max: 24.99 }, color: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
    { id: 'microcredito', name: 'Microcrédito', rates: { min: 28, max: 56 }, color: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
    { id: 'impulsacredito', name: 'Impulsacrédito', rates: { min: 49.90, max: 59 }, color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
    { id: 'rotativo', name: 'Crédito Rotativo', rates: { min: 24.99, max: 24.99 }, color: 'bg-teal-500/10 text-teal-600 border-teal-500/20' },
    { id: 'nanocredito', name: 'Nanocrédito', rates: { min: 55, max: 55 }, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },

    // ─── ALLIANCES (Partners) ───
    { id: 'cematcol', name: 'Cematcol', rates: { min: 0, max: 25.23 }, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { id: 'facturatech', name: 'Facturatech', rates: { min: 44, max: 56 }, color: 'bg-red-500/10 text-red-600 border-red-500/20' },
    { id: 'homecenter', name: 'Homecenter', rates: { min: 0, max: 24.99 }, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
    { id: 'tredi', name: 'Tredi', rates: { min: 25, max: 25 }, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    { id: 'farmatizate', name: 'Farmatízate', rates: { min: 38, max: 38 }, color: 'bg-green-500/10 text-green-600 border-green-500/20' },
    { id: 'automundial', name: 'Automundial', rates: { min: 22.80, max: 22.80 }, color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
  ];

  const [selectedAllyId, setSelectedAllyId] = useState('estandar');
  const [useMaxRate, setUseMaxRate] = useState(true);

  const selectedAlly = ALLIES.find(a => a.id === selectedAllyId) || ALLIES[0];

  // Logic to switch frequency and constraints based on Ally
  useMemo(() => {
    if (selectedAllyId === 'nanocredito') {
      if (frequency === 'mensual') setFrequency('diario');
      // Set typical range for nanocredit if needed, but handled in UI constraints
    } else {
      if (frequency !== 'mensual') setFrequency('mensual');
    }

    if (selectedAllyId !== 'estandar') {
      const rate = useMaxRate ? selectedAlly.rates.max : selectedAlly.rates.min;
      setTasaAnual(rate);
    }
  }, [selectedAllyId, useMaxRate, frequency]); // Added frequency to dep to avoid infinite loop if careful, actually careful here.

  // Avoid loop: split the effect.
  // 1. Ally Change -> Set Default Defaults
  // This is handled by user interaction mostly, but for safety:
  /*
  useEffect(() => {
     if (selectedAllyId === 'nanocredito') {
        setFrequency('diario');
        setPlazo(30); // Default 30 days
        setMonto(Math.min(monto, 2500000)); // Cap max
     } else {
        setFrequency('mensual');
        setPlazo(12); // Default 12 months
     }
  }, [selectedAllyId]);
  */
  // Integrating inline for now in the render/calculation flow or simple handlers is safer for purely visual simulators without strict validation logic blocking render. Since we use `useMemo` for results, we can just let `frequency` control the math.

  const resultado = useMemo(() => {
    let periodRate = 0;

    // Calculate Periodic Rate
    if (selectedAllyId === 'nanocredito') {
      // Use fixed nominal daily rate if available or derived
      // 0.122% daily given in spec
      const dailyRate = 0.00122;

      if (frequency === 'diario') {
        periodRate = dailyRate;
      } else if (frequency === 'semanal') {
        periodRate = Math.pow(1 + dailyRate, 7) - 1;
      } else {
        // Fallback if bug
        periodRate = dailyRate * 30;
      }
    } else {
      // Standard Monthly
      // Assuming tasaAnual is Nominal Annual (traditional simple simulator)
      // OR treating E.A. -> Monthly Nominal: (1+ea)^(1/12) - 1
      // Existing code used: tasaAnual / 100 / 12 (Simple Nominal approximation)
      periodRate = tasaAnual / 100 / 12;
    }

    if (periodRate === 0) {
      const cuota = monto / plazo;
      return { cuota, totalPagar: monto, totalIntereses: 0, tasaPeriodica: 0 };
    }

    const cuotaBase = monto * (periodRate * Math.pow(1 + periodRate, plazo)) / (Math.pow(1 + periodRate, plazo) - 1);

    // --- NUEVAS FORMUAS SOLICITADAS ---

    // 1. Seguro (Fianza/FNG): 0.033% del Monto Mensual
    // Formula usuario: =+C5*0,00033 (donde C5 es monto)
    const seguroMensual = monto * 0.00033;

    // 2. Comisión MiPyme
    // Formula usuario: =+SI(C5<(C20*4);C5*0,075;C5*0,045)/C7
    // C20 = SMMLV (1.3M aprox). C7 = Plazo.
    // Es decir, una comisión total dividida por el plazo para pago mensual.
    const SMMLV = 1300000;
    const isMenor4SMMLV = monto < (4 * SMMLV);
    const tasaComision = isMenor4SMMLV ? 0.075 : 0.045;
    const comisionTotal = monto * tasaComision;
    const comisionMensual = comisionTotal / plazo;

    // 3. IVA
    // Formula usuario: =+C13*19% (donde C13 es la comisión mensual calculada arriba)
    const ivaMensual = comisionMensual * 0.19;

    // 4. Cuota Final
    // Formula usuario: =PAGO(...) + Comision + IVA + Seguro
    const cuotaTotal = cuotaBase + comisionMensual + ivaMensual + seguroMensual;

    const totalPagar = cuotaTotal * plazo;
    const totalIntereses = (cuotaBase * plazo) - monto; // Interés puro del crédito base

    return {
      cuota: cuotaTotal, // La cuota mostrada será la TOTAL (con seguros y accesorios)
      cuotaBase,
      comisionMensual,
      ivaMensual,
      seguroMensual,
      totalPagar,
      totalIntereses,
      tasaPeriodica: periodRate * 100
    };
  }, [monto, plazo, tasaAnual, frequency, selectedAllyId]);

  // Valores para visualización (rangos ya no aplican igual, es valor exacto)
  const seguroMin = resultado.seguroMensual;
  const seguroMax = resultado.seguroMensual;

  // Fianza ya incluida en "seguro" o separada? Usuario dijo "seguro fianza que es fng". 
  // Asumiremos que el cálculo de 0.033% CUBRE este rubro.
  const fianzaMin = 0;
  const fianzaMax = 0;

  // Comisión y demas ya están en `resultado`

  const cuotaTotalMin = resultado.cuota;
  const cuotaTotalMax = resultado.cuota;

  const frequencyLabel = frequency === 'diario' ? 'día' : frequency === 'semanal' ? 'semana' : 'mes';
  const frequencyPlural = frequency === 'diario' ? 'días' : frequency === 'semanal' ? 'semanas' : 'meses';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AlliesModal open={showAllies} onClose={() => setShowAllies(false)} />

      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-5xl mx-auto relative">
          <Breadcrumbs items={[{ label: "Simulador de crédito" }]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-6 border border-primary/20"
            >
              <Calculator className="w-4 h-4" />
              Simulador de Crédito
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 tracking-tight">
              Calcula tu cuota <span className="text-gradient">con Aliados</span>
            </h1>

            {/* Ally Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {ALLIES.map((ally) => (
                <button
                  key={ally.id}
                  onClick={() => {
                    setSelectedAllyId(ally.id);
                    if (ally.id === 'nanocredito') {
                      setFrequency('diario');
                      setPlazo(30);
                      setMonto(Math.min(monto, 2500000));
                    } else {
                      setFrequency('mensual');
                      if (plazo > 60) setPlazo(12); // Reset weird large input if coming from days
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${selectedAllyId === ally.id
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50'
                    }`}
                >
                  {ally.name}
                </button>
              ))}
            </div>

            {/* Rate Toggle for Allies with Range */}
            {selectedAllyId !== 'estandar' && selectedAlly.rates.min !== selectedAlly.rates.max && (
              <div className="flex justify-center mb-6">
                <div className="bg-muted p-1 rounded-xl flex gap-1">
                  <button
                    onClick={() => setUseMaxRate(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${!useMaxRate ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    Tasa Min ({selectedAlly.rates.min}%)
                  </button>
                  <button
                    onClick={() => setUseMaxRate(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${useMaxRate ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    Tasa Max ({selectedAlly.rates.max}%)
                  </button>
                </div>
              </div>
            )}

            {/* Frequency Toggle for Nanocredito */}
            {selectedAllyId === 'nanocredito' && (
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-1 rounded-xl flex gap-1">
                  <button
                    onClick={() => setFrequency('diario')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${frequency === 'diario' ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-700 hover:bg-emerald-500/10'
                      }`}
                  >
                    Pago Diario
                  </button>
                  <button
                    onClick={() => setFrequency('semanal')}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${frequency === 'semanal' ? 'bg-emerald-500 text-white shadow-sm' : 'text-emerald-700 hover:bg-emerald-500/10'
                      }`}
                  >
                    Pago Semanal
                  </button>
                </div>
              </div>
            )}

            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-6">
              Simulando con: <span className="font-bold text-foreground">{selectedAlly.name}</span>
              {selectedAllyId !== 'estandar' && ` (${tasaAnual}% E.A.)`}
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
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
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
                      if (!isNaN(num)) setMonto(Math.min(selectedAllyId === 'nanocredito' ? 2500000 : 35000000, Math.max(0, num)));
                    }}
                    className="text-xl sm:text-2xl font-extrabold text-primary bg-transparent text-right border-b-2 border-transparent focus:border-primary outline-none w-full sm:w-48 transition-colors"
                  />
                </div>
                <input
                  type="range"
                  min={300000}
                  max={selectedAllyId === 'nanocredito' ? 2500000 : 35000000}
                  step={selectedAllyId === 'nanocredito' ? 50000 : 100000}
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">$300.000</span>
                  <span className="text-xs text-muted-foreground">{selectedAllyId === 'nanocredito' ? '$2.500.000' : '$35.000.000'}</span>
                </div>
              </div>

              {/* Plazo */}
              <div className="bg-card border border-border rounded-3xl p-6 hover:border-primary/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-card-foreground">
                    <div className="w-8 h-8 rounded-xl bg-secondary/30 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    Plazo ({frequencyPlural})
                  </label>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={plazo}
                      onChange={(e) => {
                        const num = Number(e.target.value.replace(/\D/g, ""));
                        // Adjust limits based on frequency
                        const maxPlazo = frequency === 'diario' ? 90 : frequency === 'semanal' ? 24 : 36;
                        if (!isNaN(num)) setPlazo(Math.min(maxPlazo, Math.max(1, num)));
                      }}
                      className="text-2xl font-extrabold text-primary bg-transparent text-right border-b-2 border-transparent focus:border-primary outline-none w-16 transition-colors"
                    />
                    <span className="text-base font-semibold text-muted-foreground">{frequencyPlural}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={frequency === 'diario' ? 90 : frequency === 'semanal' ? 24 : 36}
                  step={1}
                  value={plazo}
                  onChange={(e) => setPlazo(Number(e.target.value))}
                  className="w-full accent-[hsl(var(--primary))] h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">1 {frequencyLabel}</span>
                  <span className="text-xs text-muted-foreground">{frequency === 'diario' ? '90 días' : frequency === 'semanal' ? '24 semanas' : '36 meses'}</span>
                </div>
              </div>

              {/* Tasa */}
              <div className={`bg-card border border-border rounded-3xl p-6 transition-colors ${selectedAllyId !== 'estandar' ? 'opacity-80' : 'hover:border-primary/20'}`}>
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-2.5 text-sm font-bold text-card-foreground">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Percent className="w-4 h-4 text-primary" />
                    </div>
                    Tasa de interés {selectedAllyId === 'nanocredito' ? (frequency === 'diario' ? 'Diaria' : 'Semanal') : 'Anual'}
                  </label>
                  <div className="flex items-baseline gap-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={selectedAllyId === 'nanocredito' ? resultado.tasaPeriodica.toFixed(3) : tasaAnual}
                      disabled={selectedAllyId !== 'estandar'}
                      onChange={(e) => {
                        if (selectedAllyId === 'estandar') {
                          const num = Number(e.target.value.replace(/[^0-9.]/g, ""));
                          if (!isNaN(num)) setTasaAnual(Math.min(60, Math.max(0, num)));
                        }
                      }}
                      className={`text-2xl font-extrabold text-primary bg-transparent text-right border-b-2 border-transparent outline-none w-20 transition-colors ${selectedAllyId === 'estandar' ? 'focus:border-primary' : 'cursor-not-allowed'}`}
                    />
                    <span className="text-base font-semibold text-muted-foreground">
                      {selectedAllyId === 'nanocredito' ? (frequency === 'diario' ? '% N.D.' : '% N.S.') : '% E.A.'}
                    </span>
                  </div>
                </div>
                {selectedAllyId === 'estandar' && (
                  <input
                    type="range"
                    min={0}
                    max={60}
                    step={0.5}
                    value={tasaAnual}
                    onChange={(e) => setTasaAnual(Number(e.target.value))}
                    className="w-full accent-[hsl(var(--primary))] h-2 rounded-lg cursor-pointer"
                  />
                )}
                {selectedAllyId !== 'estandar' && (
                  <div className="w-full h-2 bg-primary/20 rounded-lg"></div>
                )}
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
                  <p className="text-primary-foreground/70 text-sm font-medium mb-1">Tu cuota {frequencyLabel} estimada</p>
                  <motion.p
                    key={resultado.cuota}
                    initial={{ scale: 0.95, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
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
                        <span className="text-sm text-primary-foreground/80">Tasa {frequencyLabel}</span>
                      </div>
                      <span className="font-bold">{resultado.tasaPeriodica.toFixed(3)}%</span>
                    </div>
                  </div>

                  {/* Desglose de Costos */}
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-wider">Desglose de tu cuota mensual</p>

                    {/* Cuota Base */}
                    <div className="flex justify-between items-center text-sm text-primary-foreground/90 px-2">
                      <span>Abono Capital + Interés</span>
                      <span>{formatCurrency(resultado.cuotaBase)}</span>
                    </div>

                    {/* Seguro FNG */}
                    <div className="flex justify-between items-center text-sm text-primary-foreground/80 px-2">
                      <span>Seguro / FNG</span>
                      <span>+ {formatCurrency(resultado.seguroMensual)}</span>
                    </div>

                    {/* Comisión MiPyme (Si aplica o si es parte de la fórmula genérica solicitada) */}
                    {/* El usuario dio la fórmula como general, pero 'Comisión Mipyme' suele ser específica. 
                        Asumiremos que aplica para este simulador según la fórmula dada. 
                        Si solo es para microcrédito, podríamos condicionarlo, pero la solicitud fue 'en el simulador' general. */}
                    <div className="flex justify-between items-center text-sm text-primary-foreground/80 px-2">
                      <span>Comisión MiPyme (mensual)</span>
                      <span>+ {formatCurrency(resultado.comisionMensual)}</span>
                    </div>

                    {/* IVA */}
                    <div className="flex justify-between items-center text-sm text-primary-foreground/80 px-2">
                      <span>IVA (sobre comisión)</span>
                      <span>+ {formatCurrency(resultado.ivaMensual)}</span>
                    </div>

                    <div className="border-t border-primary-foreground/20 my-2"></div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-primary-foreground/20 rounded-xl px-4 py-3 backdrop-blur-sm border border-primary-foreground/10 gap-1 mt-2">
                      <span className="text-sm font-bold text-primary-foreground">Cuota Mensual Total</span>
                      <span className="text-xl font-extrabold">{formatCurrency(resultado.cuota)}</span>
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

        </div>
      </section>

      {/* AI Financial Assistant Section */}
      <section className="py-20 px-4 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        <FinancialAssistant
          simulatorData={{
            monto,
            plazo,
            tasaAnual,
            cuota: resultado.cuota,
            totalPagar: resultado.totalPagar,
            totalIntereses: resultado.totalIntereses,
          }}
        />
      </section>

      <Footer />
    </div>
  );
};

export default SimuladorPage;
