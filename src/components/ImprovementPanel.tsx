import { useState } from "react";
import { Wand2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImprovementPanelProps {
  bullets: { before: string; after: string }[];
}

const ImprovementPanel = ({ bullets }: ImprovementPanelProps) => {
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRevealed(true);
    }, 1500);
  };

  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-accent" />
          Resume Improver
        </h3>
        {!revealed && (
          <Button
            onClick={handleImprove}
            disabled={loading}
            size="sm"
            className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 text-xs"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                Analyzing...
              </span>
            ) : (
              <>
                <Wand2 className="w-3 h-3 mr-1" />
                Improve Resume
              </>
            )}
          </Button>
        )}
      </div>

      {!revealed && !loading && (
        <p className="text-sm text-muted-foreground">
          Click "Improve Resume" to get AI-powered suggestions for enhancing your bullet points.
        </p>
      )}

      {revealed && (
        <div className="space-y-4">
          {bullets.map((b, i) => (
            <div key={i} className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Bullet {i + 1}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-2 items-center">
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 text-sm">
                  <p className="text-xs font-medium text-destructive mb-1">Before</p>
                  <p className="text-muted-foreground">{b.before}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                <div className="p-3 rounded-lg bg-success/5 border border-success/20 text-sm">
                  <p className="text-xs font-medium text-success mb-1">After</p>
                  <p className="text-foreground">{b.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImprovementPanel;
