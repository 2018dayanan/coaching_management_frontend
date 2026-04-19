import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
}

interface HorizontalMenuProps {
  items: MenuItem[];
  className?: string;
}

const HorizontalMenu = ({ items, className }: HorizontalMenuProps) => {
  const location = useLocation();

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {items.map((item) => {
        const isActive = location.pathname === item.href;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-indigo-600 text-white"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default HorizontalMenu;

export const demoMenuItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact", href: "/#contact" },
];