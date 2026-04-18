import { motion } from "framer-motion";
import {
  Users,
  Clock,
  BarChart3,
  Calendar,
  Bell,
  Shield,
  GraduationCap,
  Target,
  TrendingUp,
  HeartHandshake,
  HeadphonesIcon
} from "lucide-react";

const benefits = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Complete Student Management",
    description: "Manage student profiles, admission records, contact details, and academic history all in one place. No more scattered Excel sheets.",
    color: "indigo"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Save 10+ Hours Weekly",
    description: "Automate attendance, scheduling, and notifications. Focus on teaching instead of administrative tasks that eat up your time.",
    color: "emerald"
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Real-Time Analytics",
    description: "Track student performance, attendance trends, and batch-wise results with visual dashboards. Make data-driven decisions instantly.",
    color: "violet"
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: "Smart Class Scheduling",
    description: "Create and manage class timetables effortlessly. Handle multiple batches, teachers, and rooms without conflicts or confusion.",
    color: "amber"
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Instant Notifications",
    description: "Send WhatsApp and SMS alerts for class schedules, fee reminders, holidays, and important announcements automatically.",
    color: "rose"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure & Reliable",
    description: "Your data is encrypted and protected. Regular backups ensure you never lose important student records or information.",
    color: "blue"
  }
];

const features = [
  {
    category: "For Administrators",
    icon: <GraduationCap className="h-6 w-6" />,
    items: [
      "Dashboard with real-time insights",
      "Multi-branch management",
      "Teacher & staff management",
      "Fee collection & tracking",
      "Expense management",
      "Revenue & profit reports"
    ]
  },
  {
    category: "For Teachers",
    icon: <Target className="h-6 w-6" />,
    items: [
      "Personalized teacher dashboard",
      "Class & batch management",
      "Student progress tracking",
      "Assignment & test management",
      "Attendance marking",
      "Quick parent communication"
    ]
  },
  {
    category: "For Students & Parents",
    icon: <HeartHandshake className="h-6 w-6" />,
    items: [
      "Dedicated student portal",
      "View schedules & assignments",
      "Check results & performance",
      "Access study materials",
      "Fee status & payment history",
      "Direct teacher communication"
    ]
  }
];

const stats = [
  {
    value: "50%",
    label: "Less Administrative Work",
    description: "Automate repetitive tasks"
  },
  {
    value: "100%",
    label: "Paperless Operations",
    description: "Go green, save trees"
  },
  {
    value: "3x",
    label: "Faster Communication",
    description: "Instant updates to all"
  },
  {
    value: "24/7",
    label: "Access Anytime",
    description: "Manage from anywhere"
  }
];

const HomeWhyEduVW = () => {
  return (
    <section id="why-eduvw" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-600 text-xs font-semibold tracking-wider">
            <TrendingUp className="h-4 w-4" />
            Why EduVW?
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            WHY <span className="text-indigo-600">EDUVW</span> IS THE BEST CHOICE
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            Transform your coaching institute from chaotic spreadsheets to a streamlined digital platform. EduVW is designed specifically for Indian coaching centers.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border/40 hover:border-indigo-500/30 transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">
                {stat.value}
              </div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] bg-card border border-border/40 hover:border-indigo-500/30 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                benefit.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' :
                benefit.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' :
                benefit.color === 'violet' ? 'bg-violet-500/10 text-violet-600' :
                benefit.color === 'amber' ? 'bg-amber-500/10 text-amber-600' :
                benefit.color === 'rose' ? 'bg-rose-500/10 text-rose-600' :
                'bg-blue-500/10 text-blue-600'
              }`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground font-normal text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Features by Role */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Everything You Need, <span className="text-indigo-600">All in One Place</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-card border border-border/40"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-bold">{feature.category}</h4>
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full mb-6">
            <HeadphonesIcon className="h-5 w-5" />
            <span className="font-semibold">Free Demo Available</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Coaching Institute?
          </h3>
          <p className="text-muted-foreground font-normal mb-8 max-w-xl mx-auto">
            Join 500+ coaching institutes across India who have already streamlined their operations with EduVW.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/login"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold tracking-tight shadow-lg shadow-indigo-600/30 transition-all"
            >
              Start Free Trial
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-card hover:bg-muted border border-border/40 text-foreground rounded-xl font-semibold tracking-tight transition-all"
            >
              View Pricing
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeWhyEduVW;
