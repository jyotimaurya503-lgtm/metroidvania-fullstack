import React, { useEffect, useRef } from "react";

const GamePage: React.FC = () => {
  const username = localStorage.getItem("username");
  const latestScore = useRef<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Listen for score messages from the game iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data.score === "number") {
        console.log("[GamePage] Received score from iframe:", event.data.score);
        latestScore.current = event.data.score;
      }
    };
    window.addEventListener("message", handleMessage);

    // On unload, send score to backend
    const handleBeforeUnload = () => {
      if (username) {
        // Always send username and score (even if score is 0)
        fetch("http://localhost:5000/api/score/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, score: latestScore.current }),
          keepalive: true,
        });
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username]);

  return (
    <div className="w-full h-screen">
      <iframe
        ref={iframeRef}
        src="/game/index.html"
        title="Pixelvania Game"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default GamePage;
