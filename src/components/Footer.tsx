import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Search Profiles", to: "/search" },
  { label: "About Us", to: "/about" },
  { label: "Success Stories", to: "/#success" },
  { label: "Membership Plans", to: "/#pricing" },
  { label: "Contact Us", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Use", to: "/terms" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground fill-current" />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-card">Shaadi</span>
                <span className="font-sans font-semibold text-xs text-card/70 block -mt-1 tracking-widest uppercase">Tamil</span>
              </div>
            </div>
            <p className="font-sans text-sm text-card/70 leading-relaxed mb-5">
              Tamil Nadu's most trusted matrimony platform, connecting families with love, culture, and tradition.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-card/10 hover:bg-primary flex items-center justify-center transition-colors duration-200 active:scale-95"
                >
                  <Icon className="w-4 h-4 text-card" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-card/50 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="font-sans text-sm text-card/70 hover:text-primary transition-colors duration-200">{label}</Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-card/50 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="font-sans text-sm text-card/70">Anna Nagar, Chennai – 600 040, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+919876543210" className="font-sans text-sm text-card/70 hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:support@shaaditamil.com" className="font-sans text-sm text-card/70 hover:text-primary transition-colors">support@shaaditamil.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-card/10">
        <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-card/50">
            © 2025 ShaadiTamil. All rights reserved. Made with{" "}
            <Heart className="w-3 h-3 text-primary inline fill-current" /> in Tamil Nadu.
          </p>
          <div className="flex gap-5">
            {legalLinks.map(({ label, to }) => (
              <Link key={label} to={to} className="font-sans text-xs text-card/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
