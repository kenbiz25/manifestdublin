import { useState, useEffect } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Book", href: "/bookings" },
  { label: "Info & Gallery", href: "/info" },
  { label: "Pricing", href: "/pricing" },
  { label: "Checklist", href: "/checklist" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const lightSections = new Set(["about", "ministries", "events", "contact", "info", "pricing", "checklist"]);
  const isLight = lightSections.has(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only run scroll spy on homepage
      if (window.location.pathname !== "/") return;

      const sections = navItems
        .filter(item => item.href.startsWith("#"))
        .map(item => item.href.replace("#", ""));
      sections.push("give");

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
    const path = window.location.pathname;
    if (path === "/") {
      setActiveSection("home");
    } else {
      // Match path to nav item (e.g. "/bookings" -> "bookings")
      const match = navItems.find(item => item.href === path);
      setActiveSection(match ? match.href.replace("/", "") : path.replace("/", ""));
    }
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
    if (!href.startsWith("#")) {
      window.location.href = href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLight
          ? "navbar-light bg-background/90 backdrop-blur-md shadow-lg"
          : isScrolled
            ? "navbar-dark bg-primary/98 backdrop-blur-md shadow-lg"
            : "navbar-dark bg-primary/95 backdrop-blur-sm"
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
            <span className={`text-xl md:text-2xl font-display font-bold ${isLight ? "text-primary" : "text-primary-foreground"}`}>
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
                className={`nav-link ${activeSection === item.href.replace("#", "").replace("/", "") ? "nav-link-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-5"
              asChild
            >
              <a href="/get-in-touch">Contact</a>
            </Button>
            <Button
              variant="accent"
              size="sm"
              className="rounded-full px-5"
              asChild
            >
              <a href={user ? "/dashboard" : "/login"}>
                <LogIn className="mr-1.5 h-4 w-4" />
                {user ? "Dashboard" : "Login"}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isLight ? "text-primary hover:bg-primary/10" : "text-primary-foreground hover:bg-primary-foreground/10"
            }`}
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
                    activeSection === item.href.replace("#", "").replace("/", "") ? "bg-primary-foreground/10 nav-link-active" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-primary-foreground/10">
                <Button
                  variant="outline"
                  className="w-full rounded-full"
                  asChild
                >
                  <a href="/get-in-touch" onClick={() => setIsOpen(false)}>Contact</a>
                </Button>
                <Button
                  variant="accent"
                  className="w-full rounded-full"
                  asChild
                >
                  <a href={user ? "/dashboard" : "/login"} onClick={() => setIsOpen(false)}>
                    <LogIn className="mr-1.5 h-4 w-4" />
                    {user ? "Dashboard" : "Login"}
                  </a>
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
