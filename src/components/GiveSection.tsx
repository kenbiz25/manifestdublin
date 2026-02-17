import { Heart, Building2, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

const GiveSection = () => {
  return (
    <section id="give" className="py-20 bg-secondary/50 text-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary">
            Partner With Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your generosity helps us reach more people, serve our community, and expand God's kingdom.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Tithes & Offerings */}
          <div className="bg-card rounded-xl p-8 text-center border border-border hover:border-accent/40 transition-colors duration-300 shadow-soft">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Tithes & Offerings</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Give your regular tithes and offerings to support the ongoing ministry of our church.
            </p>
            <Button variant="accent" className="w-full" asChild>
              <a href="/get-in-touch">Give Now</a>
            </Button>
          </div>

          {/* Building Fund */}
          <div className="bg-card rounded-xl p-8 text-center border border-border hover:border-accent/40 transition-colors duration-300 shadow-soft">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Building Fund</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Help us expand our facilities to serve more families and grow our community outreach.
            </p>
            <Button variant="accent" className="w-full" asChild>
              <a href="/get-in-touch">Contribute</a>
            </Button>
          </div>

          {/* Missions */}
          <div className="bg-card rounded-xl p-8 text-center border border-border hover:border-accent/40 transition-colors duration-300 shadow-soft">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <HandHeart className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">Missions</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Support our local and global mission partners as they share God's love around the world.
            </p>
            <Button variant="accent" className="w-full" asChild>
              <a href="/get-in-touch">Support Missions</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveSection;
