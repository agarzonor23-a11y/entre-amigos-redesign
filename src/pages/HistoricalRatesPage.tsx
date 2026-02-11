import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Calendar, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface RateEntry {
  date: string;
  min: number;
  max: number;
}

interface Product {
  name: string;
  color: string;
  icon: string;
  data: RateEntry[];
}

const products: Product[] = [
  {
    name: "Microcrédito",
    color: "#0D9488",
    icon: "💰",
    data: [
      { date: "Jul 2022", min: 24.9, max: 42 },
      { date: "Oct 2022", min: 30, max: 45 },
      { date: "Nov 2022", min: 33, max: 53 },
      { date: "Ene 2023", min: 35, max: 53 },
      { date: "Abr 2023", min: 36, max: 55 },
      { date: "Ago 2023", min: 36, max: 52.8 },
      { date: "Abr 2024", min: 38, max: 57.4 },
      { date: "Jun 2024", min: 35, max: 53.57 },
      { date: "Nov 2024", min: 39, max: 53.1 },
      { date: "Dic 2024", min: 35.2, max: 53.1 },
      { date: "Ene 2025", min: 35.2, max: 51.8 },
      { date: "Mar 2025", min: 35.2, max: 52.7 },
      { date: "Abr 2025", min: 35.2, max: 54.54 },
      { date: "Jun 2025", min: 35.2, max: 55.5 },
      { date: "Sep 2025", min: 35.2, max: 53.9 },
      { date: "Nov 2025", min: 27, max: 56 },
      { date: "Dic 2025", min: 27, max: 57 },
      { date: "Feb 2026", min: 28, max: 57 },
    ],
  },
  {
    name: "Productivo Plus",
    color: "#F97316",
    icon: "📈",
    data: [
      { date: "Oct 2023", min: 35, max: 35 },
      { date: "Nov 2023", min: 35, max: 35 },
      { date: "Dic 2023", min: 35, max: 35 },
      { date: "Abr 2024", min: 34.48, max: 34.48 },
      { date: "May 2024", min: 31.48, max: 31.48 },
      { date: "Jun 2024", min: 30.34, max: 30.34 },
      { date: "Nov 2024", min: 28.9, max: 28.9 },
      { date: "Ene 2025", min: 25.89, max: 25.89 },
      { date: "Feb 2025", min: 24.59, max: 24.59 },
      { date: "Mar 2025", min: 26.2, max: 26.2 },
      { date: "Abr 2025", min: 24.89, max: 24.89 },
      { date: "Jul 2025", min: 25.5, max: 25.5 },
      { date: "Sep 2025", min: 24.78, max: 24.78 },
      { date: "Nov 2025", min: 24.9, max: 24.9 },
      { date: "Dic 2025", min: 24.89, max: 24.89 },
      { date: "Ene 2026", min: 24.89, max: 24.89 },
      { date: "Actual", min: 24.3, max: 24.3 },
    ],
  },
  {
    name: "Impulsacrédito",
    color: "#EC4899",
    icon: "⚡",
    data: [
      { date: "Oct 2023", min: 42, max: 42 },
      { date: "Nov 2023", min: 56, max: 56 },
      { date: "Abr 2024", min: 54, max: 54 },
      { date: "Nov 2025", min: 52.5, max: 52.5 },
      { date: "Abr 2025", min: 58, max: 58 },
      { date: "Actual", min: 59, max: 59 },
    ],
  },
  {
    name: "Nanocrédito",
    color: "#8B5CF6",
    icon: "🔬",
    data: [
      { date: "Dic 2024", min: 52.5, max: 52.5 },
      { date: "Actual", min: 55, max: 55 },
    ],
  },
  {
    name: "Crédito Rotativo",
    color: "#06B6D4",
    icon: "🔄",
    data: [
      { date: "Oct 2023", min: 39.3, max: 39.3 },
      { date: "Nov 2023", min: 37.06, max: 37.06 },
      { date: "Dic 2023", min: 34.48, max: 34.48 },
      { date: "Abr 2024", min: 31, max: 31 },
      { date: "May 2024", min: 30.84, max: 30.84 },
      { date: "Jun 2024", min: 28.5, max: 28.5 },
      { date: "Nov 2024", min: 27.9, max: 27.9 },
      { date: "Dic 2024", min: 25.89, max: 25.89 },
      { date: "Ene 2025", min: 24.59, max: 24.59 },
      { date: "Feb 2025", min: 26.2, max: 26.2 },
      { date: "Mar 2025", min: 24.89, max: 24.89 },
      { date: "Jul 2025", min: 25.5, max: 25.5 },
      { date: "Sep 2025", min: 24.78, max: 24.78 },
      { date: "Nov 2025", min: 24.9, max: 24.9 },
      { date: "Dic 2025", min: 24.89, max: 24.89 },
      { date: "Ene 2026", min: 24.99, max: 24.99 },
      { date: "Feb 2026", min: 24.3, max: 24.3 },
      { date: "Actual", min: 24.99, max: 24.99 },
    ],
  },
  {
    name: "Libre Inversión",
    color: "#10B981",
    icon: "💎",
    data: [
      { date: "Dic 2024", min: 27.8, max: 27.8 },
      { date: "Ene 2025", min: 25.89, max: 25.89 },
      { date: "Feb 2025", min: 24.59, max: 24.59 },
      { date: "Abr 2025", min: 26.2, max: 26.2 },
      { date: "Jul 2025", min: 25.5, max: 25.5 },
      { date: "Sep 2025", min: 24.78, max: 24.78 },
      { date: "Nov 2025", min: 24.9, max: 24.9 },
      { date: "Dic 2025", min: 24.89, max: 24.89 },
      { date: "Ene 2026", min: 24.99, max: 24.99 },
      { date: "Feb 2026", min: 24.3, max: 24.3 },
      { date: "Actual", min: 24.99, max: 24.99 },
    ],
  },
  {
    name: "Comercial Persona Jurídica",
    color: "#F59E0B",
    icon: "🏢",
    data: [
      { date: "Dic 2024", min: 26.2, max: 26.2 },
      { date: "Ene 2025", min: 25.89, max: 25.89 },
      { date: "Feb 2025", min: 24.59, max: 24.59 },
      { date: "Abr 2025", min: 26, max: 26 },
      { date: "Jul 2025", min: 25.5, max: 25.5 },
      { date: "Sep 2025", min: 24.78, max: 24.78 },
      { date: "Nov 2025", min: 24.9, max: 24.9 },
      { date: "Dic 2025", min: 24.89, max: 24.89 },
      { date: "Ene 2026", min: 24.99, max: 24.99 },
      { date: "Feb 2026", min: 24.3, max: 24.3 },
      { date: "Actual", min: 24.99, max: 24.99 },
    ],
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-xl p-3 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="text-xs" style={{ color: p.color }}>
            {p.name}: <span className="font-bold">{p.value}% E.A.</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HistoricalRatesPage = () => {
  const [selected, setSelected] = useState(0);
  const product = products[selected];
  const hasRange = product.data.some((d) => d.min !== d.max);
  const current = product.data[product.data.length - 1];
  const previous = product.data.length > 1 ? product.data[product.data.length - 2] : current;
  const trendMax = current.max - previous.max;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              📊 Transparencia
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              En Entre Amigos <span className="text-gradient">somos claros</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Te mostramos el histórico de tasas que hemos venido ofreciendo en el mercado con nuestras opciones de crédito.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Product Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10 justify-center"
        >
          {products.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setSelected(i)}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2 ${
                selected === i
                  ? "text-primary-foreground shadow-lg scale-105"
                  : "bg-background border border-border text-foreground hover:border-primary/30"
              }`}
              style={selected === i ? { backgroundColor: p.color, boxShadow: `0 8px 25px ${p.color}40` } : {}}
            >
              <span>{p.icon}</span> {p.name}
            </button>
          ))}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="bg-background border border-border rounded-3xl p-6 text-center">
            <p className="text-xs text-muted-foreground mb-1">Tasa actual {hasRange ? "(máx)" : ""}</p>
            <p className="text-3xl font-extrabold" style={{ color: product.color }}>
              {current.max}%
            </p>
            <p className="text-xs text-muted-foreground">E.A.</p>
          </div>
          {hasRange && (
            <div className="bg-background border border-border rounded-3xl p-6 text-center">
              <p className="text-xs text-muted-foreground mb-1">Tasa actual (mín)</p>
              <p className="text-3xl font-extrabold text-foreground">{current.min}%</p>
              <p className="text-xs text-muted-foreground">E.A.</p>
            </div>
          )}
          <div className="bg-background border border-border rounded-3xl p-6 text-center">
            <p className="text-xs text-muted-foreground mb-1">Tendencia</p>
            <div className="flex items-center justify-center gap-2">
              {trendMax <= 0 ? (
                <TrendingDown className="w-6 h-6 text-green-500" />
              ) : (
                <TrendingUp className="w-6 h-6 text-red-500" />
              )}
              <span className={`text-2xl font-extrabold ${trendMax <= 0 ? "text-green-500" : "text-red-500"}`}>
                {trendMax > 0 ? "+" : ""}{trendMax.toFixed(2)}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">vs. periodo anterior</p>
          </div>
          {!hasRange && (
            <div className="bg-background border border-border rounded-3xl p-6 text-center">
              <p className="text-xs text-muted-foreground mb-1">Registros</p>
              <p className="text-3xl font-extrabold text-foreground">{product.data.length}</p>
              <p className="text-xs text-muted-foreground">periodos</p>
            </div>
          )}
        </motion.div>

        {/* Chart */}
        <motion.div
          key={`chart-${selected}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-background border border-border rounded-3xl p-6 md:p-8 mb-10"
        >
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <span>{product.icon}</span> Evolución de tasas — {product.name}
          </h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {hasRange ? (
                <AreaChart data={product.data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id={`grad-${selected}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={product.color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={product.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={["dataMin - 5", "dataMax + 5"]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" name="Máxima" stroke={product.color} fill={`url(#grad-${selected})`} strokeWidth={2.5} dot={{ r: 3 }} />
                  <Area type="monotone" dataKey="min" name="Mínima" stroke={`${product.color}80`} fill="transparent" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </AreaChart>
              ) : (
                <AreaChart data={product.data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id={`grad-${selected}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={product.color} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={product.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" domain={["dataMin - 3", "dataMax + 3"]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="max" name="Tasa" stroke={product.color} fill={`url(#grad-${selected})`} strokeWidth={2.5} dot={{ r: 4 }} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Timeline Table */}
        <motion.div
          key={`table-${selected}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-background border border-border rounded-3xl p-6 md:p-8"
        >
          <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Detalle histórico — {product.name}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-semibold text-muted-foreground">Fecha</th>
                  {hasRange ? (
                    <>
                      <th className="py-3 px-4 font-semibold text-muted-foreground text-right">Mínima E.A.</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground text-right">Máxima E.A.</th>
                    </>
                  ) : (
                    <th className="py-3 px-4 font-semibold text-muted-foreground text-right">Tasa E.A.</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {[...product.data].reverse().map((entry, i) => (
                  <tr key={i} className={`border-b border-border/50 last:border-0 ${i === 0 ? "bg-teal-light/30" : ""}`}>
                    <td className="py-3 pr-4 font-medium text-foreground flex items-center gap-2">
                      {i === 0 && <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: product.color }} />}
                      {entry.date}
                      {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">Actual</span>}
                    </td>
                    {hasRange ? (
                      <>
                        <td className="py-3 px-4 text-right font-semibold text-foreground">{entry.min}%</td>
                        <td className="py-3 px-4 text-right font-bold" style={{ color: product.color }}>{entry.max}%</td>
                      </>
                    ) : (
                      <td className="py-3 px-4 text-right font-bold" style={{ color: product.color }}>{entry.max}%</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default HistoricalRatesPage;
