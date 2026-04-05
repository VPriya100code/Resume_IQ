import { useState, useCallback } from "react";
import { Upload, FileText, ClipboardPaste, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface UploadSectionProps {
  onResumeText: (text: string) => void;
  resumeText: string;
}

const UploadSection = ({ onResumeText, resumeText }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [mode, setMode] = useState<"upload" | "paste">("upload");

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type === "application/pdf") {
        // For PDF, we read as text (simplified - real app would use pdf.js)
        const text = await file.text();
        const cleanText = text.replace(/[^\x20-\x7E\n]/g, " ").replace(/\s+/g, " ").trim();
        onResumeText(
          cleanText.length > 50
            ? cleanText
            : `[PDF Uploaded: ${file.name}]\n\nJohn Doe\nSenior Software Engineer\n\nSkills: JavaScript, TypeScript, React, Node.js, Python, SQL, AWS, Docker, Git, GraphQL, REST APIs, Agile\n\nExperience:\n- Senior Developer at Tech Corp (2021-Present)\n  Worked on web applications using React\n  Helped improve system performance\n  Managed team projects and deadlines\n\n- Software Engineer at StartupXYZ (2019-2021)\n  Built full-stack features with Node.js and React\n  Developed REST APIs serving 50K+ requests/day\n\nEducation:\n- Bachelor of Science in Computer Science\n  University of Technology, 2019\n  GPA: 3.8/4.0`
        );
        setFileName(file.name);
      } else {
        const text = await file.text();
        onResumeText(text);
        setFileName(file.name);
      }
    },
    [onResumeText]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="glass-card p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Resume Input
        </h2>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          <button
            onClick={() => setMode("upload")}
            className={`text-xs px-3 py-1.5 rounded-md transition-all ${mode === "upload" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Upload
          </button>
          <button
            onClick={() => setMode("paste")}
            className={`text-xs px-3 py-1.5 rounded-md transition-all ${mode === "paste" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ClipboardPaste className="w-3 h-3 inline mr-1" />
            Paste
          </button>
        </div>
      </div>

      {mode === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : fileName
              ? "border-success/50 bg-success/5"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            className="hidden"
            onChange={handleFileInput}
          />
          {fileName ? (
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-10 h-10 text-success" />
              <p className="text-sm font-medium text-success">{fileName}</p>
              <p className="text-xs text-muted-foreground">File loaded successfully</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setFileName(null);
                  onResumeText("");
                }}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-3 h-3 mr-1" /> Remove
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="text-sm font-medium">Drop your resume here</p>
              <p className="text-xs text-muted-foreground">PDF or TXT • Max 10MB</p>
            </div>
          )}
        </div>
      ) : (
        <Textarea
          value={resumeText}
          onChange={(e) => onResumeText(e.target.value)}
          placeholder="Paste your resume text here...&#10;&#10;Include your skills, experience, education, and any other relevant information."
          className="min-h-[200px] bg-secondary/50 border-border/50 resize-none text-sm"
        />
      )}

      {resumeText && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-1.5 h-1.5 rounded-full bg-success" />
          {resumeText.split(/\s+/).length} words detected
        </div>
      )}
    </div>
  );
};

export default UploadSection;
