import { motion } from "framer-motion";
import { Building2, Award, Users, TrendingUp } from "lucide-react";

const partners = [
  {
    name: "Resonance Classes",
    type: "IIT JEE Coaching",
    location: "Kota, Rajasthan",
    logo: "RC",
    students: "5,000+",
    years: "15+"
  },
  {
    name: "Aakash Institute",
    type: "Medical Entrance",
    location: "Delhi NCR",
    logo: "AI",
    students: "10,000+",
    years: "12+"
  },
  {
    name: "Allen Career Institute",
    type: "Engineering Prep",
    location: "Kota, Rajasthan",
    logo: "AC",
    students: "8,000+",
    years: "18+"
  },
  {
    name: "Career Point",
    type: "JEE/NEET",
    location: "Kota, Rajasthan",
    logo: "CP",
    students: "4,500+",
    years: "20+"
  },
  {
    name: "Motion Education",
    type: "JEE Preparation",
    location: "Kota, Rajasthan",
    logo: "ME",
    students: "3,000+",
    years: "10+"
  },
  {
    name: "Pathfinder Academy",
    type: "NEET/Olympiad",
    location: "Lucknow, UP",
    logo: "PA",
    students: "2,000+",
    years: "8+"
  }
];

const stats = [
  {
    value: "500+",
    label: "Partner Institutes",
    icon: <Building2 className="h-6 w-6" />
  },
  {
    value: "50K+",
    label: "Active Students",
    icon: <Users className="h-6 w-6" />
  },
  {
    value: "25+",
    label: "Cities Covered",
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    icon: <Award className="h-6 w-6" />
  }
];

const HomePartners = () => {
  return (
    <section id="partners" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-600 text-xs font-semibold tracking-wider">
            <Building2 className="h-4 w-4" />
            Trusted Partners
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            TRUSTED BY <span className="text-indigo-600">INDUSTRY LEADERS</span>
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            Join 500+ coaching institutes across India who trust EduVW to streamline their operations and grow their business.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border/40 hover:border-indigo-500/30 transition-all"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Partner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-8 rounded-[2rem] bg-card border border-border/40 hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-start gap-6">
                {/* Logo */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
                  {partner.logo}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-indigo-600 transition-colors truncate">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {partner.type}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {partner.students}
                    </span>
                    <span>•</span>
                    <span>{partner.location}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/40">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium">{partner.years} Years</span>
                </div>
                <span className="text-xs text-emerald-500 font-medium">Active Partner</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Want to become a partner? Join our reseller program and grow together.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold tracking-tight shadow-lg shadow-indigo-600/30 transition-all"
          >
            Become a Partner
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePartners;
