import { useState } from "react";
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const weeklyEvents = [
  {
    day: "Sunday",
    title: "Sunday Service",
    time: "10:30 AM",
    description: "Join us for worship, prayer, and teaching",
    icon: "🙏",
  },
  {
    day: "Wednesday",
    title: "Midweek Prayer",
    time: "7:00 PM",
    description: "Intercession and Bible study",
    icon: "📖",
  },
  {
    day: "Saturday",
    title: "Youth Night",
    time: "6:00 PM",
    description: "Fellowship and fun for teenagers",
    icon: "🎉",
  },
];

const upcomingEvents = [
  { date: 5, title: "Sunday Service", time: "10:30 AM" },
  { date: 8, title: "Midweek Prayer", time: "7:00 PM" },
  { date: 11, title: "Youth Night", time: "6:00 PM" },
  { date: 12, title: "Sunday Service", time: "10:30 AM" },
  { date: 15, title: "Worship Night", time: "7:30 PM" },
  { date: 19, title: "Sunday Service", time: "10:30 AM" },
  { date: 22, title: "Community Outreach", time: "11:00 AM" },
  { date: 26, title: "Sunday Service", time: "10:30 AM" },
];

const EventsSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const hasEvent = (day: number) => {
    return upcomingEvents.find(event => event.date === day);
  };

  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Manifest Dublin//EN
BEGIN:VEVENT
DTSTART:20250105T103000
DTEND:20250105T123000
SUMMARY:Sunday Service - Manifest Dublin
LOCATION:1 O'Connell Street Lower, Dublin, Ireland
DESCRIPTION:Join us for worship, prayer, and teaching
END:VEVENT
END:VCALENDAR`;
    
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'manifest-dublin-service.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        <div className="grid md:grid-cols-3 gap-6 mb-16">
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

        {/* Calendar */}
        <div className="max-w-3xl mx-auto">
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-bold text-primary text-xl flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming Events
              </h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={goToPrevMonth}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-semibold min-w-[140px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <button 
                  onClick={goToNextMonth}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-6">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDay }, (_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const event = hasEvent(day);
                return (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center rounded-lg text-sm relative ${
                      event 
                        ? "bg-accent text-accent-foreground font-semibold cursor-pointer hover:brightness-110 transition-all" 
                        : "hover:bg-secondary transition-colors"
                    }`}
                    title={event ? `${event.title} - ${event.time}` : undefined}
                  >
                    {day}
                    {event && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-foreground rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Event List */}
            <div className="border-t border-border pt-4 space-y-2">
              {upcomingEvents.slice(0, 4).map((event, index) => (
                <div key={index} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-accent font-bold text-sm">{event.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary text-sm">{event.title}</p>
                    <p className="text-muted-foreground text-xs">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border">
              <Button 
                variant="outline" 
                className="flex-1 rounded-full"
                onClick={generateICS}
              >
                <Download className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
              <Button 
                variant="accent" 
                className="flex-1 rounded-full"
                onClick={() => handleScroll("#contact")}
              >
                Join an Event
              </Button>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-accent" />
            <span>1 O'Connell Street Lower, North City, Dublin, Ireland</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
