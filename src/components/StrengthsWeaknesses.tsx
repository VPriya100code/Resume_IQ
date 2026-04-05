import { ThumbsUp, AlertTriangle } from "lucide-react";

interface StrengthsWeaknessesProps {
  strengths: string[];
  weaknesses: string[];
}

const StrengthsWeaknesses = ({ strengths, weaknesses }: StrengthsWeaknessesProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "0.15s" }}>
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-success">
          <ThumbsUp className="w-4 h-4" />
          Strengths
        </h3>
        <ul className="space-y-2">
          {strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-success mt-1.5 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="glass-card p-5">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3 text-warning">
          <AlertTriangle className="w-4 h-4" />
          Areas to Improve
        </h3>
        <ul className="space-y-2">
          {weaknesses.map((w, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StrengthsWeaknesses;
