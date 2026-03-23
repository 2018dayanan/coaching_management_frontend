import { motion } from "framer-motion";
import { 
  Video, 
  Users, 
  Target, 
  Zap, 
  ShieldCheck, 
  Trophy 
} from "lucide-react";

const features = [
  {
    icon: <Video className="h-6 w-6" />,
    title: "Live Interactive Classes",
    description: "Real-time sessions with direct instructor feedback and group discussions.",
    color: "indigo"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Mentorship",
    description: "Learn from industry professionals with years of teaching experience.",
    color: "blue"
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Personalized Roadmap",
    description: "Custom learning paths tailored to your specific career and academic goals.",
    color: "emerald"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Accelerated Learning",
    description: "Optimized curriculum designed to help you master complex topics faster.",
    color: "amber"
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Proven Methodology",
    description: "Scientific teaching techniques that enhance retention and understanding.",
    color: "rose"
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Industry Certification",
    description: "Recognized certificates of completion to boost your professional profile.",
    color: "violet"
  }
];

const HomeFeatures = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-indigo-600 font-bold uppercase tracking-widest text-xs"
          >
            Why Choose EduGate?
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none"
          >
            ENGINEERED FOR <span className="text-indigo-600">EXCELLENCE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-medium text-lg"
          >
            We don't just teach modules; we build futures. Our ecosystem is designed to provide the most immersive coaching experience possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-card/40 border border-border/40 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-700">
                {feature.icon}
              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                feature.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' :
                feature.color === 'blue' ? 'bg-blue-500/10 text-blue-600' :
                feature.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' :
                feature.color === 'amber' ? 'bg-amber-500/10 text-amber-600' :
                feature.color === 'rose' ? 'bg-rose-500/10 text-rose-600' :
                'bg-violet-500/10 text-violet-600'
              }`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold italic uppercase tracking-tighter mb-3 group-hover:text-indigo-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground font-medium text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;
