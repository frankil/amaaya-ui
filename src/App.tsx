import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StyleSoulProvider } from "@/context/StyleSoulContext";
import AppLayout from "@/components/layout/AppLayout";
import Spark from "./pages/Spark";
import Mirror from "./pages/Mirror";
import Wardrobe from "./pages/Wardrobe";
import Circle from "./pages/Circle";
import Soul from "./pages/Soul";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import OccasionsPage from "./pages/explore/OccasionsPage";
import OccasionDetailPage from "./pages/explore/OccasionDetailPage";
import VibesPage from "./pages/explore/VibesPage";
import VibeDetailPage from "./pages/explore/VibeDetailPage";
import TrendingPage from "./pages/explore/TrendingPage";
import PersonalitiesPage from "./pages/explore/PersonalitiesPage";
import GarmentsPage from "./pages/explore/GarmentsPage";
import MoodboardsPage from "./pages/explore/MoodboardsPage";
import LooksForYouPage from "./pages/explore/LooksForYouPage";
import ReelsPage from "./pages/explore/ReelsPage";
import ExplorePage from "./pages/explore/ExplorePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <StyleSoulProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/" element={<AppLayout><Spark /></AppLayout>} />
            <Route path="/mirror" element={<AppLayout><Mirror /></AppLayout>} />
            <Route path="/wardrobe" element={<AppLayout><Wardrobe /></AppLayout>} />
            <Route path="/circle" element={<AppLayout><Circle /></AppLayout>} />
            <Route path="/soul" element={<AppLayout><Soul /></AppLayout>} />
            {/* Explore pages */}
            <Route path="/explore" element={<AppLayout><ExplorePage /></AppLayout>} />
            <Route path="/explore/occasions" element={<AppLayout><OccasionsPage /></AppLayout>} />
            <Route path="/explore/occasion/:slug" element={<AppLayout><OccasionDetailPage /></AppLayout>} />
            <Route path="/explore/vibes" element={<AppLayout><VibesPage /></AppLayout>} />
            <Route path="/explore/vibe/:slug" element={<AppLayout><VibeDetailPage /></AppLayout>} />
            <Route path="/explore/trending" element={<AppLayout><TrendingPage /></AppLayout>} />
            <Route path="/explore/personalities" element={<AppLayout><PersonalitiesPage /></AppLayout>} />
            <Route path="/explore/garments" element={<AppLayout><GarmentsPage /></AppLayout>} />
            <Route path="/explore/moodboards" element={<AppLayout><MoodboardsPage /></AppLayout>} />
            <Route path="/explore/looks" element={<AppLayout><LooksForYouPage /></AppLayout>} />
            <Route path="/explore/reels" element={<AppLayout><ReelsPage /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyleSoulProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
