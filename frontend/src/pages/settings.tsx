import { useState } from "react";
import { User, Key, Cpu, Palette, CheckCircle2 } from "lucide-react";
import Card from "@/components/card";
import Button from "@/components/button";
import Badge from "@/components/badge";

export function Settings() {
  const [selectedProvider, setSelectedProvider] = useState("auto");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card className="p-6">
        <h2 className="text-base font-bold text-[#FAF0E6]">System Settings</h2>
        <p className="text-xs text-[#B9B4C7]">
          Configure your user profile, external defense feed connections, and assistant preferences.
        </p>
      </Card>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile */}
        <Card className="p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#5C5470]/40">
            <User size={18} className="text-[#FAF0E6]" />
            <h3 className="text-sm font-bold text-[#FAF0E6]">User Profile</h3>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs">
            <div>
              <label className="block text-xs font-semibold text-[#B9B4C7] mb-1">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Morgan Vance"
                className="w-full rounded-xl border border-[#5C5470]/50 bg-[#221E2B]/60 px-3.5 py-2.5 text-xs text-[#FAF0E6] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#B9B4C7] mb-1">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="analyst@nexenarc.internal"
                disabled
                className="w-full rounded-xl border border-[#5C5470]/30 bg-[#221E2B]/40 px-3.5 py-2.5 text-xs text-[#B9B4C7] outline-none"
              />
            </div>
          </div>
        </Card>

        {/* AI Assistant Provider Selection (Glossary: "AI assistant") */}
        <Card className="p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#5C5470]/40">
            <Cpu size={18} className="text-[#FAF0E6]" />
            <h3 className="text-sm font-bold text-[#FAF0E6]">AI Assistant Provider</h3>
          </div>

          <div className="mt-4 space-y-2.5">
            {[
              {
                id: "auto",
                label: "Automatic Intelligent Routing (Recommended)",
                desc: "Selects the optimal engine based on case complexity and task type.",
              },
              {
                id: "fast",
                label: "Fast Response Mode",
                desc: "Optimized for minimal latency on high-volume alerts.",
              },
              {
                id: "deep",
                label: "In-Depth Reasoning Mode",
                desc: "Applies multi-step verification checks for complex multi-source incidents.",
              },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-3 rounded-xl border p-3.5 transition cursor-pointer text-xs ${
                  selectedProvider === opt.id
                    ? "border-[#FAF0E6] bg-[#5C5470]/40 text-[#FAF0E6]"
                    : "border-[#5C5470]/40 bg-[#221E2B]/40 text-[#B9B4C7] hover:border-[#5C5470]"
                }`}
              >
                <input
                  type="radio"
                  name="provider"
                  value={opt.id}
                  checked={selectedProvider === opt.id}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="mt-0.5 text-[#FAF0E6] focus:ring-0 cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-[#FAF0E6]">{opt.label}</p>
                  <p className="mt-0.5 text-[11px] text-[#B9B4C7]">{opt.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Threat Intelligence Feed Connections */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#5C5470]/40">
            <div className="flex items-center gap-2">
              <Key size={18} className="text-[#FAF0E6]" />
              <h3 className="text-sm font-bold text-[#FAF0E6]">External Threat Feeds</h3>
            </div>
            <Badge variant="safe">Mock Provider Active</Badge>
          </div>

          <div className="mt-4 space-y-3 text-xs">
            {["VirusTotal Feed", "AbuseIPDB Gateway", "AlienVault OTX Pulse"].map((feed) => (
              <div
                key={feed}
                className="flex items-center justify-between rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/40 p-3.5"
              >
                <div>
                  <p className="font-semibold text-[#FAF0E6]">{feed}</p>
                  <p className="text-[11px] text-[#B9B4C7]">
                    Simulated in Phase 1 & 2 · Real integration ships in Phase 6
                  </p>
                </div>
                <Badge variant="subtle">Connected</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Theme Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-2 pb-4 border-b border-[#5C5470]/40">
            <Palette size={18} className="text-[#FAF0E6]" />
            <h3 className="text-sm font-bold text-[#FAF0E6]">Interface Theme</h3>
          </div>

          <div className="mt-4 flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-xl border border-[#FAF0E6] bg-[#352F44] p-3 text-[#FAF0E6]">
              <div className="flex gap-1">
                <span className="h-4 w-4 rounded-full bg-[#352F44] border border-[#5C5470]" />
                <span className="h-4 w-4 rounded-full bg-[#5C5470]" />
                <span className="h-4 w-4 rounded-full bg-[#B9B4C7]" />
                <span className="h-4 w-4 rounded-full bg-[#FAF0E6]" />
              </div>
              <span className="font-medium">Slate Violet & Linen (Active)</span>
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-between pt-2">
          {isSaved ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#34d399] font-medium">
              <CheckCircle2 size={14} />
              <span>Preferences saved successfully.</span>
            </span>
          ) : (
            <span />
          )}

          <Button type="submit" variant="primary">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
