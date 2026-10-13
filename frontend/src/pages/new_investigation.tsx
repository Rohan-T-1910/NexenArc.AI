import { useState } from "react";
import {
  Mail,
  Link2,
  FileText,
  Bug,
  ScrollText,
  Shield,
  ChevronDown,
} from "lucide-react";

const investigationTypes = [
  {
    id: "email",
    title: "Suspicious Email",
    description: "Headers, sender reputation, phishing intent",
    icon: Mail,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    iconBorder: "border-blue-500/20",
  },
  {
    id: "url",
    title: "URL",
    description: "Domain age, redirects, live sandbox detonation",
    icon: Link2,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
    iconBorder: "border-cyan-500/20",
  },
  {
    id: "file",
    title: "File Upload",
    description: "Documents, archives, scripts and binaries",
    icon: FileText,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
  },
  {
    id: "malware",
    title: "Malware Sample",
    description: "Detonation in isolated sandbox, YARA matching",
    icon: Bug,
    iconColor: "text-red-400",
    iconBg: "bg-red-500/10",
    iconBorder: "border-red-500/20",
  },
  {
    id: "log",
    title: "Security Log",
    description: "SIEM exports, EDR telemetry, auth trails",
    icon: ScrollText,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10",
    iconBorder: "border-amber-500/20",
  },
  {
    id: "cve",
    title: "CVE ID",
    description: "Exploitability, exposure mapping, patch status",
    icon: Shield,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    iconBorder: "border-emerald-500/20",
  },
];

function NewInvestigation() {
  const [selectedType, setSelectedType] = useState("email");
  const [priority, setPriority] = useState("medium");
  const [deepScan, setDeepScan] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
      {/* Left Column: Investigation Type Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1016] p-6 h-fit">
        <h2 className="text-sm font-semibold text-white">
          Investigation type
        </h2>
        <p className="mt-1 text-xs text-gray-400 mb-5">
          Choose what you are handing over to the agent mesh.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {investigationTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedType === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`rounded-xl border p-4 text-left transition cursor-pointer relative ${
                  isSelected
                    ? "border-blue-500/80 bg-blue-500/[0.04] shadow-[0_0_15px_rgba(59,130,246,0.12)]"
                    : "border-white/5 bg-[#080a0f] hover:border-white/15"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border ${type.iconBg} ${type.iconBorder} ${type.iconColor}`}
                >
                  <Icon size={16} />
                </div>

                <h3 className="mt-3.5 text-sm font-semibold text-white">
                  {type.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-400">
                  {type.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Column: Triage Options Card */}
      <div className="rounded-2xl border border-white/10 bg-[#0d1016] p-5 h-fit">
        <h2 className="text-sm font-semibold text-white">
          Triage options
        </h2>

        {/* Priority Select */}
        <div className="mt-4">
          <label className="block text-xs text-gray-400 mb-2">
            Priority
          </label>
          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#080a0f] px-3.5 py-2.5 text-xs text-gray-200 outline-none focus:border-blue-500 transition cursor-pointer"
            >
              <option value="low">Low — routine triage</option>
              <option value="medium">Medium — standard SLA</option>
              <option value="high">High — escalate to tier 2</option>
              <option value="critical">Critical — page on call</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Deep Sandbox Scan Box */}
        <div className="mt-4 rounded-xl border border-white/10 bg-[#080a0f] p-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white">
              Deep sandbox scan
            </h3>
            <button
              type="button"
              onClick={() => setDeepScan(!deepScan)}
              className={`relative h-5 w-9 rounded-full transition-colors cursor-pointer ${
                deepScan ? "bg-blue-600" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                  deepScan ? "left-[18px]" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <p className="mt-1 text-[11px] leading-normal text-gray-500">
            Full detonation with behavioural capture. Adds ~4 min.
          </p>
        </div>

        {/* Agents Assigned Section */}
        <div className="mt-5">
          <h3 className="text-xs text-gray-400 mb-2.5">
            Agents assigned
          </h3>
          <div className="space-y-2">
            {[
              "Ingest & Parser",
              "Reputation Intel",
              "Sandbox Detonation",
              "Correlation & Verdict",
            ].map((agent) => (
              <div
                key={agent}
                className="flex items-center gap-2 text-xs text-gray-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>{agent}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Start Investigation Button */}
        <button
          type="button"
          className="mt-6 w-full rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-center text-xs font-semibold text-white transition shadow-[0_0_20px_rgba(37,99,235,0.25)] cursor-pointer"
        >
          Start Investigation
        </button>

        <p className="mt-3 text-center text-[11px] leading-4 text-gray-500">
          Evidence is encrypted at rest and retained for 90 days.
        </p>
      </div>
    </div>
  );
}

export default NewInvestigation;