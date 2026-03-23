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
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema, type UpdateUserFormValues } from "@/validators/user.schema";
import { updateEducationUser } from "@/api/educationUserApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import DotsLoader from "@/components/ui/dotsLoader";

export const EditUserDialog = () => {
  const { isOpen, type, onClose, data } = useModal();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "editUser";
  const user = data?.user;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        mobile: user.phone || user.mobile,
        role: user.role,
        gender: user.gender,
        status: user.status,
      });
    }
  }, [user, reset]);

  const onSubmit = async (values: UpdateUserFormValues) => {
    if (!user?.id) return;
    
    setIsPending(true);
    try {
      const response = await updateEducationUser(user.id, values);

      if (response) {
        toast.success("User updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["education-users"] });
        queryClient.invalidateQueries({ queryKey: ["education-user", user.id] });
        onClose();
      }
    } catch (error: any) {
      console.error("Update User Error:", error);
      toast.error(error.response?.data?.message || "Failed to update user.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] gap-6 border bg-background/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Edit User Profile
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Update the information for {user?.name || "this user"}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Full Name</Label>
            <Input 
              {...register("name")} 
              placeholder="e.g. Rahul Sharma" 
              className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
            />
            {errors.name && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Mobile Number</Label>
              <Input
                {...register("mobile")}
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="bg-muted/30 border-border/50 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              />
              {errors.mobile && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.mobile.message}</p>}
            </div>
             <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Account Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-xl backdrop-blur-xl">
                      <SelectItem value="active" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md text-emerald-500 font-bold">Active</SelectItem>
                      <SelectItem value="inactive" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md text-rose-500 font-bold">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Primary Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-xl backdrop-blur-xl">
                      <SelectItem value="student" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Student</SelectItem>
                      <SelectItem value="teacher" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Gender</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="bg-muted/30 border-border/50 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border shadow-xl backdrop-blur-xl">
                      <SelectItem value="male" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Male</SelectItem>
                      <SelectItem value="female" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Female</SelectItem>
                      <SelectItem value="other" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <DialogFooter className="pt-4 mt-2 border-t border-white/5">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-border/60 hover:bg-muted font-bold transition-all rounded-xl w-full sm:w-auto"
            >
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
