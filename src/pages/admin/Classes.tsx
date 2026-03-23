import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, Plus, Search, Filter, MonitorPlay } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllClasses } from "@/api/educationClassApi";
import { DataTable } from "@/components/DataTable";
import { columns, type Class } from "@/components/data_tables/classes/columns";
import { useMemo } from "react";
import { useModal } from "@/hooks/use-model-store";
import { Input } from "@/components/ui/input";

const Classes = () => {
  const { onOpen } = useModal();
  const { data, isLoading, error } = useQuery({
    queryKey: ["education-classes"],
    queryFn: () => getAllClasses(),
  });

  const classesData = Array.isArray(data) ? data : data?.classes || [];

  const classTableData: Class[] = useMemo(() => {
    return classesData.map((cls: any) => ({
      id: cls._id || cls.id,
      title: cls.title,
      subject: cls.subject,
      batch_name: cls.batch?.name || cls.batch_name || "N/A",
      class_date: cls.class_date,
      class_time: cls.class_time,
      meeting_link: cls.meeting_link,
    }));
  }, [classesData]);

  if (error) {
    return (
      <div className="flex justify-center p-12 text-destructive">
        Error loading scheduled classes. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Class Management
          </h2>
          <p className="text-muted-foreground mt-1">
            Schedule and coordinate live instructional sessions.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button 
            variant="outline"
            className="gap-2 font-bold border-white/10 hidden md:flex"
          >
            <MonitorPlay className="h-4 w-4" />
            Watch Recordings
          </Button>
          <Button 
            onClick={() => onOpen("scheduleClass", {})}
            className="gap-2 bg-primary hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20 flex-1 md:flex-none"
          >
            <Plus className="h-4 w-4" />
            Schedule Class
          </Button>
        </div>
      </div>

      {/* Main Database Table */}
      <Card className="border-white/5 bg-card/30 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-white/5">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-0.5">
              <CardTitle className="text-lg font-bold">Session Directory</CardTitle>
              <CardDescription className="text-xs">Database of all upcoming and past sessions</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative w-full md:w-64 group">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search sessions..."
                  className="pl-8 h-9 bg-muted/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg text-sm"
                />
              </div>
              <Button variant="outline" size="sm" className="gap-2 h-9 border-white/10 hover:bg-muted font-bold">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                <div className="text-xs font-bold text-muted-foreground animate-pulse uppercase tracking-widest">Loading Session Data...</div>
            </div>
          ) : classTableData.length === 0 ? (
            <div className="text-center py-24 px-4">
              <div className="inline-flex h-12 w-12 rounded-full bg-muted items-center justify-center mb-4">
                <Video className="h-6 w-6 text-muted-foreground opacity-40 " />
              </div>
              <p className="text-sm font-bold text-foreground">No sessions scheduled</p>
              <p className="text-xs text-muted-foreground mt-1">Start by scheduling your first live session.</p>
            </div>
          ) : (
             <div className="min-w-full">
                <DataTable columns={columns} data={classTableData} />
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Classes;
