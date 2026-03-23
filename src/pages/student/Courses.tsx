import { useQuery } from "@tanstack/react-query";
import { getMyEnrolledCourses, type EnrolledCourse } from "@/api/educationStudentApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  User,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import DotsLoader from "@/components/ui/dotsLoader";

const StudentCoursesPage = () => {
  const { data: courses, isLoading } = useQuery<EnrolledCourse[]>({
    queryKey: ["student-courses"],
    queryFn: getMyEnrolledCourses,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <DotsLoader />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Loading your learning path...
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
            MY <span className="text-emerald-500 not-italic">COURSES</span>
          </h2>
          <p className="text-muted-foreground font-medium">Your active learning batches and curriculum</p>
        </div>
        <div className="px-6 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          <span className="text-sm font-bold uppercase tracking-tighter">
            {courses?.length || 0} Active Enrollments
          </span>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses?.map((course) => (
          <Card 
            key={course._id} 
            className="group border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-2 border-t-emerald-500/10"
          >
            <CardHeader className="pb-4 relative">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <BookOpen className="h-24 w-24 -rotate-12" />
              </div>
              <Badge className="w-fit mb-4 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                {course.status}
              </Badge>
              <CardTitle className="text-2xl font-black tracking-tight italic uppercase group-hover:text-emerald-500 transition-colors">
                {course.name}
              </CardTitle>
              <CardDescription className="font-bold text-muted-foreground/70 uppercase text-[10px] tracking-[0.2em]">
                {course.subject}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-2 pb-8 px-8">
              <p className="text-sm text-muted-foreground font-medium line-clamp-2 italic">
                {course.description || "Master the core concepts and build advanced expertise in this specialized track."}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-2 bg-muted/50 rounded-lg text-muted-foreground"><User className="h-4 w-4" /></div>
                  <span className="text-muted-foreground opacity-60 font-black uppercase tracking-widest text-[9px]">Instructor:</span>
                  <span className="truncate">{course.teacher_id?.name || "Senior Mentor"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold">
                  <div className="p-2 bg-muted/50 rounded-lg text-muted-foreground"><Calendar className="h-4 w-4" /></div>
                  <span className="text-muted-foreground opacity-60 font-black uppercase tracking-widest text-[9px]">Timeline:</span>
                  <span className="truncate">{new Date(course.start_date).toLocaleDateString()} - {new Date(course.end_date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-border/40 group-last:border-none">
                 <button className="w-full h-12 rounded-2xl bg-muted/30 hover:bg-emerald-600 hover:text-white transition-all duration-300 flex items-center justify-between px-6 font-black uppercase italic text-[11px] tracking-widest group/btn">
                    Course Resources
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </div>
            </CardContent>
          </Card>
        ))}

        {courses?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center space-y-4">
             <div className="p-6 bg-muted/30 rounded-[2.5rem] animate-pulse">
                <BookOpen className="h-12 w-12 text-muted-foreground opacity-20" />
             </div>
             <p className="text-muted-foreground font-black uppercase italic tracking-widest">No active enrollments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;
