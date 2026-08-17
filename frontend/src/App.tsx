import { Routes, Route } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"

import Dashboard from "./pages/dashboard"
import NewInvestigation from "./pages/new_investigation"
import ActiveInvestigation from "./pages/active_investigation"
import ThreatIntelligence from "./pages/threat_intelligence"
import AIAgents from "./pages/ai_agents"
import Settings from "./pages/settings"

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-investigation" element={<NewInvestigation />} />
        <Route path="/active-investigation" element={<ActiveInvestigation />} />
        <Route path="/threat-intelligence" element={<ThreatIntelligence />} />
        <Route path="/ai-agents" element={<AIAgents />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
export default App