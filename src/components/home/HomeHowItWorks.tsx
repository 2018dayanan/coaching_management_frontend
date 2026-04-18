import { motion } from "framer-motion";
import { UserPlus, Target, BookOpen, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <UserPlus className="h-8 w-8" />,
    title: "Register & Assess",
    description: "Sign up for a free assessment to understand your current academic level and identify areas for improvement.",
    details: ["Free Diagnostic Test", "Skill Mapping", "Goal Setting"]
  },
  {
    number: "02",
    icon: <Target className="h-8 w-8" />,
    title: "Customized Plan",
    description: "Receive a personalized learning roadmap designed by our expert counselors based on your assessment results.",
    details: ["Tailored Curriculum", "Flexible Scheduling", "Resource Allocation"]
  },
  {
    number: "03",
    icon: <BookOpen className="h-8 w-8" />,
    title: "Learn & Practice",
    description: "Attend interactive classes, complete assignments, and access our comprehensive study materials and practice tests.",
    details: ["Live Classes", "Doubt Sessions", "Regular Assessments"]
  },
  {
    number: "04",
    icon: <Trophy className="h-8 w-8" />,
    title: "Achieve Success",
    description: "Track your progress with detailed analytics and achieve your academic goals with continuous mentoring support.",
    details: ["Progress Analytics", "Mentor Feedback", "Success Tracking"]
  }
];

const HomeHowItWorks = () => {
  return (
    <section id="methodology" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 rounded-full text-violet-600 text-xs font-semibold tracking-wider">
            <Target className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            YOUR PATH TO <span className="text-indigo-600">EXCELLENCE</span>
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            A systematic approach designed to maximize your learning potential and academic success.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="text-center">
                {/* Step number circle */}
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 relative z-10">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </div>
                </div>

                <h3 className="text-xl font-semibold tracking-tight mb-3">
                  {step.title}
                </h3>

                <p className="text-muted-foreground font-normal text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {step.details.map((detail) => (
                    <div
                      key={detail}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-background rounded-full text-xs font-medium text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white font-semibold tracking-tight shadow-xl shadow-indigo-600/30 group transition-all"
          >
            Start Your Journey
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHowItWorks;
