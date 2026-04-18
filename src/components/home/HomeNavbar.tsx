import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GraduationCap, ArrowRight, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const navLinks = [
    { name: "Programs", href: "#programs" },
    { name: "Why EduVW", href: "#why-eduvw" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border/40 py-3 shadow-sm"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            EDU<span className="text-indigo-600">VW</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="relative w-11 h-11 rounded-xl bg-muted/50 hover:bg-muted border border-border/40 flex items-center justify-center transition-all duration-300 hover:scale-105 group overflow-hidden"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <Sun className="h-5 w-5 text-amber-500 group-hover:text-amber-600 transition-colors" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <Moon className="h-5 w-5 text-indigo-400 group-hover:text-indigo-500 transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Theme Dropdown */}
            <AnimatePresence>
              {isThemeOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsThemeOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-14 z-50 w-48 rounded-xl bg-card border border-border/40 shadow-xl shadow-black/10 overflow-hidden"
                  >
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setTheme("light");
                          setIsThemeOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                          theme === "light"
                            ? "bg-indigo-500/10 text-indigo-600"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <Sun className="h-4 w-4" />
                        <span className="text-sm font-medium">Light</span>
                        {theme === "light" && (
                          <motion.div
                            layoutId="theme-indicator"
                            className="ml-auto w-2 h-2 rounded-full bg-indigo-500"
                          />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setTheme("dark");
                          setIsThemeOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                          theme === "dark"
                            ? "bg-indigo-500/10 text-indigo-600"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <Moon className="h-4 w-4" />
                        <span className="text-sm font-medium">Dark</span>
                        {theme === "dark" && (
                          <motion.div
                            layoutId="theme-indicator"
                            className="ml-auto w-2 h-2 rounded-full bg-indigo-500"
                          />
                        )}
                      </button>

                      <button
                        onClick={() => {
                          setTheme("system");
                          setIsThemeOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                          theme === "system"
                            ? "bg-indigo-500/10 text-indigo-600"
                            : "hover:bg-muted text-muted-foreground"
                        )}
                      >
                        <Monitor className="h-4 w-4" />
                        <span className="text-sm font-medium">System</span>
                        {theme === "system" && (
                          <motion.div
                            layoutId="theme-indicator"
                            className="ml-auto w-2 h-2 rounded-full bg-indigo-500"
                          />
                        )}
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Portal Login - Desktop */}
          <Link to="/auth/login" className="hidden md:block">
            <Button
              variant="ghost"
              className="font-semibold tracking-wide text-[10px] hover:bg-muted"
            >
              Portal Login
            </Button>
          </Link>

          {/* Get Started - Desktop */}
          <Link to="/auth/login" className="hidden md:block">
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 font-semibold tracking-wide shadow-lg shadow-indigo-600/20 group">
              Get Started
              <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-muted-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border/40 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold tracking-tight"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full rounded-xl py-6 font-semibold tracking-tight">
                    Portal Login
                  </Button>
                </Link>
                <Link
                  to="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button className="w-full rounded-xl py-6 bg-indigo-600 font-semibold tracking-tight shadow-xl shadow-indigo-600/20">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default HomeNavbar;
