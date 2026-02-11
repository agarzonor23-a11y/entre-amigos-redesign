import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

interface Advisor {
  name: string;
  code: string;
  region: string;
}

const advisors: Advisor[] = [
  // Antioquia
  { name: "Alexander Montoya", code: "AUMU088", region: "Antioquia" },
  { name: "Eduyn Alexander Ochoa Velasquez", code: "AUMU090", region: "Antioquia" },
  { name: "Hernan Dario Lopez Echavarria", code: "AUMU084", region: "Antioquia" },
  { name: "Deivi Jonathan Pérez Monsalve", code: "AUMU099", region: "Antioquia" },
  { name: "Jennifer Geraldine Ortiz Torres", code: "AUMU108", region: "Antioquia" },
  { name: "Mayori Gaviria Piedrahita", code: "AUMU109", region: "Antioquia" },
  { name: "John Albeiro Aguirre Zapata", code: "AUMU115", region: "Antioquia" },
  { name: "Erick Fabiam Padilla Varela", code: "AUMU120", region: "Antioquia" },
  // Costa
  { name: "Fátima Inés Leguizamo", code: "AUMU061", region: "Costa" },
  { name: "Heidy Liliana Riascos", code: "AUMU060", region: "Costa" },
  { name: "Eira Patricia Agamez Mejia", code: "AUMU069", region: "Costa" },
  { name: "Yeni Liced Peñaranda Ropero", code: "AUMU071", region: "Costa" },
  { name: "Viannela Cristina Castro Fernandez", code: "AUMU076", region: "Costa" },
  { name: "Jeinz Marlon Pinzon Hernández", code: "AUMU078", region: "Costa" },
  // Occidente
  { name: "Aníbal Cadavid", code: "AUMU032", region: "Occidente" },
  { name: "María Fernanda Ciro Santos", code: "AUMU033", region: "Occidente" },
  { name: "Yolanda Gironza Gómez", code: "AUMU035", region: "Occidente" },
  { name: "Gustavo Adolfo Sarmiento", code: "AUMU058", region: "Occidente" },
  { name: "Luis Yovani Ceballos Martínez", code: "AUMU064", region: "Occidente" },
  { name: "Lina María Peña Rodríguez", code: "AUMU065", region: "Occidente" },
  { name: "Yajaira Perea", code: "AUMU081", region: "Occidente" },
  // Boyacá
  { name: "Oscar Javier Otalora", code: "AUMU057", region: "Boyacá" },
  { name: "Carlos Arturo Cortéz", code: "AUMU008", region: "Boyacá" },
  { name: "Jonathan Corredor", code: "AUMU086", region: "Boyacá" },
  { name: "Zandra Yovana Chinome", code: "AUMU092", region: "Boyacá" },
  { name: "Cristian Eduardo Castillo", code: "AUMU113", region: "Boyacá" },
  { name: "Diana Paulina Serrano", code: "AUMU114", region: "Boyacá" },
  // Eje Cafetero
  { name: "Clissman Lea Ladino Chiquito", code: "AUMU029", region: "Eje Cafetero" },
  { name: "James Giovanni Restrepo Trejos", code: "AUMU075", region: "Eje Cafetero" },
  { name: "Diana Patricia Rincón Vargas", code: "AUMU093", region: "Eje Cafetero" },
  { name: "Ginna Rocio Vargas Alvarez", code: "AUMU105", region: "Eje Cafetero" },
  { name: "Ricardo Andrés Marín Vallejo", code: "AUMU106", region: "Eje Cafetero" },
  { name: "Miguel Angel Zapata", code: "AUMU030", region: "Eje Cafetero" },
  // Santander
  { name: "Jaime Andrés Gómez", code: "AUMU038", region: "Santander" },
  { name: "Jorge Leonardo Herrera L", code: "AUMU039", region: "Santander" },
  { name: "Héctor Armando Rico Riatiga", code: "AUMU042", region: "Santander" },
  { name: "Sandy Bianey León", code: "AUMU062", region: "Santander" },
  { name: "Sandra Muñoz", code: "AUMU079", region: "Santander" },
  { name: "Jaime Suarez Angulo", code: "AUMU116", region: "Santander" },
  { name: "José Dagoberto Lazo Rojas", code: "AUMU117", region: "Santander" },
  // Bogotá
  { name: "Angie Paola Manrique", code: "AUMU050", region: "Bogotá" },
  { name: "Zulieth Castrillon", code: "AUMU049", region: "Bogotá" },
  { name: "Yuri Paola Guerrero Delgado", code: "AUMU103", region: "Bogotá" },
  { name: "Carol Godoy", code: "AUMU102", region: "Bogotá" },
  { name: "Ricardo Stiven Arce Rodríguez", code: "AUMU118", region: "Bogotá" },
  // Centro
  { name: "William García Wilches", code: "AUMU013", region: "Centro" },
  { name: "Judy Andrea Garzón Paipa", code: "AUMU014", region: "Centro" },
  { name: "Irma Estupiñan", code: "AUMU015", region: "Centro" },
  { name: "Santiago Morera Garavito", code: "AUMU017", region: "Centro" },
  { name: "David Esteban Penagos Veloza", code: "AUMU018", region: "Centro" },
  { name: "Viviana Alexandra Riaño", code: "AUMU020", region: "Centro" },
  { name: "Carlos Salamanca", code: "AUMU021", region: "Centro" },
  { name: "Fabian Gonzalez", code: "AUMU083", region: "Centro" },
  // Tolima - Huila
  { name: "Germán Salazar Cedeño", code: "AUMU047", region: "Tolima - Huila" },
  { name: "Alvaro Saenz Aguirre", code: "AUMU046", region: "Tolima - Huila" },
  { name: "Jose Luis Perdomo Parra", code: "AUMU107", region: "Tolima - Huila" },
  { name: "Jefferson Rincón Galvis", code: "AUMU119", region: "Tolima - Huila" },
  // Yumbo
  { name: "Maria Alejandra Sotelo", code: "AUMU077", region: "Yumbo" },
  { name: "Marisol Mejía Sepulveda", code: "AUMU098", region: "Yumbo" },
  // Barranquilla
  { name: "Dagoberto Jaramillo", code: "AUMU110", region: "Barranquilla" },
  { name: "Jelitza Isabel Anderson Palma", code: "AUMU111", region: "Barranquilla" },
];

