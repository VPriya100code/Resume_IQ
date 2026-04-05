export interface ResumeData {
  fullText: string;
  skills: string[];
  education: string[];
  experience: string[];
}

export interface AnalysisResult {
  atsScore: number;
  skillMatch: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  shortlistChance: number;
  improvedBullets: { before: string; after: string }[];
  roadmap: { step: number; title: string; description: string }[];
}

const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "Git",
  "AWS", "Docker", "REST APIs", "GraphQL", "CSS", "HTML", "Agile",
  "CI/CD", "MongoDB", "PostgreSQL", "Redis", "Kubernetes", "Terraform",
  "Next.js", "Vue.js", "Angular", "Java", "C++", "Go", "Rust",
  "Machine Learning", "Data Analysis", "Figma", "TDD", "Microservices",
];

export function parseResume(text: string): ResumeData {
  const lines = text.split("\n").filter((l) => l.trim());
  const lower = text.toLowerCase();

  const detectedSkills = COMMON_SKILLS.filter((s) =>
    lower.includes(s.toLowerCase())
  );

  if (detectedSkills.length === 0) {
    const words = text.split(/[\s,;|]+/).filter((w) => w.length > 2);
    const unique = [...new Set(words.slice(0, 8))];
    detectedSkills.push(...unique);
  }

  const educationKeywords = ["university", "bachelor", "master", "degree", "college", "phd", "diploma", "b.sc", "m.sc", "b.tech", "m.tech"];
  const education = lines.filter((l) =>
    educationKeywords.some((k) => l.toLowerCase().includes(k))
  );

  const expKeywords = ["developer", "engineer", "manager", "intern", "analyst", "lead", "senior", "junior", "worked", "responsible", "built", "developed", "managed", "designed"];
  const experience = lines.filter((l) =>
    expKeywords.some((k) => l.toLowerCase().includes(k))
  );

  return {
    fullText: text,
    skills: detectedSkills.length > 0 ? detectedSkills : ["Communication", "Problem Solving", "Teamwork"],
    education: education.length > 0 ? education : ["Education details not clearly identified"],
    experience: experience.length > 0 ? experience : ["Experience details not clearly identified"],
  };
}

export function analyzeResume(resume: ResumeData, jobDescription: string): AnalysisResult {
  const jobLower = jobDescription.toLowerCase();
  const jobSkills = COMMON_SKILLS.filter((s) => jobLower.includes(s.toLowerCase()));

  if (jobSkills.length === 0) {
    const words = jobDescription.split(/[\s,;|]+/).filter((w) => w.length > 3);
    jobSkills.push(...[...new Set(words)].slice(0, 6));
  }

  const matched = resume.skills.filter((s) =>
    jobSkills.some((js) => js.toLowerCase() === s.toLowerCase())
  );
  const missing = jobSkills.filter(
    (s) => !resume.skills.some((rs) => rs.toLowerCase() === s.toLowerCase())
  );

  const skillMatch = jobSkills.length > 0 ? Math.round((matched.length / jobSkills.length) * 100) : 65;
  const atsScore = Math.min(95, Math.max(30, skillMatch + Math.floor(Math.random() * 15) + 10));
  const shortlistChance = Math.min(90, Math.max(20, atsScore - 5 + Math.floor(Math.random() * 10)));

  const strengths = [
    matched.length > 2 ? "Strong technical skill alignment" : "Solid foundational skills",
    resume.experience.length > 2 ? "Rich work experience" : "Relevant experience present",
    "Clear resume structure and formatting",
    resume.education.length > 0 ? "Strong educational background" : "Self-taught dedication",
  ].slice(0, 3);

  const weaknesses = [
    missing.length > 3 ? "Several key skills missing for this role" : "Minor skill gaps to address",
    "Could benefit from more quantified achievements",
    "Consider adding more project descriptions",
  ].slice(0, missing.length > 0 ? 3 : 1);

  const improvedBullets = [
    {
      before: "Worked on web applications using React",
      after: "Engineered 5+ responsive web applications using React and TypeScript, serving 10K+ monthly active users with 99.9% uptime",
    },
    {
      before: "Helped improve system performance",
      after: "Optimized database queries and API response times, achieving a 40% reduction in latency and improving user satisfaction scores by 25%",
    },
    {
      before: "Managed team projects and deadlines",
      after: "Led cross-functional team of 8 engineers through 3 product launches, delivering all milestones 2 weeks ahead of schedule",
    },
  ];

  const roadmap = missing.slice(0, 5).map((skill, i) => ({
    step: i + 1,
    title: `Learn ${skill}`,
    description: getRoadmapDescription(skill),
  }));

  if (roadmap.length === 0) {
    roadmap.push(
      { step: 1, title: "Deepen existing skills", description: "Build advanced projects with your current tech stack" },
      { step: 2, title: "Contribute to open source", description: "Find projects on GitHub that align with your skills" },
      { step: 3, title: "Get certified", description: "Pursue relevant industry certifications" },
    );
  }

  return { atsScore, skillMatch, matchedSkills: matched, missingSkills: missing, strengths, weaknesses, shortlistChance, improvedBullets, roadmap };
}

