import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getClassById } from "@/api/educationClassApi";
import { getBatchById } from "@/api/educationBatchApi";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
} from "@/components/ui/card";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  ExternalLink,
  User,
  BookOpen,
  Mail,
  Hash
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import DotsLoader from "@/components/ui/dotsLoader";

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: rawData, isLoading: isLoadingClass, error: classError } = useQuery({
    queryKey: ["education-class", id],
    queryFn: () => getClassById(id!),
    enabled: !!id,
  });

  // Handle case where API might return an array (as shown in user example) or a single object
  const classData = Array.isArray(rawData) ? rawData[0] : rawData;

  // Extract IDs for batch fetching - handle both string and populated object
  const batchId = typeof classData?.batch_id === 'object' ? classData.batch_id._id : (classData?.batch_id || classData?.batch?._id);

  // Once we have classData, we can fetch the full batch details to see enrolled students
  const { data: batchData, isLoading: isLoadingBatch } = useQuery({
    queryKey: ["education-batch", batchId],
    queryFn: () => getBatchById(batchId!),
    enabled: !!batchId,
  });

  if (isLoadingClass) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-sm font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Fetching Session Details...
        </p>
      </div>
    );
  }

  if (classError || !classData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
          <BookOpen className="h-8 w-8" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">Class Not Found</h3>
          <p className="text-muted-foreground max-w-xs mx-auto">
            The session you are looking for does not exist or has been removed.
          </p>
        </div>
        <Button onClick={() => navigate("/admin/classes")} variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Sessions
        </Button>
      </div>
    );
  }

  // Extract instructor and batch from populated objects or IDs
  const instructor = typeof classData.teacher_id === 'object' ? classData.teacher_id : (classData.teacher || {});
  const currentBatch = typeof classData.batch_id === 'object' ? classData.batch_id : (batchData || classData.batch || {});
  const students = batchData?.enrolled_students || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/admin/classes")}
            className="group -ml-2 text-muted-foreground hover:text-primary transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Sessions
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-inner">
              <Video className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">{classData.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5">
                  {classData.subject || "General"}
                </Badge>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                  {currentBatch?.name || "Standard Batch"}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {classData.meeting_link && (
          <Button 
            onClick={() => window.open(classData.meeting_link, '_blank')}
            className="bg-secondary hover:bg-secondary/90 text-white font-black shadow-lg shadow-secondary/20 transition-all active:scale-95 px-8 rounded-2xl h-12 gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            Host/Join Meeting
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Stats / Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Calendar className="h-16 w-16" />
              </div>
              <CardContent className="p-6 flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                  <Calendar className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Session Date</p>
                  <p className="text-xl font-bold">{new Date(classData.class_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Clock className="h-16 w-16" />
              </div>
              <CardContent className="p-6 flex items-center gap-6">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                  <Clock className="h-7 w-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Session Time</p>
                  <p className="text-xl font-bold">{classData.class_time}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructor & Batch Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/30 border-white/5 overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-white/5 py-4 px-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Assigned Instructor</CardTitle>
                </div>
                <User className="h-4 w-4 text-primary opacity-50" />
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  {instructor.profile_picture ? (
                    <img 
                      src={instructor.profile_picture} 
                      alt={instructor.name} 
                      className="h-16 w-16 rounded-2xl object-cover border border-primary/20"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl border border-primary/20">
                      {instructor.name?.[0] || instructor.username?.[0] || "?"}
                    </div>
                  )}
                  <div>
                    <h4 className="text-lg font-black">{instructor.name || instructor.username || "Pending Assignment"}</h4>
                    <p className="text-xs text-muted-foreground font-medium">{instructor.email || "No email provided"}</p>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Hash className="h-3.5 w-3.5" />
                      <span className="font-medium">Unique ID</span>
                    </div>
                    <span className="font-bold">{instructor.unique_id || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="font-medium">Email</span>
                    </div>
                    <span className="font-bold truncate max-w-[150px]">{instructor.email || "N/A"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-white/5 overflow-hidden">
              <CardHeader className="bg-muted/30 border-b border-white/5 py-4 px-6 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Learning Cohort</CardTitle>
                </div>
                <Users className="h-4 w-4 text-emerald-500 opacity-50" />
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-black">{currentBatch?.name || "Standard Group"}</h4>
                  <p className="text-xs text-muted-foreground font-medium mt-1">
                    Subject: {currentBatch?.subject || "N/A"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 text-center">Enrolled</p>
                    <div className="text-2xl font-black text-center text-emerald-500">
                      {students.length}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 text-center">Status</p>
                    <div className="flex justify-center pt-1">
                      <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black text-[9px] uppercase tracking-tighter">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column: Attendance / Students List */}
        <div className="lg:col-span-1">
          <Card className="bg-card/30 border-white/5 overflow-hidden h-full flex flex-col max-h-[700px]">
            <CardHeader className="bg-muted/30 border-b border-white/5 py-4 px-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">Session Attendance</CardTitle>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Users className="h-3 w-3" />
                  {students.length} Total
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-hidden">
              {isLoadingBatch ? (
                <div className="p-12 text-center space-y-3">
                  <DotsLoader />
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Syncing Student Manifest...</p>
                </div>
              ) : students.length === 0 ? (
                <div className="p-12 text-center space-y-3 opacity-50">
                  <Users className="h-8 w-8 mx-auto" />
                  <p className="text-xs font-bold uppercase tracking-widest">No students found</p>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="p-4 space-y-3">
                    {students.map((student: any, idx: number) => (
                      <div 
                        key={student._id || student.id}
                        className="p-3 rounded-xl bg-card/40 border border-white/5 flex items-center justify-between gap-3 group hover:bg-muted/30 transition-all cursor-default"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
                            {student.name?.[0] || student.username?.[0] || (idx + 1)}
                          </div>
                          <div className="min-w-0">
                            <h5 className="text-xs font-black truncate">{student.name || student.username}</h5>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium opacity-70">
                              <Hash className="h-2.5 w-2.5" />
                              <span className="truncate">{student.unique_id || "ID-UNKWN"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)] shrink-0" />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;
