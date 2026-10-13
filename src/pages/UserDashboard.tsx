import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Loader2, User as UserIcon, Settings, Heart, Camera, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? "http://localhost:5000" : "");

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchProfile();
  }, [user, isAuthenticated, navigate]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setFormData(data);
      }
    } catch (error) {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground">Account Management</h1>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => { setIsEditing(false); setFormData(profile); }}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
                Save Changes
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <div className="bg-card rounded-xl shadow-sm border border-border p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4 group">
                  {(isEditing ? formData?.profilePicture : profile?.profilePicture) && 
                   ((isEditing ? formData?.profilePicture : profile?.profilePicture).startsWith('http') || 
                    (isEditing ? formData?.profilePicture : profile?.profilePicture).startsWith('data:')) ? (
                   <img src={isEditing ? formData.profilePicture : profile?.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-primary/20" />
                  ) : (
                   <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary/20 overflow-hidden">
                     <UserIcon className="w-12 h-12 text-primary" />
                   </div>
                  )}
                  {isEditing && (
                     <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                       <Camera className="w-6 h-6 text-white mb-1" />
                       <input 
                         type="file" 
                         accept="image/*" 
                         className="hidden" 
                         onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                             const reader = new FileReader();
                             reader.onloadend = () => {
                               setFormData({...formData, profilePicture: reader.result as string});
                             };
                             reader.readAsDataURL(file);
                           }
                         }}
                       />
                     </label>
                  )}
              </div>

              {isEditing && (
                <div className="mb-4 text-left space-y-3">
                  <div>
                    <Label className="text-xs font-semibold mb-1 block">Upload Profile Photo</Label>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData({...formData, profilePicture: reader.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                      className="h-9 text-xs file:bg-primary file:text-white file:border-0 file:rounded-md file:px-2 file:py-0.5 cursor-pointer font-sans" 
                    />
                  </div>
                  <div className="text-center text-xs text-muted-foreground font-sans">— OR —</div>
                  <div>
                    <Label className="text-xs font-semibold mb-1 block">Paste Photo URL</Label>
                    <Input 
                      type="url" 
                      placeholder="https://example.com/photo.jpg" 
                      value={formData.profilePicture || ""} 
                      onChange={(e) => setFormData({...formData, profilePicture: e.target.value})} 
                      className="h-8 text-xs font-sans" 
                    />
                  </div>
                </div>
              )}

              <h2 className="font-sans font-bold text-xl">{profile?.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{profile?.email}</p>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs font-semibold text-primary/80 uppercase tracking-wide">Profile Status</div>
                <div className="mt-2 text-sm">
                  {profile?.isVerified ? (
                    <span className="flex items-center justify-center gap-1 text-green-600 font-medium"><Check className="w-4 h-4"/> Verified</span>
                  ) : "⏳ Pending Verification"}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-sm border border-border p-4">
              <ul className="space-y-2">
                <li>
                  <Button variant={isEditing ? "secondary" : "ghost"} className="w-full justify-start text-sm font-medium" onClick={() => setIsEditing(true)}>
                    <UserIcon className="w-4 h-4 mr-2" /> Personal Details
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start text-sm font-medium" onClick={() => navigate("/search")}>
                    <Heart className="w-4 h-4 mr-2" /> Find Matches
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" className="w-full justify-start text-sm font-medium text-muted-foreground">
                    <Settings className="w-4 h-4 mr-2" /> Account Settings
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30">
                <h3 className="font-serif text-xl font-bold">Personal Information</h3>
              </div>
              
              <div className="p-6">
                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Full Name</Label>
                      <Input value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Contact Number</Label>
                      <Input value={formData.phone || ""} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="+91" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Location (City)</Label>
                      <Input value={formData.location || ""} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g. Chennai" />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Date of Birth</Label>
                      <Input type="date" value={formData.dob ? formData.dob.split('T')[0] : ""} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Height (e.g. 5'8")</Label>
                      <Input value={formData.height || ""} onChange={(e) => setFormData({...formData, height: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Marital Status</Label>
                      <select className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm" value={formData.maritalStatus || ""} onChange={(e) => setFormData({...formData, maritalStatus: e.target.value})}>
                        <option value="">Unspecified</option>
                        <option value="Never Married">Never Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                       <Label className="text-xs font-semibold mb-1.5 block">About Me</Label>
                       <textarea 
                          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[100px]" 
                          value={formData.about || ""} 
                          onChange={(e) => setFormData({...formData, about: e.target.value})}
                          placeholder="Tell us about yourself..."
                       />
                    </div>
                    <h4 className="sm:col-span-2 font-serif text-lg font-bold mt-4 border-b pb-2">Religious & Professional Info</h4>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Religion</Label>
                      <Input value={formData.religion || ""} onChange={(e) => setFormData({...formData, religion: e.target.value})} />
                    </div>
                     <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Caste</Label>
                      <Input value={formData.caste || ""} onChange={(e) => setFormData({...formData, caste: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Mother Tongue</Label>
                      <Input value={formData.motherTongue || ""} onChange={(e) => setFormData({...formData, motherTongue: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Education</Label>
                      <Input value={formData.education || ""} onChange={(e) => setFormData({...formData, education: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Profession</Label>
                      <Input value={formData.occupation || ""} onChange={(e) => setFormData({...formData, occupation: e.target.value})} />
                    </div>
                    <div>
                      <Label className="text-xs font-semibold mb-1.5 block">Annual Income</Label>
                      <Input value={formData.income || ""} onChange={(e) => setFormData({...formData, income: e.target.value})} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Gender</div>
                      <div className="font-medium text-sm">{profile?.gender || "Not specified"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Date of Birth</div>
                      <div className="font-medium text-sm">{profile?.dob ? new Date(profile.dob).toLocaleDateString() : "Not specified"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Height & Marital Status</div>
                      <div className="font-medium text-sm">{profile?.height || "N/A"} • {profile?.maritalStatus || "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Location Contact</div>
                      <div className="font-medium text-sm">{profile?.location || "N/A"} • {profile?.phone || "N/A"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Religion & Caste</div>
                      <div className="font-medium text-sm">{profile?.religion || "N/A"} • {profile?.caste || "N/A"}</div>
                    </div>
                     <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Mother Tongue</div>
                      <div className="font-medium text-sm">{profile?.motherTongue || "Not specified"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Education</div>
                      <div className="font-medium text-sm">{profile?.education || "Not specified"}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Profession</div>
                      <div className="font-medium text-sm">{profile?.occupation || "Not specified"}</div>
                    </div>
                    <div className="sm:col-span-2 mt-2 p-4 bg-muted/20 rounded-lg">
                      <div className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">About Me</div>
                      <div className="font-medium text-sm leading-relaxed whitespace-pre-wrap">{profile?.about || "Add a bio to highlight your profile."}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
