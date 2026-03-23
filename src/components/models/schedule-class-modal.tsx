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
import { createClass, type CreateClassBody } from "@/api/educationClassApi";
import { getAllEducationUsers } from "@/api/educationUserApi";
import { getAllBatches } from "@/api/educationBatchApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import DotsLoader from "@/components/ui/dotsLoader";

export const ScheduleClassDialog = () => {
  const { isOpen, type, onClose } = useModal();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "scheduleClass";

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
    formState: { errors },
  } = useForm<CreateClassBody>({
    defaultValues: {},
  });

  const onSubmit = async (values: CreateClassBody) => {
    setIsPending(true);
    try {
      await createClass(values);
      toast.success("Class scheduled successfully!");
      queryClient.invalidateQueries({ queryKey: ["education-classes"] });
      handleClose();
    } catch (error: any) {
      console.error("Create Class Error:", error);
      toast.error(error.response?.data?.message || "Failed to schedule class.");
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
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Schedule New Class
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Create a new live session for your students.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit, (errs) => {
          console.error("Schedule Class Validation:", errs);
          toast.error("Please fill in all required fields.");
        })} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Class Title</Label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. React Server Actions Deep Dive"
              className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
            />
            {errors.title && <p className="text-xs text-rose-500 font-bold">{errors.title.message}</p>}
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
                rules={{ required: "Batch is required" }}
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
              {errors.batch_id && <p className="text-xs text-rose-500 font-bold">{errors.batch_id.message}</p>}
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
                {...register("class_date", { required: "Date is required" })}
                type="date"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              />
              {errors.class_date && <p className="text-xs text-rose-500 font-bold">{errors.class_date.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Class Time</Label>
              <Input
                {...register("class_time", { required: "Time is required" })}
                type="time"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              />
              {errors.class_time && <p className="text-xs text-rose-500 font-bold">{errors.class_time.message}</p>}
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
              className="bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/20 transition-all active:scale-95 px-8 rounded-xl w-full sm:w-auto overflow-hidden min-w-[140px]"
            >
              {isPending ? <DotsLoader /> : "Schedule Class"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
