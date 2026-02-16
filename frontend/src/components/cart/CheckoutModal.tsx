import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/CartContext";
import { formatCOP } from "@/data/marketplace-products";
import { CreditCard, CheckCircle2 } from "lucide-react";

interface CheckoutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
    const { items, total } = useCart();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card border-border">
                <DialogHeader className="p-6 pb-2 bg-muted/30">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                        Resumen de tu pedido
                    </DialogTitle>
                    <DialogDescription className="text-base text-muted-foreground">
                        Estás a un paso de completar tu compra con Entre Amigos.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="max-h-[300px] p-6 py-2">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-start gap-4 py-3 border-b border-border/50 last:border-0">
                                <div className="w-16 h-16 rounded-lg border border-border overflow-hidden shrink-0 bg-muted/20">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                                        {item.name}
                                    </h4>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-xs text-muted-foreground">
                                            Cant: <span className="font-semibold text-foreground">{item.quantity}</span>
                                        </span>
                                        <span className="font-bold text-sm text-primary">
                                            {formatCOP(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-6 bg-muted/30 border-t border-border space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-border/50">
                        <span className="text-lg font-bold text-foreground">Total a pagar</span>
                        <span className="text-2xl font-extrabold text-primary">{formatCOP(total)}</span>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full h-12 rounded-xl text-base font-bold bg-primary hover:bg-teal-dark shadow-lg shadow-primary/20 gap-2">
                            <CreditCard className="w-5 h-5" />
                            Pagar con Crédito Entre Amigos
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="w-full h-10 rounded-xl"
                        >
                            Cancelar
                        </Button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground mt-2">
                        Al continuar aceptas nuestros términos y condiciones.
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};
