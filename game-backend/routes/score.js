import express from 'express';
import User from '../models/User.js';

const router = express.Router();






// POST /api/score/update
router.post('/update', async (req, res) => {
  console.log("[SCORE UPDATE] req.body:", req.body);
  const username = req.body.username;
  const { score } = req.body;

  if (!username) {
    console.log("[SCORE UPDATE] No username provided");
    return res.status(401).json({ error: 'No username provided' });
  }

  const scoreNum = Number(score);
  if (isNaN(scoreNum)) {
    console.log("[SCORE UPDATE] Invalid score value:", score);
    return res.status(400).json({ error: 'Invalid score value' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("[SCORE UPDATE] User not found:", username);
      return res.status(404).json({ message: 'User not found' });
    }

    user.score = scoreNum;
    await user.save();
    console.log(`[SCORE UPDATE] Updated user ${username} with score:`, user.score);

    res.json({ message: 'Score updated', score: user.score });
  } catch (err) {
    console.error("[SCORE UPDATE] Error:", err);
    res.status(500).json({ error: 'Failed to update score' });
  }
});

// GET /api/score/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select('username score');

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
