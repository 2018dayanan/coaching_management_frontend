import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Calendar,
  CheckCircle,
  User as UserIcon,
  FileText,
  Clock,
  ExternalLink,
  MessageSquare,
  Award,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentDetail, reviewSubmission } from "@/api/educationTeacherApi";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TeacherStudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedTaskIdx, setSelectedTaskIdx] = useState<number | null>(null);
  const [reviewMarks, setReviewMarks] = useState<number>(0);
  const [reviewRemark, setReviewRemark] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher-student-detail", id],
    queryFn: () => getStudentDetail(id as string),
    enabled: !!id,
  });

  const reviewMutation = useMutation({
    mutationFn: ({ submissionId, body }: { submissionId: string, body: any }) => 
      reviewSubmission(submissionId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-student-detail", id] });
      toast.success("Submission reviewed successfully!");
      setSelectedTaskIdx(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  });

  if (isLoading) return <div className="p-12 text-center animate-pulse font-medium text-primary">Syncing student profile from server...</div>;
  if (error || !data || !data.student) return (
    <div className="p-12 text-center space-y-4">
      <div className="bg-destructive/10 p-8 rounded-3xl border border-destructive/20 inline-block max-w-md">
        <h3 className="text-xl font-bold text-destructive mb-2 uppercase italic tracking-tight">Data Sync Error</h3>
        <p className="text-sm text-muted-foreground font-medium">We couldn't retrieve the full student profile. Some academic records might be missing or inaccessible.</p>
        <Button variant="ghost" className="mt-4 font-bold text-destructive" onClick={() => navigate("/teacher/dashboard/students")}>Back to Directory</Button>
      </div>
    </div>
  );

  const { student, tasks_summary, tasks, enrolled_batches } = data;
  const currentTask = selectedTaskIdx !== null ? tasks[selectedTaskIdx] : null;

  const handleSubmitReview = () => {
    if (!currentTask?.task_id) return;
    reviewMutation.mutate({
      submissionId: currentTask.task_id, // Documentation says reviewSubmission(submission_id, body)
      body: { marks: reviewMarks, remark: reviewRemark }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/teacher/dashboard/students")}
          className="rounded-full h-12 w-12 border-border/40 hover:bg-muted/50"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-black tracking-tight uppercase italic">{student.name}</h2>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            Student ID: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{student.unique_id}</code>
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Profile Sidebar */}
        <Card className="lg:col-span-1 border-border/40 bg-card/30 backdrop-blur-md shadow-xl rounded-3xl overflow-hidden h-fit">
          <div className="h-24 bg-gradient-to-r from-indigo-500/20 to-violet-500/20" />
          <CardContent className="-mt-12 flex flex-col items-center pb-8">
            <div className="w-24 h-24 rounded-3xl bg-background border-4 border-background shadow-2xl overflow-hidden flex items-center justify-center mb-4">
              {student.profile_picture ? (
                <img src={student.profile_picture} alt={student.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-12 h-12 text-muted-foreground" />
              )}
            </div>
            
            <h3 className="text-xl font-bold text-center">{student.name}</h3>
            <div className="flex items-center gap-1.5 text-indigo-400 font-bold uppercase text-[10px] tracking-widest mt-2 bg-indigo-400/10 px-3 py-1 rounded-full border border-indigo-400/20">
              <CheckCircle className="h-3 w-3" />
              ACTIVE STUDENT
            </div>

            <div className="w-full space-y-4 mt-8 pt-6 border-t border-border/40">
              <div className="flex items-center gap-3 text-sm font-medium">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Enrolled {new Date(student.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Areas */}
        <div className="lg:col-span-3 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="bg-muted/20 border-border/40 rounded-2xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground">Assigned Tasks</CardDescription>
                <CardTitle className="text-3xl font-black">{tasks_summary.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-emerald-500/5 border-emerald-500/20 rounded-2xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-bold uppercase text-emerald-500/70">Submissions</CardDescription>
                <CardTitle className="text-3xl font-black text-emerald-600">{tasks_summary.submitted}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="bg-orange-500/5 border-orange-500/20 rounded-2xl">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-bold uppercase text-orange-500/70">Pending</CardDescription>
                <CardTitle className="text-3xl font-black text-orange-600">{tasks_summary.pending}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card className="border-border/40 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/10 border-b border-border/40">
              <CardTitle>Academic Progress</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="submissions">
                <TabsList className="bg-muted/30 p-1 rounded-xl mb-6">
                  <TabsTrigger value="submissions" className="rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Assignments & Reviews</TabsTrigger>
                  <TabsTrigger value="batches" className="rounded-lg font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Class Batches</TabsTrigger>
                </TabsList>
                
                <TabsContent value="submissions">
                  <div className="space-y-4">
                    {tasks.map((task, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          task.is_submitted 
                            ? "bg-card hover:border-indigo-400/50 cursor-pointer" 
                            : "bg-muted/10 grayscale opacity-60"
                        } ${selectedTaskIdx === idx ? "border-indigo-500 ring-2 ring-indigo-500/10 shadow-lg" : "border-border/40"}`}
                        onClick={() => task.is_submitted && setSelectedTaskIdx(idx)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl ${task.is_submitted ? "bg-indigo-500/10 text-indigo-500" : "bg-muted text-muted-foreground"}`}>
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-base">{task.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium mt-1">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {task.is_submitted ? "Submitted" : "Not yet submitted"}
                              </span>
                              {task.submission?.review_status === "reviewed" && (
                                <span className="flex items-center gap-1 text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                                  <Award className="h-3.5 w-3.5" />
                                  Graded: {task.submission.marks}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        {task.is_submitted && (
                          <div className="flex items-center gap-2">
                             {task.submission?.review_status === "reviewed" ? (
                               <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 bg-emerald-500/5 px-3 py-1 rounded-lg uppercase text-[10px] font-black">Reviewed</Badge>
                             ) : (
                               <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20 px-3 py-1 rounded-lg uppercase text-[10px] font-black">Needs Review</Badge>
                             )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Review Modal-like section */}
                  {selectedTaskIdx !== null && currentTask && (
                    <div className="mt-8 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl animate-in zoom-in-95 duration-300">
                       <div className="flex justify-between items-center mb-6">
                         <h3 className="text-xl font-bold flex items-center gap-2 italic uppercase tracking-tight">
                           <MessageSquare className="h-5 w-5 text-indigo-500" />
                           REVIEW: <span className="not-italic text-indigo-500">{currentTask.title}</span>
                         </h3>
                         <Button variant="ghost" size="sm" onClick={() => setSelectedTaskIdx(null)} className="rounded-full">Cancel</Button>
                       </div>

                       <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                             <div>
                               <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-widest ml-1 mb-2 block">Submission File</Label>
                               <div className="p-4 bg-background border border-border/40 rounded-2xl flex items-center justify-between">
                                 <div className="flex items-center gap-2 text-sm font-medium">
                                   <FileText className="h-4 w-4 text-indigo-500" />
                                   submission_file.pdf
                                 </div>
                                 <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg text-indigo-500 hover:text-indigo-600 hover:bg-indigo-500/5">
                                   <ExternalLink className="h-4 w-4" />
                                   Open
                                 </Button>
                               </div>
                             </div>
                             <div>
                               <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-widest ml-1 mb-2 block">Assign Marks (0-100)</Label>
                               <Input 
                                 type="number" 
                                 value={reviewMarks} 
                                 onChange={(e) => setReviewMarks(parseInt(e.target.value))}
                                 placeholder="e.g. 85" 
                                 className="rounded-xl h-12 bg-background/50"
                               />
                             </div>
                          </div>
                          <div className="space-y-4">
                             <div>
                               <Label className="uppercase text-[10px] font-black text-muted-foreground tracking-widest ml-1 mb-2 block">Feedback / Remarks</Label>
                               <Textarea 
                                 value={reviewRemark}
                                 onChange={(e) => setReviewRemark(e.target.value)}
                                 placeholder="Provide guidance to the student..." 
                                 className="rounded-2xl min-h-[120px] bg-background/50 pt-4"
                               />
                             </div>
                             <Button 
                               onClick={handleSubmitReview}
                               disabled={reviewMutation.isPending}
                               className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 font-bold"
                             >
                               {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                             </Button>
                          </div>
                       </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="batches" className="pt-2">
                   <div className="grid gap-4 mt-2">
                     {enrolled_batches.map((eb, idx) => (
                       <div key={idx} className="p-4 bg-muted/20 border border-border/40 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                               <Calendar className="h-5 w-5 text-emerald-500" />
                             </div>
                             <div>
                               <div className="font-bold text-sm uppercase italic tracking-tight">{eb.batch?.name || "N/A"}</div>
                               <div className="text-xs text-muted-foreground font-medium">{eb.batch?.subject || "No Subject"}</div>
                             </div>
                          </div>
                          <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-600 bg-emerald-500/5">Active Enrollment</Badge>
                       </div>
                     ))}
                   </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentDetail;
