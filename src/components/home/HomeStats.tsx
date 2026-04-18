import { motion } from "framer-motion";
import { Award, Users, GraduationCap, BookOpen, Clock, Trophy } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-7 w-7" />,
    value: "15,000+",
    label: "Students Enrolled",
    description: "Across all programs"
  },
  {
    icon: <GraduationCap className="h-7 w-7" />,
    value: "98%",
    label: "Success Rate",
    description: "In board examinations"
  },
  {
    icon: <Award className="h-7 w-7" />,
    value: "500+",
    label: "Top 10%ile",
    description: "JEE/NEET selections"
  },
  {
    icon: <BookOpen className="h-7 w-7" />,
    value: "50+",
    label: "Expert Faculty",
    description: "With 10+ years experience"
  },
  {
    icon: <Clock className="h-7 w-7" />,
    value: "12+",
    label: "Years Legacy",
    description: "Of academic excellence"
  },
  {
    icon: <Trophy className="h-7 w-7" />,
    value: "200+",
    label: "Olympiad Winners",
    description: "National & international"
  }
];

const HomeStats = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[150px]" />
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-xs font-semibold tracking-wider">
            <Trophy className="h-4 w-4" />
            Our Achievements
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase text-white leading-none">
            NUMBERS THAT <span className="text-amber-400">SPEAK</span>
          </h2>
          <p className="text-white/80 font-normal text-lg">
            A decade of excellence reflected in every milestone we achieve alongside our students.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-amber-400">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold tracking-wide text-white/80 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStats;
