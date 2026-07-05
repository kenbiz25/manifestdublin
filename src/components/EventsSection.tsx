import { Clock, MapPin, MessageCircle } from "lucide-react";

const EventsSection = () => {
  return (
    <section id="events" className="section-padding bg-muted/40">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-green-600 text-xs font-semibold uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-green-600" />
            Join Us
            <span className="inline-block w-8 h-px bg-green-600" />
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
            Our <span className="text-green-600">Weekly Gathering</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            No dress code, no expectations — just good people and good vibes. Come as you are.
          </p>
        </div>

        {/* Card + Map side by side */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">

          {/* Event card */}
          <div className="bg-background rounded-2xl p-8 shadow-soft flex flex-col gap-5">
            {/* Icon */}
            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>

            {/* Label */}
            <p className="text-green-600 text-xs font-semibold uppercase tracking-[0.15em]">
              Every Wednesday
            </p>

            {/* Title & time */}
            <div>
              <h3 className="font-display font-bold text-foreground text-2xl mb-2">
                Midweek Fellowship
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>7:00 PM</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed">
              A space to unwind, connect, and recharge midweek. Expect good
              conversations, live worship music, and people who actually want to
              get to know you. Whether you're exploring faith or just looking for
              community — there's a seat for you.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-green-600 text-sm pt-2 border-t border-border">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>67A Pearse Street, Dublin 2</span>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-soft min-h-[360px]">
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
      </div>
    </section>
  );
};

export default EventsSection;
