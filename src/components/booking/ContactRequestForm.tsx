import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Send, CheckCircle2, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createContactRequest, fetchBookedDates } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().max(20).optional(),
  requestedDate: z.date({ required_error: "Please select a date" }),
  startTime: z.string().min(1, "Please select a start time"),
  endTime: z.string().min(1, "Please select an end time"),
  purpose: z.string().max(500).optional(),
  isFlexible: z.boolean().default(false),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  gdprConsent: z.boolean().refine((val) => val === true, {
    message: "You must consent to data processing",
  }),
}).refine((data) => {
  const start = data.startTime;
  const end = data.endTime;
  return start < end;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
});

type FormValues = z.infer<typeof formSchema>;

const timeSlots = Array.from({ length: 28 }, (_, i) => {
  const hour = Math.floor(i / 2) + 7;
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, "0")}:${minutes}`;
});

export function ContactRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      purpose: "",
      isFlexible: false,
      agreedToTerms: false,
      gdprConsent: false,
    },
  });

  // Fetch booked dates to grey them out on the calendar
  useEffect(() => {
    fetchBookedDates()
      .then((dates) => setBookedDates(new Set(dates)))
      .catch(console.error);
  }, []);

  // Pre-fill contact fields when user is logged in
  useEffect(() => {
    if (user) {
      if (user.displayName) form.setValue("name", user.displayName);
      if (user.email) form.setValue("email", user.email);
      if (user.phoneNumber) form.setValue("phone", user.phoneNumber);
    }
  }, [user, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      await createContactRequest({
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        requested_date: format(values.requestedDate, "yyyy-MM-dd"),
        start_time: values.startTime,
        end_time: values.endTime,
        purpose: values.purpose || null,
        is_flexible: values.isFlexible,
        agreed_to_terms: values.agreedToTerms,
        gdpr_consent: values.gdprConsent,
      });

      setIsSubmitted(true);
      toast({
        title: "Request submitted!",
        description: "We'll review your request and get back to you shortly.",
      });
    } catch (error) {
      console.error("Error submitting request:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-12 px-6 bg-accent/10 rounded-xl animate-scale-in">
        <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
        <h3 className="font-display text-2xl font-semibold mb-2">
          Thank You!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We've received your booking request. We'll review it and get back to you 
          within 24 hours to confirm your reservation.
        </p>
        <Button 
          variant="outline" 
          className="mt-6"
          onClick={() => {
            setIsSubmitted(false);
            form.reset();
          }}
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Auth status banner */}
        {user ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 text-sm">
            <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
            <span>Signed in as <strong>{user.displayName || user.email}</strong> — your details have been filled in.</span>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-muted text-sm">
            <span className="text-muted-foreground">Have an account? Sign in to auto-fill your details.</span>
            <a href="/login" className="inline-flex items-center gap-1 text-accent hover:underline font-medium shrink-0">
              <LogIn className="h-3.5 w-3.5" />
              Sign in
            </a>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+353 1 234 5678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestedDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Desired Date *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "EEEE, MMMM do, yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      if (date < new Date()) return true;
                      const dateStr = format(date, "yyyy-MM-dd");
                      return bookedDates.has(dateStr);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-gray-50 text-foreground pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      {...field}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground" />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-gray-50 text-foreground pl-10 pr-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      {...field}
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose / Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your event or booking purpose..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Help us understand your needs so we can best accommodate you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isFlexible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-normal">
                  I'm flexible with times
                </FormLabel>
                <FormDescription>
                  Let us know if alternative times might also work for you.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="space-y-4 pt-4 border-t border-border">
          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    I agree to the terms and conditions *
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gdprConsent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    I consent to the processing of my personal data *
                  </FormLabel>
                  <FormDescription>
                    Your data will only be used to process your booking request.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Submit Booking Request
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
