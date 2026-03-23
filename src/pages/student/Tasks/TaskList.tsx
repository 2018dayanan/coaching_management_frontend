import { useQuery } from "@tanstack/react-query";
import { getMyTasks, type StudentTask } from "@/api/educationStudentApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ListChecks,
  Calendar,
  Clock,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";
import DotsLoader from "@/components/ui/dotsLoader";

const StudentTaskListPage = () => {
  const { data: tasks, isLoading } = useQuery<StudentTask[]>({
    queryKey: ["student-tasks"],
    queryFn: getMyTasks,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <DotsLoader />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Fetching assigned work...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase flex items-center gap-4">
            TASKS & <span className="text-emerald-500 not-italic">ASSIGNMENTS</span>
          </h2>
          <p className="text-muted-foreground font-medium">Manage your workload and submit your academic contributions</p>
        </div>
        <div className="px-6 py-3 bg-muted/20 border border-border/40 rounded-2xl flex items-center gap-3">
          <ListChecks className="h-5 w-5 text-emerald-500" />
          <span className="text-sm font-black uppercase tracking-tighter">
            {tasks?.length || 0} ACTIVE ASSIGNMENTS
          </span>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tasks?.map((task) => (
          <Link key={task._id} to={`/student/dashboard/tasks/${task._id}`}>
            <Card className="group border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500 hover:-translate-y-2 border-t-emerald-500/10 h-full flex flex-col">
              <CardHeader className="pb-4 relative">
                 <div className="flex justify-between items-start mb-4">
                    <Badge className="font-black text-[9px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3">
                      {task.subject}
                    </Badge>
                    <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-widest opacity-60 rounded-lg">
                      {task.batch_id?.name}
                    </Badge>
                 </div>
                 <CardTitle className="text-2xl font-black tracking-tight italic uppercase group-hover:text-emerald-500 transition-colors line-clamp-2">
                    {task.title}
                 </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 pt-2 pb-8 px-8 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground font-medium line-clamp-3 italic opacity-80 mb-6">
                  {task.description}
                </p>

                <div className="space-y-4 mt-auto">
                   <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-emerald-500/50" />
                        Assigned: {new Date(task.assigned_date).toLocaleDateString()}
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 group-hover:bg-rose-500/10 transition-colors">
                      <div className="flex items-center gap-3">
                         <Clock className="h-4 w-4 text-rose-500" />
                         <span className="text-xs font-black uppercase tracking-widest text-rose-600">DEADLINE:</span>
                      </div>
                      <span className="text-xs font-black tracking-tight text-rose-600">{new Date(task.due_date).toLocaleDateString()}</span>
                   </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 group-hover:translate-x-1 transition-transform">View Mission</span>
                   <ArrowRight className="h-5 w-5 text-emerald-500 opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {tasks?.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-[3rem] border border-dashed border-border/60">
              <ClipboardList className="h-16 w-16 text-muted-foreground/20 mb-6" />
              <h4 className="text-xl font-black italic uppercase tracking-wider text-muted-foreground/40">No Tasks Assigned</h4>
              <p className="text-muted-foreground text-sm font-medium mt-2">Check back later for new academic assignments from your teachers.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default StudentTaskListPage;
