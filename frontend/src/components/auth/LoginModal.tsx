import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import logoEntreamigos from "@/assets/logo-entreamigos.png";
import { Loader2 } from "lucide-react";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLoginSuccess?: () => void;
}

export function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
    const { signIn, signUp } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let result;
            if (isRegistering) {
                result = await signUp(email, password, name, phone, address);
            } else {
                result = await signIn(email, password);
            }

            if (result.error) {
                setError(result.error);
            } else {
                if (onLoginSuccess) onLoginSuccess();
                onClose();
            }
        } catch (err) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setError("");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md rounded-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex flex-col items-center text-center space-y-4 pt-4">
                    <img src={logoEntreamigos} alt="Entre Amigos" className="h-10 w-auto" />
                    <DialogTitle className="text-2xl font-bold">
                        {isRegistering ? "Crea tu cuenta" : "Inicia sesión"}
                    </DialogTitle>
                    <DialogDescription>
                        {isRegistering
                            ? "Completa tus datos para registrarte y empezar a comprar."
                            : "Ingresa a tu cuenta para agregar productos al carrito y realizar compras."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {isRegistering && (
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre completo</Label>
                            <Input
                                id="name"
                                placeholder="Juan Pérez"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="rounded-xl"
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@correo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    {isRegistering && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input
                                    id="phone"
                                    placeholder="300 123 4567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Dirección</Label>
                                <Input
                                    id="address"
                                    placeholder="Calle 123 # 45-67"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    className="rounded-xl"
                                />
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="rounded-xl"
                        />
                    </div>

                    {error && <p className="text-sm text-destructive text-center">{error}</p>}

                    <div className="pt-2">
                        <Button type="submit" className="w-full rounded-xl font-bold h-11" disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? "Registrarse" : "Iniciar Sesión")}
                        </Button>
                    </div>

                    <div className="text-center text-xs text-muted-foreground pt-4 border-t">
                        <p>
                            {isRegistering ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
                            <button type="button" onClick={toggleMode} className="text-primary hover:underline font-bold">
                                {isRegistering ? "Inicia sesión aquí" : "Regístrate aquí"}
                            </button>
                        </p>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
