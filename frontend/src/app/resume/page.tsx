"use client";

import { useState } from "react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [role, setRole] = useState("Data Analyst");
  const [foundSkills, setFoundSkills] = useState<string[]>([]);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      setText(data.text);
      setAtsScore(data.ats_score);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };


  return (


    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            CareerPilot AI
          </h1>

          <p className="text-slate-600 mt-2">
            AI-Powered Placement Readiness Platform
          </p>
        </div>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            setFile(selectedFile);
          }}
        />


        <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null;
              setFile(selectedFile);
            }}
            className="block w-full text-sm"
          />

          <select
            className="mt-4 border rounded-lg px-4 py-2"
          >
            <option>Data Analyst</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Scientist</option>
          </select>

          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Analyze Resume
          </button>
        </div>

        {atsScore !== null && (
          <div className="bg-white border rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold">
              ATS Score
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-4">
              {atsScore}/100
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Skills Identified
            </h2>

            <ul className="space-y-2">
              {foundSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Skill Gaps
            </h2>

            <ul className="space-y-2">
              {missingSkills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
} 