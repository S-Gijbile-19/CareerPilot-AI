import { useState, useEffect } from "react";

export default function InterviewBot({ skills }: { skills: string[] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const fetchQuestion = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/resume/interview/ask", {
       method: "POST", 
       body: JSON.stringify({ found_skills: skills })
    });
    const data = await res.json();
    setQuestion(data.question);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl mt-8">
      <h3 className="text-xl font-bold mb-4">Autonomous Interviewer</h3>
      <p className="mb-4 text-blue-300">{question}</p>
      <textarea 
        className="w-full bg-slate-950 p-4 border border-slate-700 rounded-lg"
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button onClick={fetchQuestion} className="bg-emerald-600 text-white px-4 py-2 mt-2 rounded">
        Submit Answer
      </button>
    </div>
  );
}