import { Layout } from "@/components/layout/Layout";
import { ContactRequestForm } from "@/components/booking/ContactRequestForm";
import { MapPin, Clock, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-10 md:py-14 overflow-hidden">
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              Book a {" "}
              <span className="text-accent">Space</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Perfect for workshops, meetings, creative sessions, and gatherings of all kinds.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-4 md:grid-cols-3 max-w-3xl mx-auto mb-10">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="p-2 rounded-full bg-primary/5">
                <MapPin className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Central Dublin</p>
                <p className="text-xs text-muted-foreground">Easy access</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="p-2 rounded-full bg-primary/5">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Flexible Hours</p>
                <p className="text-xs text-muted-foreground">7am – 9pm</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50">
              <div className="p-2 rounded-full bg-primary/5">
                <Sparkles className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Fully Equipped</p>
                <p className="text-xs text-muted-foreground">Everything you need</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
                Fill in Your <span className="text-accent">Details</span>
              </h2>
              <p className="text-muted-foreground">
                We'll get back to you within 24 hours to confirm your booking.
              </p>
            </div>

            <div className="bg-background rounded-xl shadow-card p-6 md:p-8 border border-border/50">
              <ContactRequestForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
