import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { Toaster } from "@/components/ui/toaster";

// Import Pages
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import News from "./pages/News";
import MSP from "./pages/MSP";
import CropSuggestion from "./pages/CropSuggestion";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
    <BrowserRouter basename="/krishi-mitr-full-stack">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/news" element={<News />} />
          <Route path="/msp" element={<MSP />} />
          <Route path="/crop-suggestion" element={<CropSuggestion />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Auth routes without the main layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    <Toaster />
  </>
);

export default App;