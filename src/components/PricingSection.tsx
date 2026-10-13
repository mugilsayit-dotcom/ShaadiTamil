import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Start your journey",
    features: [
      "Create detailed profile",
      "Browse 50 profiles/day",
      "Send 5 interests/day",
      "Basic search filters",
      "Email support",
    ],
    cta: "Get Started",
    variant: "outline" as const,
    popular: false,
    gold: false,
  },
  {
    name: "Premium",
    price: "₹999",
    period: "/ 3 months",
    tagline: "Most popular choice",
    features: [
      "Everything in Free",
      "Unlimited profile views",
      "Unlimited interests",
      "Advanced search filters",
      "Direct messaging",
      "Profile highlighted",
      "Priority customer support",
    ],
    cta: "Start Premium",
    variant: "primary" as const,
    popular: true,
    gold: false,
  },
  {
    name: "Gold",
    price: "₹1,799",
    period: "/ 6 months",
    tagline: "Best value for families",
    features: [
      "Everything in Premium",
      "Gold verified badge",
      "Featured in top results",
      "Dedicated relationship manager",
      "Profile video support",
      "Astrology compatibility report",
      "Unlimited chat & video calls",
    ],
    cta: "Go Gold",
    variant: "gold" as const,
    popular: false,
    gold: true,
  },
];

const PricingSection = () => {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleUpgrade = async (planName: string) => {
    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please login or register to choose a plan.",
        action: { label: "Login", onClick: () => navigate("/login") }
      });
      return;
    }

    if (planName === "Free") {
      toast.info("You are already on the Free plan.");
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? "http://localhost:5000" : "");
      
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ isPremium: true }),
      });

      if (res.ok) {
        toast.success(`Upgraded to ${planName} successfully!`, {
          description: "Enjoy unlimited profile details and connection matchmaking."
        });

        // Store updated local session so user state is refreshed immediately
        const stored = localStorage.getItem("shaaditamil_user");
        if (stored) {
          const userData = JSON.parse(stored);
          userData.isPremium = true;
          localStorage.setItem("shaaditamil_user", JSON.stringify(userData));
        }

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Failed to upgrade plan.");
      }
    } catch (error) {
      toast.error("Server connection failed.");
    }
  };

  return (
    <section id="pricing" className="gradient-section py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 reveal ${headVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Simple, Honest <span className="text-primary italic">Pricing</span>
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            Choose a plan that suits your needs. No hidden charges, no surprises — just your path to love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          {plans.map((plan, i) => {
            const { ref, visible } = useReveal(i * 120);
            return (
              <div
                key={plan.name}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`reveal ${visible ? "visible" : ""} relative rounded-2xl border transition-all duration-300 hover:shadow-brand-lg ${
                  plan.popular
                    ? "border-primary shadow-brand scale-[1.03] bg-card"
                    : plan.gold
                    ? "border-gold/60 shadow-card bg-card"
                    : "border-border shadow-card bg-card"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="gradient-primary text-primary-foreground text-xs font-sans font-bold px-4 py-1 rounded-full shadow-brand">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}
                {plan.gold && (
                  <div className="absolute -top-3.5 left-0 right-0 flex justify-center">
                    <span className="gradient-gold text-accent-foreground text-xs font-sans font-bold px-4 py-1 rounded-full shadow-sm">
                      👑 Best Value
                    </span>
                  </div>
                )}

                <div className="p-7">
                  {/* Plan name */}
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-serif font-bold text-2xl ${plan.gold ? "text-accent" : plan.popular ? "text-primary" : "text-foreground"}`}>
                      {plan.name}
                    </h3>
                    {plan.gold && <Star className="w-5 h-5 text-accent fill-current" />}
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mb-5">{plan.tagline}</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className={`font-serif font-bold text-4xl ${plan.gold ? "text-accent" : plan.popular ? "text-primary" : "text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className="font-sans text-sm text-muted-foreground">{plan.period}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.gold ? "text-accent" : "text-primary"}`} />
                        <span className="font-sans text-sm text-foreground/80">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={() => handleUpgrade(plan.name)}
                    className={`w-full font-sans font-semibold py-3 rounded-xl active:scale-[0.97] transition-all ${
                      plan.popular
                        ? "gradient-primary text-primary-foreground border-0 shadow-brand hover:opacity-90"
                        : plan.gold
                        ? "gradient-gold text-accent-foreground border-0 shadow-sm hover:opacity-90"
                        : "border-2 border-primary text-primary bg-transparent hover:bg-pink-light"
                    }`}
                    variant="outline"
                  >
                    {isAuthenticated && user?.isPremium && plan.name !== "Free" ? "Active Plan" : plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center font-sans text-xs text-muted-foreground mt-8">
          ✓ Secure payment gateway &nbsp;·&nbsp; ✓ 7-day money-back guarantee &nbsp;·&nbsp; ✓ Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
