import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, GraduationCap, Star, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";

const StudentDashboard = () => {
  const { admin: student } = useAuth();

  const stats = [
    { title: "Enrolled Batches", value: "2", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Upcoming Classes", value: "3", icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Pending Tasks", value: "5", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Overall Rank", value: "#12", icon: Star, color: "text-violet-500", bg: "bg-violet-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            WELCOME BACK, <span className="text-emerald-500 not-italic font-bold">{student?.name?.split(" ")[0] || "LEARNER"}</span>
          </h2>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Your learning journey is accelerating. Keep it up!
          </p>
        </div>
        <div className="px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center gap-4 shadow-xl shadow-emerald-500/5">
          <div className="p-2 bg-emerald-500 rounded-xl text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600/70">Student ID</div>
            <div className="text-sm font-bold tracking-tight">{student?.username || "STD-2026-XXXX"}</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-emerald-500/30 transition-all rounded-[2rem] overflow-hidden group">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] font-black uppercase tracking-wider opacity-60 group-hover:text-emerald-500 transition-colors">
                  {stat.title}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-4xl font-black tracking-tighter italic">
                    {stat.value}
                  </CardTitle>
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Schedule */}
        <Card className="lg:col-span-2 border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/5">
           <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8">
              <CardTitle className="text-xl font-bold flex items-center gap-2 italic uppercase tracking-tight">
                <Calendar className="h-5 w-5 text-emerald-500" />
                Live <span className="text-emerald-500">Sessions</span>
              </CardTitle>
              <CardDescription>Your upcoming interactive classes for this week</CardDescription>
           </CardHeader>
           <CardContent className="p-8">
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-3xl bg-muted/20 border border-border/40 hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex flex-col items-center justify-center text-emerald-600">
                        <span className="text-[10px] font-black leading-none uppercase">Mar</span>
                        <span className="text-xl font-black tracking-tighter">25</span>
                      </div>
                      <div>
                        <div className="font-bold text-base tracking-tight uppercase group-hover:text-emerald-600 transition-colors">Advanced React Patterns</div>
                        <div className="text-xs text-muted-foreground font-medium flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" /> 10:00 AM - 12:00 PM
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black uppercase text-[10px] tracking-widest italic shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
                      Join Room
                    </button>
                  </div>
                ))}
              </div>
           </CardContent>
        </Card>

        {/* Recent Performance */}
        <Card className="border-border/40 rounded-[2.5rem] bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl shadow-black/5">
           <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8">
              <CardTitle className="text-xl font-bold italic uppercase tracking-tight">
                Academic <span className="text-emerald-500">Pulse</span>
              </CardTitle>
           </CardHeader>
           <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full border-8 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center mb-6 relative">
                 <div className="text-3xl font-black tracking-tighter italic">92%</div>
                 <div className="absolute -bottom-2 px-3 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full">Optimal</div>
              </div>
              <p className="text-sm font-medium text-muted-foreground">Your attendance and task completion rate is currently above average.</p>
           </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
