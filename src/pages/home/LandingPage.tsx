import HomeNavbar from "@/components/home/HomeNavbar";
import HomeHero from "@/components/home/HomeHero";
import HomePrograms from "@/components/home/HomePrograms";
import HomeStats from "@/components/home/HomeStats";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeWhyEduVW from "@/components/home/HomeWhyEduVW";
import HomeHowItWorks from "@/components/home/HomeHowItWorks";
import HomeTeam from "@/components/home/HomeTeam";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomePricing from "@/components/home/HomePricing";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeContact from "@/components/home/HomeContact";
import HomeFooter from "@/components/home/HomeFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-900">
      <HomeNavbar />
      <main>
        {/* Hero Section */}
        <div id="hero">
          <HomeHero />
        </div>

        {/* Statistics Section */}
        <HomeStats />

        {/* Programs Section */}
        <HomePrograms />

        {/* Features Section */}
        <HomeFeatures />

        {/* Why EduVW Section */}
        <HomeWhyEduVW />

        {/* How It Works Section */}
        <HomeHowItWorks />

        {/* Team Section */}
        <HomeTeam />

        {/* Testimonials Section */}
        <HomeTestimonials />

        {/* Pricing Section */}
        <HomePricing />

        {/* FAQ Section */}
        <HomeFAQ />

        {/* Contact Section */}
        <HomeContact />

        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[150px]" />
          </div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          <div className="container mx-auto px-6 relative z-10 text-center text-white space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase">
              Ready to <span className="text-amber-400">Transform</span> Your Coaching Institute?
            </h2>
            <p className="text-xl font-normal text-white/80 max-w-2xl mx-auto">
              Join 500+ coaching institutes across India who have streamlined their operations with EduVW. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <a href="/auth/login">
                <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-semibold tracking-tight hover:bg-indigo-50 hover:scale-105 transition-all shadow-2xl">
                  Start Free Trial
                </button>
              </a>
              <a href="#contact">
                <button className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold tracking-tight hover:bg-white/20 transition-all border border-white/20">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
};

export default LandingPage;
