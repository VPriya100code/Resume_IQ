import { Code, GraduationCap, Briefcase } from "lucide-react";
import type { ResumeData } from "@/lib/mockAnalysis";

interface ParsedResumeProps {
  data: ResumeData;
}

const ParsedResume = ({ data }: ParsedResumeProps) => {
  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
      <h3 className="text-base font-semibold mb-4 gradient-text">Parsed Resume</h3>

      <div className="space-y-4">
        <div>
          <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Code className="w-3 h-3" /> Skills ({data.skills.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s) => (
              <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-accent mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <GraduationCap className="w-3 h-3" /> Education
          </p>
          <ul className="space-y-1">
            {data.education.map((e, i) => (
              <li key={i} className="text-sm text-muted-foreground">{e}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium text-success mb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Briefcase className="w-3 h-3" /> Experience
          </p>
          <ul className="space-y-1">
            {data.experience.map((e, i) => (
              <li key={i} className="text-sm text-muted-foreground">{e}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ParsedResume;
