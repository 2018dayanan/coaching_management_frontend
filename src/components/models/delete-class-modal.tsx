import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-model-store";
import { deleteClass } from "@/api/educationClassApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import DotsLoader from "@/components/ui/dotsLoader";

export const DeleteClassDialog = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "deleteClass";
  const classData = data?.classData;

  const onDelete = async () => {
    if (!classData?.id) return;

    setIsPending(true);
    try {
      await deleteClass(classData.id);
      toast.success("Class cancelled successfully!");
      queryClient.invalidateQueries({ queryKey: ["education-classes"] });
      onClose();
    } catch (error: any) {
      console.error("Delete Class Error:", error);
      toast.error(error.response?.data?.message || "Failed to cancel class.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] gap-0 p-0 overflow-hidden border bg-background/95 backdrop-blur-xl shadow-2xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold text-foreground">
                Cancel Class
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Confirm Cancellation For</p>
            <p className="text-sm font-bold text-foreground">{classData?.title || "Selected Class"}</p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Cancelling this class will remove it from the schedule. Students enrolled in the batch will no longer see this session.
          </p>
        </div>

        <DialogFooter className="p-6 bg-muted/20 border-t border-border/50 flex gap-2">
          <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-muted font-bold transition-all rounded-xl flex-1">
            Go Back
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={onDelete}
            className="bg-rose-500 hover:bg-rose-600 text-white font-black shadow-lg shadow-rose-500/20 transition-all active:scale-95 flex-1 rounded-xl gap-2"
          >
            {isPending ? <DotsLoader /> : (
              <>
                <Trash2 className="h-4 w-4" />
                Cancel Class
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
