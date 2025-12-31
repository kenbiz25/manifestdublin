import { Instagram, Youtube, Whatsapp, Spotify } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/church-hero.jpg";

const Hero = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

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
              onClick={() => handleScroll("#contact")}
            >
              Plan Your Visit
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 text-base font-semibold border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => handleScroll("#give")}
            >
              Give
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
            className="text-primary-foreground/70 hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram size={26} />
          </a>
          <a
            href="https://youtube.com/@manifestdublin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            aria-label="YouTube"
          >
            <Youtube size={28} />
          </a>
          <a
            href="https://chat.whatsapp.com/LhrpT6i2BluJRYkZBumOY5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            aria-label="Whatsapp"
          >
            <Whatsapp size={26} />
          </a>
           <a
            href="https://open.spotify.com/show/4xo1iU8MMNe6Ng1ZmUcTpp?si=PoLq4JLeRSGL0KUWYs4YwA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/70 hover:text-primary-foreground hover:scale-110 transition-all duration-300"
            aria-label="Whatsapp"
          >
            <spotify size={26} />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block"
          aria-hidden="true"
        >
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
