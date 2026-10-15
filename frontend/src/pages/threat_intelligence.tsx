import { useState } from "react";
import { Search, ShieldAlert, BookOpen, AlertTriangle } from "lucide-react";
import { useThreatLookup } from "@/hooks";
import Card from "@/components/card";
import Badge from "@/components/badge";
import Button from "@/components/button";
import TechnicalDetails from "@/components/technical_details";
import Skeleton from "@/components/skeleton";

export function ThreatIntelligence() {
  const [searchInput, setSearchInput] = useState("verify-securepay-portal.com");
  const [activeQuery, setActiveQuery] = useState("verify-securepay-portal.com");

  const { data: threatData, isLoading, isError } = useThreatLookup(activeQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setActiveQuery(searchInput.trim());
    }
  };

  const handleSampleLookup = (sample: string) => {
    setSearchInput(sample);
    setActiveQuery(sample);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Search Header */}
      <Card className="p-6">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#FAF0E6]">Threat Lookup</h2>
          <p className="text-xs text-[#B9B4C7]">
            Check whether an address, web link, domain name, or file signature is recognized across
            global intelligence feeds.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-4 flex gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B9B4C7]"
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter a web address (e.g. verify-securepay-portal.com), IP, or file checksum..."
              className="w-full rounded-xl border border-[#5C5470]/50 bg-[#221E2B]/60 pl-10 pr-4 py-2.5 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/60 outline-none focus:border-[#B9B4C7]"
            />
          </div>

          <Button type="submit" variant="primary">
            <span>Check item</span>
          </Button>
        </form>

        {/* Quick sample chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] text-[#B9B4C7]">Try searching:</span>
          {["verify-securepay-portal.com", "194.26.29.112", "185.220.101.5"].map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => handleSampleLookup(sample)}
              className="rounded-lg border border-[#5C5470]/40 bg-[#221E2B]/40 px-2.5 py-1 text-[11px] font-mono text-[#FAF0E6] hover:bg-[#5C5470]/40 transition cursor-pointer"
            >
              {sample}
            </button>
          ))}
        </div>
      </Card>

      {/* Results Section */}
      {isLoading ? (
        <Card className="p-6 space-y-4">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full" />
        </Card>
      ) : isError || !threatData ? (
        <Card className="p-6 text-center text-[#FAF0E6]">
          <AlertTriangle size={28} className="mx-auto text-[#fb7185] mb-2" />
          <h3 className="text-sm font-semibold">Threat Lookup encountered an error</h3>
          <p className="mt-1 text-xs text-[#B9B4C7]">
            We could not reach one of our threat sources. Results may be temporarily unavailable.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Main Assessment Card */}
          <Card className="p-6 border-l-4 border-l-[#fb7185]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#5C5470]/40">
              <div className="flex items-center gap-2.5">
                <ShieldAlert size={20} className="text-[#fb7185]" />
                <div>
                  <h3 className="font-mono text-sm font-bold text-[#FAF0E6]">{threatData.query}</h3>
                  <p className="text-[11px] text-[#B9B4C7] uppercase">
                    Detected format: {threatData.detectedType}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    threatData.reputation === "malicious"
                      ? "critical"
                      : threatData.reputation === "suspicious"
                        ? "high"
                        : "safe"
                  }
                  showDot
                >
                  {threatData.reputation.toUpperCase()}
                </Badge>
                <Badge variant="subtle">
                  How sure we are: High ({Math.round(threatData.confidenceScore * 100)}%)
                </Badge>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF0E6]">
                  Plain-Language Summary
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#FAF0E6]">
                  {threatData.plainSummary}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 p-4 text-xs">
                <div>
                  <span className="text-[#B9B4C7]">First recorded:</span>
                  <p className="font-semibold text-[#FAF0E6] mt-0.5">{threatData.firstSeen}</p>
                </div>
                <div>
                  <span className="text-[#B9B4C7]">Last observed:</span>
                  <p className="font-semibold text-[#FAF0E6] mt-0.5">{threatData.lastSeen}</p>
                </div>
              </div>

              {/* Citations */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B9B4C7]">
                  Where this comes from
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {threatData.sourceCitations.map((citation) => (
                    <span
                      key={citation}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#5C5470]/40 bg-[#352F44] px-2.5 py-1 text-xs text-[#FAF0E6]"
                    >
                      <BookOpen size={12} className="text-[#B9B4C7]" />
                      <span>{citation}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* How the attack works (Plain language MITRE ATT&CK translation) */}
          <Card className="p-6">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#FAF0E6]">How the attack works</h3>
              <p className="text-xs text-[#B9B4C7]">
                Plain-language breakdown of attacker tactics and behaviors
              </p>
            </div>

            <div className="space-y-3">
              {threatData.howAttackWorks.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 p-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-[#5C5470]/60 px-2 py-0.5 text-[10px] font-semibold text-[#FAF0E6] uppercase">
                      {item.tactic}
                    </span>
                    <h4 className="text-xs font-bold text-[#FAF0E6]">{item.technique}</h4>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#B9B4C7]">{item.explanation}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Technical Details panel */}
          <TechnicalDetails
            title="Technical details (resolution, ASN, and raw score)"
            data={threatData.technicalDetails}
          />
        </div>
      )}
    </div>
  );
}

export default ThreatIntelligence;
