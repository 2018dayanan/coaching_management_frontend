import { useQuery } from "@tanstack/react-query";
import { getMyBatches, type TeacherBatch } from "@/api/educationTeacherApi";
import { DataTable } from "@/components/DataTable";
import { columns, type TeacherBatchTableData } from "@/components/data_tables/teacher_batches/columns";
import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Layers, 
  Search, 
  Calendar, 
  Users, 
  Info,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TeacherBatchList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<TeacherBatch | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["teacher-batches"],
    queryFn: () => getMyBatches(),
  });

  const tableData: TeacherBatchTableData[] = useMemo(() => {
    const batchesData = data || [];
    return batchesData
      .filter((b) =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((b) => ({
        _id: b._id,
        name: b.name,
        subject: b.subject,
        status: b.status,
        startDate: b.start_date,
        endDate: b.end_date,
        studentCount: b.enrolled_students?.length || 0,
        original: b,
      }));
  }, [data, searchTerm]);

  const handleViewDetails = (batch: TeacherBatch) => {
    setSelectedBatch(batch);
  };

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        <p className="text-muted-foreground font-medium">Syncing batch records...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center p-12">
      <Card className="border-destructive/20 bg-destructive/5 max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive font-black italic uppercase italic">Directory Sync Failed</CardTitle>
          <CardDescription>We encountered an error while retrieving your assigned batches.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            BATCH <span className="text-primary not-italic font-bold">DIRECTORY</span>
          </h2>
          <p className="text-muted-foreground font-medium">
            Monitor curriculum timelines and student enrollments for your active batches
          </p>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Layers className="h-24 w-24" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-indigo-500 font-bold uppercase tracking-wider text-[10px]">Total Batches</CardDescription>
            <CardTitle className="text-4xl font-black text-indigo-600">{data?.length || 0}</CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 overflow-hidden relative">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Calendar className="h-24 w-24" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Active Now</CardDescription>
            <CardTitle className="text-4xl font-black text-emerald-600">{data?.filter(b => b.status === "active").length || 0}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Batch Table */}
      <Card className="border-border/40 shadow-2xl shadow-black/5 rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold">Assigned Teaching Modules</CardTitle>
              <CardDescription>Comprehensive list of curriculum batches under your supervision</CardDescription>
            </div>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Search batches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/60 focus:ring-primary/20 rounded-xl h-11"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns(handleViewDetails) as any}
            data={tableData}
          />
        </CardContent>
      </Card>

      {/* Batch Detail Modal */}
      <Dialog open={!!selectedBatch} onOpenChange={(open) => !open && setSelectedBatch(null)}>
        <DialogContent className="max-w-3xl bg-background/95 backdrop-blur-2xl border-border/60 shadow-2xl rounded-[2.5rem] overflow-hidden p-0 gap-0 ring-1 ring-white/10">
          {selectedBatch && (
            <div className="flex flex-col h-[85vh] md:h-auto max-h-[90vh]">
              {/* Animated Header Section */}
              <div className="relative h-48 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 animate-gradient-xy" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <div className="absolute inset-0 bg-black/10" />
                
                <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
                  <div className="space-y-2">
                    <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest leading-none">
                      {selectedBatch.subject}
                    </Badge>
                    <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none drop-shadow-lg">
                      {selectedBatch.name}
                    </h3>
                  </div>
                  <div className="hidden md:flex flex-col items-end gap-1">
                     <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Enrollment Status</span>
                     <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                        <div className={`h-2.5 w-2.5 rounded-full ${selectedBatch.status === "active" ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" : "bg-white/40"}`} />
                        <span className="text-white font-bold text-sm uppercase tracking-tighter">{selectedBatch.status}</span>
                     </div>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <ScrollArea className="flex-1 overflow-y-auto">
                <div className="p-8 space-y-10">
                  {/* Stats & Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex flex-col gap-1 transition-all hover:bg-indigo-500/10 cursor-default group">
                      <Label className="text-[10px] font-black uppercase text-indigo-500/70 tracking-widest">Subject Domain</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="p-2 bg-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">
                          <Layers className="h-5 w-5 text-indigo-500" />
                        </div>
                        <span className="font-bold text-lg text-foreground tracking-tight">{selectedBatch.subject}</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-1 transition-all hover:bg-emerald-500/10 cursor-default group">
                      <Label className="text-[10px] font-black uppercase text-emerald-500/70 tracking-widest">Active Enrollments</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="p-2 bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform">
                          <Users className="h-5 w-5 text-emerald-500" />
                        </div>
                        <span className="font-bold text-lg text-foreground tracking-tight">{selectedBatch.enrolled_students?.length || 0} Students</span>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl bg-violet-500/5 border border-violet-500/10 flex flex-col gap-1 transition-all hover:bg-violet-500/10 cursor-default group">
                      <Label className="text-[10px] font-black uppercase text-violet-500/70 tracking-widest">Batch Timeline</Label>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="p-2 bg-violet-500/10 rounded-xl group-hover:scale-110 transition-transform">
                          <Calendar className="h-5 w-5 text-violet-500" />
                        </div>
                        <div className="flex flex-col">
                           <span className="font-bold text-sm text-foreground tracking-tight">Active Until</span>
                           <span className="text-[11px] font-medium text-muted-foreground">{new Date(selectedBatch.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-1">
                      <div className="h-6 w-1 bg-indigo-500 rounded-full" />
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Curriculum Overview</h4>
                    </div>
                    <div className="bg-muted/30 border border-border/40 p-6 rounded-[2rem] relative overflow-hidden group">
                      <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                        <Info className="h-32 w-32" />
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed font-medium italic relative z-10">
                        "{selectedBatch.description || "No specific curriculum description has been provided for this batch teaching module."}"
                      </p>
                    </div>
                  </div>

                  {/* Students Section */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-1 bg-emerald-500 rounded-full" />
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Certified Enrollments</h4>
                      </div>
                      <Badge variant="outline" className="rounded-full px-3 py-1 font-black text-[10px] bg-muted/50 border-border/40 text-muted-foreground">
                        ROSTER: {selectedBatch.enrolled_students?.length || 0}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                      {selectedBatch.enrolled_students?.length > 0 ? (
                        selectedBatch.enrolled_students.map((student) => (
                          <div 
                            key={student._id} 
                            className="group flex items-center justify-between p-4 bg-card hover:bg-indigo-500/[0.02] border border-border/60 hover:border-indigo-500/30 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 cursor-pointer relative overflow-hidden"
                          >
                            <div className="flex items-center gap-4 relative z-10">
                              <Avatar className="h-12 w-12 border-2 border-background shadow-lg ring-1 ring-border/20 group-hover:scale-110 transition-transform">
                                <AvatarImage src={student.profile_picture} className="object-cover" />
                                <AvatarFallback className="bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-600 font-black text-xs uppercase">
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-bold text-sm text-foreground tracking-tight group-hover:text-indigo-600 transition-colors uppercase italic">{student.name}</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <div className="h-1 w-1 rounded-full bg-emerald-500" />
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{student.unique_id}</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-10 w-10 rounded-2xl bg-muted/30 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm"
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-16 bg-muted/10 border-2 border-dashed border-border/40 rounded-[2.5rem] opacity-40">
                          <Users className="h-12 w-12 mb-4 text-muted-foreground" />
                          <span className="text-xs font-black uppercase tracking-widest">No Active Enrollments Located</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="p-6 bg-muted/20 border-t border-border/40 flex justify-end flex-shrink-0">
                <Button 
                  onClick={() => setSelectedBatch(null)}
                  className="rounded-2xl px-8 h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase italic tracking-tighter shadow-lg shadow-indigo-600/20"
                >
                  Close Directory
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherBatchList;
