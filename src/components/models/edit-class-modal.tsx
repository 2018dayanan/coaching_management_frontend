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
import { useModal } from "@/hooks/use-model-store";
import { useForm, Controller } from "react-hook-form";
import { updateClass, type UpdateClassBody } from "@/api/educationClassApi";
import { getAllEducationUsers } from "@/api/educationUserApi";
import { getAllBatches } from "@/api/educationBatchApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import DotsLoader from "@/components/ui/dotsLoader";

export const EditClassDialog = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "editClass";
  const classData = data?.classData;

  const { data: teachersData } = useQuery({
    queryKey: ["education-teachers", "active"],
    queryFn: () => getAllEducationUsers({ role: "teacher", status: "active" }),
    enabled: isModalOpen,
  });

  const { data: batchesData } = useQuery({
    queryKey: ["education-batches"],
    queryFn: () => getAllBatches(),
    enabled: isModalOpen,
  });

  const teachers = Array.isArray(teachersData) ? teachersData : (teachersData as any)?.users || [];
  const batches = Array.isArray(batchesData) ? batchesData : (batchesData as any)?.batches || [];

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm<UpdateClassBody>({});

  // Pre-populate form with existing class data
  useEffect(() => {
    if (classData) {
      reset({
        title: classData.title || "",
        subject: classData.subject || "",
        batch_id: classData.batch_id || "",
        class_date: classData.class_date?.split("T")[0] || "",
        class_time: classData.class_time || "",
        meeting_link: classData.meeting_link || "",
        teacher_id: classData.teacher_id || "",
      });
    }
  }, [classData, reset]);

  const onSubmit = async (values: UpdateClassBody) => {
    if (!classData?.id) return;
    setIsPending(true);
    try {
      await updateClass(classData.id, values);
      toast.success("Class updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["education-classes"] });
      handleClose();
    } catch (error: any) {
      console.error("Update Class Error:", error);
      toast.error(error.response?.data?.message || "Failed to update class.");
    } finally {
      setIsPending(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] gap-6 border bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
            Edit Class Session
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Update session details for {classData?.title || "this class"}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit, (errs) => {
          console.error("Edit Class Validation:", errs);
          toast.error("Please fix the form errors.");
        })} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Class Title</Label>
            <Input
              {...register("title")}
              placeholder="e.g. React Server Actions Deep Dive"
              className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Subject</Label>
              <Input
                {...register("subject")}
                placeholder="e.g. Next.js Advanced"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Batch</Label>
              <Controller
                name="batch_id"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-xl backdrop-blur-xl">
                      {batches.map((b: any) => (
                        <SelectItem key={b._id || b.id} value={b._id || b.id} className="focus:bg-primary focus:text-white m-1 rounded-md">
                          {b.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
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
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Class Date</Label>
              <Input
                {...register("class_date")}
                type="date"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Class Time</Label>
              <Input
                {...register("class_time")}
                type="time"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Meeting Link</Label>
            <Input
              {...register("meeting_link")}
              placeholder="https://zoom.us/j/..."
              className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
            />
          </div>

          <DialogFooter className="pt-4 mt-2 border-t border-border/50">
            <Button type="button" variant="outline" onClick={handleClose} className="border-border/60 hover:bg-muted font-bold transition-all rounded-xl w-full sm:w-auto">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-secondary hover:bg-secondary/90 text-white font-black shadow-lg shadow-secondary/20 transition-all active:scale-95 px-8 rounded-xl w-full sm:w-auto overflow-hidden min-w-[140px]"
            >
              {isPending ? <DotsLoader /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
