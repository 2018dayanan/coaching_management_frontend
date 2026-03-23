import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  subtitle?: string;
  variant?: "blue" | "indigo" | "emerald";
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  subtitle,
  variant = "blue"
}: StatCardProps) {
  return (
    <Card className="hover:shadow-md transition-all duration-200 w-full relative overflow-hidden">
      <div 
        className={cn(
          "absolute top-0 left-0 w-1 h-full",
          variant === "blue" && "bg-blue-500",
          variant === "indigo" && "bg-secondary",
          variant === "emerald" && "bg-accent"
        )} 
      />
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div 
          className={cn(
            "p-2 rounded-lg",
            variant === "blue" && "bg-blue-500/10 text-blue-500",
            variant === "indigo" && "bg-secondary/10 text-secondary",
            variant === "emerald" && "bg-emerald-500/10 text-emerald-500"
          )}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>

        {change && (
          <p
            className={cn(
              "text-[10px] sm:text-xs mt-1 font-medium",
              changeType === "positive" && "text-emerald-500",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {change}
          </p>
        )}

        {subtitle && (
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
