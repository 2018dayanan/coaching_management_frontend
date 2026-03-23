import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModal } from "@/hooks/use-model-store";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBatchSchema, type CreateBatchFormValues } from "@/validators/batch.schema";
import { createBatch } from "@/api/educationBatchApi";
import { getAllEducationUsers } from "@/api/educationUserApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useCallback } from "react";
import DotsLoader from "@/components/ui/dotsLoader";
import { Search, UserCheck, Users, Check } from "lucide-react";

export const CreateBatchDialog = () => {
  const { isOpen, type, onClose } = useModal();
  const [isPending, setIsPending] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  // Separate local state for student selection to avoid Radix Checkbox render loops
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "createBatch";

  // Fetch Teachers
  const { data: teachersData } = useQuery({
    queryKey: ["education-teachers", "active"],
    queryFn: () => getAllEducationUsers({ role: "teacher", status: "active" }),
    enabled: isModalOpen,
  });

  // Fetch Students (Increased limit to show all for selection)
  const { data: studentsData } = useQuery({
    queryKey: ["education-students-all"],
    queryFn: () => getAllEducationUsers({ role: "student", limit: 1000 }),
    enabled: isModalOpen,
  });

  const teachers = Array.isArray(teachersData) ? teachersData : (teachersData as any)?.users || [];
  const students = Array.isArray(studentsData) ? studentsData : (studentsData as any)?.users || [];

  const filteredStudents = students.filter((s: any) =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
    (s.unique_id && s.unique_id.toLowerCase().includes(studentSearch.toLowerCase()))
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateBatchFormValues>({
    resolver: zodResolver(createBatchSchema),
    defaultValues: {
      status: "active",
    },
  });

  const onSubmit = async (values: CreateBatchFormValues) => {
    setIsPending(true);
    try {
      // Merge locally-tracked student selection into form data at submit time
      await createBatch({ ...values, enrolled_students: selectedStudents });
      toast.success("Batch created successfully!");
      queryClient.invalidateQueries({ queryKey: ["education-batches"] });
      handleClose();
    } catch (error: any) {
      console.error("Create Batch Error:", error);
      toast.error(error.response?.data?.message || "Failed to create batch.");
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    reset();
    setStudentSearch("");
    setSelectedStudents([]);
    onClose();
  };

  const toggleStudent = useCallback((studentId: string) => {
    setSelectedStudents(prev => {
      const index = prev.indexOf(studentId);
      if (index > -1) {
        return prev.filter(id => id !== studentId);
      }
      return [...prev, studentId];
    });
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] gap-6 border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Create New Batch
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Setup a new coaching learning group and enroll students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Left Column: Basic Info */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Batch Name</Label>
                <Input
                  {...register("name")}
                  placeholder="e.g. English Language Course"
                  className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                />
                {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Subject Code</Label>
                  <Input
                    {...register("subject")}
                    placeholder="e.g. ENG-101"
                    className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                  />
                  {errors.subject && <p className="text-xs text-rose-500 font-bold">{errors.subject.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Batch Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value || "active"}>
                        <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border shadow-xl backdrop-blur-xl">
                          <SelectItem value="active" className="focus:bg-primary focus:text-white m-1 rounded-md">Active</SelectItem>
                          <SelectItem value="completed" className="focus:bg-primary focus:text-white m-1 rounded-md">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Description</Label>
                <Input
                  {...register("description")}
                  placeholder="Writing, speaking and reading skills..."
                  className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Assigned Instructor</Label>
                <Controller
                  name="teacher_id"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border shadow-xl backdrop-blur-xl">
                        {teachers.map((t: any) => (
                          <SelectItem key={t.id || t._id} value={t.id || t._id} className="focus:bg-primary focus:text-white m-1 rounded-md">
                            {t.name} ({t.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.teacher_id && <p className="text-xs text-rose-500 font-bold">{errors.teacher_id.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Start Date</Label>
                  <Input
                    {...register("start_date")}
                    type="date"
                    className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                  />
                  {errors.start_date && <p className="text-xs text-rose-500 font-bold">{errors.start_date.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">End Date</Label>
                  <Input
                    {...register("end_date")}
                    type="date"
                    className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                  />
                  {errors.end_date && <p className="text-xs text-rose-500 font-bold">{errors.end_date.message}</p>}
                </div>
              </div>
            </div>

            <div className="space-y-4 flex flex-col h-full overflow-hidden">
              {/* Right Column: Student Selection */}
              <div className="flex justify-between items-end">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Enroll Students</Label>
                <span className="text-[10px] font-black text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">{selectedStudents.length} Selected</span>
              </div>

              <div className="relative group">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Search by name, email or ID..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="pl-8 h-9 bg-muted/20 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg text-xs"
                />
              </div>

              <div className="flex-1 rounded-xl border border-border/50 bg-muted/10 overflow-hidden min-h-[250px] flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-1">
                    {filteredStudents.length === 0 ? (
                      <div className="text-center py-10 opacity-50 space-y-2">
                        <Users className="h-8 w-8 mx-auto" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">No matching students</p>
                      </div>
                    ) : (
                      filteredStudents.map((s: any) => {
                        const sid = s.id || s._id;
                        const isSelected = selectedStudents.includes(sid);
                        return (
                          <div
                            key={sid}
                            onClick={() => toggleStudent(sid)}
                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-secondary/10 border-l-4 border-secondary' : 'hover:bg-muted/30'}`}
                          >
                            {/* Pure CSS checkbox — no Radix, no render loop */}
                            <div className={`h-4 w-4 shrink-0 rounded-sm border grid place-content-center transition-colors ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30'}`}>
                              {isSelected && <Check className="h-3 w-3" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="text-xs font-bold truncate">{s.name}</p>
                                <span className="text-[10px] opacity-40 font-mono">{s.unique_id || "ID-N/A"}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground truncate">{s.email}</p>
                            </div>
                            {isSelected && <UserCheck className="h-3 w-3 text-secondary shrink-0" />}
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 border-t border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-border/60 hover:bg-muted font-bold transition-all rounded-xl h-10 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-secondary hover:bg-secondary/90 text-white font-black shadow-lg shadow-secondary/20 transition-all active:scale-95 px-10 rounded-xl h-10 overflow-hidden min-w-[150px]"
            >
              {isPending ? <DotsLoader /> : "Authorize Batch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
