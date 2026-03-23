import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  UserPlus,
  CheckCircle,
  Video,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

type ActivityType = "registration" | "batch" | "class" | "alert";

interface ActivityItem {
  id: number;
  type: ActivityType;
  message: string;
  time: string;
  icon: LucideIcon;
  color: string;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: "registration",
    message: "New student registered: Amit Sharma",
    time: "2 mins ago",
    icon: UserPlus,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "batch",
    message: "New batch created: Mathematics Grade 10",
    time: "15 mins ago",
    icon: BookOpen,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "class",
    message: "Live class started: Algebra Basics",
    time: "28 mins ago",
    icon: Video,
    color: "text-purple-500",
  },
  {
    id: 4,
    type: "registration",
    message: "New teacher joined: Dr. S. K. Gupta",
    time: "1 hour ago",
    icon: UserPlus,
    color: "text-blue-500",
  },
  {
    id: 5,
    type: "batch",
    message: "Batch completed: Physics Crash Course",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-500",
  },
];

export function ActivityFeed() {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle>Live Activity Stream</CardTitle>
        <CardDescription>Real-time coaching activities</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-muted dark:bg-muted/50 flex items-center justify-center">
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
