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
import { createUserSchema, type CreateUserFormValues } from "@/validators/user.schema";
import { createUser } from "@/api/educationUserApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import DotsLoader from "@/components/ui/dotsLoader";

export const AddUserDialog = () => {
  const { isOpen, type, onClose } = useModal();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();

  const isModalOpen = isOpen && type === "addUser";

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      role: "student",
      gender: "male",
    },
  });

  const onSubmit = async (values: CreateUserFormValues) => {
    setIsPending(true);
    try {
      const response = await createUser({
        ...values,
        password: values.password || undefined,
      });

      if (response) {
        toast.success("User created successfully!");
        queryClient.invalidateQueries({ queryKey: ["education-users"] });
        reset();
        onClose();
      }
    } catch (error: any) {
      console.error("Create User Error:", error);
      toast.error(error.response?.data?.message || "Failed to create user. Please try again.");
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
      <DialogContent className="sm:max-w-[500px] gap-6 border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add New User
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-medium">
            Create a new student or teacher profile for the platform.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-2">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Full Name</Label>
            <Input 
              {...register("name")} 
              placeholder="e.g. Rahul Sharma" 
              className="bg-muted/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
              required 
            />
            {errors.name && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Email Address</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="name@gmail.com"
                className="bg-muted/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                required
              />
              {errors.email && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Mobile Number</Label>
              <Input
                {...register("mobile")}
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="bg-muted/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
                required
              />
              {errors.mobile && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.mobile.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Permanent Password</Label>
              <span className="text-[10px] text-muted-foreground opacity-50">(Optional)</span>
            </div>
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="bg-muted/40 border-white/5 focus-visible:ring-primary/40 focus-visible:border-primary transition-all rounded-lg h-10"
            />
            {errors.password && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.password.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Primary Role</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-muted/40 border-white/5 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 backdrop-blur-xl">
                      <SelectItem value="student" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Student</SelectItem>
                      <SelectItem value="teacher" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.role.message}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Gender</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-muted/40 border-white/5 focus:ring-primary/40 focus:border-primary transition-all rounded-lg h-10 font-medium">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10 backdrop-blur-xl">
                      <SelectItem value="male" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Male</SelectItem>
                      <SelectItem value="female" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Female</SelectItem>
                      <SelectItem value="other" className="focus:bg-primary focus:text-white transition-colors cursor-pointer m-1 rounded-md">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <p className="text-xs text-rose-500 font-bold tracking-tight">{errors.gender.message}</p>}
            </div>
          </div>

          <DialogFooter className="pt-4 mt-2 border-t border-white/5">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="border-white/10 hover:bg-muted font-bold transition-all rounded-xl w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-primary hover:bg-primary/90 text-white font-black shadow-lg shadow-primary/20 transition-all active:scale-95 px-8 rounded-xl w-full sm:w-auto overflow-hidden min-w-[140px]"
            >
              {isPending ? <DotsLoader /> : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
