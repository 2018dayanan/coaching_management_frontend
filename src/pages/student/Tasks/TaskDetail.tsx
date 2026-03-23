import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { 
  getTaskDetail, 
  getMySubmission, 
  submitTask, 
  updateSubmission,
  type StudentTask,
  type TaskSubmission
} from "@/api/educationStudentApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Clock,
  FileText,
  Upload,
  Send,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  History,
  Award,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const StudentTaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: task, isLoading: taskLoading } = useQuery<StudentTask>({
    queryKey: ["student-task", id],
    queryFn: () => getTaskDetail(id!),
    enabled: !!id,
  });

  const { data: submission, isLoading: subLoading } = useQuery<TaskSubmission>({
    queryKey: ["student-submission", id],
    queryFn: () => getMySubmission(id!),
    enabled: !!id,
    retry: false, // It might not exist yet
  });

  const submissionMutation = useMutation({
    mutationFn: (formData: FormData) => {
      if (submission) {
        return updateSubmission(id!, formData);
      }
      return submitTask(id!, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-submission", id] });
      toast.success(submission ? "Submission updated!" : "Task submitted successfully!");
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to submit task");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    submissionMutation.mutate(formData);
  };

  if (taskLoading || subLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Loading mission intelligence...
        </div>
      </div>
    );
  }

  if (!task) return null;

  const isReviewed = submission?.review_status === "reviewed";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      {/* Back & Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="rounded-xl px-4 font-bold uppercase italic tracking-tighter text-muted-foreground hover:text-emerald-500 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-3" />
          Return to Deck
        </Button>
        {submission && (
           <Badge className={`px-6 py-2 rounded-xl font-black text-xs uppercase tracking-[0.2em] border-none shadow-lg
             ${isReviewed ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-amber-500 text-white shadow-amber-500/20'}
           `}>
             {isReviewed ? 'Mission Accomplished (Reviewed)' : 'Pending Review'}
           </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Task Info */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/5">
             <CardHeader className="bg-muted/20 pb-8 pt-10 px-10 border-b border-border/40">
                <div className="flex justify-between items-start mb-6">
                   <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-black uppercase tracking-widest px-4">
                      {task.subject}
                   </Badge>
                   <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      Assigned {new Date(task.assigned_date).toLocaleDateString()}
                   </div>
                </div>
                <CardTitle className="text-4xl font-black italic uppercase tracking-tight text-foreground mb-4">
                   {task.title}
                </CardTitle>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">
                         Deadline: {new Date(task.due_date).toLocaleDateString()}
                      </span>
                   </div>
                   <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-600">
                      <History className="h-4 w-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                         {task.batch_id?.name}
                      </span>
                   </div>
                </div>
             </CardHeader>
             <CardContent className="p-10 text-muted-foreground font-medium leading-relaxed italic text-lg whitespace-pre-wrap">
                {task.description}
                
                {task.attachment_url && (
                   <div className="mt-12 p-6 bg-muted/20 border border-border/40 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-muted/30 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-xl">
                            <FileText className="h-6 w-6" />
                         </div>
                         <div>
                            <div className="text-xs font-black uppercase tracking-widest opacity-40">Attachment Provided</div>
                            <div className="text-sm font-bold text-foreground">View Reference Material</div>
                         </div>
                      </div>
                      <a href={task.attachment_url} target="_blank" rel="noopener noreferrer">
                         <ExternalLink className="h-5 w-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                   </div>
                )}
             </CardContent>
          </Card>

          {/* Review Section (If reviewed) */}
          {isReviewed && (
             <Card className="border-emerald-500/30 rounded-[2.5rem] bg-emerald-500/5 backdrop-blur-md overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-[0.05]">
                   <CheckCircle2 className="h-32 w-32 rotate-12" />
                </div>
                <CardHeader className="p-10 pb-6">
                   <CardTitle className="text-2xl font-black italic uppercase tracking-tight text-emerald-600 flex items-center gap-4">
                      <Award className="h-6 w-6" />
                      Instructor <span className="text-foreground">Feedback</span>
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-0 space-y-6">
                   <div className="flex items-center gap-8">
                      <div className="p-6 bg-white rounded-[2rem] shadow-xl text-center min-w-[120px]">
                         <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">Grade</div>
                         <div className="text-4xl font-black italic text-emerald-600">{submission?.marks || '--'}</div>
                      </div>
                      <div className="flex-1">
                         <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600/60 mb-2">Remarks</div>
                         <p className="font-bold italic text-foreground/80 leading-relaxed capitalize">
                            "{submission?.remark || 'Exceptional performance. The logic is clean and implementation follows all best practices.'}"
                         </p>
                      </div>
                   </div>
                </CardContent>
             </Card>
          )}
        </div>

        {/* Right: Submission Form */}
        <div className="space-y-8">
           <Card className={`border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/5
             ${isReviewed ? 'opacity-70 pointer-events-none grayscale-[0.3]' : ''}
           `}>
              <CardHeader className="border-b border-border/40 bg-muted/20 py-8 px-8">
                 <CardTitle className="text-xl font-bold italic uppercase tracking-tight">
                    {submission ? 'Re-submit' : 'Submit'} <span className="text-emerald-500">Your Work</span>
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Submission Notes</Label>
                       <Textarea 
                         name="submission_text" 
                         defaultValue={submission?.submission_text}
                         placeholder="Explain your approach or provide links..." 
                         required
                         className="rounded-2xl min-h-[120px] bg-background/50 border-border/40 focus:ring-emerald-500/50" 
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest ml-1">HTML Artifact (Optional)</Label>
                       <Textarea 
                         name="content_html"
                         defaultValue={submission?.content_html}
                         placeholder="<p>Detailed formatted documentation...</p>" 
                         className="rounded-2xl h-24 bg-background/50 border-border/40 font-mono text-xs opacity-60" 
                       />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[10px] font-black uppercase tracking-widest ml-1">Evidence / Attachments</Label>
                       <div className="relative group">
                          <Input 
                            type="file" 
                            name="attachments" 
                            multiple 
                            className="rounded-2xl h-24 bg-background/50 border-dashed border-2 border-border/40 pt-9 flex items-center justify-center cursor-pointer hover:border-emerald-500/30 transition-colors" 
                          />
                          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                             <Upload className="h-6 w-6 text-emerald-500 mb-1" />
                             <span className="text-[9px] font-black uppercase tracking-widest">Drop Files or Click</span>
                          </div>
                       </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting || isReviewed}
                      className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black uppercase italic tracking-widest shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
                    >
                       {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                       {submission ? 'Update Deployment' : 'Deploy Submission'}
                    </Button>
                 </form>
              </CardContent>
           </Card>

           {isReviewed && (
              <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-[2rem] flex items-start gap-4 italic font-medium text-amber-700 text-sm">
                 <AlertTriangle className="h-5 w-5 shrink-0" />
                 This task has been reviewed. Modifications to the submission are now locked.
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default StudentTaskDetailPage;
