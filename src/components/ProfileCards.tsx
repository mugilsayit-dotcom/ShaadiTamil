import { useState, useEffect } from "react";
import { Heart, Eye, CheckCircle2, MapPin, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/useReveal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? "http://localhost:5000/api" 
    : "/api";

const ProfileCard = ({ profile, delay }: { profile: any; delay: number }) => {
  const { ref, visible } = useReveal(delay);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!user?.isPremium && !user?.isAdmin) {
      toast.error("Upgrade to Premium", {
        id: "upgrade-toast",
        description: "Viewing complete profiles and connecting is available for premium members only.",
        action: { label: "Upgrade Now", onClick: () => navigate("/#pricing") }
      });
      return;
    }
    toast.success("Opening Profile...");
    navigate("/search");
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 25;
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const imageSrc = profile.profilePicture || "https://via.placeholder.com/150";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${visible ? "visible" : ""} group bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col`}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56 bg-muted">
        {imageSrc && imageSrc !== 'https://via.placeholder.com/150' ? (
          <img
            src={imageSrc}
            alt={profile.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-serif text-4xl text-primary/40 bg-primary/5">
            {profile.name?.charAt(0)}
          </div>
        )}
        {profile.online && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-sans text-xs font-semibold text-foreground">Online</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2.5 py-1 rounded-full shadow-sm">
          <span className="font-sans text-xs font-bold">{profile.match || 90}% match</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5 truncate">
            <h3 className="font-serif font-bold text-lg text-foreground truncate">
              {profile.name}, {profile.age || calculateAge(profile.dob)}
            </h3>
            {profile.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs font-sans truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{profile.location || "Location unseen"}</span>
          </span>
          <span className="flex items-center gap-1 text-xs font-sans truncate">
            <Briefcase className="w-3 h-3 flex-shrink-0" /> <span className="truncate">{profile.occupation || "Profession unseen"}</span>
          </span>
        </div>

        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2 flex-1">
          {profile.about || "No biography provided by the user yet."}
        </p>

        <div className="flex gap-2 mt-auto">
          <Button
            size="sm"
            onClick={handleAction}
            className="flex-1 gradient-primary text-primary-foreground border-0 font-sans font-semibold text-xs rounded-xl shadow-brand hover:opacity-90 active:scale-95 transition-all"
          >
            <Heart className="w-3.5 h-3.5 mr-1.5" />
            Connect
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAction}
            className="flex-1 border-primary text-primary hover:bg-pink-light font-sans font-semibold text-xs rounded-xl active:scale-95 transition-all"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProfileCards = () => {
  const { ref: headRef, visible: headVisible } = useReveal();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch(`${API_URL}/users`);
        if (res.ok) {
          const data = await res.json();
          const realProfiles = data.filter((p: any) => {
            // Exclude admin profiles
            const notAdmin = !p.isAdmin && p.email !== 'admin@example.com';
            // Exclude current logged in user
            const notSelf = !user || p._id !== user._id;
            
            // Exclude same gender profiles for logged in users to only show opposite gender
            let matchGender = true;
            if (user && user.gender) {
              const targetGender = user.gender === 'Male' ? 'Female' : 'Male';
              matchGender = p.gender === targetGender;
            }
            
            return notAdmin && notSelf && matchGender;
          });
          setProfiles(realProfiles.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch featured profiles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [user]);

  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-12 reveal ${headVisible ? "visible" : ""}`}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Featured <span className="text-primary italic">Profiles</span>
          </h2>
          <p className="font-sans text-muted-foreground text-base max-w-xl mx-auto">
            Browse verified Tamil profiles hand-picked for you. Every profile is manually reviewed for authenticity.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 border border-border/60 rounded-2xl max-w-xl mx-auto p-8 font-sans">
            <Heart className="w-12 h-12 text-primary/40 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-semibold text-foreground mb-2">No Profiles Registered Yet</h3>
            <p className="text-sm text-muted-foreground mb-6">Be the first to create a profile and find your perfect life partner!</p>
            <Link to="/signup">
              <Button size="sm" className="gradient-primary text-white shadow-brand border-0">
                Register Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profiles.map((profile, i) => (
              <ProfileCard key={profile._id} profile={profile} delay={i * 100} />
            ))}
          </div>
        )}

        {/* View more CTA */}
        {profiles.length > 0 && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/search")}
              className="border-2 border-primary text-primary hover:bg-pink-light font-sans font-semibold px-10 rounded-xl active:scale-[0.97] transition-all"
            >
              View All Profiles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileCards;
