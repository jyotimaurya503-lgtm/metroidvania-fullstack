import { Link, useNavigate } from "react-router-dom"; // ⬅️ Added useNavigate
import { GlowText } from "@/components/GlowText";
import { RetroButton } from "@/components/RetroButton";
import { CRTPanel } from "@/components/CRTPanel";
import factoryBg from "@/assets/factory-background.jpg";

const Index = () => {
  const navigate = useNavigate(); // ⬅️ Init hook

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${factoryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-12 px-4">
        {/* Title */}
        <div className="space-y-4">
          <GlowText 
            size="xl" 
            variant="primary" 
            flicker
            className="mb-2"
          >
            PIXEL
          </GlowText>
          <GlowText 
            size="xl" 
            variant="secondary"
            className="tracking-[0.3em]"
          >
            METROIDVANIA
          </GlowText>
          <div className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-accent mx-auto opacity-80" />
        </div>

        {/* Menu Panel */}
        <CRTPanel glow className="max-w-md mx-auto">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="text-accent font-pixel text-xs tracking-widest mb-2">
                [SYSTEM ONLINE]
              </div>
              <div className="text-muted-foreground font-pixel text-xs">
                Welcome to the facility...
              </div>
            </div>

            <div className="space-y-4">
              <Link to="/login">
                <RetroButton 
                  variant="primary" 
                  className="w-full text-base py-4"
                >
                  &gt; LOGIN
                </RetroButton>
              </Link>
              
              <Link to="/signup">
                <RetroButton 
                  variant="secondary" 
                  className="w-full text-base py-4"
                >
                  &gt; SIGNUP
                </RetroButton>
              </Link>
              
              <Link to="/scoreboard">
                <RetroButton 
                  variant="accent" 
                  className="w-full text-base py-4"
                >
                  &gt; LEADERBOARD
                </RetroButton>
              </Link>
              
              <RetroButton 
                variant="accent" 
                className="w-full text-base py-4"
                onClick={() => navigate("/game")} // ⬅️ Redirect to game
              >
                &gt; PLAY AS GUEST
              </RetroButton>
            </div>

            <div className="border-t border-primary/20 pt-4 mt-8">
              <div className="text-center text-xs text-muted-foreground font-pixel">
                <div className="flicker">CONNECTION STATUS: STABLE</div>
                <div className="mt-1">POWER LEVEL: 99%</div>
              </div>
            </div>
          </div>
        </CRTPanel>

        {/* Bottom status bar */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 text-xs text-muted-foreground font-pixel">
            <span className="text-accent flicker">●</span>
            <span>FACILITY-7 TERMINAL</span>
            <span className="text-accent flicker">●</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
