"use client";

import { useState } from "react";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div>
      <h1>Resume Page</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          console.log(e.target.files?.[0]);
          setFile(e.target.files?.[0] || null);
        }}
      />

      <button
        onClick={() => {
          console.log("Clicked");
          console.log("Current file:", file);

          if (!file) {
            alert("No file selected");
            return;
          }   

          alert(`Selected: ${file.name}`);
        }}
      >
        Upload
      </button>
    </div>
  );
}