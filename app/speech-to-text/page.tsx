"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Error occurred in recognition: " + event.error);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <main style={{ maxWidth: 600, margin: "3rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Speech to Text App (Next.js)</h1>

      <textarea
        rows={6}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1.1rem" }}
        placeholder="Your speech will appear here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: "1rem" }}>
        {!listening ? (
          <button
            onClick={startListening}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            🎤 Start Listening
          </button>
        ) : (
          <button
            onClick={stopListening}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1.1rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
            }}
          >
            🛑 Stop Listening
          </button>
        )}
      </div>
    </main>
  );
}
