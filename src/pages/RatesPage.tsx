import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const RateTable = ({ title, subtitle, profiles, rows, note }: {
  title: string;
  subtitle?: string;
  profiles?: string[];
  rows: { label: string; values: string[] }[];
  note?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-background rounded-3xl border border-border p-6 md:p-8 mb-8"
  >
    <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
    {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-semibold text-muted-foreground"></th>
            {profiles?.map((p, i) => (
              <th key={i} className="py-3 px-3 font-bold text-foreground text-center">{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/50 last:border-0">
              <td className="py-3 pr-4 font-medium text-muted-foreground whitespace-nowrap">{row.label}</td>
              {row.values.map((v, j) => (
                <td key={j} className="py-3 px-3 text-center font-semibold text-foreground">{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {note && <p className="text-xs text-muted-foreground mt-4">{note}</p>}
  </motion.div>
);

const SimpleRateCard = ({ title, subtitle, rows, note }: {
  title: string;
  subtitle?: string;
  rows: { label: string; value: string }[];
  note?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-background rounded-3xl border border-border p-6 md:p-8 mb-8"
  >
    <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
    {subtitle && <p className="text-sm text-muted-foreground mb-4">{subtitle}</p>}
    <div className="grid grid-cols-2 gap-4">
      {rows.map((r, i) => (
        <div key={i} className="bg-teal-light/50 rounded-2xl p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">{r.label}</p>
          <p className="text-2xl font-bold text-primary">{r.value}</p>
        </div>
      ))}
    </div>
    {note && <p className="text-xs text-muted-foreground mt-4">{note}</p>}
  </motion.div>
);

const RatesPage = () => {
  const profiles = ["AAA", "AA", "A", "BAA", "BBB"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              📊 Transparencia
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
              Tasas, precios y <span className="text-gradient">comisiones</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conoce todas nuestras tarifas de manera transparente.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20 max-w-5xl">
        {/* Microcrédito */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8">Microcrédito</h2>
        <p className="text-muted-foreground mb-6">Montos desde 1 hasta 120 SMMLV</p>

        <RateTable
          title="Popular (Hasta 6 SMMLV)"
          profiles={profiles}
          rows={[
            { label: "Efectiva anual (E.A.)", values: ["46,00%", "47,00%", "48,00%", "56,00%", "57,00%"] },
            { label: "Nominal mensual (N.M.)", values: ["3,20%", "3,26%", "3,32%", "3,78%", "3,83%"] },
          ]}
        />

        <RateTable
          title="Productivo Rural (6 a 25 SMMLV)"
          profiles={profiles}
          rows={[
            { label: "Efectiva anual (E.A.)", values: ["28,00%", "28,00%", "28,00%", "28,00%", "28,00%"] },
            { label: "Nominal mensual (N.M.)", values: ["2,08%", "2,08%", "2,08%", "2,08%", "2,08%"] },
          ]}
        />

        <RateTable
          title="Productivo Urbano (6 a 25 SMMLV)"
          profiles={profiles}
          rows={[
            { label: "Efectiva anual (E.A.)", values: ["45,00%", "45,50%", "46,50%", "51,50%", "53,00%"] },
            { label: "Nominal mensual (N.M.)", values: ["3,14%", "3,17%", "3,23%", "3,52%", "3,61%"] },
          ]}
        />

        <RateTable
          title="Mayor monto (25 a 120 SMMLV)"
          profiles={profiles}
          rows={[
            { label: "Efectiva anual (E.A.)", values: ["35,60%", "35,60%", "35,60%", "38,00%", "39,50%"] },
            { label: "Nominal mensual (N.M.)", values: ["2,57%", "2,57%", "2,57%", "2,72%", "2,81%"] },
          ]}
          note="Método de cálculo de interés saldo decreciente (Cuotas Iguales)."
        />

        {/* Nanocrédito */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Nanocrédito</h2>
        <SimpleRateCard
          title="Todos los perfiles"
          subtitle="Cupos entre $1.000.000 hasta $2.500.000"
          rows={[
            { label: "Nominal diaria (N.D.)", value: "0,122%" },
            { label: "Efectivo Anual (E.A.)", value: "55,00%" },
          ]}
          note="Método de cálculo de interés saldo decreciente (Cuotas Iguales)."
        />

        {/* Impulsacrédito */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Impulsacrédito (Crédito de bajo monto)</h2>
        <SimpleRateCard
          title="Primera vez"
          subtitle="Montos entre $300.000 hasta $4.980.000"
          rows={[
            { label: "Nominal mensual (N.M.)", value: "3,94%" },
            { label: "Efectivo Anual (E.A.)", value: "59%" },
          ]}
        />
        <SimpleRateCard
          title="Renovaciones"
          rows={[
            { label: "Nominal mensual (N.M.)", value: "3,43%" },
            { label: "Efectivo Anual (E.A.)", value: "49,90%" },
          ]}
          note="Método de cálculo de interés saldo decreciente (Cuotas Iguales)."
        />

        {/* Crédito Rotativo */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Crédito Rotativo</h2>
        <SimpleRateCard
          title="Todos los perfiles"
          subtitle="Cupos entre $1.000.000 hasta $35.387.501 según alianza"
          rows={[
            { label: "Nominal mensual (N.M.)", value: "1,88%" },
            { label: "Efectivo Anual (E.A.)", value: "24,99%" },
          ]}
          note="Método de cálculo de interés saldo decreciente (Cuotas Iguales)."
        />

        {/* Libre Inversión */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Crédito Libre Inversión</h2>
        <SimpleRateCard
          title="Todos los perfiles"
          subtitle="Entre $1.000.000 hasta $7.000.000 según perfil"
          rows={[
            { label: "Nominal mensual (N.M.)", value: "1,88%" },
            { label: "Efectivo Anual (E.A.)", value: "24,99%" },
          ]}
          note="Método de cálculo de interés saldo decreciente (Cuotas Iguales)."
        />

        {/* Modalidad Comercial */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Modalidad Comercial</h2>
        <p className="text-muted-foreground mb-6">Montos según aliado entre $1.000.000 hasta $30.000.000</p>
        <SimpleRateCard
          title="Productivo Plus (Persona Natural) / Persona Jurídica"
          rows={[
            { label: "Nominal mensual (N.M.)", value: "1,88%" },
            { label: "Efectivo Anual (E.A.)", value: "24,99%" },
          ]}
          note="Método de cálculo de interés saldo decreciente (Cuotas Iguales)."
        />

        {/* Tasas alianzas */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Tasas especiales para alianzas</h2>
        <RateTable
          title="Alianzas"
          profiles={["Cematcol", "Homecenter", "Tredi", "Farmatízate", "Automundial"]}
          rows={[
            { label: "Efectiva anual (E.A.)", values: ["25,23%", "0,00%", "25%", "38%", "22,80%"] },
            { label: "Mensual vencida (M.V.)", values: ["1,89%", "0,00%", "1,88%", "2,72%", "1,73%"] },
          ]}
        />

        {/* Otras tarifas */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Otras tarifas</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background rounded-3xl border border-border p-6 md:p-8 mb-8"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Comisión MiPyme < 4 SMMLV", value: "7,5% + IVA" },
              { label: "Comisión MiPyme > 4 SMMLV", value: "4,5% + IVA" },
              { label: "Plazo", value: "1 - 36 meses" },
              { label: "Costo del recaudo", value: "$0" },
              { label: "Seguro mensual", value: "3,96% / 1000 / 12" },
              { label: "Certificaciones y extractos", value: "$0" },
              { label: "Consulta centrales de riesgo", value: "$0" },
            ].map((item, i) => (
              <div key={i} className="bg-teal-light/30 rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="text-lg font-bold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">* Solo aplica para microcrédito</p>
        </motion.div>

        {/* Intereses de mora */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Intereses de mora</h2>
        <RateTable
          title="Tasas de mora por producto"
          profiles={["Prod. Rural", "Microcrédito", "Comercial", "Rotativo", "Bajo monto", "Nanocrédito", "Libre inv.", "Rot. prod."]}
          rows={[
            { label: "Tasa EA", values: ["27,98%", "57,74%", "24,36%", "24,36%", "68,85%", "89,75%", "24,36%", "57,74%"] },
            { label: "Tasa MV", values: ["2,08%", "3,87%", "1,83%", "1,83%", "4,46%", "5,48%", "1,83%", "3,87%"] },
            { label: "Tasa Diaria", values: ["0,07%", "0,13%", "0,06%", "0,06%", "0,15%", "0,18%", "0,06%", "0,13%"] },
          ]}
        />

        {/* GAC */}
        <h2 className="text-3xl font-extrabold text-foreground mb-8 mt-16">Gastos administrativos de cobranza (GAC)</h2>
        <RateTable
          title="Tarifas GAC"
          profiles={["16-30 días", "31-60 días", "61-120 días", ">120 días", "Castigada"]}
          rows={[
            { label: "% GAC", values: ["2,50%", "8,40%", "14%", "17%", "19%"] },
          ]}
          note="Franja de Mora hace referencia a periodos o ciclos de mora. Altura de Mora hace referencia a los días en mora."
        />

        {/* Link to historical rates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-teal-light to-pink-light rounded-3xl p-10"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Conoce el histórico de tasas de nuestros productos</h3>
          <a href="https://www.entreamigos.co/historico-de-tasas" target="_blank" rel="noopener noreferrer">
            <button className="rounded-full px-8 py-3 bg-primary text-primary-foreground font-semibold hover:bg-teal-dark transition-colors shadow-lg shadow-primary/25">
              Da clic aquí
            </button>
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default RatesPage;
