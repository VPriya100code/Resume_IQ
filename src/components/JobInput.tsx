import { Briefcase, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface JobInputProps {
  jobDescription: string;
  onJobDescription: (text: string) => void;
}

const SAMPLE_JOB = `Senior Frontend Developer

We're looking for an experienced Frontend Developer to join our team.

Requirements:
- 3+ years of experience with React and TypeScript
- Strong knowledge of modern CSS (Tailwind CSS preferred)
- Experience with REST APIs and GraphQL
- Familiarity with testing frameworks (Jest, Cypress)
- Experience with CI/CD pipelines and Docker
- Knowledge of AWS services
- Strong problem-solving and communication skills
- Experience with Agile methodologies`;

const JobInput = ({ jobDescription, onJobDescription }: JobInputProps) => {
  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-accent" />
          Job Description
        </h2>
        <button
          onClick={() => onJobDescription(SAMPLE_JOB)}
          className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Load Sample
        </button>
      </div>
      <Textarea
        value={jobDescription}
        onChange={(e) => onJobDescription(e.target.value)}
        placeholder="Paste the job description here...&#10;&#10;Include required skills, qualifications, and responsibilities."
        className="min-h-[200px] bg-secondary/50 border-border/50 resize-none text-sm"
      />
      {jobDescription && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          {jobDescription.split(/\s+/).length} words
        </div>
      )}
    </div>
  );
};

export default JobInput;
