import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, Shield, Star, CheckCircle } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const values = [
  { icon: Heart, title: "Built on Trust", desc: "Every profile is manually verified by our dedicated team to ensure authenticity and safety." },
  { icon: Users, title: "Family First", desc: "We understand that marriage is a family decision. Our platform makes it easy for families to connect." },
  { icon: Shield, title: "Privacy Protected", desc: "Your personal data is encrypted and never shared without your explicit consent." },
  { icon: Star, title: "Quality Matches", desc: "Our smart algorithm factors in culture, values, and compatibility for meaningful matches." },
];

const team = [
  { name: "Karthik Sundaram", role: "Founder & CEO", initials: "KS", color: "from-primary to-secondary" },
  { name: "Priya Muthukumar", role: "Head of Operations", initials: "PM", color: "from-secondary to-maroon" },
  { name: "Vijay Ramasamy", role: "Lead Engineer", initials: "VR", color: "from-accent to-gold" },
  { name: "Deepa Krishnan", role: "Customer Success", initials: "DK", color: "from-primary to-accent" },
];

const AboutPage = () => {
  const { ref: heroRef, visible: heroVisible } = useReveal();
  const { ref: missionRef, visible: missionVisible } = useReveal();
  const { ref: valuesRef, visible: valuesVisible } = useReveal();
  const { ref: teamRef, visible: teamVisible } = useReveal();

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-20 md:py-28">
        <div ref={heroRef as React.RefObject<HTMLDivElement>} className={`container mx-auto px-4 text-center reveal ${heroVisible ? "visible" : ""}`}>
          <div className="inline-flex items-center gap-2 bg-pink-light px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-primary fill-current" />
            <span className="text-xs font-sans font-semibold text-primary uppercase tracking-widest">About ShaadiTamil</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Connecting Tamil Hearts<br />Since 2018
          </h1>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ShaadiTamil was founded with a single mission — to make Tamil matrimony trustworthy, modern, and accessible to families across the world.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[["2000+", "Happy Couples"], ["50,000+", "Verified Profiles"], ["6+", "Years of Trust"], ["98%", "Satisfaction Rate"]].map(([stat, label]) => (
              <div key={label} className="text-center">
                <div className="font-serif text-4xl font-bold text-primary">{stat}</div>
                <div className="text-sm text-muted-foreground font-sans mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-card">
        <div ref={missionRef as React.RefObject<HTMLDivElement>} className={`container mx-auto px-4 max-w-4xl reveal ${missionVisible ? "visible" : ""}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-5">Our Mission</h2>
              <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                We believe every Tamil individual deserves a life partner who shares their values, culture, and dreams. Our platform bridges the gap between tradition and modern matchmaking.
              </p>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                With a team of dedicated professionals who understand Tamil culture deeply, we've helped over 2,000 families find happiness.
              </p>
              <div className="space-y-3">
                {["Personally verified profiles", "24/7 customer support", "Multilingual assistance", "100% privacy guaranteed"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-sans text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="gradient-section rounded-2xl p-8 border border-border">
              <blockquote className="font-serif text-xl italic text-foreground leading-relaxed mb-4">
                "We don't just connect profiles — we connect lives, families, and futures."
              </blockquote>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">KS</div>
                <div>
                  <div className="font-sans font-semibold text-sm text-foreground">Karthik Sundaram</div>
                  <div className="font-sans text-xs text-muted-foreground">Founder & CEO</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 gradient-section">
        <div ref={valuesRef as React.RefObject<HTMLDivElement>} className={`container mx-auto px-4 reveal ${valuesVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-shadow"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center mb-4 shadow-brand">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div ref={teamRef as React.RefObject<HTMLDivElement>} className={`container mx-auto px-4 reveal ${teamVisible ? "visible" : ""}`}>
          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map(({ name, role, initials, color }, i) => (
              <div
                key={name}
                className="text-center group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-serif font-bold text-2xl mx-auto mb-4 shadow-brand group-hover:scale-105 transition-transform`}>
                  {initials}
                </div>
                <div className="font-sans font-semibold text-foreground">{name}</div>
                <div className="text-sm text-muted-foreground font-sans mt-1">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
