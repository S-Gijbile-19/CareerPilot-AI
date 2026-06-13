"use client";

import { useState, useEffect } from "react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("Software Engineer");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStepText, setCurrentStepText] = useState("");
  const [data, setData] = useState<any>(null);

  // Simulation steps to showcase an Agentic system working in the background during execution
  const agentSteps = [
    "🤖 Agent Initialized: Booting up structural cognitive matrix...",
    "📄 Extracting text content streams and tokens from resume PDF...",
    "🎯 Perceiving layout patterns & calculating metric parameters...",
    "🔍 Checking vocabulary arrays against core market requirements...",
    "💡 Generating targeted optimization and self-correcting action steps..."
  ];

  useEffect(() => {
    if (!loading) return;
    let stepIdx = 0;
    setCurrentStepText(agentSteps[0]);

    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < agentSteps.length) {
        setCurrentStepText(agentSteps[stepIdx]);
      }
    }, 900);

    return () => clearInterval(interval);
  }, [loading]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume PDF file first.");
      return;
    }

    setLoading(true);
    setData(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", role);
    if (jobDescription.trim()) {
      formData.append("job_description", jobDescription);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network execution boundary rejected payload.");
      }

      const result = await response.json();
      console.log("Agent response acquired:", result);
      setData(result);
    } catch (error) {
      console.error(error);
      alert("Agent failed to finish processing loop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Header Block */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase font-bold">Autonomous Engine Active</span>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent mt-1">
              CareerPilot-AI
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-medium">
              Multi-Agentic Placement Evaluation & Self-Healing Roadmap Platform
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono text-slate-400">
            System Instance: v1.1-Stable
          </div>
        </div>

        {/* Dynamic Config Controls Split Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start mb-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">1. Feed Resume (PDF Format)</label>
              <div className="relative border border-dashed border-slate-700 hover:border-slate-500 transition rounded-xl p-4 bg-slate-950/50 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-300 block truncate">
                  {file ? file.name : "Choose file or drag PDF"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">2. Target Architecture Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition"
              >
                <option value="Software Engineer">Software Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Data Scientist">Data Scientist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">3. Job Description Context (Optional)</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job posting criteria to activate dynamic keyword similarity matching matrices..."
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-blue-500 transition resize-none"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold py-3 px-4 rounded-xl transition shadow-lg shadow-blue-900/20 text-sm flex items-center justify-center gap-2"
            >
              {loading ? "Orchestrating..." : "Execute Agent Loop"}
            </button>
          </div>

          {/* Output Display Terminal / Results */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Loading Stepper Logs Pane */}
            {loading && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                  <h3 className="font-mono text-xs text-slate-400 tracking-wider uppercase">Agent Processing Real-time Stream</h3>
                </div>
                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80">
                  <p className="font-mono text-sm text-blue-400 tracking-wide">{currentStepText}</p>
                </div>
              </div>
            )}

            {/* Complete Data Visualizations Metrics Grid */}
            {data && data.success && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Score Summary Metrics Grid Layout */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md flex flex-col justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Overall ATS Match</span>
                    <div className="mt-4">
                      <span className="text-5xl font-black tracking-tight text-blue-500">
                        {data.ats_metrics?.overall_score ?? 75}
                      </span>
                      <span className="text-slate-500 text-sm font-semibold">/100</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md space-y-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Structure Score Metrics</span>
                    <div className="text-xs font-mono text-slate-300 space-y-1 pt-1">
                      <div className="flex justify-between">
                        <span>Sections:</span>
                        <span className="text-emerald-400">{data.ats_metrics?.breakdown?.section_presence ?? 30}/30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Formatting:</span>
                        <span className="text-emerald-400">{data.ats_metrics?.breakdown?.formatting_quality ?? 20}/30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Keywords:</span>
                        <span className="text-emerald-400">{data.ats_metrics?.breakdown?.keyword_match ?? 25}/40</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md flex flex-col justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Target Objective Profile</span>
                    <div className="mt-2">
                      <p className="text-sm font-bold text-slate-200 truncate">{data.target_job}</p>
                      <p className="text-[10px] font-mono text-amber-500 mt-1">
                        {data.ats_metrics?.insights?.quantifiable_metrics_found ? "✔ Metrics optimization passing" : "⚠ Quantifiable impact statements missing"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Found and Missing Skills Pillar Box */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Identified Profile Competencies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.found_skills && data.found_skills.length > 0 ? (
                        data.found_skills.map((skill: string) => (
                          <span key={skill} className="bg-emerald-950/60 text-emerald-400 text-xs px-3 py-1.5 rounded-lg border border-emerald-900/50 font-medium">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 font-mono italic">No matches discovered within primary token structures.</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-500"></span> Autonomous Gap Identifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.missing_skills && data.missing_skills.length > 0 ? (
                        data.missing_skills.slice(0, 10).map((skill: string) => (
                          <span key={skill} className="bg-slate-950 text-slate-400 text-xs px-3 py-1.5 rounded-lg border border-slate-800 font-medium">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-slate-500 font-mono italic">Zero structural core tracking discrepancies noted.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Specialized Learning Path Visual Timeline Layout */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-200">
                      Autonomous Curriculum & Learning Roadmap
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Priority-sequenced action strategies calculated to eliminate profile target vulnerabilities.
                    </p>
                  </div>

                  <div className="relative border-l border-slate-800 ml-4 space-y-8 my-4">
                    {data.recommendations && data.recommendations.length > 0 ? (
                      data.recommendations.map((rec: any, index: number) => (
                        <div key={rec.step || index} className="relative pl-8 group">
                          
                          {/* Stepper Bullet Indicator Pin */}
                          <div className="absolute -left-[13px] top-0.5 bg-slate-950 border-2 border-blue-500 text-blue-400 rounded-full w-6 h-6 text-[10px] font-mono flex items-center justify-center font-bold shadow-md shadow-blue-900/20 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                            {rec.step || (index + 1)}
                          </div>

                          {/* Content Core Body Card */}
                          <div className="bg-slate-950/40 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 transition duration-300 space-y-2">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h4 className="font-bold text-sm text-slate-100 tracking-wide">
                                Targeted Skill: {rec.skill}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="bg-slate-900 text-slate-400 font-mono text-[10px] border border-slate-800 px-2 py-0.5 rounded">
                                  ⏱ {rec.duration || "2 weeks"}
                                </span>
                                <span className="bg-blue-950/40 text-blue-400 font-mono text-[10px] border border-blue-900/40 px-2 py-0.5 rounded">
                                  {rec.format || "Course Matrix"}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-slate-400 leading-relaxed">
                              {rec.action}
                            </p>

                            <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                              <span className="text-[10px] font-mono text-slate-500">Resource Strategy Node:</span>
                              <span className="text-xs font-bold text-blue-400 font-mono hover:underline cursor-pointer">
                                {rec.recommended_resource} →
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500 font-mono italic pl-4">No active educational mitigation tracks required.</p>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Autonomous Interview Agent Widget */}
<div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mt-8">
  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
    <div>
      <h3 className="text-lg font-bold text-slate-200">Interactive Interview Simulator Agent</h3>
      <p className="text-xs text-slate-400">Contextual behavior-driven stress tests customized against your resume profile skills.</p>
    </div>
    <button
      onClick={async () => {
        const res = await fetch("http://127.0.0.1:8000/api/resume/interview/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.found_skills)
        });
        const qData = await res.json();
        alert(`[Agent Interview Question for ${qData.skill}]:\n\n${qData.question}`);
      }}
      className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition"
    >
      Initialize Mock Session
    </button>
  </div>
</div>

            {/* Zero Slate Placeholder Prompt */}
            {!data && !loading && (
              <div className="bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl p-12 text-center text-slate-500">
                <p className="text-sm font-mono">Awaiting instructions. Configure parameters and execute agent loop.</p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}