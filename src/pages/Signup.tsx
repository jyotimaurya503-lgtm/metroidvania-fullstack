import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlowText } from "@/components/GlowText";
import { RetroButton } from "@/components/RetroButton";
import { CRTPanel } from "@/components/CRTPanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import factoryBg from "@/assets/factory-background.jpg";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import zxcvbn from "zxcvbn";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPass = "";
    for (let i = 0; i < 12; i++) {
      newPass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassword(newPass);
    setConfirmPassword(newPass);
    setPasswordStrength(zxcvbn(newPass).score);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Password complexity check: min 8 chars, at least 1 number and 1 special char
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>\/?`~]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters and include at least one number and one special character.");
      return;
    }

    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          phone,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed due to server error");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordStrength(zxcvbn(value).score);
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return "Weak";
      case 2:
      case 3:
        return "Medium";
      case 4:
        return "Strong";
      default:
        return "";
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
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent-glow rounded-full animate-pulse"
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
            <GlowText className="text-3xl mb-2">NEW USER REGISTRY</GlowText>
            <div className="text-sm text-crt-amber font-pixel">
              [ CREATE ACCESS CREDENTIALS ]
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-crt-amber font-pixel text-sm">
                CALLSIGN:
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-crt-amber font-pixel text-sm">
                COMM_LINK:
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-crt-amber font-pixel text-sm">
                COMM_ID (PHONE):
              </Label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputProps={{ required: true }}
                containerClass="!w-full"
                inputClass="!bg-black !text-green-400 !border-none !w-full font-mono"
                buttonClass="!bg-black !border-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-crt-amber font-pixel text-sm">
                SECURITY_KEY:
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              <div className="text-xs text-crt-amber font-pixel">
                Strength: {getStrengthText(passwordStrength)}
              </div>
              <button
                type="button"
                onClick={generatePassword}
                className="text-xs underline"
              >
                Generate Strong Password
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-crt-amber font-pixel text-sm">
                CONFIRM_KEY:
              </Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4 pt-4">
              <RetroButton type="submit" className="w-full">
                [ REGISTER ]
              </RetroButton>

              <div className="text-center">
                <span className="text-muted-foreground font-pixel text-xs">
                  Already registered?
                </span>
                <Link
                  to="/login"
                  className="ml-2 font-pixel text-xs underline"
                >
                  ACCESS_LOGIN
                </Link>
              </div>

              <div className="text-center pt-2">
                <Link
                  to="/home"
                  className="font-pixel text-xs underline"
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

export default Signup;
