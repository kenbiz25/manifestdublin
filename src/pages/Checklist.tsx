import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, ClipboardCheck, Send } from "lucide-react";
import { createChecklistSubmission } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

const checklistItems = {
  before: [
    { id: "arrived_on_time", label: "Arrived on time" },
    { id: "access_ok", label: "Access was straightforward" },
    { id: "space_as_expected", label: "Space was as expected" },
  ],
  during: [
    { id: "respected_noise", label: "Respected noise levels" },
    { id: "no_damage", label: "No damage to property" },
    { id: "followed_rules", label: "Followed house rules" },
  ],
  after: [
    { id: "cleaned_up", label: "Cleaned up after use" },
    { id: "toilet_clean", label: "Toilet left clean" },
    { id: "bins_emptied", label: "Bins emptied if full" },
    { id: "lights_off", label: "Lights turned off" },
    { id: "doors_locked", label: "Doors locked" },
  ],
};

const formSchema = z.object({
  bookingReference: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  date: z.string().min(1, "Date is required"),
  comments: z.string().optional(),
  before: z.record(z.boolean()).optional(),
  during: z.record(z.boolean()).optional(),
  after: z.record(z.boolean()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checklist = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookingReference: "",
      name: "",
      email: "",
      date: "",
      comments: "",
      before: {},
      during: {},
      after: {},
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    try {
      const responses = {
        before: values.before || {},
        during: values.during || {},
        after: values.after || {},
      };

      await createChecklistSubmission({
        booking_reference: values.bookingReference || null,
        submitted_by_name: values.name,
        submitted_by_email: values.email,
        submission_date: values.date,
        responses,
        comments: values.comments || null,
      });

      setIsSubmitted(true);
      toast({
        title: "Checklist submitted!",
        description: "Thank you for completing the checklist.",
      });
    } catch (error) {
      console.error("Error submitting checklist:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container">
            <div className="max-w-md mx-auto text-center animate-scale-in">
              <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
              <h1 className="font-display text-2xl font-semibold mb-2">
                Thank You!
              </h1>
              <p className="text-muted-foreground mb-6">
                Your checklist has been submitted successfully.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
              >
                Submit Another
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Booking <span className="text-accent">Checklist</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Complete this checklist before and after your booking.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <h2 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-foreground" />
                    Your Details
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="bookingReference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booking Reference (optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., MAN-2024-001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name *</FormLabel>
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
                </div>

                {/* Checklist Sections */}
                {Object.entries(checklistItems).map(([section, items]) => (
                  <div key={section} className="bg-card rounded-xl border border-border/50 p-6">
                    <h2 className="font-display text-lg font-semibold mb-4 capitalize">
                      {section === "before" && "✓ Before Use"}
                      {section === "during" && "✓ During Use"}
                      {section === "after" && "✓ After Use"}
                    </h2>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name={`${section}.${item.id}` as any}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* Comments */}
                <div className="bg-card rounded-xl border border-border/50 p-6">
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Comments (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any issues or feedback..."
                            rows={3}
                            {...field}
                          />
                        </FormControl>
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
                      Submit Checklist
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checklist;
