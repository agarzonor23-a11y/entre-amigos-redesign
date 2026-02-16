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
    // Bogotá
    { name: "Alix Yadire Celis Gómez", code: "SPN002", region: "Bogotá" },
    { name: "Olga Lucía Fajardo Mosquera", code: "SPN005", region: "Bogotá" },
    { name: "Maira Alejandra Bautista Romero", code: "SPN003", region: "Bogotá" },
    { name: "Sandra Liliana Martínez Osorio", code: "SPN004", region: "Bogotá" },
    { name: "Kimberly Charlotte Moreno Buitrago", code: "SPN006", region: "Bogotá" },
    { name: "Diana Carolina Loaiza Rodríguez", code: "SPN007", region: "Bogotá" },
];

const regions = [...new Set(advisors.map((a) => a.region))];

const SolicitudSupernordicoPage = () => {
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

            <section className="pt-32 pb-16 bg-gradient-to-br from-red-50 via-background to-orange-50">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-sm font-semibold text-red-600 mb-6">
                            🛒 Supernórdico
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
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!selectedRegion
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-muted text-foreground hover:bg-primary/10"
                                }`}
                        >
                            Todas las regiones
                        </button>
                        {regions.map((r) => (
                            <button
                                key={r}
                                onClick={() => setSelectedRegion(selectedRegion === r ? null : r)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedRegion === r
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "bg-muted text-foreground hover:bg-primary/10"
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
                                        href={`https://incursor.entreamigos.co/nuevo-credito/MC/introduccion/SPN?promoterCode=${encodeURIComponent(advisor.code)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 bg-background border border-border rounded-2xl p-4 hover:border-primary/30 hover:bg-red-50/50 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                                            <User className="w-5 h-5 text-red-600" />
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

export default SolicitudSupernordicoPage;
