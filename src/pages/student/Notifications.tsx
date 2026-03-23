import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getMyNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  type Notification
} from "@/api/educationStudentApi";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Clock,
  Circle,
  Shield,
  Loader2,
  Trophy,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

const StudentNotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryKey: ["student-notifications"],
    queryFn: getMyNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-notifications"] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-notifications"] });
      toast.success("All notifications neutralized!");
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Scanning data streams...
        </div>
      </div>
    );
  }

  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase flex items-center gap-4">
            NOTIFICATIONS <span className="text-emerald-500 not-italic">HUB</span>
            {unreadCount > 0 && (
               <Badge className="bg-emerald-500 text-white font-black text-xs px-3 py-1 animate-pulse border-none">
                 {unreadCount} NEW
               </Badge>
            )}
          </h2>
          <p className="text-muted-foreground font-medium">Your centralized system alerts and academic updates</p>
        </div>
        {unreadCount > 0 && (
          <Button 
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
            className="bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xl px-8 font-black uppercase italic tracking-tighter transition-all shadow-lg active:scale-95"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications?.map((notification) => (
          <Card 
            key={notification._id} 
            className={`border-border/40 rounded-[2rem] bg-card/40 backdrop-blur-md overflow-hidden transition-all duration-300 group
              ${!notification.is_read ? 'border-l-4 border-l-emerald-500 shadow-xl shadow-emerald-500/5' : 'opacity-70 grayscale-[0.5]'}
            `}
          >
             <CardContent className="p-8 flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${notification.is_read ? 'bg-muted/50 text-muted-foreground' : 'bg-emerald-500/10 text-emerald-500'} group-hover:scale-110 transition-transform`}>
                   {notification.is_read ? <Bell className="h-6 w-6" /> : <Zap className="h-6 w-6 animate-pulse" />}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                   <div className="flex items-center justify-between gap-4">
                      <h3 className={`text-lg font-black italic uppercase tracking-tight truncate ${!notification.is_read ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 flex items-center gap-2 shrink-0">
                         <Clock className="h-3 w-3" />
                         {new Date(notification.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                   </div>
                   <p className={`text-sm font-medium ${!notification.is_read ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                      {notification.message}
                   </p>
                </div>

                {!notification.is_read && (
                   <button 
                     onClick={() => markReadMutation.mutate(notification._id)}
                     className="p-3 bg-muted/30 hover:bg-emerald-500/20 hover:text-emerald-500 rounded-xl transition-all"
                   >
                      <Circle className="h-4 w-4 fill-emerald-500/50" />
                   </button>
                )}
             </CardContent>
          </Card>
        ))}

        {notifications?.length === 0 && (
           <div className="flex flex-col items-center justify-center py-32 text-center bg-card/20 rounded-[3rem] border border-dashed border-border/60">
              <Shield className="h-16 w-16 text-muted-foreground/20 mb-6" />
              <h4 className="text-xl font-black italic uppercase tracking-wider text-muted-foreground/40">Zero Interference</h4>
              <p className="text-muted-foreground text-sm font-medium mt-2">All systems are nominal. No new notifications in your feed.</p>
           </div>
        )}
      </div>

      {/* Aesthetic Footer Badge */}
      <div className="flex justify-center pt-8">
         <div className="flex items-center gap-4 px-6 py-2 bg-muted/20 border border-border/40 rounded-full">
            <Trophy className="h-4 w-4 text-emerald-500 opacity-50" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-40">End of Notification Payload</span>
         </div>
      </div>
    </div>
  );
};

export default StudentNotificationsPage;
