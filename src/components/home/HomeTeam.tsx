import { motion } from "framer-motion";
import { Users, Award, Clock, GraduationCap } from "lucide-react";

const team = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Director & Head Mentor",
    initials: "RK",
    experience: "20+ Years",
    students: "10,000+",
    education: "IIT Delhi, IIM Ahmedabad",
    color: "indigo"
  },
  {
    name: "Prof. Meera Singh",
    role: "Physics Department Head",
    initials: "MS",
    experience: "15+ Years",
    students: "5,000+",
    education: "IIT Bombay, IISc Bangalore",
    color: "emerald"
  },
  {
    name: "Dr. Anand Sharma",
    role: "Chemistry Department Head",
    initials: "AS",
    experience: "18+ Years",
    students: "6,000+",
    education: "IIT Kanpur, BITS Pilani",
    color: "amber"
  },
  {
    name: "Dr. Priya Nair",
    role: "Biology Department Head",
    initials: "PN",
    experience: "12+ Years",
    students: "4,000+",
    education: "AIIMS Delhi, Manipal",
    color: "violet"
  },
  {
    name: "Prof. Vikram Rao",
    role: "Mathematics Department",
    initials: "VR",
    experience: "14+ Years",
    students: "5,500+",
    education: "IIT Madras, IISc Bangalore",
    color: "rose"
  },
  {
    name: "Ms. Anjali Desai",
    role: "Student Counsel Head",
    initials: "AD",
    experience: "10+ Years",
    students: "3,000+",
    education: "TISS Mumbai, NIT",
    color: "blue"
  }
];

const HomeTeam = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-xs font-semibold tracking-wider">
            <Users className="h-4 w-4" />
            Our Faculty
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            MEET THE <span className="text-indigo-600">EXPERTS</span>
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            Learn from India's finest educators with decades of experience in shaping successful careers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-[2rem] bg-card border border-border/40 hover:border-indigo-500/30 transition-all overflow-hidden"
            >
              {/* Gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                {/* Avatar */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-2xl shadow-xl flex-shrink-0`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <GraduationCap className="h-4 w-4 text-indigo-500" />
                    {member.education}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-500" />
                    <span className="text-xs font-medium text-muted-foreground">{member.experience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-indigo-500" />
                    <span className="text-xs font-medium text-muted-foreground">{member.students} taught</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 bg-indigo-500/10 rounded-full flex items-center gap-1">
                    <Award className="h-3 w-3 text-indigo-500" />
                    <span className="text-[10px] font-semibold tracking-wider text-indigo-500">Expert</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTeam;
