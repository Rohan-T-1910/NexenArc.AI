import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronRight, Sparkles, X, ShieldAlert, FileSearch } from "lucide-react";
import Button from "./button";
import ArcLogo from "./arc_logo";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    step: 1,
    icon: Sparkles,
    title: "Welcome to NexenArc",
    subtitle: "Security investigations made plain and effortless.",
    description:
      "When something suspicious lands in your inbox or network, NexenArc answers three simple questions right away: What happened? How serious is it? What should I do next?",
  },
  {
    step: 2,
    icon: FileSearch,
    title: "Paste or drop anything suspicious",
    subtitle: "Smart intake with zero configuration.",
    description:
      "No complex forms. Simply drop an email, paste a web address, IP, file hash, or log snippet. NexenArc auto-detects the format and organizes your assessment immediately.",
  },
  {
    step: 3,
    icon: ShieldAlert,
    title: "Clear, plain-language answers",
    subtitle: "No engineering jargon in your way.",
    description:
      "Review straightforward action plans your team can execute in seconds. Full technical evidence and raw data always remain available under 'Technical details' whenever you need them.",
  },
];

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const current = steps[currentStepIndex];
  const Icon = current.icon;

  const handleSampleClick = () => {
    onClose();
    navigate("/active-investigation");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-[#5C5470]/60 bg-[#352F44] p-6 shadow-2xl text-[#FAF0E6]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#B9B4C7] hover:bg-[#5C5470]/40 hover:text-[#FAF0E6] transition cursor-pointer"
          aria-label="Close walkthrough"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <ArcLogo size={32} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B9B4C7]">
                Step {current.step} of 3
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#FAF0E6]">{current.title}</h2>
          </div>
        </div>

        {/* Step Content */}
        <div className="mt-5 rounded-xl border border-[#5C5470]/40 bg-[#221E2B]/50 p-5">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5C5470]/40 text-[#FAF0E6]">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#FAF0E6]">{current.subtitle}</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#B9B4C7]">{current.description}</p>
            </div>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === currentStepIndex ? "w-6 bg-[#FAF0E6]" : "w-2 bg-[#5C5470]"
                }`}
                aria-label={`Go to step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {currentStepIndex < steps.length - 1 ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setCurrentStepIndex((prev) => prev + 1)}
              >
                <span>Next</span>
                <ChevronRight size={14} />
              </Button>
            ) : (
              <Button size="sm" variant="secondary" onClick={onClose}>
                <CheckCircle2 size={14} />
                <span>Got it</span>
              </Button>
            )}

            <Button size="sm" variant="primary" onClick={handleSampleClick}>
              Try a sample investigation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingModal;
