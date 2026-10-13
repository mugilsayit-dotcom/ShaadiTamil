import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Information We Collect",
    content: "We collect information you provide directly to us, such as your name, email address, date of birth, photos, and preferences when you create a profile. We also collect usage data to improve your experience.",
  },
  {
    title: "How We Use Your Information",
    content: "We use your information to provide and improve our matchmaking services, communicate with you, display your profile to potential matches (only when you choose to), and ensure platform safety.",
  },
  {
    title: "Profile Visibility",
    content: "Your profile is only visible to registered members. You have full control over what information is shared and can hide your profile at any time from your account settings.",
  },
  {
    title: "Data Security",
    content: "We use industry-standard encryption (SSL/TLS) to protect your data in transit. Your photos and personal information are stored securely in our encrypted database.",
  },
  {
    title: "Cookies",
    content: "We use cookies to maintain your session and improve site functionality. You can disable cookies in your browser settings, though some features may not work properly.",
  },
  {
    title: "Third-Party Services",
    content: "We do not sell your personal data to third parties. We may use trusted service providers for analytics and email delivery, who are contractually bound to protect your data.",
  },
  {
    title: "Your Rights",
    content: "You have the right to access, update, or delete your personal information at any time. You can also request a copy of all data we hold about you by contacting our support team.",
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at privacy@shaaditamil.com or call +91 98765 43210.",
  },
];

const PrivacyPage = () => (
  <div className="min-h-screen bg-background font-sans">
    <Navbar />
    <section className="gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
        <p className="font-sans text-muted-foreground">Last updated: January 2025</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="font-sans text-muted-foreground leading-relaxed mb-10">
          At ShaadiTamil, your privacy is of utmost importance to us. This policy explains how we collect, use, and protect your personal information when you use our platform.
        </p>
        <div className="space-y-10">
          {sections.map(({ title, content }, i) => (
            <div key={title}>
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3">{i + 1}. {title}</h2>
              <p className="font-sans text-muted-foreground leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="text-primary font-sans font-semibold hover:underline">Contact us with any privacy concerns →</Link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default PrivacyPage;
