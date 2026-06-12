"use client";

import { useState } from "react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [atsScore, setAtsScore] = useState<number | null>(null);

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
    <div>
      <h1>Resume Page</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] || null;
          setFile(selectedFile);
        }}
      />

      <button 
        onClick={() => {
        handleUpload();
      }}
     >
      Upload
      </button>

      {atsScore !== null && (
        <div>
          <h2>ATS Score: {atsScore}/100</h2>
        </div>
      )}

      <pre>
        {text}
      </pre>
  </div> 
  );
}
   
