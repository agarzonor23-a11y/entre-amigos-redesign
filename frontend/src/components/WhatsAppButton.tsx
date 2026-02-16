import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=16208779065&text=Hola,%20quisiera%20recibir%20una%20atenci%C3%B3n%20personalizada.";

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar con María por WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative flex items-center">
        {/* Tooltip */}
        <span className="absolute right-full mr-3 whitespace-nowrap bg-foreground text-background text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
          Habla con María 💬
        </span>

        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[hsl(142,70%,45%)] animate-ping opacity-20" />

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] shadow-xl shadow-[hsl(142,70%,45%)]/30 flex items-center justify-center transition-transform duration-200 hover:scale-110">
          <MessageCircle className="w-7 h-7 text-white fill-white" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
