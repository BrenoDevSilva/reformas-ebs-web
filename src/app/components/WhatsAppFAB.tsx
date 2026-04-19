import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  const handleWhatsAppClick = () => {
    window.open(
      "https://wa.me/5511987850672?text=Olá! Gostaria de solicitar um orçamento.",
      "_blank"
    );
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="text-white" size={28} />
    </button>
  );
}
