import { useState } from "react";
import { MapPin, Phone, Mail, Link2, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.phone && !/^[\d\s+()-]*$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call - replace with actual POST to /api/contact
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Get In Touch</h2>
          <p className="section-subheading text-primary">
            We'd love to hear from you. Reach out with questions, prayer requests, 
            or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Contact Form */}
          <div className="card-elevated p-8 h-full">
            <h3 className="font-display font-bold text-primary text-xl mb-6">Send us a message</h3>
            
            {isSuccess ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="font-display font-bold text-primary text-xl mb-2">Thank you!</h4>
                <p className="text-muted-foreground">We'll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Phone <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+353 89 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? "border-destructive" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  variant="accent" 
                  className="w-full rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-accent-foreground border-t-transparent rounded-full" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="card-elevated p-8 h-full">
            <div className="h-full flex flex-col">
              <h3 className="font-display font-bold text-primary text-xl mb-6">Contact Information</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Address</p>
                    <p className="text-muted-foreground">
                      1 O'Connell Street Lower<br />
                      North City, Dublin, Ireland
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Phone</p>
                    <a 
                      href="tel:+353892785413" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +353 89 278 5413
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Email</p>
                    <a 
                      href="mailto:Manifestdublin@gmail.com" 
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      Manifestdublin@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <Link2 className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Links</p>
                    <a 
                      href="https://linktr.ee/manifestdublin" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      linktr.ee/manifestdublin
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
