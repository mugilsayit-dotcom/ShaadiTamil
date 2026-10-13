import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Loader2, Users, CheckCircle, Trash2, Eye, X, ShieldAlert, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? "http://localhost:5000" : "");

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  isPremium: boolean;
  createdAt: string;
  gender?: string;
  dob?: string;
  phone?: string;
  location?: string;
  religion?: string;
  caste?: string;
  motherTongue?: string;
  height?: string;
  maritalStatus?: string;
  education?: string;
  occupation?: string;
  income?: string;
  about?: string;
  profilePicture?: string;
}

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        if (res.ok) setUsersList(data);
      } catch (error) {
        console.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user, isAuthenticated, navigate]);

  const handleVerify = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}/verify`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.ok) {
        setUsersList(usersList.map((u) => (u._id === id ? { ...u, isVerified: true } : u)));
        if (selectedUser?._id === id) {
           setSelectedUser({ ...selectedUser, isVerified: true });
        }
        toast.success("User profile verified successfully!");
      }
    } catch (error) {
      toast.error("Failed to verify user");
    }
  };

  const handleTogglePremium = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}/premium`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.ok) {
        const updated = await res.json();
        setUsersList(usersList.map((u) => (u._id === id ? { ...u, isPremium: updated.isPremium } : u)));
        if (selectedUser?._id === id) {
          setSelectedUser({ ...selectedUser, isPremium: updated.isPremium });
        }
        toast.success(updated.isPremium ? "User upgraded to Premium!" : "User downgraded to Free.");
      }
    } catch (error) {
      toast.error("Failed to update user membership");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.ok) {
        setUsersList(usersList.filter((u) => u._id !== id));
        if (selectedUser?._id === id) setSelectedUser(null);
        toast.success("User deleted successfully.");
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // Filtered logic
  const filteredUsers = usersList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (u.location && u.location.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (statusFilter === "all") return matchesSearch;
    if (statusFilter === "verified") return matchesSearch && u.isVerified;
    if (statusFilter === "pending") return matchesSearch && !u.isVerified;
    if (statusFilter === "premium") return matchesSearch && u.isPremium;
    if (statusFilter === "admin") return matchesSearch && u.isAdmin;
    return matchesSearch;
  });

  const totalUsers = usersList.length;
  const totalVerified = usersList.filter(u => u.isVerified).length;
  const totalPremium = usersList.filter(u => u.isPremium).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Matrimony Admin Hub</h1>
            <p className="text-sm text-muted-foreground font-sans mt-1">Platform management and operations console.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border shadow-sm rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase font-sans font-bold tracking-wide">Total Registered</div>
              <div className="text-2xl font-bold font-serif text-foreground mt-0.5">{totalUsers}</div>
            </div>
          </div>
          <div className="bg-card border border-border shadow-sm rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 border border-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase font-sans font-bold tracking-wide">Verified Accounts</div>
              <div className="text-2xl font-bold font-serif text-foreground mt-0.5">{totalVerified}</div>
            </div>
          </div>
          <div className="bg-card border border-border shadow-sm rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center animate-pulse">
              <Star className="w-6 h-6 text-amber-500 fill-current" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase font-sans font-bold tracking-wide">Premium Members</div>
              <div className="text-2xl font-bold font-serif text-foreground mt-0.5">{totalPremium}</div>
            </div>
          </div>
        </div>

        {/* Controls and Listing Card */}
        <div className="bg-card shadow-sm rounded-xl border border-border overflow-hidden">
          {/* Controls Bar */}
          <div className="p-6 border-b border-border bg-muted/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 font-sans text-sm"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 px-3 py-1 text-sm bg-background border border-border rounded-lg focus-visible:ring-primary font-sans outline-none w-full md:w-44"
              >
                <option value="all">All Members</option>
                <option value="verified">Verified Only</option>
                <option value="pending">Pending Verification</option>
                <option value="premium">Premium Members</option>
                <option value="admin">Administrators</option>
              </select>
            </div>
          </div>

          {/* User List */}
          <div className="divide-y divide-border">
            {filteredUsers.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground font-sans">
                <ShieldAlert className="w-10 h-10 mx-auto mb-2 text-muted-foreground/60" />
                No matches found in the registry.
              </div>
            ) : (
              filteredUsers.map((u) => (
                <div key={u._id} className="p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                     <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0 border border-border bg-primary/5">
                        {u.profilePicture && u.profilePicture !== 'https://via.placeholder.com/150' ? (
                          <img src={u.profilePicture} alt={u.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">{u.name.charAt(0)}</div>
                        )}
                     </div>
                    <div className="min-w-0">
                      <div className="font-semibold flex items-center gap-2 flex-wrap">
                         <span className="truncate">{u.name}</span>
                         {u.isAdmin && <span className="bg-primary/15 text-primary text-[10px] font-bold px-2 py-0.5 rounded">Admin</span>}
                         {u.isPremium && <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">Premium</span>}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{u.email}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">Joined: {new Date(u.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 justify-end">
                    <Button variant="secondary" size="sm" onClick={() => setSelectedUser(u)} className="whitespace-nowrap font-sans text-xs">
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>
                    
                    {u.isVerified ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-200 whitespace-nowrap">
                        <CheckCircle className="w-3.5 h-3.5" /> Verified
                      </span>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleVerify(u._id)} className="whitespace-nowrap font-sans text-xs hover:bg-green-50 hover:text-green-600 hover:border-green-300">
                        Verify Profile
                      </Button>
                    )}

                    {!u.isAdmin && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleTogglePremium(u._id)} 
                          className={`whitespace-nowrap font-sans text-xs ${u.isPremium ? "border-amber-400 text-amber-700 hover:bg-amber-50" : "border-border hover:bg-muted"}`}
                        >
                          <Star className={`w-3.5 h-3.5 mr-1 ${u.isPremium ? "text-amber-500 fill-current" : "text-muted-foreground"}`} />
                          {u.isPremium ? "Revoke Premium" : "Make Premium"}
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(u._id)} className="px-3">
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-border flex flex-col">
            <div className="sticky top-0 bg-card z-10 p-5 flex items-center justify-between border-b border-border">
              <h3 className="font-serif font-bold text-xl">User Details</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedUser(null)} className="rounded-full w-8 h-8">
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6">
               <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-border flex-shrink-0 bg-primary/5">
                    <img src={selectedUser.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2 font-serif text-primary">
                       {selectedUser.name}
                       {selectedUser.isVerified && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                    </h2>
                    <p className="text-muted-foreground text-sm font-sans">{selectedUser.email}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                       <span className="text-xs bg-muted px-2 py-1 rounded">ID: {selectedUser._id}</span>
                       <span className={`text-xs px-2 py-1 rounded font-sans font-medium ${selectedUser.isPremium ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-secondary text-secondary-foreground border border-border'}`}>
                         {selectedUser.isPremium ? "Premium Plan" : "Free Plan"}
                       </span>
                    </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 font-sans">
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5 tracking-wider">Gender & Age</div>
                    <div className="font-medium text-sm">{selectedUser.gender || "Unspecified"} • {selectedUser.dob ? new Date(selectedUser.dob).toLocaleDateString() : "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5 tracking-wider">Contact Phone</div>
                    <div className="font-medium text-sm">{selectedUser.phone || "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5 tracking-wider">Location</div>
                    <div className="font-medium text-sm">{selectedUser.location || "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5 tracking-wider">Religion & Caste</div>
                    <div className="font-medium text-sm">{selectedUser.religion || "Unspecified"} • {selectedUser.caste || "Unspecified"}</div>
                  </div>
                   <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5 tracking-wider">Education & Profession</div>
                    <div className="font-medium text-sm line-clamp-1">{selectedUser.education || "Unspecified"} • {selectedUser.occupation || "Unspecified"}</div>
                  </div>
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50">
                    <div className="text-[10px] text-muted-foreground uppercase font-semibold mb-0.5 tracking-wider">Income & MT</div>
                    <div className="font-medium text-sm">{selectedUser.income || "Unspecified"} • {selectedUser.motherTongue || "Unspecified"}</div>
                  </div>
               </div>

               {selectedUser.about && (
                 <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                   <h4 className="text-sm font-semibold mb-2 font-serif text-primary">About User</h4>
                   <p className="text-sm text-foreground/80 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap font-sans">{selectedUser.about}</p>
                 </div>
               )}
            </div>

            <div className="p-5 border-t border-border bg-muted/20 flex justify-end gap-3 rounded-b-xl">
               {!selectedUser.isAdmin && (
                  <Button 
                    variant="outline" 
                    onClick={() => { handleTogglePremium(selectedUser._id); }}
                    className="font-sans text-sm border-amber-400 text-amber-700 hover:bg-amber-50"
                  >
                    <Star className="w-4 h-4 mr-1.5 fill-current text-amber-500" />
                    {selectedUser.isPremium ? "Revoke Premium" : "Make Premium"}
                  </Button>
               )}
               {!selectedUser.isVerified && (
                  <Button variant="default" onClick={() => handleVerify(selectedUser._id)} className="gradient-primary text-white border-0 shadow-brand font-sans text-sm">Verify Profile</Button>
               )}
               {!selectedUser.isAdmin && (
                  <Button variant="destructive" onClick={() => handleDelete(selectedUser._id)} className="font-sans text-sm">Delete Profile</Button>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
