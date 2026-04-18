import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "NEET Aspirant 2025",
    image: "PS",
    content: "EduVW transformed my approach to biology. The structured methodology and doubt-clearing sessions helped me score 650+ in NEET. Forever grateful!",
    rating: 5,
    program: "Entrance Excellence"
  },
  {
    name: "Rahul Verma",
    role: "JEE Advanced 2025",
    image: "RV",
    content: "The faculty here understands exactly what IIT expects. My rank improved from 15K to under 5K in just one year of preparation with EduVW.",
    rating: 5,
    program: "Entrance Excellence"
  },
  {
    name: "Ananya Patel",
    role: "Parent of Class 10 Student",
    image: "AP",
    content: "My daughter's confidence in mathematics improved dramatically. The teachers are patient and the study materials are comprehensive. Highly recommended!",
    rating: 5,
    program: "Foundation Courses"
  },
  {
    name: "Vikram Singh",
    role: "NTSE Scholar 2025",
    image: "VS",
    content: "The olympiad training at EduVW is exceptional. I cleared NTSE and also won a silver medal in the National Science Olympiad.",
    rating: 5,
    program: "Olympiad Training"
  },
  {
    name: "Meera Iyer",
    role: "Board Topper 2025",
    image: "MI",
    content: "Scoring 98% in boards seemed impossible until I joined EduVW. Their revision methodology and regular assessments made all the difference.",
    rating: 5,
    program: "Foundation Courses"
  },
  {
    name: "Arjun Nair",
    role: "Parent of JEE Student",
    image: "AN",
    content: "The regular parent-teacher meetings and progress tracking gave us complete visibility into our son's preparation. Excellent coordination!",
    rating: 5,
    program: "Entrance Excellence"
  }
];

const HomeTestimonials = () => {
  return (
    <section id="success" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 text-xs font-semibold tracking-wider">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            Success Stories
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            HEAR FROM OUR <span className="text-indigo-600">CHAMPIONS</span>
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            Real stories from real students who transformed their academic journey with EduVW.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-[2rem] bg-card border border-border/40 hover:border-indigo-500/30 transition-all group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground font-normal text-sm leading-relaxed mb-6 relative z-10">
                "{testimonial.content}"
              </p>

              {/* Program badge */}
              <div className="inline-block px-3 py-1 bg-indigo-500/10 rounded-full text-[10px] font-semibold tracking-wider text-indigo-600 mb-6">
                {testimonial.program}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-semibold tracking-tight">
                    {testimonial.name}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">
                    {testimonial.role}
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

export default HomeTestimonials;
