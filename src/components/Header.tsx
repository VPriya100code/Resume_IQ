import { Brain, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="gradient-text">ResumeIQ</span>{" "}
              <span className="text-muted-foreground font-medium">AI</span>
            </h1>
            <p className="text-xs text-muted-foreground">AI-Powered Resume Analysis</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          AI Engine Ready
        </div>
      </div>
    </header>
  );
};

export default Header;
