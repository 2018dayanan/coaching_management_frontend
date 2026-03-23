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
import {
  getAllMyTasks,
  createTeacherTask,
  getMyBatches,
  updateTeacherTask,
  deleteTeacherTask
} from "@/api/educationTeacherApi";
import { DataTable } from "@/components/DataTable";
import { columns, type TeacherTask } from "@/components/data_tables/teacher_tasks/columns";
import { useMemo, useState, useEffect, useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TaskManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    batch_id: "",
    assigned_date: new Date().toISOString().split("T")[0],
    due_date: "",
    attachment_url: ""
  });

  // Populate form when editing
  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        subject: editingTask.subject || "",
        batch_id: typeof editingTask.batch_id === 'object' ? editingTask.batch_id._id : editingTask.batch_id,
        assigned_date: editingTask.assigned_date ? new Date(editingTask.assigned_date).toISOString().split("T")[0] : "",
        due_date: editingTask.due_date ? new Date(editingTask.due_date).toISOString().split("T")[0] : "",
        attachment_url: editingTask.attachment_url || ""
      });
      setIsDialogOpen(true);
    } else {
      setFormData({
        title: "",
        description: "",
        subject: "",
        batch_id: "",
        assigned_date: new Date().toISOString().split("T")[0],
        due_date: "",
        attachment_url: ""
      });
    }
  }, [editingTask]);

  const { data, isLoading } = useQuery({
    queryKey: ["teacher-tasks"],
    queryFn: () => getAllMyTasks(),
  });

  const { data: batchesData } = useQuery({
    queryKey: ["teacher-batches"],
    queryFn: () => getMyBatches(),
  });

  const createTaskMutation = useMutation({
    mutationFn: (body: any) => createTeacherTask(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-tasks"] });
      toast.success("Task created successfully!");
      setIsDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create task");
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) => updateTeacherTask(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-tasks"] });
      toast.success("Task updated successfully!");
      setIsDialogOpen(false);
      setEditingTask(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTeacherTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-tasks"] });
      toast.success("Task deleted successfully!");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  });

  const handleEdit = useCallback((task: any) => {
    setEditingTask(task);
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTaskMutation.mutate(id);
    }
  }, [deleteTaskMutation]);

  const taskColumns = useMemo(() => 
    columns(handleEdit, handleDelete),
    [handleEdit, handleDelete]
  );

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
        description: task.description,
        batch_id: typeof task.batch_id === 'object' ? task.batch_id._id : task.batch_id,
        attachment_url: task.attachment_url,
        original: task,
      }));
  }, [data, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batch_id) {
      toast.error("Please select a target batch");
      return;
    }

    if (editingTask) {
      updateTaskMutation.mutate({ id: editingTask._id, body: formData });
    } else {
      createTaskMutation.mutate(formData);
    }
  };

  if (isLoading) return <div className="p-12 text-center animate-pulse text-indigo-500 font-bold uppercase italic tracking-tighter">Syncing assignments...</div>;

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

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingTask(null);
          }}
        >
          <DialogTrigger asChild>
            <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 px-8 py-6 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 uppercase italic">
              <Plus className="h-5 w-5" />
              Assign New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] border-none shadow-2xl overflow-hidden p-0 bg-background/95 backdrop-blur-xl">
            <div className="h-3 bg-gradient-to-r from-indigo-600 to-violet-600" />
            <div className="p-8">
              <DialogHeader>
                <DialogTitle className="text-3xl font-black italic uppercase italic">
                  {editingTask ? "Update" : "Assign"} <span className="text-indigo-600 not-italic">Task</span>
                </DialogTitle>
                <DialogDescription className="font-medium text-muted-foreground mt-2">
                  {editingTask
                    ? "Modify the existing assignment details for this batch."
                    : "Distribute new curriculum materials and assignments to your active batches."}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Task Title <span className="text-destructive">*</span></Label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. State Management - Shopping Cart with Context API"
                      className="rounded-2xl h-12 bg-muted/40 border-border/40 focus:ring-2 ring-indigo-500/10 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Subject <span className="text-destructive">*</span></Label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Frontend Development"
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Target Batch <span className="text-destructive">*</span></Label>
                    <Select
                      required
                      value={formData.batch_id}
                      onValueChange={(val) => setFormData({ ...formData, batch_id: val })}
                    >
                      <SelectTrigger className="rounded-xl h-11 bg-muted/30 border-border/40 font-medium text-left">
                        <SelectValue placeholder="Select a batch" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-border/40 shadow-xl">
                        {batchesData?.map((batch) => (
                          <SelectItem key={batch._id} value={batch._id} className="rounded-lg font-medium">
                            {batch.name} ({batch.subject})
                          </SelectItem>
                        ))}
                        {(!batchesData || batchesData.length === 0) && (
                          <div className="p-4 text-center text-xs text-muted-foreground uppercase font-black">No active batches located</div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Assigned Date <span className="text-destructive">*</span></Label>
                    <Input
                      required
                      type="date"
                      value={formData.assigned_date}
                      onChange={(e) => setFormData({ ...formData, assigned_date: e.target.value })}
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Due Date <span className="text-destructive">*</span></Label>
                    <Input
                      required
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Reference URL / Attachment</Label>
                    <Input
                      value={formData.attachment_url}
                      onChange={(e) => setFormData({ ...formData, attachment_url: e.target.value })}
                      placeholder="https://github.com/..."
                      className="rounded-xl h-11 bg-muted/30 border-border/40"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label className="uppercase text-[10px] font-black tracking-widest text-indigo-500/70 ml-1">Curriculum Instructions <span className="text-destructive">*</span></Label>
                    <Textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detail the task objectives and requirements..."
                      className="rounded-[2rem] min-h-[120px] bg-muted/30 border-border/40 pt-4 px-4 font-medium"
                    />
                  </div>
                </div>
                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={createTaskMutation.isPending || updateTaskMutation.isPending}
                    className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-2xl shadow-indigo-600/30 font-black uppercase italic tracking-tighter text-lg group transition-all"
                  >
                    {createTaskMutation.isPending || updateTaskMutation.isPending ? (
                      "Saving..."
                    ) : (
                      <div className="flex items-center gap-2">
                        {editingTask ? "Update Assignment" : "Publish Assignment"}
                        <ListChecks className="h-5 w-5 group-hover:rotate-12 transition-transform" />
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
            columns={taskColumns as any}
            data={taskTableData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskManagement;
