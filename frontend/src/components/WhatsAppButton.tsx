import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919824370788?text=Hello%20Kalpvan%20Ayurvedashram%2C%20I%20would%20like%20to%20book%20an%20appointment."
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-[#fff] p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
  </a>
);

export default WhatsAppButton;
