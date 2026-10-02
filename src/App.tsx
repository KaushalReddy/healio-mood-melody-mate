import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SleepPage from "./pages/SleepPage";
import MoodPage from "./pages/MoodPage";
import JournalPage from "./pages/JournalPage";
import MusicPage from "./pages/MusicPage";
import AiAssistantPage from "./pages/AiAssistantPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();
const P = (el: JSX.Element) => <RequireAuth>{el}</RequireAuth>;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavBar />
          <main className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/music" element={<MusicPage />} />
              <Route path="/sleep" element={P(<SleepPage />)} />
              <Route path="/mood" element={P(<MoodPage />)} />
              <Route path="/journal" element={P(<JournalPage />)} />
              <Route path="/ai-assistant" element={P(<AiAssistantPage />)} />
              <Route path="/ai-assistant/:threadId" element={P(<AiAssistantPage />)} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
