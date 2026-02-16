import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCOP } from "@/data/marketplace-products";
import { Minus, Plus, Trash2, ArrowRight, ChevronLeft, Search, Wallet, ShoppingBag } from "lucide-react";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { LoginModal } from "@/components/auth/LoginModal";
import { useState } from "react";
import { UserCircle } from "lucide-react";

const CartPage = () => {
    const { items, removeFromCart, updateQuantity, total } = useCart();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header (Simplified Marketplace Header) */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 h-16">
                        <button onClick={() => navigate("/marketplace")} className="shrink-0">
                            <img src={logoEntreamigos} alt="Entre Amigos" className="h-8 w-auto brightness-0 invert" />
                        </button>
                        <div className="relative flex-1 max-w-xl hidden md:block">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar productos..."
                                className="pl-10 h-10 rounded-full bg-primary-foreground border-none text-sm text-foreground"
                                onFocus={() => navigate("/marketplace")}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-16" />

            {/* Breadcrumb / Back */}
            <div className="bg-background border-b border-border mb-8">
                <div className="container mx-auto px-4 py-3">
                    <button onClick={() => navigate("/marketplace")} className="flex items-center gap-1 text-primary hover:underline font-medium text-sm">
                        <ChevronLeft className="w-4 h-4" />
                        Volver al Marketplace
                    </button>
                </div>
            </div>

            {/* Content */}
            {!user ? (
                <div className="container mx-auto px-4 py-20">
                    <div className="max-w-md mx-auto text-center bg-card rounded-3xl border border-border p-8 shadow-xl">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserCircle className="w-10 h-10 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-3">Inicia sesión</h2>
                        <p className="text-muted-foreground mb-8">
                            Para ver tu carrito y realizar compras, necesitas ingresar a tu cuenta.
                        </p>
                        <Button
                            onClick={() => setShowLoginModal(true)}
                            className="w-full rounded-xl font-bold h-12 text-base"
                        >
                            Iniciar Sesión / Registrarse
                        </Button>
                        <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 pb-20">
                    {items.length === 0 ? (
                        <div className="max-w-2xl mx-auto text-center py-20 bg-card rounded-2xl border border-border">
                            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Tu carrito está vacío</h2>
                            <p className="text-muted-foreground mb-8">¿No sabes qué comprar? ¡Miles de productos te esperan!</p>
                            <Button onClick={() => navigate("/marketplace")} className="rounded-full px-8">
                                Ver productos
                            </Button>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-6xl mx-auto">
                            {/* Cart Items List */}
                            <div className="space-y-4">
                                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                                    <h1 className="text-xl font-bold text-foreground mb-6">Productos ({items.length})</h1>

                                    <div className="space-y-6">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 sm:gap-6 pb-6 border-b border-border last:border-0 last:pb-0">
                                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg border border-border overflow-hidden shrink-0 bg-muted/20">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                    <div className="flex justify-between items-start gap-4">
                                                        <h3 className="font-medium text-foreground text-sm sm:text-base line-clamp-2 leading-snug">
                                                            {item.name}
                                                        </h3>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                                            title="Eliminar"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex items-center gap-1 border border-border rounded-lg p-0.5 bg-background">
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors disabled:opacity-50"
                                                                >
                                                                    <Minus className="w-3.5 h-3.5" />
                                                                </button>
                                                                <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                    className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                                                >
                                                                    <Plus className="w-3.5 h-3.5" />
                                                                </button>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground hidden sm:inline-block">
                                                                {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                                                            </span>
                                                        </div>

                                                        <div className="text-right">
                                                            {item.quantity > 1 && (
                                                                <p className="text-xs text-muted-foreground mb-0.5">
                                                                    {formatCOP(item.price)} c/u
                                                                </p>
                                                            )}
                                                            <p className="font-bold text-lg text-foreground">
                                                                {formatCOP(item.price * item.quantity)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-card rounded-2xl border border-border p-4 flex items-center justify-between shadow-sm">
                                    <span className="font-medium text-foreground text-sm">Envío</span>
                                    <span className="text-green-600 font-bold text-sm">Gratis</span>
                                </div>
                            </div>

                            {/* Summary Sidebar */}
                            <div className="space-y-4">
                                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
                                    <h2 className="text-lg font-bold text-foreground mb-6">Resumen de compra</h2>

                                    <div className="space-y-3 text-sm mb-6">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Productos ({items.length})</span>
                                            <span>{formatCOP(total)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Envío</span>
                                            <span className="text-green-600 font-medium">Gratis</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-lg font-bold text-foreground border-t border-border pt-4 mb-6">
                                        <span>Total</span>
                                        <span>{formatCOP(total)}</span>
                                    </div>

                                    <Button
                                        onClick={() => navigate("/checkout")}
                                        className="w-full h-12 rounded-xl text-base font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md transition-all"
                                    >
                                        Continuar compra
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                </div>
    )
}

<Footer />
        </div >
    );
};

export default CartPage;
