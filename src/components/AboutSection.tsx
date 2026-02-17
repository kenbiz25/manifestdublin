import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="section-heading">About Manifest Dublin</h2>
          <p className="section-subheading">
            We are a vibrant, multicultural church community in Dublin, Ireland,
            committed to manifesting God's love through worship, discipleship,
            and service to our city.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Mission Statement */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-primary mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a welcoming community where people from all walks of life
                can experience the transforming love of Jesus Christ. We believe
                in building genuine relationships, fostering spiritual growth,
                and making a positive impact in Dublin and beyond.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-display font-bold text-primary mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To see Dublin transformed through the Gospel, one life, one
                family, one community at a time. We envision a church that
                reaches across cultures and generations, bringing hope and
                healing to all.
              </p>
            </div>

            <Button variant="accent" className="rounded-full px-6" asChild>
              <a href="/get-in-touch">Get In Touch</a>
            </Button>
          </div>

          {/* Values Grid (temporarily disabled) */}
          {/*
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="card-elevated text-center p-4 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <value.icon className="w-6 h-6 text-foreground" />
                </div>
                <h4 className="font-display font-bold text-primary text-sm mb-1">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;