import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import OnboardingModal from "../components/onboarding_modal";

const routeMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Overview of ongoing cases and team readiness",
  },
  "/new-investigation": {
    title: "New Investigation",
    subtitle: "Submit suspicious items for immediate assessment",
  },
  "/active-investigation": {
    title: "Active Investigation",
    subtitle: "Live progress and plain-language answers",
  },
  "/threat-intelligence": {
    title: "Threat Lookup",
    subtitle: "Search addresses, domains, and suspicious signatures",
  },
  "/ai-agents": {
    title: "Your AI Team",
    subtitle: "Meet the specialists investigating your security cases",
  },
  "/reports": {
    title: "Reports",
    subtitle: "Clear summaries ready for stakeholders",
  },
  "/history": {
    title: "Case History",
    subtitle: "Searchable log of past assessments and conclusions",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Preferences and assistant configuration",
  },
};

export function AppLayout() {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const location = useLocation();

  const currentMeta = routeMeta[location.pathname] || {
    title: "NexenArc",
    subtitle: "Security Investigation Platform",
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#221E2B] text-[#FAF0E6]">
      <Sidebar onOpenWalkthrough={() => setIsWalkthroughOpen(true)} />

      <main className="flex min-w-0 flex-1 min-h-0 flex-col bg-[#221E2B]">
        <Topbar
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
          onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        />

        <div className="min-h-0 flex-1 overflow-y-auto p-6 scrollbar-thin">
          <Outlet />
        </div>
      </main>

      <OnboardingModal isOpen={isWalkthroughOpen} onClose={() => setIsWalkthroughOpen(false)} />
    </div>
  );
}

export default AppLayout;
