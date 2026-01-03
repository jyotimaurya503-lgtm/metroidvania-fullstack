import { k } from "./kaboomLoader.js";
import { room1 } from "./scenes/room1.js";
import { room2 } from "./scenes/room2.js";
import { setBackgroundColor } from "./scenes/roomUtils.js";
import { makeNotificationBox } from "./ui/notificationBox.js";
import { resetScore } from "./state/scoreManager.js";

window.addEventListener("keydown", async (e) => {
  if (e.key.toLowerCase() === "m") {
    console.log("M pressed, about to send score update request...");

    try {
      const username = localStorage.getItem("username");
      const { getScore } = await import("./state/scoreManager.js");
      const score = getScore();

      console.log("Username:", username, "Score:", score);

      if (username && typeof score === "number") {
        const response = await fetch("http://localhost:5000/api/score/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, score }),
        });

        console.log("Score update request sent, awaiting response...");

        const data = await response.json();
        console.log("Response from backend:", data);

        // Wait 5 seconds before redirect so logs can be read
        console.log("Redirecting in 5 seconds...");
        setTimeout(() => {
          if (window.parent) {
            window.parent.location.href = "/home";
          } else {
            window.location.href = "/home";
          }
        }, 50000);

      } else {
        console.warn("Username or score missing, skipping fetch.");
      }
    } catch (err) {
      console.error("Error sending score update request:", err);
    }
  }
});






// Post score to parent window before unload (optional)

async function main() {
  const room1Data = await (await fetch("./maps/room1.json")).json();
  const room2Data = await (await fetch("./maps/room2.json")).json();

  k.scene("room1", (previousSceneData) => {
    room1(k, room1Data, previousSceneData);
  });
  k.scene("room2", (previousSceneData) => {
    room2(k, room2Data, previousSceneData);
  });

  k.scene("final-exit", () => {
    setBackgroundColor(k, "#20214a");
    k.add(makeNotificationBox(k, "You escaped the factory!\nThe End. Thanks for playing!"));
  });
}

k.scene("intro", () => {
  setBackgroundColor(k, "#20214a");
  k.add(
    makeNotificationBox(
      k,
      "Escape the factory!\nUse arrow keys to move, x to jump, z to attack.\nPress Enter to start!\nPress M for Main Menu."
    )
  );
  k.onKeyPress("enter", () => {
    const context = new AudioContext();
    context.resume();
    // Reset score when starting a new game from the intro
    resetScore();
    k.go("room1", { exitName: null });
  });
});

k.go("intro");
main();
