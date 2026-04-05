import { BarChart3, Target, TrendingUp, Award } from "lucide-react";
import ScoreCard from "./ScoreCard";
import SkillMatchPanel from "./SkillMatchPanel";
import StrengthsWeaknesses from "./StrengthsWeaknesses";
import ImprovementPanel from "./ImprovementPanel";
import RoadmapPanel from "./RoadmapPanel";
import PortfolioPreview from "./PortfolioPreview";
import VoiceFeedback from "./VoiceFeedback";
import type { AnalysisResult, ResumeData } from "@/lib/mockAnalysis";

interface AnalysisDashboardProps {
  result: AnalysisResult;
  resumeData: ResumeData;
}

const AnalysisDashboard = ({ result, resumeData }: AnalysisDashboardProps) => {
  const feedbackText = `Your ATS score is ${result.atsScore} percent. Skill match is at ${result.skillMatch} percent. You have ${result.matchedSkills.length} matching skills and ${result.missingSkills.length} missing skills. Your chance of shortlisting is ${result.shortlistChance} percent.`;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold gradient-text">Analysis Results</h2>
        <VoiceFeedback text={feedbackText} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ScoreCard title="ATS Score" score={result.atsScore} icon={BarChart3} color="primary" delay={0} />
        <ScoreCard title="Skill Match" score={result.skillMatch} icon={Target} color="accent" delay={0.05} />
        <ScoreCard title="Shortlist Chance" score={result.shortlistChance} icon={TrendingUp} color="success" delay={0.1} />
        <ScoreCard
          title="Overall Grade"
          score={result.atsScore >= 80 ? 95 : result.atsScore >= 60 ? 75 : 50}
          icon={Award}
          color={result.atsScore >= 80 ? "success" : result.atsScore >= 60 ? "warning" : "destructive"}
          suffix=""
          delay={0.15}
        />
      </div>

      <SkillMatchPanel
        matchedSkills={result.matchedSkills}
        missingSkills={result.missingSkills}
        skillMatch={result.skillMatch}
      />

      <StrengthsWeaknesses strengths={result.strengths} weaknesses={result.weaknesses} />

      <ImprovementPanel bullets={result.improvedBullets} />

      <RoadmapPanel roadmap={result.roadmap} />

      <PortfolioPreview resumeData={resumeData} />
    </div>
  );
};

export default AnalysisDashboard;
