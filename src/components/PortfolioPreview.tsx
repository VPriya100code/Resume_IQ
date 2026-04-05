import { useState } from "react";
import { Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResumeData } from "@/lib/mockAnalysis";
import { generatePortfolioHTML } from "@/lib/mockAnalysis";

interface PortfolioPreviewProps {
  resumeData: ResumeData;
}

const PortfolioPreview = ({ resumeData }: PortfolioPreviewProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
    }, 1200);
  };

  const html = generatePortfolioHTML(resumeData);

  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Globe className="w-4 h-4 text-accent" />
          Portfolio Generator
        </h3>
        {!showPreview && (
          <Button
            onClick={handleGenerate}
            disabled={loading}
            size="sm"
            className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 text-xs"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                Generating...
              </span>
            ) : (
              <>
                <Globe className="w-3 h-3 mr-1" />
                Generate Portfolio
              </>
            )}
          </Button>
        )}
      </div>

      {!showPreview && !loading && (
        <p className="text-sm text-muted-foreground">
          Generate a sleek portfolio page from your resume data instantly.
        </p>
      )}

      {showPreview && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-border/50">
            <div className="bg-secondary/80 px-3 py-1.5 flex items-center gap-2 border-b border-border/50">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
              </div>
              <span className="text-[10px] text-muted-foreground ml-2">portfolio-preview.html</span>
            </div>
            <iframe
              srcDoc={html}
              title="Portfolio Preview"
              className="w-full h-[300px] bg-background"
              sandbox="allow-scripts"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => {
              const blob = new Blob([html], { type: "text/html" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "portfolio.html";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Download HTML
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioPreview;
