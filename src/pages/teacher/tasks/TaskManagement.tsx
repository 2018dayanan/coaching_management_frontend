import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ListChecks, BookOpen, Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllMyTasks, createTeacherTask } from "@/api/educationTeacherApi";
import { DataTable } from "@/components/DataTable";
import { columns, type TeacherTask } from "@/components/data_tables/teacher_tasks/columns";
import { useMemo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TaskManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    batch_id: "",
    assigned_date: new Date().toISOString().split("T")[0],
    due_date: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["teacher-tasks"],
    queryFn: () => getAllMyTasks(),
  });

  const createTaskMutation = useMutation({
    mutationFn: (body: any) => createTeacherTask(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-tasks"] });
      toast.success("Task created successfully!");
      setIsCreateOpen(false);
      setFormData({
        title: "",
        description: "",
        subject: "",
        batch_id: "",
        assigned_date: new Date().toISOString().split("T")[0],
        due_date: "",
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create task");
    }
  });

  const taskTableData: TeacherTask[] = useMemo(() => {
    const tasks = data || [];
    return tasks
      .filter((t: any) => t.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((task: any) => ({
        id: task._id,
        title: task.title,
        subject: task.subject,
        batchName: typeof task.batch_id === 'object' ? task.batch_id.name : "Assigned Batch",
        dueDate: task.due_date,
        assignedDate: task.assigned_date,
      }));
  }, [data, searchTerm]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation.mutate(formData);
  };

  if (isLoading) return <div className="p-12 text-center">Loading assignments...</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-foreground italic uppercase">
            TASK <span className="text-indigo-500 not-italic font-bold">MANAGEMENT</span>
          </h2>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-indigo-500" />
            Create and track assignments for your batches
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 px-8 py-6 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5" />
              Create New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl overflow-hidden p-0 bg-background/95 backdrop-blur-xl">
             <div className="h-2 bg-indigo-600" />
             <div className="p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black italic uppercase">Assign <span className="text-indigo-600 not-italic">New Task</span></DialogTitle>
                  <DialogDescription className="font-medium">
                    Fill in the details below to notify students in the batch.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateTask} className="space-y-6 mt-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground ml-1">Task Title</Label>
                      <Input 
                        required 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g. Mid-term Algebra Quiz" 
                        className="rounded-xl h-11 bg-muted/30 border-none focus:ring-2 ring-indigo-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground ml-1">Subject</Label>
                      <Input 
                        required 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="e.g. Mathematics" 
                        className="rounded-xl h-11 bg-muted/30 border-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground ml-1">Batch ID</Label>
                      <Input 
                        required 
                        value={formData.batch_id}
                        onChange={(e) => setFormData({...formData, batch_id: e.target.value})}
                        placeholder="Enter Batch ID" 
                        className="rounded-xl h-11 bg-muted/30 border-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground ml-1">Due Date</Label>
                      <Input 
                        required 
                        type="date" 
                        value={formData.due_date}
                        onChange={(e) => setFormData({...formData, due_date: e.target.value})}
                        className="rounded-xl h-11 bg-muted/30 border-none"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label className="uppercase text-[10px] font-black tracking-widest text-muted-foreground ml-1">Description</Label>
                      <Textarea 
                        required 
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Instructions for the students..." 
                        className="rounded-2xl min-h-[100px] bg-muted/30 border-none pt-4"
                      />
                    </div>
                  </div>
                  <DialogFooter className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={createTaskMutation.isPending}
                      className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 font-bold uppercase italic"
                    >
                      {createTaskMutation.isPending ? "Assigning..." : "Assign Task to Batch"}
                    </Button>
                  </DialogFooter>
                </form>
             </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-indigo-500/5 border-indigo-500/20 overflow-hidden relative rounded-3xl">
          <CardHeader className="pb-2">
            <CardDescription className="text-indigo-500 font-black uppercase tracking-wider text-[10px]">Active Assignments</CardDescription>
            <CardTitle className="text-4xl font-black">{taskTableData.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Task Table */}
      <Card className="border-border/40 shadow-2xl rounded-3xl overflow-hidden bg-card/40 backdrop-blur-md">
        <CardHeader className="border-b border-border/40 bg-muted/20 pb-6 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                Assignment Directory
              </CardTitle>
              <CardDescription>Review and manage all tasks sent to your students</CardDescription>
            </div>
            <div className="relative w-full sm:w-72 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-indigo-500 transition-colors" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-border/60 focus:ring-indigo-500/20 rounded-xl h-11"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable 
            columns={columns as any} 
            data={taskTableData} 
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManagement;
