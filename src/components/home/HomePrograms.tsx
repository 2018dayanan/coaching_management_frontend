import { motion } from "framer-motion";
import { BookOpen, Brain, Trophy, TrendingUp, Users, Star } from "lucide-react";

const programs = [
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Foundation Courses",
    description: "Build strong fundamentals in core subjects with comprehensive study materials and expert guidance.",
    level: "Class 6-10",
    students: "2,500+",
    rating: 4.9,
    features: ["CBSE/ICSE Aligned", "Weekly Tests", "Doubt Sessions"],
    color: "indigo"
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Entrance Excellence",
    description: "Intensive preparation for competitive exams including JEE, NEET, and other entrance tests.",
    level: "Class 11-12",
    students: "1,800+",
    rating: 4.8,
    features: ["JEE/NEET Prep", "Mock Tests", "Rank Predictors"],
    color: "emerald"
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Olympiad Training",
    description: "Specialized coaching for national and international olympiads in mathematics and science.",
    level: "Class 8-12",
    students: "800+",
    rating: 4.9,
    features: ["National Level", "Expert Mentors", "Practice Papers"],
    color: "amber"
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Skill Development",
    description: "Enhance logical reasoning, aptitude, and soft skills for holistic student growth.",
    level: "All Levels",
    students: "1,200+",
    rating: 4.7,
    features: ["Aptitude Training", "Communication", "Problem Solving"],
    color: "violet"
  }
];

const HomePrograms = () => {
  return (
    <section id="programs" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-600 text-xs font-semibold tracking-wider">
            <BookOpen className="h-4 w-4" />
            Our Programs
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            COURSES DESIGNED FOR <span className="text-indigo-600">SUCCESS</span>
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            Choose from our range of expertly crafted programs tailored to meet every student's unique learning needs and career aspirations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative p-8 rounded-[2rem] bg-card border border-border/40 hover:border-indigo-500/30 transition-all group overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                program.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' :
                program.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' :
                program.color === 'amber' ? 'bg-amber-500/10 text-amber-600' :
                'bg-violet-500/10 text-violet-600'
              }`}>
                {program.icon}
              </div>

              {/* Level badge */}
              <div className="inline-block px-3 py-1 bg-muted rounded-full text-[10px] font-semibold tracking-wider text-muted-foreground mb-4">
                {program.level}
              </div>

              <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">
                {program.title}
              </h3>

              <p className="text-muted-foreground font-normal text-sm leading-relaxed mb-6">
                {program.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-6 text-xs font-medium text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{program.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{program.rating}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {program.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      program.color === 'indigo' ? 'bg-indigo-500' :
                      program.color === 'emerald' ? 'bg-emerald-500' :
                      program.color === 'amber' ? 'bg-amber-500' :
                      'bg-violet-500'
                    }`} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-6 mt-6 border-t border-border/40">
                <a href="/auth/login" className="text-sm font-semibold tracking-tight text-indigo-600 hover:underline">
                  Enroll Now →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePrograms;
