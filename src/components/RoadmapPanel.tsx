import { Map, BookOpen } from "lucide-react";

interface RoadmapPanelProps {
  roadmap: { step: number; title: string; description: string }[];
}

const RoadmapPanel = ({ roadmap }: RoadmapPanelProps) => {
  return (
    <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: "0.35s" }}>
      <h3 className="text-base font-semibold flex items-center gap-2 mb-4">
        <Map className="w-4 h-4 text-primary" />
        Skill Roadmap
      </h3>
      <div className="space-y-3">
        {roadmap.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                {item.step}
              </div>
              {i < roadmap.length - 1 && (
                <div className="w-px h-full bg-border my-1" />
              )}
            </div>
            <div className="pb-3">
              <p className="text-sm font-medium flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-primary" />
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPanel;
