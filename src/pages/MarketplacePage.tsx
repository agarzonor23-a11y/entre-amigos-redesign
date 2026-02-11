import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  Truck,
  Shield,
  Tag,
  Flame,
  Sparkles,
  X,
  MapPin,
  ArrowUpDown,
  Menu,
  CreditCard,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import Footer from "@/components/landing/Footer";
import { PRODUCTS, CATEGORIES, formatCOP, discount } from "@/data/marketplace-products";

const SORT_OPTIONS = [
  { value: "relevant", label: "Más relevantes" },
  { value: "price-asc", label: "Menor precio" },
  { value: "price-desc", label: "Mayor precio" },
  { value: "rating", label: "Mejor calificación" },
];

// ── Component ───────────────────────────────────────────────────────
const MarketplacePage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showSort, setShowSort] = useState(false);

  const toggleFav = (id: number) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];
    if (category !== "all") items = items.filter((p) => p.category === category);
    if (search) items = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    if (freeShippingOnly) items = items.filter((p) => p.freeShipping);
    switch (sortBy) {
      case "price-asc":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        items.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;
    }
    return items;
  }, [category, search, sortBy, freeShippingOnly]);

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Marketplace Header ──────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
        <div className="container mx-auto px-4">
          {/* Top row: logo + search + actions */}
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => navigate("/")} className="shrink-0">
              <img src={logoEntreamigos} alt="Entre Amigos" className="h-8 w-auto brightness-0 invert" />
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-xl hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos, marcas y más..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-10 h-10 rounded-full bg-primary-foreground border-none text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-secondary"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <a href="https://incursor.entreamigos.co/pagos/ingreso" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2 font-medium">
                  <Wallet className="w-4 h-4" />
                  Paga tu crédito
                </Button>
              </a>
              <Button
                size="sm"
                className="rounded-full px-5 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md font-bold gap-2"
                onClick={() => navigate("/productos")}
              >
                <CreditCard className="w-4 h-4" />
                Compra con tu crédito
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden ml-auto text-primary-foreground">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-10 h-10 rounded-full bg-primary-foreground border-none text-sm text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary/95 backdrop-blur border-t border-primary-foreground/10 px-4 py-4 space-y-3">
            <a href="https://incursor.entreamigos.co/pagos/ingreso" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground">
              <Wallet className="w-4 h-4" />
              Paga tu crédito
            </a>
            <Button
              size="sm"
              className="w-full rounded-full bg-secondary text-secondary-foreground font-bold gap-2"
              onClick={() => { setMobileMenuOpen(false); navigate("/productos"); }}
            >
              <CreditCard className="w-4 h-4" />
              Compra con tu crédito
            </Button>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-[104px] md:h-16" />

      {/* ── Categories Scroll ───────────────────────────────────── */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-3 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat.id
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Product of the Week ───────────────────────────── */}
      {(() => {
        const featured = PRODUCTS[6]; // PS5 as featured
        const featDiscount = discount(featured.originalPrice, featured.price);
        return (
          <div className="container mx-auto px-4 mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-teal-dark cursor-pointer group"
              onClick={() => navigate(`/marketplace/${featured.id}`)}
            >
              <div className="flex flex-col md:flex-row items-center">
                {/* Info */}
                <div className="relative z-10 p-8 md:p-10 flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-5 h-5 text-secondary" />
                    <span className="text-secondary font-bold text-sm uppercase tracking-wider">
                      ⭐ Producto de la semana
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-primary-foreground mb-2 leading-tight">
                    {featured.name}
                  </h2>
                  <div className="flex items-baseline gap-3 mb-1">
                    {featured.originalPrice && (
                      <span className="text-primary-foreground/50 line-through text-sm">
                        {formatCOP(featured.originalPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
                      {formatCOP(featured.price)}
                    </span>
                    {featDiscount > 0 && (
                      <span className="bg-secondary text-secondary-foreground text-sm font-bold px-2.5 py-1 rounded-lg">
                        {featDiscount}% OFF
                      </span>
                    )}
                  </div>
                  {featured.freeShipping && (
                    <p className="text-primary-foreground/70 text-sm flex items-center gap-1 mb-5">
                      <Truck className="w-4 h-4" /> Envío gratis
                    </p>
                  )}
                  <Button
                    size="lg"
                    className="rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-extrabold shadow-xl gap-2 text-base"
                    onClick={(e) => { e.stopPropagation(); navigate(`/marketplace/${featured.id}`); }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Comprar ahora
                  </Button>
                </div>
                {/* Image */}
                <div className="w-full md:w-[340px] h-[220px] md:h-[300px] relative shrink-0">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover md:rounded-r-3xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent md:from-primary/40" />
                </div>
              </div>
            </motion.div>
          </div>
        );
      })()}

      {/* ── Toolbar ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 mt-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span> resultados
            {category !== "all" && (
              <span>
                {" "}
                en{" "}
                <Badge variant="secondary" className="ml-1">
                  {CATEGORIES.find((c) => c.id === category)?.label}
                  <button onClick={() => setCategory("all")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              </span>
            )}
          </p>

          <div className="flex items-center gap-2">
            {/* Free shipping filter */}
            <Button
              variant={freeShippingOnly ? "default" : "outline"}
              size="sm"
              className="rounded-xl gap-2 text-xs"
              onClick={() => setFreeShippingOnly(!freeShippingOnly)}
            >
              <Truck className="w-3.5 h-3.5" />
              Envío gratis
            </Button>

            {/* Sort dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl gap-2 text-xs"
                onClick={() => setShowSort(!showSort)}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                {SORT_OPTIONS.find((s) => s.value === sortBy)?.label}
                <ChevronDown className="w-3 h-3" />
              </Button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 bg-card border border-border rounded-2xl shadow-xl p-2 z-50 min-w-[200px]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setShowSort(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                          sortBy === opt.value
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground hover:bg-muted"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View toggle */}
            <div className="hidden md:flex items-center bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile filters */}
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl gap-2 text-xs md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* ── Product Grid ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${sortBy}-${viewMode}-${freeShippingOnly}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filtered.map((product, i) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => navigate(`/marketplace/${product.id}`)}
                className={`group cursor-pointer bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden bg-muted/30 ${
                    viewMode === "list" ? "w-48 shrink-0" : "aspect-square"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold shadow-md">
                      {product.badge}
                    </span>
                  )}

                  {/* Fav */}
                  <button
                    onClick={() => toggleFav(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        favorites.includes(product.id) ? "fill-secondary text-secondary" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-xs text-muted-foreground mb-1 truncate">{product.seller}</p>
                  <h3 className="font-semibold text-card-foreground text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xl font-extrabold text-foreground">{formatCOP(product.price)}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatCOP(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-xs font-bold text-primary">
                        {discount(product.originalPrice, product.price)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-foreground">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    {product.freeShipping && (
                      <div className="flex items-center gap-1 text-primary">
                        <Truck className="w-3 h-3" />
                        <span className="text-xs font-semibold">Gratis</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{product.location}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">No encontramos resultados</h3>
            <p className="text-muted-foreground">Intenta con otra búsqueda o cambia los filtros.</p>
            <Button variant="outline" className="mt-6 rounded-xl" onClick={() => { setSearch(""); setCategory("all"); setFreeShippingOnly(false); }}>
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {/* ── Trust bar ───────────────────────────────────────────── */}
      <div className="bg-background border-t border-border py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Envío a todo Colombia", desc: "Gratis en miles de productos" },
              { icon: Shield, title: "Compra segura", desc: "Protegemos tu compra" },
              { icon: Tag, title: "Mejores precios", desc: "Ofertas todos los días" },
              { icon: ShoppingCart, title: "Fácil devolución", desc: "30 días para devolver" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketplacePage;
