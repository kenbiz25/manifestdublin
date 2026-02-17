import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import LiveSection from "@/components/LiveSection";
import GiveSection from "@/components/GiveSection";
import Footer from "@/components/Footer";
import { FaWhatsapp } from "react-icons/fa";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <MinistriesSection />
      <EventsSection />
      <LiveSection />
      <GiveSection />
      <Footer />

      <a
        href="https://chat.whatsapp.com/LhrpT6i2BluJRYkZBumOY5"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1DB954] focus:outline-none focus:ring-2 focus:ring-white/70"
        aria-label="Connect with us on WhatsApp"
        title="Connect with us"
      >
        <FaWhatsapp className="h-5 w-5" />
        <span>Connect with us</span>
      </a>
    </div>
  );
};

export default Index;