function getRoadmapDescription(skill: string): string {
  const descriptions: Record<string, string> = {
    React: "Complete the official React tutorial, then build a full-stack app with hooks and context",
    TypeScript: "Start with TypeScript Handbook, practice converting JS projects to TS",
    Python: "Learn through Python.org tutorial, build data scripts and APIs with Flask/FastAPI",
    Docker: "Learn containerization basics, Dockerize your existing projects",
    AWS: "Start with AWS free tier, get the Cloud Practitioner certification",
    Kubernetes: "Learn K8s fundamentals on Minikube, then deploy a multi-service app",
    GraphQL: "Build a GraphQL API with Apollo Server, integrate with a React frontend",
    "Node.js": "Build REST APIs with Express, learn async patterns and streams",
    SQL: "Practice on SQLBolt/LeetCode, design schemas for real-world applications",
    Git: "Master branching strategies, contribute to open-source projects",
  };
  return descriptions[skill] || `Study ${skill} documentation, build 2-3 practice projects, and apply in real-world scenarios`;
}

export function generatePortfolioHTML(resume: ResumeData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #0a0f1e; color: #e2e8f0; min-height: 100vh; }
    .container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 2.5rem; font-weight: 800; background: linear-gradient(135deg, #22d3ee, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px; }
    h2 { font-size: 1.25rem; color: #94a3b8; margin-bottom: 32px; }
    .section { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(51, 65, 85, 0.5); border-radius: 12px; padding: 24px; margin-bottom: 20px; }
    .section h3 { font-size: 1.1rem; color: #22d3ee; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
    .skills { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill { background: rgba(34, 211, 238, 0.1); border: 1px solid rgba(34, 211, 238, 0.3); padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; color: #22d3ee; }
    ul { list-style: none; }
    li { padding: 8px 0; border-bottom: 1px solid rgba(51, 65, 85, 0.3); color: #cbd5e1; font-size: 0.95rem; }
    li:last-child { border-bottom: none; }
    .footer { text-align: center; margin-top: 40px; color: #475569; font-size: 0.8rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Portfolio</h1>
    <h2>Generated by ResumeIQ AI</h2>
    <div class="section">
      <h3>🛠 Skills</h3>
      <div class="skills">
        ${resume.skills.map((s) => `<span class="skill">${s}</span>`).join("")}
      </div>
    </div>
    <div class="section">
      <h3>🎓 Education</h3>
      <ul>${resume.education.map((e) => `<li>${e}</li>`).join("")}</ul>
    </div>
    <div class="section">
      <h3>💼 Experience</h3>
      <ul>${resume.experience.map((e) => `<li>${e}</li>`).join("")}</ul>
    </div>
    <div class="footer">Built with ResumeIQ AI</div>
  </div>
</body>
</html>`;
}
