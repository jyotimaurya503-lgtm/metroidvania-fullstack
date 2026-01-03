import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-phone-input-2/lib/style.css';

import Intro from "./pages/Intro";      // ✅ Import the Intro page
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Scoreboard from "./pages/Scoreboard";
import NotFound from "./pages/NotFound";
import Game from "./pages/GamePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />            {/* ✅ Intro at root */}
          <Route path="/home" element={<Index />} />        {/* ✅ Menu moved to /home */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
