
import { useState, useRef, useEffect } from "react";
import { Play, ExternalLink, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiveSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-load when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const channelEmbedSrc =
    "https://www.youtube.com/embed/videoseries?list=PLb6_Z1jJm9But117oQnAMGDnnTeWnqRCh";

  return (
    <section id="live" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Watch Previous Services
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Can't join us in person? Watch our live stream every Wednesday at 6:30 PM (GMT)
            or catch up on previous services anytime.
          </p>
        </div>

        {/* Video Container */}
        <div ref={containerRef} className="max-w-4xl mx-auto mb-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-navy-dark">
            {isVisible ? (
              <iframe
                src={channelEmbedSrc}
                title="Manifest Dublin videos"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-navy-dark">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-accent" />
                  </div>
                  <p className="text-primary-foreground/70">Loading…</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="accent" size="lg" className="rounded-full px-8" asChild>
            <a
              href="https://www.youtube.com/@ManifestDublin/videos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Watch on YouTube
            </a>
          </Button>
          <Button variant="accent" size="lg" className="rounded-full px-8" asChild>
            <a
              href="https://linktr.ee/manifestdublin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Linktree
            </a>
          </Button>
          
        </div>

        {/* Schedule Info */}
        <p className="text-center text-primary-foreground/60 text-sm mt-8">
          Live stream available every Sunday from 10:30 AM GMT • Previous services available on our YouTube channel
        </p>
      </div>
    </section>
  );
};

export default LiveSection;
