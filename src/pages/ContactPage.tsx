import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReveal } from "@/hooks/useReveal";

const ContactPage = () => {
  const { ref: formRef, visible: formVisible } = useReveal();
  const { ref: infoRef, visible: infoVisible } = useReveal();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setName(""); setEmail(""); setSubject(""); setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Hero */}
      <section className="gradient-hero py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h1>
          <p className="font-sans text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions? Our friendly team is always happy to help you on your journey to finding love.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-12">

          {/* Contact info */}
          <div ref={infoRef as React.RefObject<HTMLDivElement>} className={`reveal-left ${infoVisible ? "visible" : ""}`}>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Contact Information</h2>
            <div className="space-y-6">
              {[
                { icon: Phone, title: "Phone", lines: ["+91 98765 43210", "+91 87654 32109"], color: "text-primary" },
                { icon: Mail, title: "Email", lines: ["support@shaaditamil.com", "hello@shaaditamil.com"], color: "text-primary" },
                { icon: MapPin, title: "Office", lines: ["42, Anna Salai, T. Nagar", "Chennai, Tamil Nadu 600017"], color: "text-primary" },
                { icon: Clock, title: "Working Hours", lines: ["Monday – Saturday: 9am – 7pm", "Sunday: 10am – 4pm"], color: "text-primary" },
              ].map(({ icon: Icon, title, lines, color }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-brand flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-sans font-semibold text-foreground text-sm mb-1">{title}</div>
                    {lines.map((line) => (
                      <div key={line} className="text-sm text-muted-foreground font-sans">{line}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8 rounded-2xl bg-muted border border-border h-40 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-sans text-muted-foreground">Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef as React.RefObject<HTMLDivElement>} className={`reveal-right ${formVisible ? "visible" : ""}`}>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Send Us a Message</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center shadow-brand">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="font-sans text-muted-foreground">We'll get back to you within 24 hours.</p>
                <Button
                  variant="outline"
                  className="border-primary text-primary font-sans"
                  onClick={() => setSent(false)}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cname" className="font-sans text-sm font-medium">Full Name</Label>
                    <Input id="cname" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="h-11 font-sans" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cemail" className="font-sans text-sm font-medium">Email</Label>
                    <Input id="cemail" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11 font-sans" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="csubject" className="font-sans text-sm font-medium">Subject</Label>
                  <Input id="csubject" placeholder="How can we help?" value={subject} onChange={(e) => setSubject(e.target.value)} required className="h-11 font-sans" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cmessage" className="font-sans text-sm font-medium">Message</Label>
                  <Textarea
                    id="cmessage"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    className="font-sans resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 gradient-primary text-primary-foreground border-0 shadow-brand font-sans font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> Send Message</>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
