import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User as UserIcon,
  CheckCircle2,
  Zap,
  Radar,
  Eye,
  EyeOff,
  ChevronRight,
  Bot,
} from "lucide-react";
import ArcLogo from "../components/arc_logo";

type AuthMode = "login" | "signup";

interface DemoAccount {
  name: string;
  role: string;
  email: string;
  badgeColor: string;
  avatar: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    name: "Morgan Vance",
    role: "Incident Analyst",
    email: "analyst@nexenarc.internal",
    badgeColor: "bg-[#34d399]/15 text-[#34d399] border-[#34d399]/30",
    avatar: "MV",
  },
  {
    name: "System Administrator",
    role: "Platform Admin",
    email: "admin@nexenarc.internal",
    badgeColor: "bg-[#fb923c]/15 text-[#fb923c] border-[#fb923c]/30",
    avatar: "SA",
  },
  {
    name: "Alex Auditor",
    role: "Auditor & Viewer",
    email: "viewer@nexenarc.internal",
    badgeColor: "bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30",
    avatar: "AA",
  },
];

export function HeroPage() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("analyst@nexenarc.internal");
  const [password, setPassword] = useState("AnalystPassword123!");
  const [fullName, setFullName] = useState("Morgan Vance");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSelectAccount = (account: DemoAccount) => {
    setEmail(account.email);
    setFullName(account.name);
    setPassword(
      account.role.includes("Admin")
        ? "AdminPassword123!"
        : account.role.includes("Analyst")
          ? "AnalystPassword123!"
          : "ViewerPassword123!"
    );
    setStatusMessage(`Autofilled demo account for ${account.name} (${account.role})`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Persist active session in localStorage for demo state
    const userRole = email.includes("admin")
      ? "admin"
      : email.includes("viewer")
        ? "viewer"
        : "analyst";

    localStorage.setItem(
      "nexenarc_user",
      JSON.stringify({
        email,
        name: authMode === "signup" ? fullName : fullName || "Morgan Vance",
        role: userRole,
      })
    );

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#221E2B] text-[#FAF0E6] selection:bg-[#FAF0E6]/20">
      {/* Dynamic Ambient Radiant Halos */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#5C5470]/30 via-[#352F44]/20 to-transparent blur-[140px]" />
      <div className="pointer-events-none absolute top-1/4 -right-40 h-[450px] w-[500px] rounded-full bg-[#fb7185]/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[450px] w-[500px] rounded-full bg-[#38bdf8]/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-[400px] w-[600px] rounded-full bg-[#34d399]/5 blur-[140px]" />

      {/* Subtle Arc Grid Backdrop Lines */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="arc-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FAF0E6" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arc-grid)" />
      </svg>

      {/* Floating Glassmorphic Top Navigation */}
      <header className="relative z-30 mx-auto max-w-7xl px-6 pt-6">
        <nav className="flex items-center justify-between rounded-2xl border border-[#FAF0E6]/10 bg-[#352F44]/40 px-5 py-3.5 backdrop-blur-xl shadow-lg shadow-black/20">
          <div className="flex items-center gap-3">
            <ArcLogo size={32} />
            <div>
              <span className="text-base font-bold tracking-tight text-[#FAF0E6]">NexenArc</span>
              <span className="ml-2 hidden rounded-md border border-[#FAF0E6]/15 bg-[#FAF0E6]/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-[#B9B4C7] sm:inline-block">
                AI Cyber Swarm
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm text-[#B9B4C7] md:flex">
            <a href="#features" className="transition hover:text-[#FAF0E6]">
              Platform Capabilities
            </a>
            <a href="#specialists" className="transition hover:text-[#FAF0E6]">
              Your AI Team
            </a>
            <button
              type="button"
              onClick={() => navigate("/active-investigation")}
              className="flex items-center gap-1.5 transition hover:text-[#FAF0E6] cursor-pointer"
            >
              <Sparkles size={14} className="text-[#fb923c]" />
              <span>Live Case Walkthrough</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-3 py-1 text-xs font-medium text-[#34d399] lg:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#34d399]" />
              </span>
              <span>5 Agents Active</span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-1.5 rounded-xl border border-[#FAF0E6]/20 bg-[#FAF0E6]/10 px-4 py-2 text-xs font-semibold text-[#FAF0E6] backdrop-blur-md transition hover:bg-[#FAF0E6]/20 hover:border-[#FAF0E6]/30 cursor-pointer"
            >
              <span>Explore Demo</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </nav>
      </header>

      {/* Main Hero & Glassmorphic Auth Section */}
      <main className="relative z-20 mx-auto max-w-7xl px-6 pt-12 pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Hero Copy & Value Propositions */}
          <div className="lg:col-span-7 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FAF0E6]/15 bg-[#352F44]/50 px-3.5 py-1.5 text-xs text-[#FAF0E6] backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[#fb7185]" />
              <span className="font-medium text-[#B9B4C7]">
                Autonomous Cyber Investigation Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[#FAF0E6] sm:text-5xl lg:text-6xl leading-[1.12]">
              Security Investigations In{" "}
              <span className="bg-gradient-to-r from-[#FAF0E6] via-[#B9B4C7] to-[#FAF0E6]/70 bg-clip-text text-transparent">
                Plain Language.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-2xl text-base text-[#B9B4C7] sm:text-lg leading-relaxed">
              When suspicious links, phishing messages, or anomalies surface, our specialist AI
              swarm conducts deep correlation, indicator analysis, and risk scoring in
              seconds—giving your team straight answers to{" "}
              <span className="text-[#FAF0E6] font-medium">what happened</span>,{" "}
              <span className="text-[#FAF0E6] font-medium">how serious it is</span>, and{" "}
              <span className="text-[#FAF0E6] font-medium">what to do next</span>.
            </p>

            {/* Quick Value Metrics with Glass Accents */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#352F44]/30 p-4 backdrop-blur-md">
                <p className="text-2xl font-bold text-[#FAF0E6]">Under 2m</p>
                <p className="mt-1 text-xs text-[#B9B4C7]">Average full triage</p>
              </div>
              <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#352F44]/30 p-4 backdrop-blur-md">
                <p className="text-2xl font-bold text-[#34d399]">0 Jargon</p>
                <p className="mt-1 text-xs text-[#B9B4C7]">Plain-language answers</p>
              </div>
              <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#352F44]/30 p-4 backdrop-blur-md">
                <p className="text-2xl font-bold text-[#fb923c]">5 Specialists</p>
                <p className="mt-1 text-xs text-[#B9B4C7]">Collaborating in parallel</p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/active-investigation")}
                className="group relative flex items-center gap-2 rounded-2xl border border-[#FAF0E6]/30 bg-gradient-to-r from-[#FAF0E6] to-[#FAF0E6]/90 px-6 py-3.5 text-sm font-bold text-[#221E2B] shadow-lg shadow-[#FAF0E6]/10 transition hover:shadow-xl hover:shadow-[#FAF0E6]/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles size={16} className="text-[#221E2B]" />
                <span>Try Sample Investigation</span>
                <ChevronRight size={16} className="transition group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 rounded-2xl border border-[#FAF0E6]/15 bg-[#352F44]/40 px-6 py-3.5 text-sm font-semibold text-[#FAF0E6] backdrop-blur-md transition hover:bg-[#352F44]/70 hover:border-[#FAF0E6]/30 cursor-pointer"
              >
                <span>Browse Live Workspace</span>
                <ArrowRight size={15} className="text-[#B9B4C7]" />
              </button>
            </div>
          </div>

          {/* Right Column: Glassmorphic Authentication Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Outer Glow Ring */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-[#FAF0E6]/20 via-[#5C5470]/30 to-[#FAF0E6]/10 blur-xl opacity-70" />

              {/* Main Glass Card */}
              <div className="relative rounded-[28px] border border-[#FAF0E6]/20 bg-[#352F44]/65 p-7 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/40">
                {/* Specular Edge Highlight */}
                <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#FAF0E6]/50 to-transparent" />

                {/* Card Header & Tab Switcher */}
                <div className="flex items-center justify-between border-b border-[#FAF0E6]/10 pb-5">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-[#FAF0E6]">
                      {authMode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#B9B4C7]">
                      {authMode === "login"
                        ? "Enter your workspace or select a demo account"
                        : "Join NexenArc security workspace"}
                    </p>
                  </div>

                  {/* Auth Mode Toggle Pill */}
                  <div className="flex rounded-xl border border-[#FAF0E6]/15 bg-[#221E2B]/60 p-1">
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                        authMode === "login"
                          ? "bg-[#FAF0E6] text-[#221E2B] shadow-sm"
                          : "text-[#B9B4C7] hover:text-[#FAF0E6]"
                      }`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className={`rounded-lg px-3 py-1 text-xs font-semibold transition cursor-pointer ${
                        authMode === "signup"
                          ? "bg-[#FAF0E6] text-[#221E2B] shadow-sm"
                          : "text-[#B9B4C7] hover:text-[#FAF0E6]"
                      }`}
                    >
                      Signup
                    </button>
                  </div>
                </div>

                {/* Quick-Pick Demo Persona Selector */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B9B4C7]/80">
                      1-Click Demo Profiles
                    </span>
                    <span className="text-[10px] text-[#34d399] font-medium">Ready to test</span>
                  </div>

                  <div className="mt-2.5 grid grid-cols-3 gap-2">
                    {DEMO_ACCOUNTS.map((acc) => (
                      <button
                        key={acc.email}
                        type="button"
                        onClick={() => handleSelectAccount(acc)}
                        className={`group flex flex-col items-center rounded-xl border p-2.5 text-center transition cursor-pointer ${
                          email === acc.email
                            ? "border-[#FAF0E6]/40 bg-[#FAF0E6]/10 shadow-sm"
                            : "border-[#FAF0E6]/10 bg-[#221E2B]/40 hover:bg-[#FAF0E6]/5 hover:border-[#FAF0E6]/25"
                        }`}
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#5C5470]/60 text-xs font-bold text-[#FAF0E6]">
                          {acc.avatar}
                        </div>
                        <p className="mt-1.5 text-[11px] font-semibold text-[#FAF0E6] truncate w-full">
                          {acc.name.split(" ")[0]}
                        </p>
                        <p className="text-[9px] text-[#B9B4C7] truncate w-full">
                          {acc.role.split(" ")[0]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Toast */}
                {statusMessage && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#34d399]/30 bg-[#34d399]/10 px-3 py-2 text-xs text-[#34d399]">
                    <CheckCircle2 size={14} />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {/* Interactive Form */}
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  {authMode === "signup" && (
                    <div>
                      <label className="block text-xs font-medium text-[#B9B4C7] mb-1.5">
                        Full Name
                      </label>
                      <div className="relative">
                        <UserIcon
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B9B4C7]"
                        />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Morgan Vance"
                          className="w-full rounded-xl border border-[#FAF0E6]/15 bg-[#221E2B]/50 pl-10 pr-4 py-2.5 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/50 backdrop-blur-sm transition focus:border-[#FAF0E6]/40 focus:outline-none focus:ring-1 focus:ring-[#FAF0E6]/30"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-[#B9B4C7] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B9B4C7]"
                      />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="analyst@nexenarc.internal"
                        className="w-full rounded-xl border border-[#FAF0E6]/15 bg-[#221E2B]/50 pl-10 pr-4 py-2.5 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/50 backdrop-blur-sm transition focus:border-[#FAF0E6]/40 focus:outline-none focus:ring-1 focus:ring-[#FAF0E6]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-medium text-[#B9B4C7]">Password</label>
                      {authMode === "login" && (
                        <span className="text-[10px] text-[#B9B4C7]/80 hover:text-[#FAF0E6] transition cursor-pointer">
                          Forgot password?
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B9B4C7]"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full rounded-xl border border-[#FAF0E6]/15 bg-[#221E2B]/50 pl-10 pr-10 py-2.5 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/50 backdrop-blur-sm transition focus:border-[#FAF0E6]/40 focus:outline-none focus:ring-1 focus:ring-[#FAF0E6]/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#B9B4C7] hover:text-[#FAF0E6] transition cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button with Loading State */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl border border-[#FAF0E6]/30 bg-[#FAF0E6] py-3 text-xs font-bold text-[#221E2B] shadow-lg shadow-[#FAF0E6]/10 transition hover:bg-[#FAF0E6]/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#221E2B] border-t-transparent" />
                        <span>Authenticating...</span>
                      </span>
                    ) : (
                      <>
                        <span>
                          {authMode === "login" ? "Sign In to Workspace" : "Create Account & Enter"}
                        </span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>

                {/* Guest Direct Entry Option */}
                <div className="mt-5 border-t border-[#FAF0E6]/10 pt-4 text-center">
                  <p className="text-xs text-[#B9B4C7]">
                    Just browsing?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="font-semibold text-[#FAF0E6] underline underline-offset-2 hover:text-[#FAF0E6]/80 transition cursor-pointer"
                    >
                      Enter without signing in
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid with Glassmorphism */}
        <section id="features" className="mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#B9B4C7]">
              Engineered for Modern Security Teams
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF0E6]">
              Clear Conclusions, Not Firehoses of Raw Logs
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative rounded-3xl border border-[#FAF0E6]/10 bg-[#352F44]/30 p-7 backdrop-blur-xl transition hover:border-[#FAF0E6]/25 hover:bg-[#352F44]/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38bdf8]/30 bg-[#38bdf8]/10 text-[#38bdf8]">
                <Zap size={22} />
              </div>
              <h3 className="mt-5 text-base font-bold text-[#FAF0E6]">
                Plain-Language Diagnostics
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B9B4C7]">
                Forget wading through raw hex dumps or cryptic SIEM queries. NexenArc translates
                complex telemetry into direct, plain-language answers for immediate stakeholder
                clarity.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#38bdf8]">
                <span>Read sample verdict</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative rounded-3xl border border-[#FAF0E6]/10 bg-[#352F44]/30 p-7 backdrop-blur-xl transition hover:border-[#FAF0E6]/25 hover:bg-[#352F44]/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#fb923c]/30 bg-[#fb923c]/10 text-[#fb923c]">
                <Bot size={22} />
              </div>
              <h3 className="mt-5 text-base font-bold text-[#FAF0E6]">
                Multi-Agent Specialist Swarm
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B9B4C7]">
                Five purpose-built AI agents collaborate in parallel: Triage categorizes the clue,
                Indicator Analysis unpacks addresses, Threat Intelligence enriches feeds, and Report
                Agent compiles the briefing.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#fb923c]">
                <span>Meet the team</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative rounded-3xl border border-[#FAF0E6]/10 bg-[#352F44]/30 p-7 backdrop-blur-xl transition hover:border-[#FAF0E6]/25 hover:bg-[#352F44]/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#34d399]/30 bg-[#34d399]/10 text-[#34d399]">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-5 text-base font-bold text-[#FAF0E6]">Prescriptive Next Steps</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B9B4C7]">
                Every completed investigation finishes with concrete, priority-ranked containment
                steps—from perimeter firewall rules to email gateway blocklists and password resets.
              </p>
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#34d399]">
                <span>Explore containment</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* Specialists Roster Preview Section */}
        <section
          id="specialists"
          className="mt-28 rounded-3xl border border-[#FAF0E6]/15 bg-[#352F44]/40 p-8 sm:p-12 backdrop-blur-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-[#FAF0E6]/10 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FAF0E6]/15 bg-[#221E2B]/50 px-3 py-1 text-xs text-[#B9B4C7]">
                <Radar size={13} className="text-[#34d399]" />
                <span>Autonomous Coordination</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF0E6]">
                Meet Your 24/7 Specialist Team
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#B9B4C7] max-w-xl">
                Each agent has a dedicated responsibility and communicates in plain terms without
                technical confusion.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/ai-agents")}
              className="flex items-center gap-2 rounded-xl border border-[#FAF0E6]/20 bg-[#FAF0E6]/10 px-4 py-2.5 text-xs font-semibold text-[#FAF0E6] transition hover:bg-[#FAF0E6]/20 cursor-pointer self-start md:self-auto"
            >
              <span>View Full AI Roster</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#221E2B]/40 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FAF0E6]">Quick Assessment</span>
                <span className="rounded-full bg-[#34d399]/15 px-2 py-0.5 text-[10px] font-medium text-[#34d399]">
                  Triage
                </span>
              </div>
              <p className="mt-2 text-xs text-[#B9B4C7]">
                Inspects incoming clues, figures out the source format, and establishes immediate
                severity.
              </p>
            </div>

            <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#221E2B]/40 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FAF0E6]">Suspicious Items</span>
                <span className="rounded-full bg-[#fb923c]/15 px-2 py-0.5 text-[10px] font-medium text-[#fb923c]">
                  Indicators
                </span>
              </div>
              <p className="mt-2 text-xs text-[#B9B4C7]">
                Pulls apart addresses, links, and file signatures to uncover hidden anomalies.
              </p>
            </div>

            <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#221E2B]/40 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FAF0E6]">Known-Threat Check</span>
                <span className="rounded-full bg-[#fb7185]/15 px-2 py-0.5 text-[10px] font-medium text-[#fb7185]">
                  Intelligence
                </span>
              </div>
              <p className="mt-2 text-xs text-[#B9B4C7]">
                Cross-references suspicious items with global threat databases and defense feeds.
              </p>
            </div>

            <div className="rounded-2xl border border-[#FAF0E6]/10 bg-[#221E2B]/40 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FAF0E6]">Writing Your Report</span>
                <span className="rounded-full bg-[#38bdf8]/15 px-2 py-0.5 text-[10px] font-medium text-[#38bdf8]">
                  Synthesis
                </span>
              </div>
              <p className="mt-2 text-xs text-[#B9B4C7]">
                Compiles plain-language explanations, danger levels, and next steps for your team.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-[#FAF0E6]/10 bg-[#221E2B]/80 px-6 py-8 text-center text-xs text-[#B9B4C7] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <ArcLogo size={20} />
            <span className="font-semibold text-[#FAF0E6]">NexenArc</span>
            <span>— Cybersecurity Investigation Platform</span>
          </div>
          <p>© 2026 NexenArc. Plain-language autonomous cyber defense.</p>
        </div>
      </footer>
    </div>
  );
}

export default HeroPage;
