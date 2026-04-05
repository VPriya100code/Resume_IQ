import { useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import UploadSection from "@/components/UploadSection";
import JobInput from "@/components/JobInput";
import ParsedResume from "@/components/ParsedResume";
import AnalysisDashboard from "@/components/AnalysisDashboard";
import { parseResume, analyzeResume } from "@/lib/mockAnalysis";
import type { ResumeData, AnalysisResult } from "@/lib/mockAnalysis";

const Index = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!resumeText || !jobDescription) return;
    setAnalyzing(true);
    const parsed = parseResume(resumeText);
    setResumeData(parsed);

    setTimeout(() => {
      const result = analyzeResume(parsed, jobDescription);
      setAnalysisResult(result);
      setAnalyzing(false);
    }, 2000);
  };

  const canAnalyze = resumeText.trim().length > 0 && jobDescription.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
          Analyze Your Resume with{" "}
          <span className="gradient-text">AI Precision</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto text-sm">
          Get instant ATS scoring, skill gap analysis, and AI-powered improvements
          to land your dream job.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UploadSection resumeText={resumeText} onResumeText={setResumeText} />
          <JobInput jobDescription={jobDescription} onJobDescription={setJobDescription} />
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mb-10">
          <Button
            onClick={handleAnalyze}
            disabled={!canAnalyze || analyzing}
            size="lg"
            className="relative px-8 py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 glow-primary transition-all"
          >
            {analyzing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Resume...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Analyze Resume
              </span>
            )}
          </Button>
        </div>

        {/* Parsed Resume */}
        {resumeData && !analyzing && (
          <div className="mb-8">
            <ParsedResume data={resumeData} />
          </div>
        )}

        {/* Analysis Results */}
        {analysisResult && !analyzing && (
          <AnalysisDashboard result={analysisResult} resumeData={resumeData!} />
        )}

        {/* Loading State */}
        {analyzing && (
          <div className="flex flex-col items-center gap-4 py-16 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Analyzing your resume...</p>
              <p className="text-sm text-muted-foreground mt-1">
                Running AI-powered analysis on your resume
              </p>
            </div>
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
