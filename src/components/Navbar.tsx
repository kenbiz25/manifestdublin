import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Ministries", href: "#ministries" },
  { label: "Events", href: "#events" },
  { label: "Live", href: "#live" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll spy logic
      const sections = navItems.map(item => item.href.replace("#", ""));
      sections.push("give", "contact");
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-primary/98 backdrop-blur-md shadow-lg" : "bg-primary/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-2"
          >
            <span className="text-xl md:text-2xl font-display font-bold text-primary-foreground">
              Manifest<span className="text-accent">Dublin</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`nav-link ${activeSection === item.href.replace("#", "") ? "nav-link-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="accent" 
              size="sm" 
              className="rounded-full px-5"
              onClick={() => handleNavClick("#give")}
            >
              Give
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full px-5 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => handleNavClick("#contact")}
            >
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-primary-foreground p-2 hover:bg-primary-foreground/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-6 animate-slide-down">
            <div className="flex flex-col gap-2 pt-4 border-t border-primary-foreground/10">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`nav-link py-3 px-4 rounded-lg hover:bg-primary-foreground/10 ${
                    activeSection === item.href.replace("#", "") ? "bg-primary-foreground/10 nav-link-active" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-primary-foreground/10">
                <Button 
                  variant="accent" 
                  className="w-full rounded-full"
                  onClick={() => handleNavClick("#give")}
                >
                  Give
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => handleNavClick("#contact")}
                >
                  Contact
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
