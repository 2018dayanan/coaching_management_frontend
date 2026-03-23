import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { GraduationCap, Lock, Mail, ArrowRight, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminLoginSchema,
  type SuperAdminLoginForm,
} from "@/validators/adminlogin.schema";
import { loginEducationTeacher } from "@/api/educationAuthApi";
import DotsLoader from "@/components/ui/dotsLoader";
import { useAuth } from "@/providers/AuthProvider";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuperAdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (values: SuperAdminLoginForm) => {
    setIsPending(true);
    try {
      const response = await loginEducationTeacher({
        email: values.email,
        password: values.password,
      });

      if (response.status) {
        login(response.token, response.admin);
        toast.success("Welcome back, Teacher!");
        navigate("/admin"); // Or teacher specific dashboard if exists
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Connection failed. Please check your credentials.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0c]">
      {/* Dynamic Background Elements - Different Palette for Teachers (Indigo/Violet/Cyan) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[5%] right-[10%] w-72 h-72 bg-indigo-600 rounded-full blur-[110px] animate-pulse" />
        <div className="absolute bottom-[15%] left-[10%] w-96 h-96 bg-violet-600 rounded-full blur-[130px] animate-float [animation-delay:1s]" />
        <div className="absolute top-[45%] left-[25%] w-52 h-52 bg-cyan-500 rounded-full blur-[90px] animate-float [animation-delay:3s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md z-10"
      >
        <Card className="bg-black/40 backdrop-blur-3xl border-indigo-500/20 shadow-[0_0_50px_-12px_rgba(79,70,229,0.3)] overflow-hidden">
          <CardHeader className="text-center space-y-4 pt-10">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="flex justify-center"
            >
              <div className="p-4 bg-gradient-to-br from-indigo-500/30 to-violet-500/30 rounded-3xl ring-1 ring-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <GraduationCap className="h-12 w-12 text-indigo-400" />
              </div>
            </motion.div>
            
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2 italic">
                  TEACHER <span className="text-indigo-400 not-italic">HUB</span>
                </CardTitle>
                <CardDescription className="text-indigo-200/60 font-medium text-base mt-1">
                  Connect with your students and manage your classes
                </CardDescription>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="px-10 pb-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label className="text-indigo-100/70 text-xs font-bold uppercase tracking-wider ml-1">Work Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" />
                  <Input
                    {...register("email")}
                    placeholder="teacher@academy.com"
                    autoComplete="email"
                    className="pl-12 h-14 bg-indigo-950/20 border-white/5 text-white placeholder:text-indigo-300/20 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all rounded-2xl text-lg shadow-inner"
                  />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-rose-400/80 ml-1 font-semibold uppercase">{errors.email.message}</p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center ml-1">
                  <Label className="text-indigo-100/70 text-xs font-bold uppercase tracking-wider">Access Key</Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" />
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="Secret Key"
                    autoComplete="current-password"
                    className="pl-12 h-14 bg-indigo-950/20 border-white/5 text-white placeholder:text-indigo-300/20 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all rounded-2xl text-lg shadow-inner"
                  />
                </div>
                {errors.password && (
                  <p className="text-[10px] text-rose-400/80 ml-1 font-semibold uppercase">{errors.password.message}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-14 rounded-2xl cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-lg tracking-tighter shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group border-none"
                >
                  {isPending ? (
                    <DotsLoader />
                  ) : (
                    <>
                      <span>ENTER PORTAL</span>
                      <ArrowRight className="h-6 w-6 group-hover:translate-x-1.5 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
              
              <Link 
                to="/admin/auth/login" 
                className="text-xs text-indigo-300/40 hover:text-indigo-200 transition-colors font-bold uppercase tracking-[0.2em] flex items-center gap-2 group"
              >
                <UserCheck className="h-3 w-3 group-hover:scale-110 transition-transform" />
                Switch to Admin Login
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modern Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
    </div>
  );
};

export default TeacherLogin;
