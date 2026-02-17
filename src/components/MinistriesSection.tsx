
import { Baby, Users, Music, Globe, Heart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const ministries = [
  
  {
    icon: Music,
    title: "Worship",
    description: "Creating an atmosphere of authentic worship where we encounter God's presence together.",
  },
  
  {
    icon: Heart,
    title: "Care",
    description: "Providing pastoral support, prayer, and practical help to those in need.",
  },
 
];

const MinistriesSection = () => {
  return (
    <section id="ministries" className="section-padding bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Our Ministries</h2>
          <p className="section-subheading">
            Discover how you can connect, grow, and serve through our various ministry groups.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <div 
              key={ministry.title}
              className="card-elevated group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 shrink-0 bg-primary/5 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-105 transition-all duration-300">
                  <ministry.icon className="w-7 h-7 text-foreground group-hover:text-accent-foreground transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-primary text-lg mb-2">{ministry.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{ministry.description}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-accent font-semibold text-sm"
                    asChild
                  >
                    <a href="/get-in-touch">Get Involved →</a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