const regions = [...new Set(advisors.map((a) => a.region))];

const SolicitudAutomundialPage = () => {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return advisors.filter((a) => {
      const matchesRegion = !selectedRegion || a.region === selectedRegion;
      const matchesSearch = !q || a.name.toLowerCase().includes(q) || a.region.toLowerCase().includes(q);
      return matchesRegion && matchesSearch;
    });
  }, [search, selectedRegion]);

  const grouped = useMemo(() => {
    const map: Record<string, Advisor[]> = {};
    filtered.forEach((a) => {
      if (!map[a.region]) map[a.region] = [];
      map[a.region].push(a);
    });
    return map;
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-br from-teal-light via-background to-pink-light">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-semibold text-primary mb-6">
              🚗 AutoMundial
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Realiza tu solicitud de <span className="text-gradient">crédito</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Da clic en el asesor que te está apoyando en tu solicitud
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o región..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 rounded-2xl h-12 text-base"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedRegion
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-teal-light text-foreground hover:bg-primary/10"
              }`}
            >
              Todas las regiones
            </button>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRegion(selectedRegion === r ? null : r)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRegion === r
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-teal-light text-foreground hover:bg-primary/10"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 inline mr-1" />
                {r}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No se encontraron asesores con ese criterio.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([region, advisorList]) => (
            <motion.div
              key={region}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{region}</h2>
                <span className="text-sm text-muted-foreground">({advisorList.length})</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {advisorList.map((advisor) => (
                  <a
                    key={advisor.code}
                    href={`https://incursor.entreamigos.co/nuevo-credito/CR/introduccion/AUMU?promoterCode=${encodeURIComponent(advisor.code)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-background border border-border rounded-2xl p-4 hover:border-primary/30 hover:bg-teal-light/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm truncate">{advisor.name}</p>
                      <p className="text-xs text-muted-foreground">Solicitar crédito →</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SolicitudAutomundialPage;
