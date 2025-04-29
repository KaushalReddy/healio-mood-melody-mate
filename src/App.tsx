
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
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavBar />
        <main className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sleep" element={<SleepPage />} />
            <Route path="/mood" element={<MoodPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
