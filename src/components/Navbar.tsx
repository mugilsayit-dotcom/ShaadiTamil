import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/shaaditamil_logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.slice(2);
      const scrollToSection = () => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      if (location.pathname === "/") {
        scrollToSection();
      } else {
        navigate("/");
        setTimeout(scrollToSection, 300);
      }
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Find Your Match", href: "/search" },
    { label: "About", href: "/about" },
    { label: "Success Stories", href: "/#success" },
    { label: "Membership", href: "/#pricing" },
    { label: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-card border-b border-border">
      {/* Top strip */}
      <div className="gradient-primary py-1.5 px-4 text-center text-xs font-sans font-medium text-primary-foreground tracking-wide">
        🌸 Trusted Tamil Matrimony Platform — Verified Profiles | Privacy Protected | 2000+ Happy Families
      </div>

      {/* Main nav */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img src={logo} alt="ShaadiTamil" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-sans font-medium text-foreground/80 hover:text-primary rounded-lg hover:bg-pink-light transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="/contact" className="flex items-center gap-1.5 text-sm font-sans text-muted-foreground hover:text-primary transition-colors">
            <Phone className="w-3.5 h-3.5" />
            <span>+91 98765 43210</span>
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to={user?.isAdmin ? "/admin" : "/dashboard"}>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-light hover:bg-pink-100 transition-colors cursor-pointer border border-pink-200">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-sans font-medium text-primary truncate max-w-[100px] hover:underline">
                    {user?.name?.split(" ")[0]} {user?.isAdmin && "(Admin)"}
                  </span>
                </div>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-pink-light font-sans"
                onClick={handleLogout}
              >
                <LogOut className="w-3.5 h-3.5 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-pink-light font-sans">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gradient-primary text-primary-foreground border-0 font-sans shadow-brand hover:opacity-90 active:scale-95 transition-all">
                  Register Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t border-border px-4 pb-4">
          <ul className="flex flex-col gap-1 mt-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-2.5 text-sm font-sans font-medium text-foreground/80 hover:text-primary hover:bg-pink-light rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2 mt-4">
            {isAuthenticated ? (
              <>
                <Link to={user?.isAdmin ? "/admin" : "/dashboard"} className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-primary text-primary-foreground border-0 font-sans text-sm shadow-brand">
                    <User className="w-4 h-4 mr-1.5" /> {user?.isAdmin ? "Admin Dashboard" : "My Account"}
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1 border-primary text-primary font-sans text-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-1" /> Logout ({user?.name?.split(" ")[0]})
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full border-primary text-primary font-sans text-sm">Login</Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full gradient-primary text-primary-foreground border-0 font-sans text-sm shadow-brand">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
