import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroCoupleImg from "@/assets/hero-couple.jpg";
import { useReveal } from "@/hooks/useReveal";
import { useAuth } from "@/context/AuthContext";

const HeroSection = () => {
  const { ref: leftRef, visible: leftVisible } = useReveal();
  const { ref: rightRef, visible: rightVisible } = useReveal(200);
  const { user, isAuthenticated } = useAuth();

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-r from-red-900 via-maroon to-red-950">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="container relative z-10 mx-auto px-4 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left content - Text */}
          <div
            ref={leftRef as React.RefObject<HTMLDivElement>}
            className={`reveal-left col-span-1 lg:col-span-7 ${leftVisible ? "visible" : ""}`}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-sans font-medium mb-6">
              <CheckCircle2 className="w-4 h-4 text-gold-light" />
              No.1 and Most Trusted Matrimony Service
            </div>

            <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              Find Your Perfect <br />
              <span className="text-gold">Tamil</span> Life Partner
            </h1>

            <p className="font-sans text-white/90 text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-light">
              Lakhs of joyful marriages are from ShaadiTamil. Give your life a beautiful beginning with us.
            </p>

            <div className="flex gap-8 mt-10 pt-8 border-t border-white/20">
              {[["100%", "Verified Profiles"], ["Millions", "of Success Stories"], ["24/7", "Customer Support"]].map(
                ([num, label]) => (
                  <div key={label} className="text-left">
                    <div className="font-serif font-bold text-3xl text-gold-light drop-shadow-sm">{num}</div>
                    <div className="font-sans text-sm text-white/80 mt-1 font-medium">{label}</div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right content - Registration Form */}
          <div
            ref={rightRef as React.RefObject<HTMLDivElement>}
            className={`reveal-right col-span-1 lg:col-span-5 ${rightVisible ? "visible" : ""} relative flex justify-center lg:justify-end`}
          >
            {isAuthenticated ? (
              <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden shadow-black/20">
                <div className="bg-gray-50 border-b border-gray-100 p-6 text-center">
                  <h3 className="font-serif text-2xl font-bold text-foreground">Welcome Back!</h3>
                  <p className="font-sans text-sm text-primary font-semibold mt-1">Vanakkam, {user?.name} 🙏</p>
                </div>
                
                <div className="p-6 text-center space-y-6">
                  <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                    Your journey to finding the perfect life partner is active. Browse verified profiles matching your preferences today.
                  </p>

                  <div className="space-y-3">
                    <Link to="/search" className="block">
                      <Button className="w-full py-6 text-lg gradient-primary text-white shadow-brand hover:opacity-90 transition-all rounded-lg font-bold tracking-wide">
                        Find Your Match
                      </Button>
                    </Link>

                    <Link to="/dashboard" className="block">
                      <Button variant="outline" className="w-full py-6 text-lg border-primary text-primary hover:bg-pink-light transition-all rounded-lg font-bold tracking-wide">
                        Manage My Profile
                      </Button>
                    </Link>
                  </div>

                  <div className="pt-4 border-t border-gray-100 text-xs text-muted-foreground font-sans">
                    Account Status: <span className="font-semibold text-green-600">{user?.isPremium ? "Premium Member" : "Free Member"}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden shadow-black/20">
                <div className="bg-gray-50 border-b border-gray-100 p-6 text-center">
                  <h3 className="font-serif text-2xl font-bold text-foreground">Register Free!</h3>
                  <p className="font-sans text-sm text-muted-foreground mt-1">Setup your profile in 2 mins</p>
                </div>
                
                <div className="p-6">
                  <form className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Matrimony Profile For</label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all">
                        <option value="">Select Profile</option>
                        <option value="Self">Myself</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Relative">Relative</option>
                        <option value="Friend">Friend</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Name</label>
                      <input type="text" placeholder="Enter full name" className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">Mobile Number</label>
                      <div className="flex">
                        <select className="w-24 px-3 py-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                          <option value="+91">+91 (IND)</option>
                          <option value="+1">+1 (USA)</option>
                          <option value="+44">+44 (UK)</option>
                        </select>
                        <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3 rounded-r-lg border border-gray-200 bg-gray-50 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                      </div>
                    </div>

                    <Link to="/signup" className="block mt-6">
                      <Button className="w-full py-6 text-lg gradient-primary text-white shadow-brand hover:opacity-90 transition-all rounded-lg font-bold tracking-wide">
                        Register Now
                      </Button>
                    </Link>

                    <p className="text-center text-xs text-gray-500 mt-4">
                      By clicking register, you agree to our <Link to="/terms" className="text-primary hover:underline">Terms</Link> & <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
