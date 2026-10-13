import { useState, useEffect } from "react";
import { Heart, X, CheckCircle, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("shaaditamil_popup_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setOpen(false);
    sessionStorage.setItem("shaaditamil_popup_dismissed", "1");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-brand-lg border border-border w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-border transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Top gradient band */}
        <div className="gradient-primary h-2" />

        <div className="p-8">
          {/* Icon */}
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-brand mx-auto mb-5">
            <Heart className="w-8 h-8 text-primary-foreground fill-current" />
          </div>

          {/* Copy */}
          <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-2">
            Find Your Perfect Tamil Partner
          </h2>
          <p className="font-sans text-muted-foreground text-sm text-center mb-6 leading-relaxed">
            Join over <strong className="text-foreground">50,000+ verified profiles</strong> on ShaadiTamil — the most trusted Tamil matrimony platform.
          </p>

          {/* Trust points */}
          <div className="grid grid-cols-3 gap-3 mb-7">
            {[
              { icon: CheckCircle, label: "Verified Profiles", color: "text-primary" },
              { icon: Users, label: "2000+ Married", color: "text-secondary" },
              { icon: Shield, label: "100% Secure", color: "text-primary" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 bg-muted rounded-xl p-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-xs font-sans text-center text-muted-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Link to="/signup" onClick={dismiss}>
              <Button className="w-full h-11 gradient-primary text-primary-foreground border-0 shadow-brand font-sans font-semibold">
                🌸 Register Free — It's Quick!
              </Button>
            </Link>
            <Link to="/login" onClick={dismiss}>
              <Button variant="outline" className="w-full h-10 border-primary text-primary font-sans hover:bg-pink-light">
                I already have an account
              </Button>
            </Link>
          </div>

          <button
            onClick={dismiss}
            className="block w-full text-center text-xs text-muted-foreground font-sans mt-4 hover:text-foreground transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
