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
import type { UpdateBatchFormValues } from "@/validators/batch.schema";
import { updateBatch, getBatchById } from "@/api/educationBatchApi";
import { getAllEducationUsers } from "@/api/educationUserApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect, useCallback, useMemo } from "react";
import DotsLoader from "@/components/ui/dotsLoader";
import { Search, UserCheck, Users, X, UserPlus } from "lucide-react";

export const EditBatchDialog = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isPending, setIsPending] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  // Track students to add / remove relative to the original enrolled list
  const [studentsToAdd, setStudentsToAdd] = useState<string[]>([]);
  const [studentsToRemove, setStudentsToRemove] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "editBatch";
  const batchFromTable = data?.batch;

  // Fetch full batch details (includes enrolled_students with populated data)
  const { data: batchDetail } = useQuery({
    queryKey: ["education-batch", batchFromTable?.id],
    queryFn: () => getBatchById(batchFromTable?.id),
    enabled: isModalOpen && !!batchFromTable?.id,
  });

  // Fetch all teachers
  const { data: teachersData } = useQuery({
    queryKey: ["education-teachers"],
    queryFn: () => getAllEducationUsers({ role: "teacher" }),
    enabled: isModalOpen,
  });

  // Fetch all students
  const { data: studentsData } = useQuery({
    queryKey: ["education-students-all"],
    queryFn: () => getAllEducationUsers({ role: "student", limit: 1000 }),
    enabled: isModalOpen,
  });

  const teachers = Array.isArray(teachersData) ? teachersData : (teachersData as any)?.users || [];
  const allStudents = Array.isArray(studentsData) ? studentsData : (studentsData as any)?.users || [];

  // Original enrolled student IDs (from API response)
  const originalEnrolledIds: string[] = useMemo(() => {
    if (!batchDetail?.enrolled_students) return [];
    return batchDetail.enrolled_students.map((s: any) => typeof s === "string" ? s : s._id || s.id);
  }, [batchDetail]);

  // Current view of enrolled students: original + added - removed
  const currentEnrolledIds = useMemo(() => {
    const set = new Set(originalEnrolledIds);
    studentsToAdd.forEach(id => set.add(id));
    studentsToRemove.forEach(id => set.delete(id));
    return Array.from(set);
  }, [originalEnrolledIds, studentsToAdd, studentsToRemove]);

  // Separate into enrolled vs available
  const enrolledStudents = allStudents.filter((s: any) => currentEnrolledIds.includes(s._id || s.id));
  const availableStudents = allStudents.filter((s: any) => !currentEnrolledIds.includes(s._id || s.id));

  // Filter available students by search
  const filteredAvailable = availableStudents.filter((s: any) =>
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
  } = useForm<UpdateBatchFormValues>({});

  // Reset form when batch detail loads
  useEffect(() => {
    if (batchDetail) {
      reset({
        name: batchDetail.name,
        subject: batchDetail.subject,
        description: batchDetail.description || "",
        teacher_id: batchDetail.teacher_id?._id || batchDetail.teacher_id || "",
        start_date: batchDetail.start_date?.split("T")[0] || "",
        end_date: batchDetail.end_date?.split("T")[0] || "",
        status: batchDetail.status || "active",
      });
      setStudentsToAdd([]);
      setStudentsToRemove([]);
      setStudentSearch("");
    }
  }, [batchDetail, reset]);

  const onSubmit = async (values: UpdateBatchFormValues) => {
    if (!batchFromTable?.id) return;
    setIsPending(true);
    try {
      const body: any = { ...values };
      if (studentsToAdd.length > 0) body.add_students = studentsToAdd;
      if (studentsToRemove.length > 0) body.remove_students = studentsToRemove;

      await updateBatch(batchFromTable.id, body);
      toast.success("Batch updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["education-batches"] });
      queryClient.invalidateQueries({ queryKey: ["education-batch", batchFromTable.id] });
      handleClose();
    } catch (error: any) {
      console.error("Update Batch Error:", error);
      toast.error(error.response?.data?.message || "Failed to update batch.");
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    reset();
    setStudentsToAdd([]);
    setStudentsToRemove([]);
    setStudentSearch("");
    onClose();
  };

  // Add a student to the batch
  const addStudent = useCallback((studentId: string) => {
    // If student was originally enrolled and then marked for removal, just un-remove them
    if (studentsToRemove.includes(studentId)) {
      setStudentsToRemove(prev => prev.filter(id => id !== studentId));
    } else {
      setStudentsToAdd(prev => [...prev, studentId]);
    }
  }, [studentsToRemove]);

  // Remove a student from the batch
  const removeStudent = useCallback((studentId: string) => {
    // If student was just added (not originally enrolled), just un-add them
    if (studentsToAdd.includes(studentId)) {
      setStudentsToAdd(prev => prev.filter(id => id !== studentId));
    } else {
      setStudentsToRemove(prev => [...prev, studentId]);
    }
  }, [studentsToAdd]);

  const changeCount = studentsToAdd.length + studentsToRemove.length;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[750px] gap-6 border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Edit Batch
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Update batch details and manage student enrollment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit, (validationErrors) => {
          console.error("Edit Batch Validation Errors:", validationErrors);
          toast.error("Please fix the form errors before saving.");
        })} className="space-y-6 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ─── Left: Batch Fields ─── */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Batch Name</Label>
                <Input {...register("name")} placeholder="e.g. English Language Course" className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10" />
                {errors.name && <p className="text-xs text-rose-500 font-bold">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Subject Code</Label>
                  <Input {...register("subject")} placeholder="e.g. ENG" className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Status</Label>
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
                <Input {...register("description")} placeholder="Batch description..." className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Instructor</Label>
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
                          <SelectItem key={t._id || t.id} value={t._id || t.id} className="focus:bg-primary focus:text-white m-1 rounded-md">
                            {t.name} ({t.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Start Date</Label>
                  <Input {...register("start_date")} type="date" className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">End Date</Label>
                  <Input {...register("end_date")} type="date" className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10" />
                </div>
              </div>
            </div>

            {/* ─── Right: Student Management ─── */}
            <div className="space-y-4 flex flex-col h-full overflow-hidden">
              {/* Enrolled Students Section */}
              <div className="flex justify-between items-end">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                  Enrolled Students
                </Label>
                <div className="flex gap-2">
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    {currentEnrolledIds.length} Enrolled
                  </span>
                  {changeCount > 0 && (
                    <span className="text-[10px] font-black text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      {changeCount} Change{changeCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              {/* Current Enrolled List */}
              <div className="rounded-xl border border-border/50 bg-muted/10 overflow-hidden min-h-[120px] max-h-[160px]">
                <ScrollArea className="h-full max-h-[160px]">
                  <div className="p-2 space-y-1">
                    {enrolledStudents.length === 0 ? (
                      <div className="text-center py-6 opacity-50 space-y-1">
                        <Users className="h-6 w-6 mx-auto" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">No students enrolled</p>
                      </div>
                    ) : (
                      enrolledStudents.map((s: any) => {
                        const sid = s._id || s.id;
                        const isNewlyAdded = studentsToAdd.includes(sid);
                        return (
                          <div
                            key={sid}
                            className={`flex items-center justify-between gap-2 p-2 rounded-lg transition-all ${
                              isNewlyAdded
                                ? "bg-emerald-500/10 border-l-4 border-emerald-500"
                                : "bg-secondary/5 border-l-4 border-secondary/30"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <UserCheck className="h-3 w-3 text-secondary shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs font-bold truncate">{s.name}</p>
                                <p className="text-[10px] text-muted-foreground truncate">{s.email}</p>
                              </div>
                              {isNewlyAdded && (
                                <span className="text-[8px] font-black text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">NEW</span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeStudent(sid)}
                              className="h-6 w-6 rounded-md grid place-content-center hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                              title="Remove student"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Add Students Section */}
              <div className="flex justify-between items-end pt-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                  <UserPlus className="h-3 w-3 inline mr-1" />
                  Add Students
                </Label>
                <span className="text-[10px] text-muted-foreground">{filteredAvailable.length} available</span>
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

              <div className="flex-1 rounded-xl border border-border/50 bg-muted/10 overflow-hidden min-h-[120px] flex flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-1">
                    {filteredAvailable.length === 0 ? (
                      <div className="text-center py-6 opacity-50 space-y-1">
                        <Users className="h-6 w-6 mx-auto" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">No available students</p>
                      </div>
                    ) : (
                      filteredAvailable.map((s: any) => {
                        const sid = s._id || s.id;
                        return (
                          <div
                            key={sid}
                            onClick={() => addStudent(sid)}
                            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all hover:bg-muted/30"
                          >
                            <div className="h-4 w-4 shrink-0 rounded-sm border border-muted-foreground/30 grid place-content-center transition-colors" />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className="text-xs font-bold truncate">{s.name}</p>
                                <span className="text-[10px] opacity-40 font-mono">{s.unique_id || "ID-N/A"}</span>
                              </div>
                              <p className="text-[10px] text-muted-foreground truncate">{s.email}</p>
                            </div>
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
            <Button type="button" variant="outline" onClick={handleClose} className="border-border/60 hover:bg-muted font-bold transition-all rounded-xl h-10 px-6">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-secondary hover:bg-secondary/90 text-white font-black shadow-lg shadow-secondary/20 transition-all active:scale-95 px-10 rounded-xl h-10 overflow-hidden min-w-[150px]"
            >
              {isPending ? <DotsLoader /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
