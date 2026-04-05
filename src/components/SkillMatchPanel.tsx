import { Check, X, Target } from "lucide-react";

interface SkillMatchPanelProps {
  matchedSkills: string[];
  missingSkills: string[];
  skillMatch: number;
}

const SkillMatchPanel = ({ matchedSkills, missingSkills, skillMatch }: SkillMatchPanelProps) => {
  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Skill Match Analysis
        </h3>
        <span className="text-sm font-bold text-primary">{skillMatch}%</span>
      </div>

      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden mb-5">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${skillMatch}%`,
            background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))`,
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-success mb-2 uppercase tracking-wider">
            Matched ({matchedSkills.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-success/10 text-success border border-success/20"
              >
                <Check className="w-3 h-3" />
                {skill}
              </span>
            ))}
            {matchedSkills.length === 0 && (
              <span className="text-xs text-muted-foreground">No matches found</span>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-destructive mb-2 uppercase tracking-wider">
            Missing ({missingSkills.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missingSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20"
              >
                <X className="w-3 h-3" />
                {skill}
              </span>
            ))}
            {missingSkills.length === 0 && (
              <span className="text-xs text-muted-foreground">No gaps detected!</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatchPanel;
