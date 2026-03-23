import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Video, Search, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTeacherClasses,
  createTeacherClass,
  updateTeacherClass,
  deleteTeacherClass,
  getMyBatches,
  type TeacherClass,
  type CreateClassBody
} from "@/api/educationTeacherApi";
import { DataTable } from "@/components/DataTable";
import { columns } from "@/components/data_tables/teacher_classes/columns";
import { useMemo, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeacherClassList = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<TeacherClass | null>(null);

  // Form State
  const [formData, setFormData] = useState<CreateClassBody>({
    title: "",
    subject: "",
    batch_id: "",
    class_date: new Date().toISOString().split("T")[0],
    class_time: "",
    meeting_link: ""
  });

  // Query Data
  const { data: classes, isLoading } = useQuery({
    queryKey: ["teacher-classes"],
    queryFn: () => getTeacherClasses(),
  });

  const { data: batches } = useQuery({
    queryKey: ["teacher-batches"],
    queryFn: () => getMyBatches(),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (body: CreateClassBody) => createTeacherClass(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-classes"] });
      toast.success("Class scheduled successfully!");
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to schedule class")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<CreateClassBody> }) => updateTeacherClass(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-classes"] });
      toast.success("Class updated successfully!");
      setIsDialogOpen(false);
      setEditingClass(null);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to update class")
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTeacherClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-classes"] });
      toast.success("Class cancelled successfully!");
    },
    onError: (err: any) => toast.error(err.response?.data?.message || "Failed to cancel class")
  });

  // Handlers
  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      subject: "",
      batch_id: "",
      class_date: new Date().toISOString().split("T")[0],
      class_time: "",
      meeting_link: ""
    });
  }, []);

  const handleEdit = useCallback((cls: TeacherClass) => {
    setEditingClass(cls);
    setFormData({
      title: cls.title,
      subject: cls.subject,
      batch_id: typeof cls.batch_id === 'object' ? cls.batch_id._id : cls.batch_id,
      class_date: cls.class_date.split("T")[0],
      class_time: cls.class_time,
      meeting_link: cls.meeting_link
    });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to cancel this scheduled class?")) {
      deleteMutation.mutate(id);
    }
  }, [deleteMutation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClass) {
      updateMutation.mutate({ id: editingClass._id, body: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  // Memoized columns and data
  const classColumns = useMemo(() => 
    columns(handleEdit, handleDelete),
    [handleEdit, handleDelete]
  );

  const filteredData = useMemo(() => {
    const list = classes || [];
    return list.filter(c => 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [classes, searchTerm]);

  if (isLoading) return <div className="p-12 text-center animate-pulse text-blue-500 font-bold uppercase italic tracking-tighter">Syncing your schedule...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            CLASS <span className="text-blue-500 not-italic font-bold">DIRECTORY</span>
          </h2>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <Video className="h-4 w-4 text-blue-500" />
            Manage your live sessions and curriculum delivery
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) { setEditingClass(null); resetForm(); }
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 px-8 py-6 rounded-2xl font-black uppercase italic tracking-tighter">
              <Plus className="h-5 w-5" />
              Schedule New Class
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0 bg-background/95 backdrop-blur-xl">
            <div className="h-3 bg-gradient-to-r from-blue-600 to-indigo-600" />
            <div className="p-8">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black italic uppercase italic">
                  {editingClass ? "Update" : "Schedule"} <span className="text-blue-600 not-italic">Session</span>
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground mt-2">
                  {editingClass 
                    ? "Modify the existing class details and schedule." 
                    : "Create a new meeting room for your active teaching modules."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-blue-500/70 ml-1">Session Title</Label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Advanced State Persistence Patterns"
                      className="rounded-2xl h-12 bg-muted/40 border-border/40 focus:ring-2 ring-blue-500/10 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-blue-500/70 ml-1">Subject domain</Label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Computer Science"
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-blue-500/70 ml-1">Target Module</Label>
                    <Select
                      required
                      value={formData.batch_id}
                      onValueChange={(val) => setFormData({ ...formData, batch_id: val })}
                    >
                      <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/40 font-medium italic">
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl shadow-xl">
                        {batches?.map((batch) => (
                          <SelectItem key={batch._id} value={batch._id} className="font-medium italic">
                            {batch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-blue-500/70 ml-1">Session Date</Label>
                    <Input
                      required
                      type="date"
                      value={formData.class_date}
                      onChange={(e) => setFormData({ ...formData, class_date: e.target.value })}
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-blue-500/70 ml-1">Session Time</Label>
                    <Input
                      required
                      placeholder="e.g. 10:00 AM"
                      value={formData.class_time}
                      onChange={(e) => setFormData({ ...formData, class_time: e.target.value })}
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-blue-500/70 ml-1">Meeting link (Zoom/Meet)</Label>
                    <Input
                      required
                      value={formData.meeting_link}
                      onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                      placeholder="https://..."
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-2xl shadow-blue-600/30 font-black uppercase italic tracking-tighter text-lg group transition-all"
                  >
                    {createMutation.isPending || updateMutation.isPending ? "Syncing..." : (
                      <div className="flex items-center gap-2">
                        {editingClass ? "Update Scheduled Class" : "Establish New Class"}
                        <Video className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                      </div>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden relative rounded-3xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-blue-500 font-black uppercase tracking-wider text-[10px]">Upcoming Sessions</CardDescription>
            <CardTitle className="text-4xl font-black">{filteredData.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Class Table */}
      <Card className="border-border/40 shadow-2xl rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Session Roster
              </CardTitle>
              <CardDescription>Review and manage all your scheduled curriculum sessions</CardDescription>
            </div>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/60 focus:ring-blue-500/20 rounded-xl h-11"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={classColumns as any}
            data={filteredData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherClassList;
