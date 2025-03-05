"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [transcription, setTranscription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setTranscription(data.transcription || "Failed to transcribe.");
    } catch (error) {
      console.error("Error uploading file:", error);
      setTranscription("Error processing file.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Audio to Text Transcription</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>Upload</button>
      <h2>Transcription:</h2>
      <p>{transcription}</p>
    </div>
  );
}
