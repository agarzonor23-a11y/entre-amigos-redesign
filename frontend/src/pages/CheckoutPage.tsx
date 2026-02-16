import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCOP } from "@/data/marketplace-products";
import { ChevronLeft, MapPin, Store, CreditCard, CheckCircle2, Truck } from "lucide-react";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import Footer from "@/components/landing/Footer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const CheckoutPage = () => {
    const { items, total } = useCart();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [deliveryType, setDeliveryType] = useState("delivery");

    const handlePayment = () => {
        toast({
            title: "¡Compra realizada con éxito!",
            description: "Gracias por tu compra. Te enviaremos los detalles a tu correo.",
            duration: 5000,
        });
        // Here you would typically clear cart and redirect to success page
        setTimeout(() => navigate("/marketplace"), 3000);
    };

    if (items.length === 0) {
        navigate("/marketplace");
        return null;
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16">
                        <button onClick={() => navigate("/cart")} className="shrink-0 flex items-center gap-4">
                            <img src={logoEntreamigos} alt="Entre Amigos" className="h-8 w-auto brightness-0 invert" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="h-16" />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <button onClick={() => navigate("/cart")} className="flex items-center gap-1 text-primary hover:underline font-medium text-sm mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Volver al carrito
                </button>

                <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                    {/* Left Column: Delivery Options */}
                    <div className="space-y-6">
                        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-foreground mb-6">Elige la forma de entrega</h2>

                            <RadioGroup value={deliveryType} onValueChange={setDeliveryType} className="space-y-4">
                                {/* Home Delivery */}
                                <div className={`relative flex items-start space-x-4 rounded-xl border p-4 transition-all ${deliveryType === "delivery" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-muted/50"}`}>
                                    <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                                    <div className="flex-1">
                                        <Label htmlFor="delivery" className="font-bold text-base cursor-pointer block mb-1">
                                            Enviar a domicilio
                                        </Label>
                                        <p className="text-sm text-foreground mb-2">Calle 78b #120-93 - Gran Granada, Bogotá D.C.</p>
                                        <p className="text-xs text-muted-foreground">Residencial</p>
                                    </div>
                                    <span className="text-green-600 font-bold text-sm">Gratis</span>
                                </div>

                                {/* Store Pickup */}
                                <div className={`relative flex items-start space-x-4 rounded-xl border p-4 transition-all ${deliveryType === "pickup" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-muted/50"}`}>
                                    <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
                                    <div className="flex-1">
                                        <Label htmlFor="pickup" className="font-bold text-base cursor-pointer block mb-1">
                                            Retirar en un punto de entrega
                                        </Label>
                                        <p className="text-sm text-foreground mb-2">Agencia Entre Amigos - CALLE 77 119C-07</p>
                                        <p className="text-xs text-muted-foreground">Lu a Vi: 8 a 18 hs. Sá a Do: 9 a 18 hs.</p>
                                    </div>
                                    <span className="text-green-600 font-bold text-sm">Gratis</span>
                                </div>
                            </RadioGroup>

                            <Button variant="link" className="text-primary p-0 h-auto mt-4 font-normal">
                                Modificar domicilio o elegir otro
                            </Button>
                        </div>

                        {/* Payment Method - Simplified */}
                        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm opacity-60 pointer-events-none">
                            <h2 className="text-xl font-bold text-foreground mb-4">Medio de pago</h2>
                            <div className="flex items-center gap-3 p-4 border border-border rounded-xl">
                                <CreditCard className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="font-bold text-foreground">Crédito Entre Amigos</p>
                                    <p className="text-xs text-muted-foreground">Disponible: {formatCOP(1500000)}</p>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="space-y-4">
                        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold text-foreground mb-6">Resumen de compra</h2>

                            <div className="space-y-3 text-sm mb-6 border-b border-border pb-6">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Productos ({items.length})</span>
                                    <span>{formatCOP(total)}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Envío</span>
                                    <span className="text-green-600 font-medium">Gratis</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-xl font-bold text-foreground mb-8">
                                <span>Total</span>
                                <span>{formatCOP(total)}</span>
                            </div>

                            <Button
                                onClick={handlePayment}
                                className="w-full h-12 rounded-xl text-base font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md transition-all gap-2"
                            >
                                Confirmar compra
                            </Button>

                            <p className="text-xs text-muted-foreground text-center mt-4">
                                Al confirmar aceptas nuestros <a href="#" className="underline">Términos y condiciones</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
