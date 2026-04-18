import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="relative w-12 h-12 rounded-xl bg-muted/50 hover:bg-muted border border-border/40 flex items-center justify-center transition-all duration-300 hover:scale-105 group overflow-hidden"
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

      {/* Dropdown on click */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
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
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    theme === "light"
                      ? "bg-indigo-500/10 text-indigo-600"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
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
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "bg-indigo-500/10 text-indigo-600"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
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
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    theme === "system"
                      ? "bg-indigo-500/10 text-indigo-600"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
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
  );
}
