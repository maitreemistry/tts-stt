"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text) return alert("Please enter some text!");

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support Speech Synthesis.");
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "3rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Next.js App Router Text-to-Speech</h1>

      <textarea
        rows={6}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1.1rem" }}
        placeholder="Type something to speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSpeak}
        disabled={speaking}
        style={{
          marginTop: "1rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1.1rem",
          backgroundColor: speaking ? "#aaa" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: speaking ? "not-allowed" : "pointer",
        }}
      >
        {speaking ? "Speaking..." : "Speak"}
      </button>
    </main>
  );
}
