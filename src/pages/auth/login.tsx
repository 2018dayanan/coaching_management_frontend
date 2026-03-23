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
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  adminLoginSchema,
  type SuperAdminLoginForm,
} from "@/validators/adminlogin.schema";
import { loginEducationAdmin } from "@/api/educationAuthApi";
import DotsLoader from "@/components/ui/dotsLoader";
import { useAuth } from "@/providers/AuthProvider";

const SuperAdminLogin = () => {
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
      const response = await loginEducationAdmin({
        email: values.email,
        password: values.password,
      });

      if (response.status) {
        const userData = response.admin || response.teacher || response.user;
        if (userData) {
          login(response.token, userData);
          toast.success("Welcome back, Admin!");
        } else {
          toast.error("User data not found in response.");
        }
      } else {
        toast.error(response.message || "Invalid credentials. Please try again.");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMessage = error.response?.data?.message || "Connection failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden animate-mesh">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-secondary rounded-full blur-[120px] animate-float [animation-delay:2s]" />
        <div className="absolute top-[40%] right-[15%] w-40 h-40 bg-accent rounded-full blur-[80px] animate-float [animation-delay:4s]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <Card className="glass-card overflow-hidden border-white/10 shadow-2xl">
          <CardHeader className="text-center space-y-4 pt-10">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl ring-1 ring-white/20 shadow-inner animate-float">
                <ShieldCheck className="h-10 w-10 text-secondary" />
              </div>
            </motion.div>
            
            <div className="space-y-1">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                  Welcome Back <Sparkles className="h-5 w-5 text-accent" />
                </CardTitle>
                <CardDescription className="text-slate-300 font-medium text-lg mt-2">
                  Education Admin Portal
                </CardDescription>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-2"
              >
                <Label className="text-slate-300 text-sm font-semibold ml-1">Admin Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-focus-within:text-secondary transition-colors" />
                  <Input
                    {...register("email")}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="pl-11 h-12 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-secondary/50 input-focus-glow transition-all rounded-xl"
                  />
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-400 ml-1 font-medium"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <Label className="text-slate-300 text-sm font-semibold ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-500 group-focus-within:text-secondary transition-colors" />
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="pl-11 h-12 bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-secondary/50 input-focus-glow transition-all rounded-xl"
                  />
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-400 ml-1 font-medium"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </AnimatePresence>
                {!errors.password && (
                  <p className="text-[10px] text-slate-500 flex items-center gap-1 ml-1 opacity-70">
                    <Lock className="h-3 w-3 text-accent" /> Secure multi-character encryption active
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-2"
              >
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 rounded-xl cursor-pointer bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-secondary/20 text-white font-bold text-lg transition-all hover:translate-y-[-2px] active:translate-y-[0px] flex items-center justify-center gap-2 overflow-hidden group border-none"
                >
                  {isPending ? (
                    <DotsLoader />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <div className="h-px w-full bg-white/5" />
              <Link 
                to="/auth/login" 
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-2 group font-medium"
              >
                <ShieldCheck className="h-3 w-3 text-secondary" />
                Are you a Teacher? <span className="text-secondary group-hover:underline">Login here</span>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1 }}
              className="mt-4 text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold"
            >
              Enterprise Grade Security
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SuperAdminLogin;
