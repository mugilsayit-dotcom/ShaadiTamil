import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const sections = [
  { title: "Acceptance of Terms", content: "By accessing or using ShaadiTamil, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services." },
  { title: "Eligibility", content: "You must be at least 18 years old and legally eligible to marry in your jurisdiction to create a profile. By registering, you confirm that all information provided is accurate and truthful." },
  { title: "Profile Guidelines", content: "You agree to post only genuine information and photos of yourself. Impersonation, false information, or misrepresentation is strictly prohibited and will result in immediate account termination." },
  { title: "Prohibited Conduct", content: "Users must not harass, abuse, or harm other members. Solicitation, spam, or sharing of personal contact information in public areas is strictly prohibited." },
  { title: "Intellectual Property", content: "All content on ShaadiTamil, including logos, text, and design elements, is the property of ShaadiTamil and protected by copyright laws." },
  { title: "Privacy", content: "Your use of the platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference." },
  { title: "Termination", content: "We reserve the right to suspend or terminate any account that violates these terms, without prior notice." },
  { title: "Limitation of Liability", content: "ShaadiTamil is not responsible for the actions of its members. We do not guarantee the accuracy of any member profile and recommend exercising caution when interacting with others online." },
  { title: "Changes to Terms", content: "We may update these Terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms." },
];

const TermsPage = () => (
  <div className="min-h-screen bg-background font-sans">
    <Navbar />
    <section className="gradient-hero py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-3">Terms & Conditions</h1>
        <p className="font-sans text-muted-foreground">Last updated: January 2025</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <p className="font-sans text-muted-foreground leading-relaxed mb-10">
          Please read these Terms and Conditions carefully before using the ShaadiTamil platform. These terms govern your use of our services.
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
          <Link to="/contact" className="text-primary font-sans font-semibold hover:underline">Questions about our Terms? Contact us →</Link>
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default TermsPage;
