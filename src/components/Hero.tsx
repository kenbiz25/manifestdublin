import { FaInstagram, FaYoutube, FaWhatsapp, FaSpotify } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const heroImage = "/Manifest.jpeg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Center Soft Blur */}
      <div className="absolute inset-0 hero-soften" />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Tag */}
          <p 
            className="text-accent font-semibold text-sm md:text-base tracking-widest uppercase mb-6 animate-fade-up opacity-0" 
            style={{ animationDelay: "0.2s" }}
          >
            Welcome to Manifest Dublin Church
          </p>
          
          {/* Main Heading */}
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary-foreground mb-6 leading-tight tracking-tight animate-fade-up opacity-0" 
            style={{ animationDelay: "0.4s" }}
          >
            WELCOME TO
            <span className="block">MANIFESTDUBLIN</span>
          </h1>
          
          {/* Subheading */}
          <p 
            className="text-primary-foreground/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up opacity-0" 
            style={{ animationDelay: "0.6s" }}
          >
            Join our vibrant community as we worship, grow, and serve together in the heart of Dublin. 
            Everyone is welcome here.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0" 
            style={{ animationDelay: "0.8s" }}
          >
            <Button 
              variant="accent" 
              size="lg" 
              className="rounded-full px-8 text-base font-semibold"
              asChild
            >
              <a href="/get-in-touch">Plan Your Visit</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 text-base font-semibold"
              asChild
            >
              <a href="/get-in-touch">Give</a>
            </Button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div 
          className="mt-16 flex items-center justify-center gap-8 animate-fade-up opacity-0" 
          style={{ animationDelay: "1s" }}
        >
          <a
            href="https://instagram.com/manifestdublin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-[#E4405F] hover:scale-110 transition-all duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href="https://youtube.com/@manifestdublin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-[#FF0000] hover:scale-110 transition-all duration-300"
            aria-label="YouTube"
          >
            <FaYoutube size={34} />
          </a>
          <a
            href="https://chat.whatsapp.com/LhrpT6i2BluJRYkZBumOY5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-[#25D366] hover:scale-110 transition-all duration-300"
            aria-label="Whatsapp"
          >
            <FaWhatsapp size={32} />
          </a>
           <a
            href="https://open.spotify.com/show/4xo1iU8MMNe6Ng1ZmUcTpp?si=PoLq4JLeRSGL0KUWYs4YwA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-[#1DB954] hover:scale-110 transition-all duration-300"
            aria-label="Whatsapp"
          >
            <FaSpotify size={32} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Hero;
