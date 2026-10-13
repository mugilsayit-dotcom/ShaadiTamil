import { UserPlus, Search, MessageCircleHeart } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    desc: "Register for free and create a detailed profile with your preferences, education, profession, and family background.",
  },
  {
    step: "02",
    icon: Search,
    title: "Find Your Match",
    desc: "Use our smart search and matching algorithm to discover compatible Tamil profiles based on your preferences.",
  },
  {
    step: "03",
    icon: MessageCircleHeart,
    title: "Connect & Celebrate",
    desc: "Send interest, chat directly, and when the spark is mutual — begin your beautiful journey together.",
  },
];

const HowItWorks = () => {
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="about" className="gradient-section py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal ${headVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            How <span className="text-primary italic">ShaadiTamil</span> Works
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            Three simple steps to finding your life partner. Safe, trusted, and culturally aligned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30" />

          {steps.map((step, i) => {
            const { ref, visible } = useReveal(i * 150);
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                ref={ref as React.RefObject<HTMLDivElement>}
                className={`reveal ${visible ? "visible" : ""} flex flex-col items-center text-center`}
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-brand-lg border-4 border-card z-10 relative">
                    <Icon className="w-9 h-9 text-primary-foreground" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-sans font-bold text-xs shadow-sm border-2 border-card">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif font-bold text-xl text-foreground mb-3">{step.title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
