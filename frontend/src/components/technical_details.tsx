import { ChevronDown, Code, Terminal } from "lucide-react";
import { useState, type ReactNode } from "react";

interface TechnicalDetailsProps {
  title?: string;
  data?: Record<string, unknown> | null;
  children?: ReactNode;
  defaultOpen?: boolean;
}

export function TechnicalDetails({
  title = "Technical details",
  data,
  children,
  defaultOpen = false,
}: TechnicalDetailsProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mt-4 rounded-xl border border-[#5C5470]/50 bg-[#2A2438]/80 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-[#5C5470]/20 cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 text-xs font-medium text-[#B9B4C7]">
          <Terminal size={14} className="text-[#B9B4C7]" />
          <span>{title}</span>
          <span className="rounded-md bg-[#5C5470]/40 px-1.5 py-0.5 text-[10px] text-[#B9B4C7]">
            For experts & logs
          </span>
        </div>
        <ChevronDown
          size={14}
          className={`text-[#B9B4C7] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-[#5C5470]/40 p-4 font-mono text-[11px] text-[#B9B4C7] bg-[#1E1928]">
          {data && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#FAF0E6]/60">
                <Code size={12} />
                <span>Raw Telemetry & Evidence</span>
              </div>
              <pre className="max-h-60 overflow-x-auto rounded-lg bg-[#16121E] p-3 leading-relaxed text-[#FAF0E6]/90 scrollbar-thin">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  );
}

export default TechnicalDetails;
