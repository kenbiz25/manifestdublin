import { useState, useRef, useEffect } from "react";
import { Play, ExternalLink, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiveSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load the iframe when it comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="live" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4">
            Watch Live & Previous Services
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Can't join us in person? Watch our live stream every Sunday at 10:30 AM (GMT) 
            or catch up on previous services anytime.
          </p>
        </div>

        {/* Video Container */}
        <div 
          ref={containerRef}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-navy-dark">
            {isLoaded ? (
              <iframe
                ref={iframeRef}
                src="https://www.youtube.com/embed/live_stream?channel=UCmanifestdublin&autoplay=1&mute=1&playsinline=1"
                title="Manifest Dublin Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-navy-dark">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-accent" />
                  </div>
                  <p className="text-primary-foreground/70">Loading video...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="accent" 
            size="lg" 
            className="rounded-full px-8"
            asChild
          >
            <a 
              href="https://youtube.com/@manifestdublin" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Watch on YouTube
            </a>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            asChild
          >
            <a 
              href="https://linktr.ee/manifestdublin" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Link2 className="w-4 h-4 mr-2" />
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
