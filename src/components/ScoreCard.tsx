import { LucideIcon } from "lucide-react";

interface ScoreCardProps {
  title: string;
  score: number;
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "warning" | "destructive";
  suffix?: string;
  delay?: number;
}

const colorMap = {
  primary: { text: "text-primary", bg: "bg-primary/10", ring: "border-primary/30", bar: "bg-primary" },
  accent: { text: "text-accent", bg: "bg-accent/10", ring: "border-accent/30", bar: "bg-accent" },
  success: { text: "text-success", bg: "bg-success/10", ring: "border-success/30", bar: "bg-success" },
  warning: { text: "text-warning", bg: "bg-warning/10", ring: "border-warning/30", bar: "bg-warning" },
  destructive: { text: "text-destructive", bg: "bg-destructive/10", ring: "border-destructive/30", bar: "bg-destructive" },
};

const ScoreCard = ({ title, score, icon: Icon, color, suffix = "%", delay = 0 }: ScoreCardProps) => {
  const c = colorMap[color];

  return (
    <div
      className="glass-card-hover p-5 animate-scale-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center border ${c.ring}`}>
          <Icon className={`w-4 h-4 ${c.text}`} />
        </div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className={`text-3xl font-bold ${c.text} mb-2`}>
        {score}
        <span className="text-lg font-medium">{suffix}</span>
      </p>
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${c.bar} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreCard;
