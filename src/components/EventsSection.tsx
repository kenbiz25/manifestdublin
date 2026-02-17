import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const weeklyEvents = [
  {
    day: "Wednesday",
    title: "Midweek Fellowship",
    time: "7:00 PM",
    description: "Intercession and Bible study",
    icon: "📖",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Join Us This Week</h2>
          <p className="section-subheading">
            We'd love to have you join us for worship and fellowship.
          </p>
        </div>

        {/* Weekly Events Cards */}
        <div className="grid md:grid-cols-1 gap-6 mb-8">
          {weeklyEvents.map((event, index) => (
            <div 
              key={event.day}
              className="card-elevated text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{event.icon}</div>
              <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">{event.day}</p>
              <h3 className="font-display font-bold text-primary text-xl mb-2">{event.title}</h3>
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm mb-3">
                <Clock className="w-4 h-4" />
                <span>{event.time}</span>
              </div>
              <p className="text-muted-foreground text-sm">{event.description}</p>
            </div>
          ))}
        </div>

        {/* Map Embed */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="rounded-xl overflow-hidden shadow-soft h-[280px]">
            <iframe
              title="Manifest Dublin Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.980536888879!2d-6.245929900000001!3d53.3436046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9232a0fccb%3A0x91976fea0db66ac6!2s67a%20Pearse%20St%2C%20Dublin%2C%20D02%20WD62%2C%20Ireland!5e0!3m2!1sen!2ske!4v1767213417516!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button 
            variant="accent" 
            className="rounded-full px-8"
            asChild
          >
            <a href="/get-in-touch">Join an Event</a>
          </Button>
        </div>

        {/* Location Info */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-foreground" />
            <span>1 O'Connell Street Lower, North City, Dublin, Ireland</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
