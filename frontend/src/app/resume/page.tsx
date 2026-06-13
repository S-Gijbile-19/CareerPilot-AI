"use client";

import { useState, useEffect } from "react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [role, setRole] = useState("Software Engineer");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStepText, setCurrentStepText] = useState("");
  const [data, setData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  const agentSteps = [
    "🤖 Agent Initialized: Booting up structural cognitive matrix...",
    "📄 Extracting text content streams and tokens from resume PDF...",
    "🎯 Perceiving layout patterns & calculating metric parameters...",
    "🔍 Checking vocabulary arrays against core market requirements...",
    "💡 Generating targeted optimization and self-correcting action steps..."
  ];

  // Simulation of Agentic Thinking
  useEffect(() => {
    if (!loading) return;
    let stepIdx = 0;
    setCurrentStepText(agentSteps[0]);
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < agentSteps.length) setCurrentStepText(agentSteps[stepIdx]);
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  // Fetch Live Alerts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/resume/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch(() => console.error("Alerts service unreachable."));
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Select a PDF first.");
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", role);
    if (jobDescription.trim()) formData.append("job_description", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/resume/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      alert("Agent failed to finish processing loop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-slate-200 pb-8">
          <h1 className="text-4xl font-black text-slate-900">CareerPilot-AI</h1>
          <p className="text-slate-600">Autonomous Placement Readiness Platform</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-50 p-3 border border-slate-200 rounded-lg">
              <option>Software Engineer</option>
              <option>Data Analyst</option>
            </select>
            <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="w-full bg-slate-50 p-3 border border-slate-200 rounded-lg" placeholder="Job Description (Optional)..." rows={4} />
            <button onClick={handleUpload} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 cursor-pointer">
              {loading ? "Orchestrating..." : "Execute Agent Loop"}
            </button>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            {loading && <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-blue-800 font-mono text-sm">{currentStepText}</div>}
            
            {/* Alerts */}
            {alerts.length > 0 && alerts.map((a: any) => (
              <div key={a.company} className="bg-red-500 p-4 rounded-xl text-white font-bold animate-pulse shadow-sm">
                ⚠️ Urgent: {a.company} Registration Closing in {a.days_remaining} days!
              </div>
            ))}

            {data && (
              <div className="space-y-6">
                {/* Score */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-5xl font-black text-blue-600">{data.ats_metrics?.overall_score ?? 0}%</h2>
                  <p className="text-slate-500 font-medium">Overall ATS Match Score</p>
                </div>

                {/* Skills & Roadmap */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <h3 className="font-bold mb-4">Autonomous Learning Roadmap</h3>
                   {data.recommendations?.map((r: any) => (
                     <div key={r.step} className="border-l-2 border-slate-200 pl-4 mb-4 py-1">
                        <p className="font-semibold text-slate-800">{r.skill}</p>
                        <p className="text-sm text-slate-600">{r.action}</p>
                     </div>
                   ))}
                   
                   {/* Interview Simulator */}
                   <div className="mt-8 border-t border-slate-100 pt-6">
                     <h3 className="font-bold mb-2">Interactive Interview Simulator Agent</h3>
                     <p className="text-xs text-slate-500 mb-4">Contextual stress tests based on your profile.</p>
                     <button onClick={async () => {
                       const res = await fetch("http://127.0.0.1:8000/api/resume/interview/ask", {
                         method: "POST", 
                         headers: { "Content-Type": "application/json" },
                         // FIX: Pass the array directly without wrapping it in an object key
                         body: JSON.stringify(data.found_skills || [])
                       });
                       const q = await res.json();
                       alert(`[Agent Interview Question]:\n\n${q.question}`);
                     }} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 cursor-pointer">
                       Initialize Mock Session
                     </button>
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}