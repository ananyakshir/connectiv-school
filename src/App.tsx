import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Resources from "./pages/Resources";
import Quiz from "./pages/Quiz";
import Doubts from "./pages/Doubts";
import Achievements from "./pages/Achievements";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";
import PeerStudies from "./pages/PeerStudies";
import Planner from "./pages/Planner";
import Notes from "./pages/Notes";
import SyllabusProgress from "./pages/SyllabusProgress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/doubts" element={<Doubts />} />
          <Route path="/peer-studies" element={<PeerStudies />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/syllabus" element={<SyllabusProgress />} />
          <Route path="/achievements" element={<Achievements />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
