import { useState, useId } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  Link2,
  Globe,
  Mail,
  FileCode,
  FileText,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { useCreateInvestigation } from "@/hooks";
import Card from "@/components/card";
import Button from "@/components/button";
import type { InvestigationPriority } from "@/types";

export function NewInvestigation() {
  const navigate = useNavigate();
  const createMutation = useCreateInvestigation();

  const titleInputId = useId();
  const fileInputId = useId();
  const prioritySelectId = useId();
  const notesInputId = useId();

  const [inputContent, setInputContent] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [priority, setPriority] = useState<InvestigationPriority>("medium");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [referenceNotes, setReferenceNotes] = useState("");

  // Live format detection
  const trimmed = inputContent.trim();
  let detectedTypeLabel = "Waiting for input";
  let DetectedIcon = FileText;

  if (trimmed.length > 0) {
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      detectedTypeLabel = "Web address / Link";
      DetectedIcon = Link2;
    } else if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(trimmed)) {
      detectedTypeLabel = "Internet address (IP)";
      DetectedIcon = Globe;
    } else if (
      trimmed.includes("@") &&
      (trimmed.includes(".com") || trimmed.includes(".net") || trimmed.includes(".org"))
    ) {
      detectedTypeLabel = "Email address or message";
      DetectedIcon = Mail;
    } else if (/^[a-fA-F0-9]{32,64}$/.test(trimmed)) {
      detectedTypeLabel = "File signature / Hash";
      DetectedIcon = FileCode;
    } else if (trimmed.includes(":") || trimmed.toLowerCase().includes("log")) {
      detectedTypeLabel = "Security log snippet";
      DetectedIcon = FileText;
    } else {
      detectedTypeLabel = "Security clues";
      DetectedIcon = FileText;
    }
  }

  // Auto-generate title if user hasn't explicitly overridden it
  const defaultTitle =
    trimmed.length > 0
      ? `Investigation of suspicious ${detectedTypeLabel.toLowerCase()}`
      : "New Security Investigation";

  const effectiveTitle = customTitle.trim() || defaultTitle;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trimmed) return;

    await createMutation.mutateAsync({
      title: effectiveTitle,
      inputContent: trimmed,
      priority,
    });

    navigate("/active-investigation");
  };

  const handlePreFillSample = () => {
    setInputContent(
      "From: accounting-billing@verify-securepay-portal.com\nSubject: Overdue Invoice INV-8921\nPlease download your reconciliation statement from https://storage-verify-portal.top/invoice-8921.zip"
    );
    setCustomTitle("Suspicious payment invoice email with external download link");
    setPriority("high");
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setInputContent(`Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      setCustomTitle(`Inspection of uploaded file: ${file.name}`);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setInputContent(`Uploaded file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      setCustomTitle(`Inspection of uploaded file: ${file.name}`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#5C5470]/50 bg-[#352F44] p-5">
        <div>
          <h2 className="text-base font-bold text-[#FAF0E6]">Start a New Investigation</h2>
          <p className="mt-0.5 text-xs text-[#B9B4C7]">
            Drop any suspicious clue. We automatically categorize the format and prepare the
            assessment.
          </p>
        </div>

        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={handlePreFillSample}
          className="w-fit"
        >
          <Sparkles size={14} className="text-[#FAF0E6]" />
          <span>Fill with sample data</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-6">
          {/* Smart Intake Area */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="smart-input"
                className="text-xs font-semibold uppercase tracking-wider text-[#FAF0E6]"
              >
                Suspicious Input (Text or File)
              </label>

              {trimmed.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#FAF0E6]">
                  <DetectedIcon size={14} className="text-[#FAF0E6]" />
                  <span>Detected: {detectedTypeLabel}</span>
                </div>
              )}
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              className="relative rounded-2xl border-2 border-dashed border-[#5C5470]/60 bg-[#221E2B]/60 p-4 transition focus-within:border-[#B9B4C7] focus-within:bg-[#221E2B]"
            >
              <textarea
                id="smart-input"
                rows={6}
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
                placeholder="Paste an email body, web address, IP address, file checksum, or log lines here... or drag and drop a file directly into this area."
                className="w-full resize-none bg-transparent text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/60 outline-none leading-relaxed"
                required
              />

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#5C5470]/40 pt-3">
                <label
                  htmlFor={fileInputId}
                  className="flex items-center gap-2 rounded-xl border border-[#5C5470]/50 bg-[#352F44] px-3 py-1.5 text-xs text-[#B9B4C7] hover:bg-[#5C5470]/40 hover:text-[#FAF0E6] transition cursor-pointer"
                >
                  <Upload size={13} />
                  <span>Attach file</span>
                  <input
                    id={fileInputId}
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>

                <p className="text-[11px] text-[#B9B4C7]">
                  Evidence is encrypted at rest. Files are never executed.
                </p>
              </div>
            </div>
          </div>

          {/* Title Field (Editable, auto-generated) */}
          <div className="mt-5 space-y-1.5">
            <label
              htmlFor={titleInputId}
              className="text-xs font-semibold uppercase tracking-wider text-[#B9B4C7]"
            >
              Case Title (Auto-suggested)
            </label>
            <input
              id={titleInputId}
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder={defaultTitle}
              className="w-full rounded-xl border border-[#5C5470]/50 bg-[#221E2B]/60 px-4 py-2.5 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/60 outline-none focus:border-[#B9B4C7]"
            />
          </div>

          {/* More Options Disclosure */}
          <div className="mt-5 border-t border-[#5C5470]/40 pt-4">
            <button
              type="button"
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className="flex items-center gap-2 text-xs font-medium text-[#B9B4C7] hover:text-[#FAF0E6] transition cursor-pointer"
            >
              <ChevronDown
                size={14}
                className={`transition-transform ${showMoreOptions ? "rotate-180" : ""}`}
              />
              <span>More options (Priority & Reference notes)</span>
            </button>

            {showMoreOptions && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/40 p-4">
                <div>
                  <label
                    htmlFor={prioritySelectId}
                    className="block text-xs font-medium text-[#B9B4C7] mb-1.5"
                  >
                    Urgency Level
                  </label>
                  <select
                    id={prioritySelectId}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as InvestigationPriority)}
                    className="w-full rounded-xl border border-[#5C5470]/50 bg-[#352F44] px-3 py-2 text-xs text-[#FAF0E6] outline-none focus:border-[#B9B4C7] cursor-pointer"
                  >
                    <option value="low">Low — Routine check</option>
                    <option value="medium">Medium — Standard assessment</option>
                    <option value="high">High — Prompt attention requested</option>
                    <option value="critical">Critical — Immediate response</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor={notesInputId}
                    className="block text-xs font-medium text-[#B9B4C7] mb-1.5"
                  >
                    Reference Notes (Optional)
                  </label>
                  <input
                    id={notesInputId}
                    type="text"
                    value={referenceNotes}
                    onChange={(e) => setReferenceNotes(e.target.value)}
                    placeholder="e.g. Reported by Finance department"
                    className="w-full rounded-xl border border-[#5C5470]/50 bg-[#352F44] px-3 py-2 text-xs text-[#FAF0E6] placeholder-[#B9B4C7]/60 outline-none focus:border-[#B9B4C7]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#5C5470]/40 pt-5">
            <div className="flex items-center gap-2 text-xs text-[#B9B4C7]">
              <ShieldAlert size={15} className="text-[#FAF0E6]" />
              <span>Full confidentiality guaranteed across all indicators</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                isLoading={createMutation.isPending}
                disabled={!trimmed}
                className="w-full sm:w-auto"
              >
                <span>Start Investigation</span>
                <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </Card>
      </form>

      {/* Instant Help Box */}
      <div className="rounded-2xl border border-[#5C5470]/40 bg-[#352F44]/50 p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FAF0E6]">
          What happens when you click Start?
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-[#B9B4C7]">
          <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/40 p-3">
            <p className="font-semibold text-[#FAF0E6]">1. Quick Assessment</p>
            <p className="mt-1 text-[11px] leading-relaxed">
              We classify what you provided and set the immediate plan.
            </p>
          </div>
          <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/40 p-3">
            <p className="font-semibold text-[#FAF0E6]">2. Checking Suspicious Items</p>
            <p className="mt-1 text-[11px] leading-relaxed">
              We look up all addresses and links against known threat databases.
            </p>
          </div>
          <div className="rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/40 p-3">
            <p className="font-semibold text-[#FAF0E6]">3. Plain Answers</p>
            <p className="mt-1 text-[11px] leading-relaxed">
              You receive a concise outcome telling you what happened and what to do next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewInvestigation;
