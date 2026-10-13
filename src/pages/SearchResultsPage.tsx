import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, MapPin, Briefcase, GraduationCap, CheckCircle, Heart, ChevronDown, Eye, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? "http://localhost:5000" : "");

const SearchResultsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [communityFilter, setCommunityFilter] = useState("all");
  const [selectedProfile, setSelectedProfile] = useState<any | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const url = `${API_URL}/api/users`;
        const headers: any = {};
        if (isAuthenticated && user?.token) {
          headers["Authorization"] = `Bearer ${user.token}`;
        }
        
        const res = await fetch(url, { headers });
        if (res.ok) {
          const data = await res.json();
          setProfiles(data);
        }
      } catch (error) {
        console.error("Failed to fetch profiles", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [user, isAuthenticated]);

  const handleViewProfile = (profile: any) => {
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
    setSelectedProfile(profile);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return "N/A";
    const diff = Date.now() - new Date(dob).getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  };

  const filtered = profiles.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const age = parseInt(calculateAge(p.dob) as string) || 0;
    const matchAge = ageFilter === "all" || (ageFilter === "20-25" && age >= 20 && age <= 25) || (ageFilter === "26-30" && age >= 26 && age <= 30);
    const matchLocation = locationFilter === "all" || p.location === locationFilter;
    const matchCommunity = communityFilter === "all" || p.caste === communityFilter;
    
    // Exclude admin profiles
    const notAdmin = !p.isAdmin && p.email !== 'admin@example.com';
    // Exclude current logged in user
    const notSelf = !user || p._id !== user._id;
    
    // Exclude same gender profiles for logged in users
    let matchGender = true;
    if (user && user.gender) {
      const targetGender = user.gender === 'Male' ? 'Female' : 'Male';
      matchGender = p.gender === targetGender;
    }
    
    return matchSearch && matchAge && matchLocation && matchCommunity && notAdmin && notSelf && matchGender;
  });

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* Search header */}
      <section className="gradient-hero py-10 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Find Your Match</h1>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-11 font-sans"
              />
            </div>
            <Select value={ageFilter} onValueChange={setAgeFilter}>
              <SelectTrigger className="w-full md:w-36 h-11 font-sans">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ages</SelectItem>
                <SelectItem value="20-25">20 – 25</SelectItem>
                <SelectItem value="26-30">26 – 30</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-40 h-11 font-sans">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {Array.from(new Set(profiles.map(p => p.location).filter(Boolean))).map((c: any) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={communityFilter} onValueChange={setCommunityFilter}>
              <SelectTrigger className="w-full md:w-40 h-11 font-sans">
                <SelectValue placeholder="Community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Communities</SelectItem>
                {Array.from(new Set(profiles.map(p => p.caste).filter(Boolean))).map((c: any) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground font-sans mt-3">{filtered.length} profiles found</p>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
             <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
             </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">No profiles found</h3>
              <p className="text-muted-foreground font-sans">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((profile) => (
                <div key={profile._id} className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all group overflow-hidden flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    {profile.profilePicture && profile.profilePicture !== 'https://via.placeholder.com/150' ? (
                       <img src={profile.profilePicture} alt={profile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center bg-primary/5">
                          <span className="text-4xl font-serif text-primary/40">{profile.name.charAt(0)}</span>
                       </div>
                    )}
                    
                    {profile.isVerified && (
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-card/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-sans font-semibold text-primary border border-primary/20">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-serif font-semibold text-lg text-foreground leading-tight truncate">{profile.name}</h3>
                      <span className="text-sm text-muted-foreground font-sans flex-shrink-0 ml-2">{calculateAge(profile.dob)} yrs</span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground font-sans mb-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 flex-shrink-0" /><span className="truncate">{profile.location || "Location not given"}</span></span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 flex-shrink-0" /><span className="truncate">{profile.occupation || "Profession unseen"}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-sans mb-3">
                      <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{profile.education || "Education unseen"}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-sans leading-relaxed line-clamp-2 mb-4 flex-1">
                      {profile.about ? profile.about : "No biography provided by the user yet."}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <Button onClick={() => handleViewProfile(profile)} size="sm" className="flex-1 gradient-primary text-primary-foreground border-0 font-sans text-xs shadow-brand active:scale-[0.98] transition-transform">
                        <Heart className="w-3.5 h-3.5 mr-1.5" /> Connect
                      </Button>
                      <Button onClick={() => handleViewProfile(profile)} size="sm" variant="outline" className="flex-1 border-primary text-primary font-sans text-xs hover:bg-pink-light active:scale-[0.98] transition-transform">
                        <Eye className="w-3.5 h-3.5 mr-1" /> View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Profile Details Modal for Premium/Admin */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-border flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <div className="sticky top-0 bg-card z-10 p-5 flex items-center justify-between border-b border-border">
              <h3 className="font-serif font-bold text-xl">Complete Profile Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProfile(null)} className="rounded-full w-8 h-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6">
               <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-border flex-shrink-0 bg-muted">
                    {selectedProfile.profilePicture && selectedProfile.profilePicture !== 'https://via.placeholder.com/150' ? (
                       <img src={selectedProfile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center font-serif text-4xl text-primary/40 bg-primary/5">{selectedProfile.name.charAt(0)}</div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 font-serif text-primary">
                       {selectedProfile.name}
                       {selectedProfile.isVerified && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm">{selectedProfile.email}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                       <span className="text-xs bg-muted/60 border border-border px-2 py-1 rounded shadow-sm text-muted-foreground">ID: {selectedProfile._id}</span>
                       {selectedProfile.isPremium && (
                         <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded shadow-sm font-medium">Premium Member</span>
                       )}
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  <div className="p-3 bg-muted/40 border border-border/50 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Gender & Age</div>
                    <div className="font-medium text-sm">{selectedProfile.gender || "Unspecified"} • {calculateAge(selectedProfile.dob)} yrs</div>
                  </div>
                  <div className="p-3 bg-muted/40 border border-border/50 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Height & Status</div>
                    <div className="font-medium text-sm">{selectedProfile.height || "Unspecified"} • {selectedProfile.maritalStatus || "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 border border-border/50 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Religion & Caste</div>
                    <div className="font-medium text-sm">{selectedProfile.religion || "Unspecified"} • {selectedProfile.caste || "Unspecified"}</div>
                  </div>
                   <div className="p-3 bg-muted/40 border border-border/50 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Location</div>
                    <div className="font-medium text-sm">{selectedProfile.location || "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 border border-border/50 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Education & Profession</div>
                    <div className="font-medium text-sm line-clamp-1">{selectedProfile.education || "Unspecified"} • {selectedProfile.occupation || "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 border border-border/50 rounded-lg">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">Income & Mother Tongue</div>
                    <div className="font-medium text-sm">{selectedProfile.income || "Unspecified"} • {selectedProfile.motherTongue || "Unspecified"}</div>
                  </div>
               </div>

               <div className="mt-6 p-5 bg-card/50 rounded-lg border border-border/60 shadow-inner">
                 <h4 className="text-sm font-semibold mb-2 font-serif text-primary">About User</h4>
                 <p className="text-sm text-foreground/80 leading-relaxed overflow-y-auto whitespace-pre-wrap">
                   {selectedProfile.about || "This user is a person of few words and hasn't written a biography yet."}
                 </p>
               </div>
            </div>

            <div className="p-5 border-t border-border bg-muted/30 flex justify-end gap-3 rounded-b-xl">
               <Button onClick={() => toast.success(`An interest request has been sent to ${selectedProfile.name}!`)} size="lg" className="gradient-primary text-primary-foreground border-0 shadow-brand font-semibold px-8 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  <Heart className="w-4 h-4 mr-2" fill="currentColor" /> Express Interest
               </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
