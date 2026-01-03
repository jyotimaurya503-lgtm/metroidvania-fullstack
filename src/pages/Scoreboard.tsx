import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlowText } from "@/components/GlowText";
import { RetroButton } from "@/components/RetroButton";
import { CRTPanel } from "@/components/CRTPanel";
import factoryBg from "@/assets/factory-background.jpg";
import { Trophy, Medal, Star, Crown } from "lucide-react";

interface ScoreEntry {
  rank: number;
  player: string;
  score: number;
}

const Scoreboard = () => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/score/leaderboard");
        const data = await response.json();
        if (!Array.isArray(data) || data.length === 0) {
          setScores([]);
          return;
        }
        const formatted = data.map((entry: any, i: number) => ({
          rank: i + 1,
          player: entry.username,
          score: entry.score,
        }));
        setScores(formatted);
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      }
    };
    fetchScores();
  }, []);

  // ...existing code...

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return <Star className="w-4 h-4 text-crt-amber/60" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 bg-yellow-400/10";
      case 2:
        return "text-gray-300 bg-gray-300/10";
      case 3:
        return "text-amber-600 bg-amber-600/10";
      default:
        return "text-crt-green bg-crt-green/5";
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${factoryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary-glow rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <GlowText className="text-4xl mb-4">LEADERBOARD</GlowText>
          <div className="text-sm text-crt-green font-pixel">
            [ TOP FACILITY EXPLORERS ]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CRTPanel className="p-6 text-center">
            <div className="text-crt-amber font-pixel text-xs mb-2">ACTIVE PLAYERS</div>
            <div className="text-2xl text-crt-green font-pixel">{scores.length}</div>
          </CRTPanel>

          <CRTPanel className="p-6 text-center">
            <div className="text-crt-amber font-pixel text-xs mb-2">TOP SCORE</div>
            <div className="text-2xl text-crt-green font-pixel">
              {scores[0]?.score ?? 0}
            </div>
          </CRTPanel>
        </div>

        <CRTPanel className="p-6 mb-8">
          <div className="mb-6">
            <div className="text-crt-amber font-pixel text-sm mb-4">[ GLOBAL RANKINGS ]</div>
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-crt-green/30 text-crt-amber font-pixel text-xs">
              <div>RANK</div>
              <div className="col-span-1">PLAYER</div>
              <div>SCORE</div>
            </div>
          </div>

          <div className="space-y-2">
            {scores.map((entry) => (
              <div
                key={entry.rank}
                className={`grid grid-cols-3 gap-4 py-3 px-3 rounded border border-transparent hover:border-crt-green/30 transition-colors ${getRankColor(entry.rank)}`}
              >
                <div className="flex items-center gap-2 font-pixel text-sm">
                  {getRankIcon(entry.rank)}
                  <span>#{entry.rank}</span>
                </div>
                <div className="font-pixel text-sm text-crt-green">
                  {entry.player}
                </div>
                <div className="font-pixel text-sm text-crt-amber">
                  {entry.score}
                </div>
              </div>
            ))}
          </div>
        </CRTPanel>

        <div className="flex justify-center gap-4">
          <Link to="/home">
            <RetroButton className="px-6">← MAIN MENU</RetroButton>
          </Link>
          <RetroButton variant="accent" className="px-6" onClick={() => window.location.reload()}>
            REFRESH DATA
          </RetroButton>
        </div>

        <div className="text-center mt-8">
          <div className="text-xs text-muted-foreground font-pixel">
            <div className="flicker text-crt-green">● DATA STREAM ACTIVE</div>
            <div className="mt-1">LAST SYNC: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
