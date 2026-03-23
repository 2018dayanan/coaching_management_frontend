import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

const HomeFooter = () => {
  return (
    <footer className="bg-muted/30 border-t border-border/40 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black italic uppercase tracking-tighter">
                EDU<span className="text-indigo-600 not-italic">GATE</span>
              </span>
            </Link>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-xs">
              Empowering the next generation of leaders through innovative coaching, expert mentorship, and a premium learning environment.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-indigo-600/10 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-indigo-600/10 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-indigo-600/10 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-indigo-600/10 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground opacity-60">Curriculum</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Primary Education</a></li>
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Higher Secondary</a></li>
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Entrance Preparation</a></li>
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Competitive Exams</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground opacity-60">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Contact Support</a></li>
              <li><a href="#" className="text-sm font-bold text-muted-foreground hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">Portal Help</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-foreground opacity-60">Visit Us</h4>
            <ul className="space-y-4 font-bold text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <span>123 Educational Hub, <br /> Innovation Park, NY 10012</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                <span>hello@edugate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-muted-foreground tracking-wide">
            © 2026 EduGate Coaching Systems. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
