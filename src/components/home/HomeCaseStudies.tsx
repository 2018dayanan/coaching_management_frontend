import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Quote, Star, Clock } from "lucide-react";

const caseStudies = [
  {
    title: "How Resonance Classes Increased Efficiency by 60%",
    excerpt: "One of Kota's leading JEE coaching institutes transformed their student management and reduced administrative work significantly.",
    category: "Success Story",
    image: "RC",
    metrics: [
      { value: "60%", label: "More Efficient" },
      { value: "10hrs", label: "Saved Weekly" },
      { value: "98%", label: "Satisfaction" }
    ],
    author: "Director, Resonance Classes",
    location: "Kota, Rajasthan",
    featured: true
  },
  {
    title: "Allen Career Institute: Going 100% Digital",
    excerpt: "A large coaching chain eliminated paper-based processes and streamlined operations across 15+ branches using EduVW.",
    category: "Case Study",
    image: "AC",
    metrics: [
      { value: "15+", label: "Branches" },
      { value: "100%", label: "Digital" },
      { value: "30%", label: "Cost Reduction" }
    ],
    author: "Admin Head, Allen Career",
    location: "Kota, Rajasthan",
    featured: false
  },
  {
    title: "Pathfinder Academy: Small Institute, Big Results",
    excerpt: "A mid-sized coaching institute in Lucknow scaled from 500 to 2000 students in just 2 years with EduVW's management tools.",
    category: "Growth Story",
    image: "PA",
    metrics: [
      { value: "4x", label: "Student Growth" },
      { value: "2yrs", label: "Timeframe" },
      { value: "25%", label: "Revenue Boost" }
    ],
    author: "Founder, Pathfinder Academy",
    location: "Lucknow, UP",
    featured: false
  }
];

const testimonials = [
  {
    quote: "EduVW completely transformed how we manage our institute. What used to take hours now takes minutes.",
    author: "Rajesh Agarwal",
    role: "Director",
    company: "Motion Education, Kota",
    rating: 5
  },
  {
    quote: "The best investment we made for our coaching business. Parents love the transparency it provides.",
    author: "Priya Sharma",
    role: "Administrator",
    company: "Career Point, Kota",
    rating: 5
  },
  {
    quote: "Finally, a management system designed for Indian coaching institutes. Game changer!",
    author: "Ankit Verma",
    role: "Founder",
    company: "Pathfinder Academy, Lucknow",
    rating: 5
  }
];

const HomeCaseStudies = () => {
  return (
    <section id="case-studies" className="py-24 bg-background relative overflow-hidden">
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
            <BookOpen className="h-4 w-4" />
            Case Studies
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            SUCCESS <span className="text-indigo-600">STORIES</span>
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            See how coaching institutes across India have transformed their operations and grown their business with EduVW.
          </p>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative p-10 rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-white">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold mb-4">
                  FEATURED SUCCESS STORY
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {caseStudies[0].title}
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  {caseStudies[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/70 mb-6">
                  <span>{caseStudies[0].author}</span>
                  <span>•</span>
                  <span>{caseStudies[0].location}</span>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold tracking-tight hover:bg-white/90 transition-all"
                >
                  Read Full Story
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {caseStudies[0].metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm"
                  >
                    <div className="text-3xl md:text-4xl font-bold mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-white/70">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {caseStudies.slice(1).map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2rem] bg-card border border-border/40 hover:border-indigo-500/30 transition-all group"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                  {study.image}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-indigo-500/10 rounded-full text-xs font-semibold text-indigo-600 mb-2">
                    {study.category}
                  </span>
                  <h3 className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
                    {study.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground font-normal mb-6 leading-relaxed">
                {study.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {study.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-lg font-bold text-indigo-600">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Our Partners Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-[2rem] bg-card border border-border/40 relative"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-indigo-500/10" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-muted-foreground font-normal mb-6 leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 text-xs font-semibold tracking-wider mb-6">
            <Clock className="h-4 w-4" />
            Limited Time Offer
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-muted-foreground font-normal mb-8 max-w-xl mx-auto">
            Join hundreds of coaching institutes who have already transformed their operations with EduVW.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth/login"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold tracking-tight shadow-lg shadow-indigo-600/30 transition-all"
            >
              Start Free Trial
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-card hover:bg-muted border border-border/40 text-foreground rounded-xl font-semibold tracking-tight transition-all"
            >
              Schedule Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCaseStudies;
