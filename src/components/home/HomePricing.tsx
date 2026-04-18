import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "₹4,999",
    period: "/month",
    description: "Perfect for small coaching centers just getting started",
    features: [
      "Up to 100 Students",
      "5 Teachers Access",
      "Basic Class Scheduling",
      "Student Management",
      "Attendance Tracking",
      "Email Support",
      "5 GB Storage"
    ],
    notIncluded: [
      "Advanced Analytics",
      "Custom Branding",
      "API Access",
      "Priority Support"
    ],
    popular: false,
    icon: Sparkles,
    color: "indigo"
  },
  {
    name: "Professional",
    price: "₹9,999",
    period: "/month",
    description: "Best for growing coaching institutes with multiple batches",
    features: [
      "Up to 500 Students",
      "25 Teachers Access",
      "Advanced Class Scheduling",
      "Complete Student Management",
      "Attendance & Performance Tracking",
      "Batch Management",
      "Exam & Test Management",
      "Parent Portal Access",
      "WhatsApp Notifications",
      "20 GB Storage",
      "Priority Email Support"
    ],
    notIncluded: [
      "Custom Branding",
      "API Access"
    ],
    popular: true,
    icon: Zap,
    color: "violet"
  },
  {
    name: "Enterprise",
    price: "₹19,999",
    period: "/month",
    description: "Complete solution for large coaching chains and franchises",
    features: [
      "Unlimited Students",
      "Unlimited Teachers Access",
      "Advanced Class Scheduling",
      "Complete Student Management",
      "Attendance & Performance Tracking",
      "Batch & Branch Management",
      "Exam & Test Management",
      "Parent Portal Access",
      "WhatsApp & SMS Notifications",
      "Custom Branding",
      "API Access",
      "Multi-Branch Support",
      "Advanced Analytics & Reports",
      "Dedicated Account Manager",
      "100 GB Storage",
      "24/7 Priority Support"
    ],
    notIncluded: [],
    popular: false,
    icon: Crown,
    color: "amber"
  }
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial on all plans. No credit card required."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and bank transfers for Indian customers."
  },
  {
    question: "Can I get a custom plan?",
    answer: "Absolutely! For institutions with specific requirements, we offer customized plans. Contact our sales team for a tailored solution."
  }
];

const HomePricing = () => {
  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
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
            <Sparkles className="h-4 w-4" />
            Pricing Plans
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none">
            SIMPLE, <span className="text-indigo-600">TRANSPARENT</span> PRICING
          </h2>
          <p className="text-muted-foreground font-normal text-lg">
            Choose the plan that fits your coaching institute. All prices in Indian Rupees (INR). No hidden charges.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-[2rem] p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 text-white shadow-2xl shadow-indigo-500/30 scale-105"
                  : "bg-card border border-border/40 hover:border-indigo-500/30"
              } transition-all`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                  plan.popular
                    ? "bg-white/20 text-white"
                    : plan.color === 'indigo'
                    ? "bg-indigo-500/10 text-indigo-600"
                    : plan.color === 'violet'
                    ? "bg-violet-500/10 text-violet-600"
                    : "bg-amber-500/10 text-amber-600"
                }`}>
                  <plan.icon className="h-7 w-7" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : ""}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="mb-2">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-white" : ""}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-white/70" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular ? "bg-white/20" : "bg-emerald-500/10"
                    }`}>
                      <Check className={`h-3 w-3 ${plan.popular ? "text-white" : "text-emerald-500"}`} />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-white/90" : ""}`}>
                      {feature}
                    </span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 opacity-40">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-muted">
                      <Check className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm line-through">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full py-6 rounded-xl font-semibold tracking-tight ${
                  plan.popular
                    ? "bg-white text-indigo-600 hover:bg-white/90"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Get Started Free
              </Button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/40"
              >
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePricing;
