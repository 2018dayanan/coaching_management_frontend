import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getMyStudents } from "@/api/educationTeacherApi";
import { DataTable } from "@/components/DataTable";
import { columns, type TeacherStudent } from "@/components/data_tables/teacher_students/columns";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-model-store";

const StudentList = () => {
  const { onOpen } = useModal();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher-students"],
    queryFn: () => getMyStudents(),
  });

  const studentTableData: TeacherStudent[] = useMemo(() => {
    const studentsData = data || [];
    return studentsData
      .filter((s: any) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.unique_id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((student: any) => ({
        id: student._id,
        profileImg: student.profile_picture,
        name: student.name,
        uniqueId: student.unique_id,
        email: student.email || "N/A",
        status: "active", // Based on documentation mock
      }));
  }, [data, searchTerm]);

  if (isLoading) return <div className="flex justify-center p-12">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p className="text-muted-foreground font-medium">Loading your students...</p>
    </div>
  </div>;

  if (error) return <div className="flex justify-center p-12 text-destructive">
    <div className="bg-destructive/10 p-6 rounded-2xl border border-destructive/20 text-center">
      <h3 className="text-lg font-bold">Failed to load students</h3>
      <p className="text-sm opacity-80">Please check your connection and try again.</p>
    </div>
  </div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            STUDENT <span className="text-primary not-italic font-bold">DIRECTORY</span>
          </h2>
          <p className="text-muted-foreground font-medium">
            Monitor and manage student performance across your assigned batches
          </p>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Users className="h-24 w-24" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-primary font-bold uppercase tracking-wider text-xs">Total Managed Students</CardDescription>
            <CardTitle className="text-4xl font-black">{studentTableData.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Student Table */}
      <Card className="border-border/40 shadow-xl shadow-black/5 rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">Active Enrollments</CardTitle>
              <CardDescription>View performance and manage batch assignments</CardDescription>
            </div>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/60 focus:ring-primary/20 rounded-xl h-11"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <DataTable
              columns={columns as any}
              data={studentTableData}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
