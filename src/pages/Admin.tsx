import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchContactRequests,
  updateContactRequestStatus,
  createBooking,
  fetchAllBookings,
} from "@/lib/firestore";
import {
  sendBookingConfirmationToUser,
  sendBookingNotificationToAdmin,
} from "@/lib/email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  XCircle,
  Clock,
  LogOut,
  Calendar,
  Users,
  Settings,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  requested_date: string;
  start_time: string;
  end_time: string;
  purpose: string | null;
  is_flexible: boolean;
  agreed_to_terms: boolean;
  gdpr_consent: boolean;
  status: "pending" | "approved" | "declined";
  created_at: any;
}

interface Booking {
  id: string;
  contact_request_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  purpose: string | null;
  created_at: any;
}

const Admin = () => {
  const { user, isAdmin, loading, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("requests");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      loadRequests();
      loadBookings();
    }
  }, [isAdmin]);

  async function loadRequests() {
    try {
      const data = await fetchContactRequests();
      setRequests(data as ContactRequest[]);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }

  async function loadBookings() {
    try {
      const data = await fetchAllBookings();
      setBookings(data as Booking[]);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    try {
      await login(email, password);
      toast({ title: "Logged in successfully" });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoggingIn(false);
    }
  }

  async function handleLogout() {
    await logout();
  }

  async function handleUpdateStatus(id: string, status: "approved" | "declined") {
    const request = requests.find((r) => r.id === id);
    if (!request) return;

    try {
      await updateContactRequestStatus(id, status);

      if (status === "approved") {
        await createBooking({
          contact_request_id: id,
          booking_date: request.requested_date,
          start_time: request.start_time,
          end_time: request.end_time,
          client_name: request.name,
          client_email: request.email,
          client_phone: request.phone,
          purpose: request.purpose,
        });

        // Send confirmation email to user + notification to admin
        const emailData = {
          client_name: request.name,
          client_email: request.email,
          booking_date: request.requested_date,
          start_time: request.start_time,
          end_time: request.end_time,
          purpose: request.purpose,
        };

        try {
          await Promise.all([
            sendBookingConfirmationToUser(emailData),
            sendBookingNotificationToAdmin(emailData),
          ]);
        } catch (emailError) {
          console.error("Email send error:", emailError);
        }
      }

      toast({
        title: status === "approved" ? "Booking approved!" : "Request declined",
        description: status === "approved"
          ? "Booking created and confirmation email sent."
          : "The request has been declined.",
      });

      loadRequests();
      loadBookings();
    } catch (error: any) {
      toast({
        title: "Error updating request",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-semibold mb-2">Admin Login</h1>
            <p className="text-muted-foreground">Sign in to manage bookings</p>
          </div>

          <form onSubmit={handleLogin} className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loggingIn}>
              {loggingIn ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            <Button variant="link" onClick={() => navigate("/")}>
              ← Back to Home
            </Button>
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center">
          <h1 className="font-display text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have admin permissions.
          </p>
          <Button variant="outline" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="font-display text-xl font-semibold">
              Manifest<span className="text-accent">Admin</span>
            </a>
            <div className="hidden sm:flex items-center gap-2">
              {pendingCount > 0 && (
                <Badge variant="destructive">{pendingCount} pending</Badge>
              )}
              <Badge variant="outline">{bookings.length} bookings</Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="requests" className="gap-2">
              <Users className="h-4 w-4" />
              Requests
              {pendingCount > 0 && (
                <span className="ml-1 text-xs bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5">
                  {pendingCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="bookings" className="gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests">
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">
                Contact Requests ({requests.length})
              </h2>

              {requests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No requests yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-card rounded-xl border border-border p-6"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{request.name}</h3>
                            <Badge
                              variant={
                                request.status === "pending"
                                  ? "secondary"
                                  : request.status === "approved"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {request.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                              {request.status === "approved" && <CheckCircle className="h-3 w-3 mr-1" />}
                              {request.status === "declined" && <XCircle className="h-3 w-3 mr-1" />}
                              {request.status}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {request.email}
                            </span>
                            {request.phone && (
                              <span className="inline-flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5" />
                                {request.phone}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <p className="font-medium">
                            {new Date(request.requested_date).toLocaleDateString("en-IE", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {request.start_time} – {request.end_time}
                          </p>
                          {request.is_flexible && (
                            <Badge variant="outline" className="text-xs">Flexible</Badge>
                          )}
                        </div>
                      </div>

                      {request.purpose && (
                        <div className="mt-3 border-t border-border pt-3">
                          <p className="text-sm text-muted-foreground flex items-start gap-2">
                            <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                            {request.purpose}
                          </p>
                        </div>
                      )}

                      <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                        {request.agreed_to_terms && (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            Terms accepted
                          </span>
                        )}
                        {request.gdpr_consent && (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            GDPR consent
                          </span>
                        )}
                      </div>

                      {request.status === "pending" && (
                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(request.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateStatus(request.id, "declined")}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="space-y-4">
              <h2 className="font-display text-lg font-semibold">
                Confirmed Bookings ({bookings.length})
              </h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p>No confirmed bookings yet.</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-card rounded-xl border border-border p-5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-semibold">{booking.client_name}</h3>
                        <Badge variant="default">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Confirmed
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4 shrink-0" />
                          <span>
                            {new Date(booking.booking_date).toLocaleDateString("en-IE", {
                              weekday: "long",
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 shrink-0" />
                          <span>{booking.start_time} – {booking.end_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4 shrink-0" />
                          <span>{booking.client_email}</span>
                        </div>
                        {booking.client_phone && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4 shrink-0" />
                            <span>{booking.client_phone}</span>
                          </div>
                        )}
                        {booking.purpose && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <FileText className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{booking.purpose}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="text-center py-12 text-muted-foreground">
              <Settings className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Pricing rules and content settings coming soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
