import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Filter, Download, GraduationCap, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllEducationUsers } from "@/api/educationUserApi";
import { columns, type Teacher } from "@/components/data_tables/teachers/columns";
import { DataTable } from "@/components/DataTable";
import { useMemo } from "react";
import { useModal } from "@/hooks/use-model-store";

const Teachers = () => {
  const { onOpen } = useModal();

  const { data, isLoading, error } = useQuery({
    queryKey: ["education-teachers"],
    queryFn: () => getAllEducationUsers({ role: "teacher" }),
  });

  const teachersData = Array.isArray(data) ? data : data?.users || [];

  const teacherTableData: Teacher[] = teachersData.map((user: any) => ({
    id: user.id || user._id,
    unique_id: user.unique_id,
    profileImg: user.profile_picture || user.avatar,
    name: user.name,
    phone: user.mobile || user.phone || "N/A",
    joined: user.createdAt || new Date().toISOString(),
    status: user.status || "active",
    email: user.email,
    role: "teacher" as const,
  }));

  const activeTeacherCount = useMemo(() => {
    return teacherTableData.filter(
      (teacher) => teacher.status?.toLowerCase() === "active"
    ).length;
  }, [teacherTableData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        <p className="text-sm font-bold text-muted-foreground animate-pulse uppercase tracking-widest">
          Syncing Faculty Records...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4 text-destructive">
        <p className="font-bold">Failed to load teachers</p>
        <Button onClick={() => window.location.reload()} variant="outline" size="sm">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shadow-inner">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">Teacher Management</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="font-bold text-[10px] uppercase tracking-wider px-2 py-0.5">
                  Academic Faculty
                </Badge>
                <div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                  {teacherTableData.length} active instructors
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => onOpen("addUser", {})}
          className="bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/20 transition-all active:scale-95 px-8 rounded-2xl h-12 gap-2 w-full md:w-auto overflow-hidden group"
        >
          <UserPlus className="h-5 w-5 transition-transform group-hover:scale-110" />
          Add Instructor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="bg-card/50 border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="h-12 w-12" />
          </div>
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Total Staff</p>
            <div className="text-3xl font-black mt-2">{teacherTableData.length}</div>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '100%' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Badge className="h-12 w-12 rounded-full" />
          </div>
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Active status</p>
            <div className="text-3xl font-black mt-2 text-emerald-500">{activeTeacherCount}</div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500/80">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live & teaching
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-destructive/20 transition-all duration-500">
          <CardContent className="p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Off Duty / Inactive</p>
            <div className="text-3xl font-black mt-2 text-destructive">{teacherTableData.length - activeTeacherCount}</div>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-muted-foreground opacity-60 uppercase tracking-tighter">
              Requires administrative review
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Directory */}
      <Card className="bg-card/30 border-white/5 shadow-2xl overflow-hidden backdrop-blur-xl">
        <CardHeader className="p-8 border-b border-white/5 bg-muted/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-xl font-black tracking-tight">Faculty Directory</CardTitle>
              <CardDescription className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">Search and coordinate with your teaching staff</CardDescription>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2 font-bold bg-background/50 border-white/10 hover:bg-muted transition-all rounded-xl">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2 font-bold bg-background/50 border-white/10 hover:bg-muted transition-all rounded-xl">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="hidden lg:block">
            <DataTable columns={columns as any} data={teacherTableData} />
          </div>

          <div className="lg:hidden flex flex-col gap-4">
            {teacherTableData.map((teacher) => (
              <Card
                key={teacher.id}
                className="bg-card/40 border-white/5 hover:border-primary/20 transition-all group overflow-hidden"
              >
                <CardContent className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      {teacher.profileImg ? (
                        <img 
                          src={teacher.profileImg} 
                          alt={teacher.name} 
                          className="h-12 w-12 rounded-2xl object-cover border border-primary/20 shadow-sm"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl border border-primary/20">
                          {teacher.name?.[0] || "T"}
                        </div>
                      )}
                      <div>
                        <h4 className="font-black text-lg">{teacher.name}</h4>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{teacher.unique_id || teacher.id.slice(-6)}</p>
                      </div>
                    </div>
                    <Badge
                      className={teacher.status === "active" 
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-black text-[9px] uppercase tracking-tighter" 
                        : "bg-destructive/10 text-destructive border-destructive/20 font-black text-[9px] uppercase tracking-tighter"
                      }
                      variant="outline"
                    >
                      {teacher.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Email</p>
                      <p className="text-xs font-bold truncate">{teacher.email}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">Phone</p>
                      <p className="text-xs font-bold">{teacher.phone}</p>
                    </div>
                  </div>

                  <Button variant="secondary" size="sm" className="w-full font-black rounded-xl" asChild>
                    <a href={`/admin/users/${teacher.id}`}>View Full Profile</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teachers;
