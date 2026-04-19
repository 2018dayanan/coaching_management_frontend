import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Settings,
  Users,
  GraduationCap,
  ArrowRight,
  Layers,
  BarChart,
  Calendar,
  BookOpen,
  ClipboardList,
  UserCheck,
  Bell,
  Shield,
  GraduationCap as GradIcon,
} from "lucide-react";
import HomeNavbar from "@/components/home/HomeNavbar";
import HomeFooter from "@/components/home/HomeFooter";

const PortalCard = ({
  title,
  description,
  icon: Icon,
  color,
  badge,
  features,
  href,
  index,
}: {
  title: string;
  description: string;
  icon: any;
  color: "violet" | "blue" | "emerald";
  badge: string;
  features: string[];
  href: string;
  index: number;
}) => {
  const colors = {
    violet: {
      bg: "from-violet-600 to-violet-700",
      light: "bg-violet-50 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-800",
      text: "text-violet-600 dark:text-violet-400",
      hover: "hover:border-violet-400 dark:hover:border-violet-600",
      iconBg: "bg-violet-100 dark:bg-violet-500/20",
      iconColor: "text-violet-600 dark:text-violet-400",
    },
    blue: {
      bg: "from-blue-600 to-blue-700",
      light: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-200 dark:border-blue-800",
      text: "text-blue-600 dark:text-blue-400",
      hover: "hover:border-blue-400 dark:hover:border-blue-600",
      iconBg: "bg-blue-100 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    emerald: {
      bg: "from-emerald-600 to-emerald-700",
      light: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-800",
      text: "text-emerald-600 dark:text-emerald-400",
      hover: "hover:border-emerald-400 dark:hover:border-emerald-600",
      iconBg: "bg-emerald-100 dark:bg-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  };

  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative rounded-3xl bg-card ${c.border} ${c.hover} border-2 overflow-hidden group transition-all duration-300`}
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-br ${c.bg} p-8`}>
        <span className={`inline-block px-3 py-1 ${c.light} rounded-full text-xs font-bold uppercase tracking-wider ${c.text} mb-4`}>
          {badge}
        </span>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${c.light} flex items-center justify-center`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
              <div className={`w-1.5 h-1.5 rounded-full ${color === 'violet' ? 'bg-violet-500' : color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to={href}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl ${c.bg} text-white font-bold text-sm tracking-wide hover:opacity-90 transition-all duration-300 group/btn shadow-lg`}
        >
          Explore Portal
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

const DemoPage = () => {
  const portals = [
    {
      title: "Admin Portal",
      description: "Complete management dashboard for administrators. Oversee students, teachers, batches, classes, and system configurations with ease.",
      icon: Settings,
      color: "violet" as const,
      badge: "Management",
      features: [
        "Student Management",
        "Teacher Oversight",
        "Batch Control",
        "Class Management",
      ],
      href: "/admin",
    },
    {
      title: "Teacher Portal",
      description: "Empower educators with tools to manage students, create assignments, track progress, and conduct interactive classes.",
      icon: Users,
      color: "blue" as const,
      badge: "Instructor",
      features: [
        "Student Tracking",
        "Assignment Creation",
        "Batch Management",
        "Class Scheduling",
      ],
      href: "/teacher/dashboard",
    },
    {
      title: "Student Portal",
      description: "An intuitive learning hub for students. Access courses, submit tasks, view academic records, and track your progress.",
      icon: GraduationCap,
      color: "emerald" as const,
      badge: "Learner",
      features: [
        "Course Access",
        "Task Submission",
        "Academic Records",
        "Notifications",
      ],
      href: "/student/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
              Explore Our <span className="text-indigo-600">Portals</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover the three powerful portals designed for administrators, teachers, and students to transform education.
            </p>
          </motion.div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {portals.map((portal, index) => (
              <PortalCard key={portal.title} {...portal} index={index} />
            ))}
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
};

export default DemoPage;