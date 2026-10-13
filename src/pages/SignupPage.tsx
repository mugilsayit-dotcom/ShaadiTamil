import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

const FOR_OPTIONS = ["Self", "Son", "Daughter", "Brother", "Sister"];

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createdFor, setCreatedFor] = useState("Self");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!gender || !dob) {
      setError("Please select gender and date of birth.");
      return;
    }
    setLoading(true);
    const result = await signup(name, email, password, createdFor, gender, dob);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-brand mx-auto">
              <Heart className="w-6 h-6 text-primary-foreground fill-current" />
            </div>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-foreground mt-3">Create Account</h1>
          <p className="font-sans text-muted-foreground mt-1 text-sm">Join thousands of verified Tamil profiles</p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl shadow-card-hover border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 text-sm text-destructive font-sans">
                 {error}
              </div>
            )}

            {/* Profile for */}
            <div className="space-y-2">
              <Label className="font-sans text-sm font-medium">Creating Profile For</Label>
              <div className="flex flex-wrap gap-2">
                {FOR_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setCreatedFor(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium border transition-all ${
                      createdFor === opt
                        ? "gradient-primary text-primary-foreground border-transparent shadow-brand"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary bg-card"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-sans text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 font-sans"
                />
              </div>

               <div className="space-y-2">
                <Label htmlFor="email" className="font-sans text-sm font-medium">Email Address</Label>
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender" className="font-sans text-sm font-medium">Gender</Label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-sans"
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

               <div className="space-y-2">
                <Label htmlFor="dob" className="font-sans text-sm font-medium">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="h-11 font-sans"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-sans text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 font-sans pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="font-sans text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 font-sans"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 gradient-primary text-primary-foreground border-0 shadow-brand font-sans text-sm font-semibold mt-6"
              disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Free Account"}
            </Button>

            <p className="text-xs text-muted-foreground font-sans text-center mt-4">
              By registering, you agree to our{" "}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link> &{" "}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </form>

          <div className="mt-5 text-center border-t border-border pt-5">
            <p className="text-sm font-sans text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 font-sans">
          <Link to="/" className="hover:text-primary transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
