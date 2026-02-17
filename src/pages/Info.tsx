import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  MapPin,
  Clock,
  Users,
  Wifi,
  Monitor,
  Coffee,
  Image,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface GalleryRoom {
  label: string;
  description: string;
  images: { alt: string }[];
}

const galleryRooms: GalleryRoom[] = [
  {
    label: "Main Hall",
    description:
      "A spacious hall perfect for large gatherings, conferences, and community events. Seats up to 50 people.",
    images: [
      { alt: "Main hall — front view" },
      { alt: "Main hall — seating arrangement" },
      { alt: "Main hall — stage area" },
      { alt: "Main hall — side view" },
    ],
  },
  {
    label: "Meeting Room",
    description:
      "A cosy meeting room ideal for small group sessions, interviews, and planning meetings.",
    images: [
      { alt: "Meeting room — table setup" },
      { alt: "Meeting room — whiteboard area" },
      { alt: "Meeting room — window view" },
    ],
  },
  {
    label: "Worship Space",
    description:
      "A peaceful, purpose-built worship area for services, prayer groups, and spiritual gatherings.",
    images: [
      { alt: "Worship space — main area" },
      { alt: "Worship space — altar view" },
      { alt: "Worship space — seating" },
    ],
  },
  {
    label: "Kitchen",
    description:
      "Fully equipped kitchen with tea & coffee facilities, fridge, microwave, and ample counter space.",
    images: [
      { alt: "Kitchen — overview" },
      { alt: "Kitchen — appliances" },
      { alt: "Kitchen — counter area" },
    ],
  },
  {
    label: "Entrance",
    description:
      "A welcoming entrance and reception area with seating for guests.",
    images: [
      { alt: "Entrance — main door" },
      { alt: "Entrance — reception desk" },
    ],
  },
  {
    label: "Outdoor Area",
    description:
      "A small outdoor space for breaks and informal gatherings.",
    images: [
      { alt: "Outdoor area — overview" },
      { alt: "Outdoor area — seating" },
    ],
  },
];

const amenities = [
  { icon: Wifi, label: "Free Wi-Fi", description: "High-speed broadband" },
  { icon: Monitor, label: "Projector & Screen", description: "For presentations" },
  { icon: Coffee, label: "Kitchen Access", description: "Tea & coffee facilities" },
  { icon: Users, label: "Seats up to 50", description: "Flexible seating" },
  { icon: Clock, label: "Flexible Hours", description: "7am – 9pm daily" },
  { icon: MapPin, label: "Central Location", description: "O'Connell Street, Dublin" },
];

const Info = () => {
  const [selectedRoom, setSelectedRoom] = useState<GalleryRoom | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function openLightbox(room: GalleryRoom) {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  }

  function closeLightbox() {
    setSelectedRoom(null);
    setCurrentImageIndex(0);
  }

  function nextImage() {
    if (!selectedRoom) return;
    setCurrentImageIndex((prev) =>
      prev < selectedRoom.images.length - 1 ? prev + 1 : 0
    );
  }

  function prevImage() {
    if (!selectedRoom) return;
    setCurrentImageIndex((prev) =>
      prev > 0 ? prev - 1 : selectedRoom.images.length - 1
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Info & <span className="text-accent">Gallery</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about our space. Click any image
              to explore the room and book it for your next event.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto mb-12">
            {galleryRooms.map((room, i) => (
              <button
                key={room.label}
                type="button"
                onClick={() => openLightbox(room)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 border border-border cursor-pointer text-left animate-fade-in focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-accent/10">
                  <Image className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">{room.label}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-white font-display font-semibold text-lg">
                    {room.label}
                  </span>
                  <span className="text-white/80 text-xs mt-1">
                    Click to view {room.images.length} photos
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedRoom} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          {selectedRoom && (
            <>
              {/* Image carousel area */}
              <div className="relative bg-gray-100 aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
                {/* Placeholder image */}
                <div className="flex flex-col items-center justify-center text-center px-6 sm:px-8">
                  <Image className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm">
                    {selectedRoom.images[currentImageIndex].alt}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">
                    {currentImageIndex + 1} / {selectedRoom.images.length}
                  </p>
                </div>

                {/* Navigation arrows */}
                {selectedRoom.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {selectedRoom.images.length > 1 && (
                <div className="flex gap-2 px-4 sm:px-6 pt-3 sm:pt-4 overflow-x-auto">
                  {selectedRoom.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`shrink-0 w-16 h-12 rounded-md border-2 overflow-hidden flex items-center justify-center transition-colors ${
                        idx === currentImageIndex
                          ? "border-accent bg-accent/10"
                          : "border-gray-200 bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      <Image className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              )}

              {/* Room info + CTA */}
              <div className="px-6 pb-6 pt-4">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">
                    {selectedRoom.label}
                  </DialogTitle>
                  <DialogDescription className="text-foreground text-base mt-2">
                    {selectedRoom.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="flex gap-3 mt-6">
                  <Button variant="accent" className="rounded-full" asChild>
                    <a href="/bookings">Book This Room</a>
                  </Button>
                  <Button variant="outline" className="rounded-full" onClick={closeLightbox}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Amenities */}
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
              What's <span className="text-accent">Included</span>
            </h2>
            <p className="text-muted-foreground text-base">
              Our space comes fully equipped so you can focus on what matters.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {amenities.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl bg-white border border-border hover:border-accent/40 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-primary/5 shrink-0">
                  <item.icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-3">
            Ready to <span className="text-accent">Book?</span>
          </h2>
          <p className="text-foreground mb-6 max-w-lg mx-auto">
            Our space is waiting for you. Book now and make your event a reality.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="accent" className="rounded-full" asChild>
              <a href="/bookings">Book Now</a>
            </Button>
            <Button variant="outline" className="rounded-full" asChild>
              <a href="/get-in-touch">Get In Touch</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Info;
