import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const HomeHero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-gradient-to-b from-indigo-500/5 via-background to-background">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-violet-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-widest"
            >
              <CheckCircle2 className="h-4 w-4" />
              Enrollment for 2026 Now Open
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] uppercase"
            >
              IGNITE YOUR <br />
              <span className="text-indigo-600 not-italic">POTENTIAL</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Experience the next generation of coaching with our data-driven curriculum, expert mentorship, and premium learning environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4"
            >
              <Link to="/auth/login">
                <Button className="h-16 px-10 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-lg font-black uppercase italic tracking-tighter shadow-2xl shadow-indigo-600/30 group">
                  Book Free Trial
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" className="h-16 px-8 rounded-2xl border-border/60 hover:bg-muted font-bold uppercase italic tracking-tighter flex items-center gap-3">
                <div className="p-2 bg-indigo-600 rounded-full text-white shadow-lg">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                Watch Method
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex items-center gap-10 pt-10 border-t border-border/40 justify-center lg:justify-start"
            >
              <div className="space-y-1">
                <div className="text-3xl font-black italic tracking-tighter uppercase">5K<span className="text-indigo-600">+</span></div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Learners</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black italic tracking-tighter uppercase">98<span className="text-indigo-600">%</span></div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Success Rate</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-black italic tracking-tighter uppercase">120<span className="text-indigo-600">+</span></div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Expert Mentors</div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual (Abstract) */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-indigo-600/10 border border-indigo-500/20 shadow-2xl p-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-violet-600 to-indigo-800 opacity-20" />
              <div className="relative h-full w-full rounded-[2rem] bg-background/50 backdrop-blur-sm border border-white/10 overflow-hidden flex items-center justify-center p-12 text-center">
                 <div className="space-y-4">
                    <GraduationCap className="h-20 w-20 text-indigo-600 mx-auto mb-6 opacity-80" />
                    <div className="text-2xl font-black uppercase italic tracking-tighter leading-none">The Future of <br/> <span className="text-indigo-600">Learning</span> is Here</div>
                    <div className="text-sm font-medium text-muted-foreground opacity-70">Experience the synergy of technology and education.</div>
                 </div>
              </div>
              
              {/* Floating Cards (Decorative) */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 p-4 bg-background border rounded-2xl shadow-xl flex items-center gap-3 z-20"
              >
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600"><CheckCircle2 className="h-4 w-4" /></div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground">LIVE CLASSES NOW</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-6 p-4 bg-background border rounded-2xl shadow-xl flex items-center gap-3 z-20"
              >
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600 italic font-black text-xs">A+</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-foreground">PREMIUM RESULTS</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GraduationCap = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default HomeHero;
