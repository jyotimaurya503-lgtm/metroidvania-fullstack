// src/state/scoreManager.js
// Tracks and persists the player's score

let score = 0;

export function resetScore() {
  score = 0;
}

export function getScore() {
  return score;
}

export function addScore(val) {
  score += val;
  if (score < 0) score = 0;
}

export function setScore(val) {
  score = val;
}

export function loadInitialScore() {
  score = 0;
}
