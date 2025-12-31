import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MinistriesSection from "@/components/MinistriesSection";
import EventsSection from "@/components/EventsSection";
import LiveSection from "@/components/LiveSection";
import GiveSection from "@/components/GiveSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

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
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
