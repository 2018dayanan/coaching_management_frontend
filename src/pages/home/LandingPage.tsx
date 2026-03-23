import HomeNavbar from "@/components/home/HomeNavbar";
import HomeHero from "@/components/home/HomeHero";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeFooter from "@/components/home/HomeFooter";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30 selection:text-indigo-900">
      <HomeNavbar />
      <main>
        <div id="hero">
          <HomeHero />
        </div>
        
        <div id="features" className="relative z-10 -mt-20">
          <HomeFeatures />
        </div>

        {/* Dynamic Section (Static for now) */}
        <section id="methodology" className="py-24 bg-indigo-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          <div className="container mx-auto px-6 relative z-10 text-center text-white space-y-8">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase italic tracking-tighter">
              Ready to <span className="not-italic">Transform</span> Your Learning?
            </h2>
            <p className="text-xl font-medium text-white/80 max-w-2xl mx-auto">
              Join thousands of students who have already accelerated their academic and professional growth with our advanced methodology.
            </p>
            <div className="flex justify-center pt-4">
              <a href="/auth/login">
                <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black italic uppercase tracking-tighter hover:bg-indigo-50 hover:scale-105 transition-all shadow-2xl">
                  Get Started for Free
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
