import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatCOP } from "@/data/marketplace-products";
import { CheckoutModal } from "./CheckoutModal";
import { useState } from "react";

export const CartDrawer = () => {
    const { items, removeFromCart, updateQuantity, total, isOpen, setIsOpen } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);

    return (
        <>
            <CheckoutModal open={showCheckout} onOpenChange={setShowCheckout} />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0 gap-0 border-l border-border bg-card">
                    <SheetHeader className="p-6 border-b border-border">
                        <SheetTitle className="flex items-center gap-2 text-xl font-bold">
                            <ShoppingBag className="w-5 h-5 text-primary" />
                            Tu Carrito
                            <span className="text-sm font-normal text-muted-foreground ml-auto">
                                {items.length} {items.length === 1 ? "producto" : "productos"}
                            </span>
                        </SheetTitle>
                    </SheetHeader>

                    {items.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold">Tu carrito está vacío</h3>
                            <p className="text-muted-foreground text-sm max-w-[200px]">
                                ¡Explora nuestro marketplace y encuentra los mejores productos!
                            </p>
                            <Button onClick={() => setIsOpen(false)} variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/5">
                                Continuar comprando
                            </Button>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 p-6">
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 rounded-lg border border-border overflow-hidden shrink-0 bg-muted/20">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                                                <div>
                                                    <h4 className="font-medium text-sm text-foreground line-clamp-2 leading-snug mb-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="font-bold text-sm text-primary">{formatCOP(item.price)}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center gap-2 border border-border rounded-lg p-0.5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="p-6 border-t border-border bg-muted/10 space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-base font-bold text-foreground">
                                        <span>Total</span>
                                        <span>{formatCOP(total)}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center">
                                        Los costos de envío se calculan en el siguiente paso.
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <Button
                                        onClick={() => {
                                            setIsOpen(false);
                                            setShowCheckout(true);
                                        }}
                                        className="w-full rounded-full h-12 text-base font-bold bg-primary hover:bg-teal-dark shadow-lg shadow-primary/20 gap-2"
                                    >
                                        Proceder al pago <ArrowRight className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full rounded-full h-12 font-medium border-border hover:bg-muted"
                                    >
                                        Seguir comprando
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};
