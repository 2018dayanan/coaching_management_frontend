import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What programs does EduGate offer?",
    answer: "We offer comprehensive coaching for Classes 6-12 covering Foundation Courses, Entrance Excellence (JEE/NEET), Olympiad Training, and Skill Development programs. Each program is designed by expert educators to maximize student potential."
  },
  {
    question: "How can I enroll my child at EduGate?",
    answer: "Simply click on 'Get Started' and register for a free diagnostic assessment. Based on the results, our counselors will recommend the most suitable program. You can also visit our center for a personalized consultation."
  },
  {
    question: "What is the class size and faculty ratio?",
    answer: "We maintain an optimal batch size of 30-40 students to ensure personalized attention. Each batch is handled by expert faculty with dedicated doubt-clearing sessions and regular one-on-one mentoring."
  },
  {
    question: "Are study materials provided?",
    answer: "Yes! All enrolled students receive comprehensive study materials including topic-wise notes, practice questions, previous year papers, and access to our digital learning platform with video lectures."
  },
  {
    question: "How do you track student progress?",
    answer: "We use our proprietary Learning Management System (LMS) that provides real-time progress tracking. Parents receive regular updates, and monthly PTMs ensure complete transparency in academic development."
  },
  {
    question: "What is your success rate?",
    answer: "We proudly maintain a 98% success rate in board examinations and have produced 500+ selections in top engineering and medical colleges over the past 5 years."
  },
  {
    question: "Do you offer online classes as well?",
    answer: "Yes! We offer both offline (at our centers) and online modes of learning. Our hybrid model allows students to attend live interactive classes from anywhere with full access to all study materials."
  },
  {
    question: "What if my child needs extra help in certain topics?",
    answer: "We provide additional doubt-clearing sessions, remedial classes, and one-on-one mentoring for students who need extra support. Our faculty is always available during designated hours for personalized attention."
  }
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-600 text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </div>
          <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
            GOT <span className="text-indigo-600">QUESTIONS</span>?
          </h2>
          <p className="text-muted-foreground font-medium text-lg">
            Find answers to the most commonly asked questions about our programs and methodology.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border/40 bg-card overflow-hidden hover:border-indigo-500/30 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left"
              >
                <span className="font-bold italic uppercase tracking-tighter text-sm md:text-base">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-600"
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 pt-0">
                      <div className="w-full h-px bg-border/40 mb-6" />
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
