import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Truck,
  Shield,
  MapPin,
  ChevronLeft,
  Minus,
  Plus,
  Share2,
  ShoppingBag,
  CheckCircle2,
  Clock,
  RotateCcw,
  CreditCard,
  Menu,
  X,
  Search,
  Wallet,
  UserCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PRODUCTS, CATEGORIES, formatCOP, discount } from "@/data/marketplace-products";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import Footer from "@/components/landing/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "@/components/auth/LoginModal";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginAction, setLoginAction] = useState<"add_to_cart" | "go_to_cart" | null>(null);

  const { user, signOut } = useAuth();

  const { addToCart, setIsOpen, itemCount } = useCart();
  const { toast } = useToast();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Producto no encontrado</h2>
          <p className="text-muted-foreground mb-6">El producto que buscas no existe.</p>
          <Button onClick={() => navigate("/marketplace")} className="rounded-xl">
            Volver al Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const discountPercent = discount(product.originalPrice, product.price);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const categoryLabel = CATEGORIES.find((c) => c.id === product.category)?.label || "";

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ── Marketplace Header ──────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            <button onClick={() => navigate("/")} className="shrink-0">
              <img src={logoEntreamigos} alt="Entre Amigos" className="h-8 w-auto brightness-0 invert" />
            </button>
            <div className="relative flex-1 max-w-xl hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos, marcas y más..."
                className="pl-10 h-10 rounded-full bg-primary-foreground border-none text-sm text-foreground"
                onFocus={() => navigate("/marketplace")}
                readOnly
              />
            </div>
            <div className="hidden md:flex items-center gap-3 ml-auto">
              <a href="https://incursor.entreamigos.co/pagos/ingreso" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2 font-medium">
                  <Wallet className="w-4 h-4" />
                  Paga tu crédito
                </Button>
              </a>

              <button
                onClick={() => {
                  if (!user) {
                    setLoginAction("go_to_cart");
                    setShowLoginModal(true);
                  } else {
                    navigate("/cart");
                  }
                }}
                className="relative p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-full transition-colors"
                title="Ver carrito"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                    {itemCount}
                  </span>
                )}
              </button>

              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full px-3"
                  onClick={() => signOut()}
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span className="hidden lg:inline">Salir</span>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full px-3"
                  onClick={() => setShowLoginModal(true)}
                >
                  <UserCircle className="w-5 h-5 mr-1" />
                  <span className="hidden lg:inline">Ingresar</span>
                </Button>
              )}

              <Button size="sm" className="rounded-full px-5 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md font-bold gap-2" onClick={() => navigate("/productos")}>
                <CreditCard className="w-4 h-4" />
                Compra con tu crédito
              </Button>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden ml-auto text-primary-foreground">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-primary/95 backdrop-blur border-t border-primary-foreground/10 px-4 py-4 space-y-3">
            <a href="https://incursor.entreamigos.co/pagos/ingreso" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/80">
              <Wallet className="w-4 h-4" /> Paga tu crédito
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); navigate("/cart"); }}
              className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground w-full"
            >
              <ShoppingBag className="w-4 h-4" />
              Ver Carrito ({itemCount})
            </button>
            {user ? (
              <button
                onClick={() => { setMobileMenuOpen(false); signOut(); }}
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground w-full text-left"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión ({user.name || user.email})
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginAction(null);
                  setShowLoginModal(true);
                }}
                className="flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground w-full text-left"
              >
                <UserCircle className="w-4 h-4" />
                Iniciar sesión
              </button>
            )}
            <Button size="sm" className="w-full rounded-full bg-secondary text-secondary-foreground font-bold gap-2" onClick={() => navigate("/productos")}>
              <CreditCard className="w-4 h-4" /> Compra con tu crédito
            </Button>
          </div>
        )
        }
      </header >

      <div className="h-16" />

      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate("/marketplace")} className="flex items-center gap-1 text-primary hover:underline font-medium">
              <ChevronLeft className="w-4 h-4" />
              Volver
            </button>
            <span className="text-muted-foreground">|</span>
            <button onClick={() => navigate("/marketplace")} className="text-primary hover:underline">Marketplace</button>
            <span className="text-muted-foreground">›</span>
            <span className="text-muted-foreground">{categoryLabel}</span>
            <span className="text-muted-foreground hidden sm:inline">›</span>
            <span className="text-muted-foreground hidden sm:inline truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────── */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_1fr_380px] gap-8">

          {/* ── Image Gallery ─────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-card border border-border aspect-square">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-bold shadow-lg">
                  {product.badge}
                </Badge>
              )}
              <button
                onClick={() => setIsFav(!isFav)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <Heart className={`w-5 h-5 ${isFav ? "fill-secondary text-secondary" : "text-muted-foreground"}`} />
              </button>
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-primary shadow-md" : "border-border opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Product Info ──────────────────────────────── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Nuevo | +{product.reviews} vendidos
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="font-bold text-foreground">{product.rating}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-border"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews})</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-muted/50 rounded-2xl p-5">
              {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through mb-1">
                  {formatCOP(product.originalPrice)}
                </p>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-foreground">
                  {formatCOP(product.price)}
                </span>
                {discountPercent > 0 && (
                  <Badge className="bg-primary text-primary-foreground font-bold text-sm">
                    {discountPercent}% OFF
                  </Badge>
                )}
              </div>
              <p className="text-primary font-semibold text-sm mt-2 flex items-center gap-1">
                ⚡ 12 cuotas de <span className="font-extrabold">{formatCOP(Math.round(product.price / 12))}</span> con tu crédito Entre Amigos
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-foreground mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-bold text-foreground mb-3">Características</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">{product.seller}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {product.location}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Sidebar (Buy box) ────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="sticky top-20 bg-card border border-border rounded-2xl p-6 space-y-5 shadow-xl shadow-primary/5">
              {/* Shipping */}
              {product.freeShipping && (
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm text-primary">Envío gratis</p>
                    <p className="text-xs text-muted-foreground">Llega en 3-5 días hábiles</p>
                  </div>
                </div>
              )}

              {/* Return */}
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-bold text-sm text-foreground">Devolución gratis</p>
                  <p className="text-xs text-muted-foreground">30 días desde que lo recibes</p>
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Stock disponible</span>
                {product.stock && product.stock <= 5 && (
                  <Badge variant="outline" className="text-xs border-secondary text-secondary">
                    ¡Últimas {product.stock} unidades!
                  </Badge>
                )}
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Cantidad</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-lg text-foreground w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    className="w-9 h-9 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-muted-foreground">
                    ({product.stock || 50}+ disponibles)
                  </span>
                </div>
              </div>

              {/* CTA */}
              {/* CTA */}
              <Button
                size="lg"
                onClick={() => {
                  if (!user) {
                    setLoginAction("add_to_cart");
                    setShowLoginModal(true);
                    return;
                  }
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: images[0],
                    quantity: quantity,
                  });
                  toast({
                    title: "Producto agregado",
                    description: `${quantity}x ${product.name} agregado al carrito.`,
                  });
                }}
                className="w-full rounded-2xl h-14 text-base font-extrabold bg-primary hover:bg-teal-dark shadow-lg shadow-primary/25 gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Agregar al carrito
              </Button>

              <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                  if (loginAction === "add_to_cart") {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: images[0],
                      quantity: quantity,
                    });
                    toast({
                      title: "Producto agregado",
                      description: `${quantity}x ${product.name} agregado al carrito.`,
                    });
                  } else if (loginAction === "go_to_cart") {
                    navigate("/cart");
                  }
                  setLoginAction(null);
                }}
              />

              {/* Trust */}
              <div className="pt-4 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span><strong className="text-foreground">Compra protegida.</strong> Recibe el producto que esperabas o te devolvemos tu dinero.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Procesamos tu crédito en minutos</span>
                </div>
              </div>

              {/* Share */}
              <button className="flex items-center gap-2 text-sm text-primary hover:underline mx-auto">
                <Share2 className="w-4 h-4" />
                Compartir
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── Related Products ──────────────────────────────── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold text-foreground mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { navigate(`/marketplace/${p.id}`); window.scrollTo(0, 0); }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted/30">
                    <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-bold shadow-md">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{p.seller}</p>
                    <h3 className="font-semibold text-card-foreground text-sm leading-snug mb-2 line-clamp-2">{p.name}</h3>
                    <span className="text-lg font-extrabold text-foreground">{formatCOP(p.price)}</span>
                    {p.freeShipping && (
                      <div className="flex items-center gap-1 text-primary mt-1">
                        <Truck className="w-3 h-3" />
                        <span className="text-xs font-semibold">Envío gratis</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div >
  );
};

export default ProductDetailPage;
