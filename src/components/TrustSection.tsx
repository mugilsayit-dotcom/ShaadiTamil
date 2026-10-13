import { Smile, ThumbsUp, Shield, Smartphone, Lock, CreditCard } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const trustItems = [
  { icon: Smile, label: "2,000+ Happy Customers", color: "text-primary" },
  { icon: ThumbsUp, label: "552 Success Stories", color: "text-primary" },
  { icon: Shield, label: "Verified Profiles Only", color: "text-primary" },
  { icon: Smartphone, label: "Mobile Accessible", color: "text-primary" },
  { icon: Lock, label: "100% Safe & Secure", color: "text-primary" },
  { icon: CreditCard, label: "One-Time Registration", color: "text-primary" },
];

const TrustSection = () => {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-card border-y border-border py-10 md:py-14">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`container mx-auto px-4 reveal ${visible ? "visible" : ""}`}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-3"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-pink-light border border-primary/15 flex items-center justify-center shadow-sm">
                  <Icon className={`w-7 h-7 ${item.color}`} strokeWidth={1.5} />
                </div>
                <p className="font-sans text-xs font-semibold text-foreground leading-tight">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
