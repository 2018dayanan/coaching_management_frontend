import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, updateStudentProfile, type StudentProfile } from "@/api/educationStudentApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Shield,
  Camera,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const StudentProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading } = useQuery<StudentProfile>({
    queryKey: ["student-profile"],
    queryFn: getMyProfile,
  });

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => updateStudentProfile(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-profile"] });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Fetching your profile...
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            MY <span className="text-emerald-500 not-italic">PROFILE</span>
          </h2>
          <p className="text-muted-foreground font-medium">Manage your identity and contact details</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className={isEditing ? "rounded-xl" : "bg-emerald-600 hover:bg-emerald-700 rounded-xl px-8 font-bold uppercase italic tracking-tighter shadow-lg shadow-emerald-500/20"}
        >
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden relative shadow-2xl shadow-black/5">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-emerald-500/20 via-emerald-600/10 to-transparent" />
          <CardContent className="pt-16 flex flex-col items-center text-center relative z-10">
            {/* Avatar with Upload */}
            <div className="relative group">
              <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-600 grid place-content-center text-white text-4xl font-black shadow-2xl shadow-emerald-500/30 ring-4 ring-background overflow-hidden relative">
                {profile.profile_picture ? (
                  <img src={profile.profile_picture} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              {isEditing && (
                 <label className="absolute bottom-1 right-1 p-3 bg-emerald-600 rounded-2xl text-white shadow-xl cursor-pointer hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95 group-hover:rotate-6">
                    <Camera className="h-4 w-4" />
                    <input type="file" name="profile_picture" className="hidden" accept="image/*" />
                 </label>
              )}
            </div>

            <h3 className="text-2xl font-black mt-6 tracking-tight uppercase italic truncate w-full px-4">{profile.name}</h3>
            <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase opacity-60">@{profile.unique_id}</p>
            
            <Badge className="mt-4 font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-none">
              <Shield className="h-3 w-3 mr-2" />
              {profile.role}
            </Badge>

            <div className="w-full border-t border-border/40 mt-8 pt-6 space-y-4">
               <div className="flex items-center gap-4 text-left">
                  <div className="p-2.5 bg-muted/50 rounded-xl text-muted-foreground"><CalendarDays className="h-4 w-4" /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Enrolled Since</p>
                    <p className="text-xs font-bold">{new Date(profile.createdAt).toLocaleDateString()}</p>
                  </div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Section */}
        <Card className="lg:col-span-2 border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/5">
           <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8 px-10">
              <CardTitle className="text-xl font-bold italic uppercase tracking-tight flex items-center gap-3">
                 <User className="h-5 w-5 text-emerald-500" />
                 Account <span className="text-emerald-500">Details</span>
              </CardTitle>
           </CardHeader>
           <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2.5">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Full Name</Label>
                      <Input 
                        name="name"
                        defaultValue={profile.name} 
                        disabled={!isEditing} 
                        className="h-14 bg-background/50 border-border/40 text-base font-bold rounded-2xl focus:ring-emerald-500/50"
                      />
                   </div>
                   <div className="space-y-2.5">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-50" />
                        <Input 
                          value={profile.email} 
                          disabled 
                          className="h-14 pl-12 bg-muted/20 border-border/40 text-base font-bold rounded-2xl"
                        />
                      </div>
                   </div>
                   <div className="space-y-2.5">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Mobile Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground opacity-50" />
                        <Input 
                          name="mobile"
                          defaultValue={profile.mobile} 
                          disabled={!isEditing} 
                          className="h-14 pl-12 bg-background/50 border-border/40 text-base font-bold rounded-2xl"
                        />
                      </div>
                   </div>
                   <div className="space-y-2.5">
                      <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">Gender</Label>
                      <select 
                        name="gender"
                        defaultValue={profile.gender}
                        disabled={!isEditing}
                        className="w-full h-14 bg-background/50 border-border/40 rounded-2xl px-4 text-base font-bold appearance-none disabled:opacity-100 disabled:bg-muted/20"
                      >
                         <option value="male">Male</option>
                         <option value="female">Female</option>
                         <option value="other">Other</option>
                      </select>
                   </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end pt-4">
                    <Button 
                      type="submit" 
                      disabled={updateMutation.isPending}
                      className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-10 h-14 font-black uppercase italic tracking-tighter shadow-xl shadow-emerald-500/30 flex items-center gap-2"
                    >
                       {updateMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
                       Save Transformations
                    </Button>
                  </div>
                )}
              </form>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfilePage;
