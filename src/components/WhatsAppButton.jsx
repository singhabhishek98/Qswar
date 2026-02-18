export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+919044448020?text=Hey%20there!%20Let%27s%20connect."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-8 md:bottom-20 md:right-8 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg z-1000 cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(37,211,102,0.8)] animate-whatsapp-pulse"
    >
      <i className="fab fa-whatsapp text-white text-2xl md:text-3xl"></i>
    </a>
  )
}
