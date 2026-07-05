const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left column */}
          <div className="space-y-8">
            {/* Intro text */}
            <p className="text-lg leading-relaxed text-foreground">
              Manifest Dublin is a vibrant, multicultural community in the heart
              of Dublin. We believe life was meant to be lived in relationship —
              with each other and with God. Not religion, not rules — just real
              connection. Whether you're exploring faith, looking for community,
              or just want a space to belong — you're welcome here.
            </p>

            {/* Mission & Vision cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-2">Our Mission</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To be a welcoming community where people from all walks of
                  life can experience love, build genuine relationships, and
                  discover what a personal relationship with Jesus looks like —
                  no pressure, no performance.
                </p>
              </div>
              <div className="border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground mb-2">Our Vision</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  To see lives transformed one person, one family, one
                  community at a time. A space that reaches across cultures and
                  generations — bringing hope, healing, and authentic connection
                  to all.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-3">
              <div className="border border-border rounded-2xl p-4 flex-1 text-center">
                <p className="text-2xl font-bold text-green-600">Wed</p>
                <p className="text-sm text-muted-foreground mt-1">Every Week</p>
              </div>
              <div className="border border-border rounded-2xl p-4 flex-1 text-center">
                <p className="text-2xl font-bold text-green-600">7pm</p>
                <p className="text-sm text-muted-foreground mt-1">Doors Open</p>
              </div>
              <div className="border border-border rounded-2xl p-4 flex-1 text-center">
                <p className="text-2xl font-bold text-green-600">All</p>
                <p className="text-sm text-muted-foreground mt-1">Are Welcome</p>
              </div>
            </div>
          </div>

          {/* Right column — image */}
          <div>
            <img
              src="/community.webp"
              alt="Manifest Dublin community gathering"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
