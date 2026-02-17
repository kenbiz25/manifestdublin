import { useState, useEffect, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock, Calculator, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { fetchActivePricingRule } from "@/lib/firestore";

interface PricingRule {
  hourly_rate_eur: number;
  full_day_rate_eur: number;
  full_day_hours: number;
  deposit_percent: number;
  discount_threshold: number;
  discount_percent: number;
}

const defaultPricing: PricingRule = {
  hourly_rate_eur: 25,
  full_day_rate_eur: 180,
  full_day_hours: 8,
  deposit_percent: 50,
  discount_threshold: 3,
  discount_percent: 10,
};

const timeSlots = Array.from({ length: 28 }, (_, i) => {
  const hour = Math.floor(i / 2) + 7;
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minutes}`;
});

const Pricing = () => {
  const [pricing, setPricing] = useState<PricingRule>(defaultPricing);
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isFullDay, setIsFullDay] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);

  useEffect(() => {
    async function loadPricing() {
      const data = await fetchActivePricingRule();
      if (data) {
        setPricing({
          hourly_rate_eur: Number(data.hourly_rate_eur),
          full_day_rate_eur: Number(data.full_day_rate_eur),
          full_day_hours: Number(data.full_day_hours),
          deposit_percent: Number(data.deposit_percent),
          discount_threshold: Number(data.discount_threshold ?? 3),
          discount_percent: Number(data.discount_percent ?? 10),
        });
      }
    }
    loadPricing();
  }, []);

  const calculation = useMemo(() => {
    if (!startTime || !endTime) return null;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const hours = (endH + endM / 60) - (startH + startM / 60);

    if (hours <= 0) return null;

    const useFullDay = isFullDay || hours >= pricing.full_day_hours;
    const baseRate = useFullDay ? pricing.full_day_rate_eur : hours * pricing.hourly_rate_eur;

    let totalBeforeDiscount = baseRate * repeatCount;
    let discountAmount = 0;

    // Apply multi-booking discount
    if (repeatCount >= pricing.discount_threshold) {
      const discountedBookings = repeatCount - pricing.discount_threshold + 1;
      discountAmount = (pricing.full_day_rate_eur * discountedBookings * pricing.discount_percent) / 100;
    }

    const subtotal = totalBeforeDiscount - discountAmount;
    const deposit = (subtotal * pricing.deposit_percent) / 100;
    const balance = subtotal - deposit;

    return {
      hours: hours.toFixed(1),
      isFullDay: useFullDay,
      baseRate,
      repeatCount,
      subtotal: totalBeforeDiscount,
      discountAmount,
      total: subtotal,
      deposit,
      balance,
    };
  }, [startTime, endTime, isFullDay, repeatCount, pricing]);

  return (
    <Layout>
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-accent">Pricing</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Get an instant quote for your booking.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div className="bg-card rounded-xl border border-border/50 p-6">
              <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Calculator className="h-5 w-5 text-foreground" />
                Your Booking Details
              </h2>

              <div className="space-y-5">
                {/* Date */}
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Select value={startTime} onValueChange={setStartTime}>
                      <SelectTrigger>
                        <Clock className="mr-2 h-4 w-4 text-foreground" />
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Select value={endTime} onValueChange={setEndTime}>
                      <SelectTrigger>
                        <Clock className="mr-2 h-4 w-4 text-foreground" />
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Full Day Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <Label>Full Day Booking</Label>
                    <p className="text-xs text-muted-foreground">
                      Up to {pricing.full_day_hours} hours at a flat rate
                    </p>
                  </div>
                  <Switch checked={isFullDay} onCheckedChange={setIsFullDay} />
                </div>

                {/* Repeat Bookings */}
                <div className="space-y-2">
                  <Label>Number of Bookings</Label>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    value={repeatCount}
                    onChange={(e) => setRepeatCount(Math.max(1, Math.min(10, Number(e.target.value))))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Book {pricing.discount_threshold}+ times for {pricing.discount_percent}% off each additional day!
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Display */}
            <div className="bg-primary/5 rounded-xl border border-primary/20 p-6">
              <h2 className="font-display text-xl font-semibold mb-6">
                Your Quote
              </h2>

              {calculation ? (
                <div className="space-y-4">
                  {/* Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{calculation.hours} hours {calculation.isFullDay && "(Full Day)"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {calculation.isFullDay ? "Full Day Rate" : "Hourly Rate"} × {calculation.repeatCount}
                      </span>
                      <span>€{calculation.subtotal.toFixed(2)}</span>
                    </div>
                    {calculation.discountAmount > 0 && (
                      <div className="flex justify-between text-accent">
                        <span>Multi-booking Discount</span>
                        <span>-€{calculation.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>€{calculation.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="bg-background rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deposit (50%, refundable)</span>
                      <span className="font-semibold text-primary">€{calculation.deposit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Balance due on arrival</span>
                      <span>€{calculation.balance.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    <Send className="mr-2 h-4 w-4" />
                    Request This Booking
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>Select your times to see pricing</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Info */}
          <div className="max-w-2xl mx-auto mt-12 text-center text-sm text-muted-foreground">
            <p>
              <strong>Current Rates:</strong> €{pricing.hourly_rate_eur}/hour or €{pricing.full_day_rate_eur} for a full day 
              (up to {pricing.full_day_hours} hours). Deposit is {pricing.deposit_percent}% of the total, fully refundable.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
