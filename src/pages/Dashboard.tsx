import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  fetchUserContactRequests,
  fetchUserBookings,
} from "@/lib/firestore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Plus,
  LogOut,
  User,
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
  status: "pending" | "approved" | "declined";
  created_at: any;
}

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  client_name: string;
  client_email: string;
  purpose: string | null;
  created_at: any;
}

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      loadData(user.email);
    }
  }, [user]);

  async function loadData(email: string) {
    setDataLoading(true);
    try {
      const [reqData, bookData] = await Promise.all([
        fetchUserContactRequests(email),
        fetchUserBookings(email),
      ]);
      setRequests(reqData as ContactRequest[]);
      setBookings(bookData as Booking[]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setDataLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container">
            <div className="max-w-md mx-auto text-center">
              <h1 className="font-display text-2xl font-semibold mb-4">
                Sign in to view your dashboard
              </h1>
              <p className="text-muted-foreground mb-6">
                Track your booking requests and confirmed reservations.
              </p>
              <Button
                variant="accent"
                onClick={() => navigate("/login")}
              >
                Sign In
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
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                My <span className="text-accent">Dashboard</span>
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user.displayName || user.email}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="accent" asChild>
                <a href="/bookings">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {dataLoading ? (
            <div className="text-center py-12 text-muted-foreground animate-pulse">
              Loading your bookings...
            </div>
          ) : (
            <div className="space-y-10">
              {/* Confirmed Bookings */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  Confirmed Bookings ({bookings.length})
                </h2>

                {bookings.length === 0 ? (
                  <div className="bg-card rounded-xl border border-border p-8 text-center">
                    <Calendar className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                    <p className="text-muted-foreground mb-4">No confirmed bookings yet.</p>
                    <Button variant="accent" size="sm" asChild>
                      <a href="/bookings">Book a Room</a>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-card rounded-xl border border-border p-5"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-semibold">Room Booking</h3>
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

              {/* Booking Requests */}
              <div>
                <h2 className="font-display text-xl font-semibold mb-4">
                  My Requests ({requests.length})
                </h2>

                {requests.length === 0 ? (
                  <div className="bg-card rounded-xl border border-border p-8 text-center">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                    <p className="text-muted-foreground">No booking requests yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-card rounded-xl border border-border p-5"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {new Date(request.requested_date).toLocaleDateString("en-IE", {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
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
                            <p className="text-sm text-muted-foreground">
                              {request.start_time} – {request.end_time}
                              {request.is_flexible && " (flexible)"}
                            </p>
                          </div>
                          {request.purpose && (
                            <p className="text-sm text-muted-foreground max-w-xs">
                              {request.purpose}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
