import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  addGuardianDetail,
  getMyGuardianDetails,
  type GuardianDetail
} from "@/api/educationStudentApi";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  UserCheck,
  Plus,
  Phone,
  User,
  Heart,
  Loader2,
  ShieldCheck,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const StudentGuardianPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: guardians, isLoading } = useQuery<GuardianDetail[]>({
    queryKey: ["student-guardians"],
    queryFn: getMyGuardianDetails,
  });

  const mutation = useMutation({
    mutationFn: (body: GuardianDetail) => addGuardianDetail(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-guardians"] });
      toast.success("Guardian added successfully!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add guardian");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
      guardianName: formData.get("guardianName"),
      guardianPhone: formData.get("guardianPhone"),
      guardianRelationship: formData.get("guardianRelationship"),
      isPrimary: formData.get("isPrimary") === "on",
    };
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Syncing guardian network...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            GUARDIAN <span className="text-emerald-500 not-italic">DETAILS</span>
          </h2>
          <p className="text-muted-foreground font-medium">Manage your emergency contacts and primary guardians</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-8 font-bold uppercase italic tracking-tighter shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Guardian
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-border/40 rounded-[2.5rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black italic uppercase tracking-tight">
                 New <span className="text-emerald-500">Guardian Record</span>
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Guardian Name</Label>
                  <Input name="guardianName" placeholder="Full Name" required className="rounded-2xl h-12 bg-background/50" />
               </div>
               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Phone Number</Label>
                  <Input name="guardianPhone" placeholder="+91 XXXX XXXX XX" required className="rounded-2xl h-12 bg-background/50" />
               </div>
               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Relationship</Label>
                  <select name="guardianRelationship" className="w-full h-12 bg-background/50 border border-border/40 rounded-2xl px-4 text-sm font-bold appearance-none">
                     <option value="Father">Father</option>
                     <option value="Mother">Mother</option>
                     <option value="Sibling">Sibling</option>
                     <option value="Other">Other</option>
                  </select>
               </div>
               <div className="flex items-center gap-3 bg-muted/20 p-4 rounded-2xl border border-border/40">
                  <input type="checkbox" name="isPrimary" className="h-5 w-5 rounded border-border/40 text-emerald-500 focus:ring-emerald-500/50" />
                  <Label className="text-xs font-bold uppercase tracking-wider opacity-70">Mark as Primary Guardian</Label>
               </div>
               <Button 
                type="submit" 
                disabled={mutation.isPending}
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-black uppercase italic tracking-widest shadow-xl shadow-emerald-500/20"
               >
                 {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Secure Record"}
               </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Guardians Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guardians?.map((guardian: GuardianDetail) => (
          <Card key={guardian._id} className="border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-xl group hover:border-emerald-500/30 transition-all duration-300">
             <CardContent className="p-8 pb-10">
                <div className="flex justify-between items-start mb-6">
                   <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 group-hover:rotate-6 transition-all duration-500">
                      <UserCheck className="h-8 w-8" />
                   </div>
                   {guardian.isPrimary && (
                      <Badge className="bg-emerald-600 text-white border-none font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1 radius-lg flex items-center gap-1.5 shadow-lg shadow-emerald-500/20">
                         <ShieldCheck className="h-3 w-3" />
                         Primary
                      </Badge>
                   )}
                </div>

                <div className="space-y-1 mb-6">
                   <h3 className="text-2xl font-black italic uppercase tracking-tight">{guardian.guardianName}</h3>
                   <div className="flex items-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">
                      <Heart className="h-3 w-3 text-emerald-500" />
                      {guardian.guardianRelationship}
                   </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border/40">
                   <div className="flex items-center justify-between group/row cursor-pointer hover:bg-muted/30 p-3 rounded-xl transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted/50 rounded-lg text-muted-foreground"><Phone className="h-3.5 w-3.5" /></div>
                        <span className="text-sm font-bold tracking-tight">{guardian.guardianPhone}</span>
                      </div>
                      <MoreVertical className="h-4 w-4 text-muted-foreground/30" />
                   </div>
                </div>
             </CardContent>
          </Card>
        ))}

        {guardians?.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-[3rem] border border-dashed border-border/60">
              <User className="h-16 w-16 text-muted-foreground/20 mb-6" />
              <h4 className="text-xl font-black italic uppercase tracking-wider text-muted-foreground/40">No guardians linked</h4>
              <p className="text-muted-foreground text-sm font-medium mt-2">Add at least one primary contact for emergency security.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default StudentGuardianPage;
