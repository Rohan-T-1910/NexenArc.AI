import { Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";

import HeroPage from "./pages/hero";
import Dashboard from "./pages/dashboard";
import NewInvestigation from "./pages/new_investigation";
import ActiveInvestigation from "./pages/active_investigation";
import ThreatIntelligence from "./pages/threat_intelligence";
import AIAgents from "./pages/ai_agents";
import Settings from "./pages/settings";
import Reports from "./pages/reports";
import History from "./pages/history";

function App() {
  return (
    <Routes>
      {/* Public Landing & Glassmorphic Auth Hero Page */}
      <Route path="/" element={<HeroPage />} />
      <Route path="/login" element={<HeroPage />} />
      <Route path="/signup" element={<HeroPage />} />

      {/* Authenticated Workspace Application Layout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-investigation" element={<NewInvestigation />} />
        <Route path="/active-investigation" element={<ActiveInvestigation />} />
        <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
        <Route path="/ai-agents" element={<AIAgents />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
export default App;
