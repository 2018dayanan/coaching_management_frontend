import { StatCard } from "@/components/dashboard/StatCard";
import { useQuery } from "@tanstack/react-query";
import { getTeacherDashboardStats } from "@/api/educationTeacherApi";
import {
  Users,
  BookOpen,
  Video,
  Layers,
  ClipboardCheck,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TeacherDashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher-dashboard-stats"],
    queryFn: () => getTeacherDashboardStats(),
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p className="text-muted-foreground font-medium animate-pulse">Syncing your classroom data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="bg-destructive/10 p-8 rounded-3xl border border-destructive/20 text-center max-w-md">
          <h3 className="text-lg font-bold text-destructive mb-2">Failed to load dashboard</h3>
          <p className="text-sm text-muted-foreground">There was an error fetching your statistics. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const { stats, upcomingClasses, recentTasks } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            TEACHER <span className="text-indigo-500 not-italic font-bold">DASHBOARD</span>
          </h2>
          <p className="text-muted-foreground font-medium mt-1">
            Overview of your academic performance and upcoming sessions.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-2xl border border-indigo-500/20">
          <Calendar className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-tight">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Total Batches"
          value={stats.totalBatches.toString()}
          icon={Layers}
          variant="blue"
          className="shadow-lg shadow-blue-500/5 border-blue-500/10"
        />
        <StatCard
          title="Total Classes"
          value={stats.totalClasses.toString()}
          icon={Video}
          variant="indigo"
          className="shadow-lg shadow-indigo-500/5 border-indigo-500/10"
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks.toString()}
          icon={BookOpen}
          variant="emerald"
          className="shadow-lg shadow-emerald-500/5 border-emerald-500/10"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toString()}
          icon={Users}
          variant="orange"
          className="shadow-lg shadow-orange-500/5 border-orange-500/10"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingSubmissions.toString()}
          icon={ClipboardCheck}
          variant="destructive"
          className="shadow-lg shadow-red-500/5 border-red-500/10"
        />
      </div>

      {/* Main Content: Upcoming Classes & Tasks */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upcoming Classes */}
        <Card className="border-border/40 shadow-2xl rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md">
          <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8 px-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center gap-2 uppercase italic tracking-tight">
                  <Video className="h-5 w-5 text-indigo-500" />
                  Upcoming <span className="text-indigo-500 not-italic uppercase">Classes</span>
                </CardTitle>
                <CardDescription className="text-xs font-medium">Your schedule for the next 7 days</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-500 font-bold hover:bg-indigo-500/10 rounded-xl">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {upcomingClasses.length > 0 ? (
                upcomingClasses.map((cls, idx) => (
                  <div key={idx} className="p-6 hover:bg-muted/30 transition-colors group">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-3">
                        <Badge variant="outline" className="bg-indigo-500/5 text-indigo-600 border-indigo-500/20 text-[10px] uppercase font-black px-2 py-0.5 rounded-lg">
                          {cls.subject}
                        </Badge>
                        <h4 className="text-lg font-bold group-hover:text-indigo-600 transition-colors leading-tight">{cls.title}</h4>
                        <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground uppercase italic tracking-tighter">
                          <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-lg">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(cls.class_date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-lg">
                            <Clock className="h-3.5 w-3.5" />
                            {cls.class_time}
                          </span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col justify-between items-end gap-2">
                        <span className="text-[10px] font-black italic text-muted-foreground uppercase tracking-widest">{cls.batch_id?.name}</span>
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 h-9 px-4 rounded-xl shadow-lg shadow-indigo-600/20 gap-2 font-bold group-hover:translate-x-1 transition-transform">
                          Join <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center space-y-2 opacity-50 italic">
                  <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                  <p>No upcoming classes scheduled</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="border-border/40 shadow-2xl rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md h-fit">
          <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8 px-8">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center gap-2 uppercase italic tracking-tight">
                  <BookOpen className="h-5 w-5 text-emerald-500" />
                  Recent <span className="text-emerald-500 not-italic uppercase">Tasks</span>
                </CardTitle>
                <CardDescription className="text-xs font-medium">Latest assignments sent to students</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-emerald-600 font-bold hover:bg-emerald-500/10 rounded-xl">History</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {recentTasks.length > 0 ? (
                recentTasks.map((task, idx) => (
                  <div key={idx} className="p-6 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <h4 className="font-bold text-base leading-tight group-hover:text-emerald-600 transition-colors uppercase italic tracking-tight">{task.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1 font-medium italic opacity-70">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                           <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter bg-emerald-500/5 text-emerald-600 border-emerald-500/20 px-2 py-0.5 rounded-lg italic">
                              {task.batch_id?.name}
                           </Badge>
                           <span className="text-[10px] font-bold text-destructive flex items-center gap-1 uppercase tracking-tighter">
                             <Clock className="h-3 w-3" />
                             Due: {new Date(task.due_date).toLocaleDateString()}
                           </span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center opacity-50 italic">
                  <p>No recent tasks found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;
