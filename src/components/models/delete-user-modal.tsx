import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-model-store";
import { deleteEducationUser } from "@/api/educationUserApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import DotsLoader from "@/components/ui/dotsLoader";

export const DeleteUserDialog = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "deleteUser";
  const { id, name } = data || {};

  const onDelete = async () => {
    if (!id) return;
    
    setIsPending(true);
    try {
      await deleteEducationUser(id);
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["education-users"] });
      onClose();
    } catch (error: any) {
      console.error("Delete User Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] gap-0 p-0 overflow-hidden border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl">
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
               <AlertCircle className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <DialogTitle className="text-xl font-bold text-foreground">
                Delete User
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-muted/30 border border-white/5 space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Confirm Deletion For</p>
            <p className="text-sm font-bold text-foreground">{name || "Selected User"}</p>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Deleting this user will remove their access to the platform and archive their historical data. 
            Are you sure you want to proceed?
          </p>
        </div>

        <DialogFooter className="p-6 bg-muted/20 border-t border-white/5 flex gap-2">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onClose}
            className="hover:bg-muted font-bold transition-all rounded-xl flex-1"
          >
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
                    Delete Now
                </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
