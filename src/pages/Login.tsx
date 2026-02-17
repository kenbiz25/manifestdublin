import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, ArrowRight } from "lucide-react";

const Login = () => {
  const { user, login, loginWithGoogle, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // If already logged in, show redirect
  if (user) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container">
            <div className="max-w-md mx-auto text-center">
              <h1 className="font-display text-2xl font-semibold mb-4">
                You're already signed in
              </h1>
              <p className="text-muted-foreground mb-6">
                Signed in as {user.email}
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  variant="accent"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  My Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/bookings")}
                >
                  Book a Room
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast({ title: "Welcome back!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (regPassword !== regConfirm) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    if (regPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setRegLoading(true);
    try {
      await register(regEmail, regPassword, regName, regPhone || undefined);
      toast({
        title: "Account created!",
        description: "You're now signed in.",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRegLoading(false);
    }
  }

  return (
    <Layout>
      <section className="py-10 md:py-14">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-6">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                Welcome <span className="text-accent">Back</span>
              </h1>
              <p className="text-muted-foreground">
                Sign in to manage your bookings, or create an account to get started.
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-6 md:p-8">
              <Tabs defaultValue="login">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="login" className="flex-1 gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="flex-1 gap-2">
                    <UserPlus className="h-4 w-4" />
                    Register
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@example.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginLoading}
                    >
                      {loginLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Register Tab */}
                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-name">Full Name</Label>
                      <Input
                        id="reg-name"
                        type="text"
                        placeholder="Your name"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        placeholder="you@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-phone">Phone (optional)</Label>
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder="+353 89 123 4567"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="At least 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-confirm">Confirm Password</Label>
                      <Input
                        id="reg-confirm"
                        type="password"
                        placeholder="Repeat your password"
                        value={regConfirm}
                        onChange={(e) => setRegConfirm(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={regLoading}
                    >
                      {regLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              {/* Google Sign-In */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={googleLoading}
                onClick={async () => {
                  setGoogleLoading(true);
                  try {
                    await loginWithGoogle();
                    toast({ title: "Welcome!" });
                    navigate("/dashboard");
                  } catch (error: any) {
                    if (error.code !== "auth/popup-closed-by-user") {
                      toast({
                        title: "Google sign-in failed",
                        description: error.message,
                        variant: "destructive",
                      });
                    }
                  } finally {
                    setGoogleLoading(false);
                  }
                }}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {googleLoading ? "Signing in..." : "Google"}
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              You can also{" "}
              <a href="/bookings" className="text-accent hover:underline">
                book a room without an account
              </a>.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
