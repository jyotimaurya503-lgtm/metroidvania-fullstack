import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ← Added axios
import { GlowText } from "@/components/GlowText";
import { RetroButton } from "@/components/RetroButton";
import { CRTPanel } from "@/components/CRTPanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import factoryBg from "@/assets/factory-background.jpg";

const Login = () => {
  const [username, setUsername] = useState("");  // Changed from email
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      username,
      password
    });

    console.log("✅ Login success:", response.data);

    // Save token and username in localStorage
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", username); // <-- ADD THIS LINE

    navigate("/game"); // redirect to game after success
  } catch (error: any) {
    console.error("❌ Login error:", error);

    const errorMessage = error.response?.data?.error || "Login failed. Try again.";
    alert(errorMessage);
  }
};


  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${factoryBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <CRTPanel className="p-8">
          <div className="text-center mb-8">
            <GlowText className="text-3xl mb-2">ACCESS TERMINAL</GlowText>
            <div className="text-sm text-crt-green font-pixel">
              [ AUTHENTICATION REQUIRED ]
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-crt-green font-pixel text-sm">
                USER_ID:
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-background/50 border-crt-green/30 text-crt-green font-pixel focus:border-crt-green focus:ring-crt-green/50"
                placeholder="Enter your username..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-crt-green font-pixel text-sm">
                ACCESS_CODE:
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background/50 border-crt-green/30 text-crt-green font-pixel focus:border-crt-green focus:ring-crt-green/50"
                placeholder="Enter password..."
                required
              />
            </div>

            <div className="space-y-4 pt-4">
              <RetroButton type="submit" className="w-full">
                [ LOGIN ]
              </RetroButton>
              
              <div className="text-center">
                <span className="text-muted-foreground font-pixel text-xs">
                  Need access? 
                </span>
                <Link 
                  to="/signup" 
                  className="text-crt-green hover:text-primary-glow ml-2 font-pixel text-xs underline"
                >
                  CREATE_ACCOUNT
                </Link>
              </div>

              <div className="text-center pt-2">
                <Link 
                  to="/home" 
                  className="text-crt-amber hover:text-accent-glow font-pixel text-xs underline"
                >
                  ← BACK_TO_MAIN
                </Link>
              </div>
            </div>
          </form>
        </CRTPanel>
      </div>
    </div>
  );
};

export default Login;
