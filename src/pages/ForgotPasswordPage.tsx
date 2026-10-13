import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Loader2, KeyRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? "http://localhost:5000/api" 
    : "/api";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("Password reset successful!", {
          description: "Please log in with your new password."
        });
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password. Please check your email.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Network error, please try again.");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-brand mx-auto">
              <Heart className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground mt-3">Reset Password</h1>
          <p className="font-sans text-muted-foreground mt-1 text-sm">Enter your account details to set a new password</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card-hover border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-sm font-medium">Registered Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 font-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="font-sans text-sm font-medium">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-11 font-sans"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-sans text-sm font-medium">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-11 font-sans"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 gradient-primary text-primary-foreground border-0 shadow-brand font-sans text-sm font-semibold mt-2"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <KeyRound className="w-4 h-4" /> Reset Password
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-sans text-primary font-semibold hover:underline flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 font-sans">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
