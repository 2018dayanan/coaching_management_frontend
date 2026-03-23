import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import {
  Users,
  BookOpen,
  Video,
} from "lucide-react";

const TeacherDashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();

  // Mock data for attendance chart
  const attendanceOverview = [
    { label: "Jan", revenue: 85 },
    { label: "Feb", revenue: 88 },
    { label: "Mar", revenue: 92 },
    { label: "Apr", revenue: 90 },
    { label: "May", revenue: 94 },
    { label: "Jun", revenue: 95 },
    { label: "Jul", revenue: 93 },
    { label: "Aug", revenue: 96 },
    { label: "Sep", revenue: 98 },
    { label: "Oct", revenue: 97 },
    { label: "Nov", revenue: 99 },
    { label: "Dec", revenue: 100 },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          Teacher Dashboard
        </h2>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your students and scheduled sessions.
        </p>
      </div>

      {/* KPI Cards (Limited for Teachers) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="My Students"
          value={stats?.total_students.toLocaleString() || "0"}
          change="Total enrolled"
          changeType="positive"
          icon={Users}
          subtitle={`${stats?.total_active_enrollments || 0} active enrollments`}
          variant="blue"
        />
        <StatCard
          title="Scheduled Classes"
          value={stats?.total_classes.toString() || "0"}
          change="Total sessions"
          changeType="positive"
          icon={Video}
          subtitle="Online & physical"
          variant="indigo"
        />
        <StatCard
          title="Pending Tasks"
          value={stats?.total_tasks.toString() || "0"}
          change="Assigned to students"
          changeType="positive"
          icon={BookOpen}
          subtitle="Learning assessments"
          variant="emerald"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-4 md:grid-cols-3">
        <RevenueChart revenueData={attendanceOverview} />
        <ActivityFeed />
      </div>
    </div>
  );
};

export default TeacherDashboard;
