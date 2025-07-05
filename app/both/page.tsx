"use client";

import { useState, useRef } from "react";

export default function HomePage() {
  const [text, setText] = useState<string>("");
  const [speaking, setSpeaking] = useState<boolean>(false);
  const [listening, setListening] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Text-to-Speech
  const handleSpeak = () => {
    if (!text) return alert("Please enter some text!");

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support Text-to-Speech.");
    }
  };

  // Speech-to-Text
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setText((prev) => prev + " " + transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      alert("Error occurred: " + event.error);
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
      <h1>🗣️ Text ↔ Speech App (TTS + STT)</h1>

      <textarea
        rows={6}
        style={{ width: "100%", padding: "0.5rem", fontSize: "1.1rem" }}
        placeholder="Type or speak..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={handleSpeak}
          disabled={speaking}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1.1rem",
            backgroundColor: speaking ? "#aaa" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: speaking ? "not-allowed" : "pointer",
          }}
        >
          🔊 {speaking ? "Speaking..." : "Speak"}
        </button>

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
