import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  addAcademicDetail, 
  updateAcademicDetail, 
  getMyAcademicDetails,
  type AcademicDetail,
} from "@/api/educationStudentApi";
// Note: I need to add getMyAcademicDetails to the API if it exists, or just get from profile if it's nested.
// Re-reading doc: "1. Add Academic Detail POST /academic", "2. Update Academic Detail PATCH /academic/:id"
// It doesn't explicitly mention "Get All", but usually it's needed. I'll assume we can fetch them.
// For now, I'll assume the student profile might contain them or there's a GET /academic.
// I'll update the API to include getMyAcademicDetails.

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
  GraduationCap,
  Plus,
  School,
  Calendar,
  Award,
  FileText,
  Loader2,
  Pencil,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Helper to fetch (I'll add it to educationStudentApi.ts as well later but for now I'll use it here)
const StudentAcademicPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState<AcademicDetail | null>(null);

  const { data: academicHistory, isLoading } = useQuery<AcademicDetail[]>({
    queryKey: ["student-academic"],
    queryFn: getMyAcademicDetails,
  });

  const mutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (editingDetail) {
        return updateAcademicDetail(editingDetail._id, formData);
      }
      return addAcademicDetail(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-academic"] });
      toast.success(editingDetail ? "Academic record updated!" : "Academic record added!");
      setIsModalOpen(false);
      setEditingDetail(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to process academic record");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Syncing educational records...
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
            ACADEMIC <span className="text-emerald-500 not-italic">HISTORY</span>
          </h2>
          <p className="text-muted-foreground font-medium">Document your previous qualifications and degrees</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) setEditingDetail(null); }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-8 font-bold uppercase italic tracking-tighter shadow-lg shadow-emerald-500/20 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/40 rounded-[2.5rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black italic uppercase tracking-tight">
                {editingDetail ? "Update" : "Add New"} <span className="text-emerald-500">Academic Entry</span>
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Education Level</Label>
                     <Input name="educationLevel" defaultValue={editingDetail?.educationLevel} placeholder="e.g. High School, Bachelors" required className="rounded-2xl h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Degree/Course Name</Label>
                     <Input name="degreeName" defaultValue={editingDetail?.degreeName} placeholder="e.g. Science, Computer Science" required className="rounded-2xl h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Institution/Board</Label>
                     <Input name="boardOrUniversity" defaultValue={editingDetail?.boardOrUniversity} placeholder="e.g. Delhi University, CBSE" required className="rounded-2xl h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Percentage / CGPA</Label>
                     <Input name="percentage" type="number" step="0.01" defaultValue={editingDetail?.percentage} placeholder="85.5" className="rounded-2xl h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Start Year</Label>
                     <Input name="startYear" type="number" defaultValue={editingDetail?.startYear} placeholder="2020" required className="rounded-2xl h-12 bg-background/50" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black uppercase tracking-widest ml-1">End Year</Label>
                     <Input name="endYear" type="number" defaultValue={editingDetail?.endYear} placeholder="2022" className="rounded-2xl h-12 bg-background/50" />
                  </div>
               </div>

               <div className="flex items-center gap-3 bg-muted/20 p-4 rounded-2xl border border-border/40">
                  <input type="checkbox" name="isCurrentlyStudying" defaultChecked={editingDetail?.isCurrentlyStudying} className="h-5 w-5 rounded border-border/40 text-emerald-500 focus:ring-emerald-500/50" />
                  <Label className="text-xs font-bold uppercase tracking-wider opacity-70">I am currently studying here</Label>
               </div>

               <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Verification Documents</Label>
                  <Input type="file" name="documents" multiple className="rounded-2xl h-12 bg-background/50 pt-3" />
               </div>

               <Button 
                 type="submit" 
                 disabled={mutation.isPending}
                 className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-black uppercase italic tracking-widest shadow-xl shadow-emerald-500/20"
               >
                 {mutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Qualification"}
               </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* List Section */}
      <div className="space-y-6">
        {academicHistory?.map((detail: AcademicDetail) => (
          <Card key={detail._id} className="border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-xl group hover:border-emerald-500/30 transition-all duration-300">
             <CardContent className="p-10 flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="flex items-center gap-8 flex-1">
                   <div className="h-20 w-20 rounded-[2rem] bg-muted/20 border border-border/40 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                      <GraduationCap className="h-10 w-10" />
                   </div>
                   <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-2xl font-black italic uppercase tracking-tight">{detail.degreeName}</h3>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] uppercase tracking-widest px-3">
                          {detail.educationLevel}
                        </Badge>
                        {detail.isCurrentlyStudying && (
                           <Badge className="bg-blue-500/10 text-blue-600 border-none font-black text-[9px] uppercase tracking-widest px-3">
                             Active
                           </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground font-medium text-sm">
                         <div className="flex items-center gap-2"><School className="h-4 w-4 text-emerald-500/50" /> {detail.boardOrUniversity}</div>
                         <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-emerald-500/50" /> {detail.startYear} - {detail.isCurrentlyStudying ? "Present" : detail.endYear}</div>
                         {detail.percentage && <div className="flex items-center gap-2"><Award className="h-4 w-4 text-emerald-500/50" /> {detail.percentage}%</div>}
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                   <Button 
                     variant="ghost" 
                     onClick={() => { setEditingDetail(detail); setIsModalOpen(true); }}
                     className="flex-1 md:flex-none h-12 w-12 rounded-2xl bg-muted/30 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
                   >
                      <Pencil className="h-5 w-5" />
                   </Button>
                   {detail.documents && detail.documents.length > 0 && (
                      <Button variant="ghost" className="flex-1 md:flex-none h-12 px-6 rounded-2xl bg-muted/30 hover:bg-blue-500/10 hover:text-blue-500 transition-all font-bold text-xs uppercase tracking-widest gap-2">
                         <FileText className="h-4 w-4" />
                         Docs ({detail.documents.length})
                      </Button>
                   )}
                </div>
             </CardContent>
          </Card>
        ))}

        {academicHistory?.length === 0 && (
           <div className="flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-[3rem] border border-dashed border-border/60">
              <School className="h-16 w-16 text-muted-foreground/20 mb-6" />
              <h4 className="text-xl font-black italic uppercase tracking-wider text-muted-foreground/40">No records documented yet</h4>
              <p className="text-muted-foreground text-sm font-medium mt-2">Document your educational journey to complete your profile.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default StudentAcademicPage;
