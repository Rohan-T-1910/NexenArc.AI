# NexenArc Design System

> **Philosophy:** Effortless cybersecurity intelligence. Calm, authoritative, and human-friendly.

---

## 1. Color Palette

The visual identity uses a distinctive slate-violet and warm-linen palette that avoids generic neon-hacker clichés while retaining high authority and WCAG AA contrast.

### Core Brand Tokens

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--color-surface-base` | `#262132` | Background Base | Deep background canvas behind layouts |
| `--color-surface-card` | `#352F44` | Elevated Surface | Cards, modals, side navigation, drawers |
| `--color-surface-subtle` | `#5C5470` | Secondary Surface | Input backgrounds, active states, hover layers, borders |
| `--color-accent-soft` | `#B9B4C7` | Lavender Slate | Secondary typography, subtle badges, tab borders |
| `--color-accent-light` | `#FAF0E6` | Warm Linen | Primary headings, prominent CTA accents, high-contrast text |

### Semantic Severity Tokens

Designed for maximum clarity and accessibility with both text labels and distinct iconography:

| Severity | Color | Text / Accent Hex | Background Tint |
|---|---|---|---|
| **Critical** | Vivid Coral | `#FB7185` | `rgba(251, 113, 133, 0.12)` |
| **High** | Warm Amber | `#FB923C` | `rgba(251, 146, 60, 0.12)` |
| **Medium** | Honey Gold | `#FACC15` | `rgba(250, 204, 21, 0.12)` |
| **Low / Safe** | Sage Emerald | `#34D399` | `rgba(52, 211, 153, 0.12)` |

---

## 2. Typography

- **Headings & Primary Labels:** `DM Sans`, Semi-bold / Bold (Clean, readable, modern).
- **Body & Explanations:** `DM Sans`, Regular / Medium with generous line-height (`1.6`).
- **Technical Details Panel Only:** Monospace (`ui-monospace`, `JetBrains Mono`, `Consolas`) for hashes, raw indicators, and timestamps.

---

## 3. The "Arc" Motif

Drawn directly from the brand name **NexenArc**:
1. **Logo & Identity:** A dynamic curved arc enclosing the shield apex.
2. **Investigation Progress:** Radial arc meters displaying analysis completion percentage and confidence level.
3. **Card Accents:** Gentle curved top-right border glows and soft subtle gradients.
4. **Motion:** Purposeful, fluid transitions (200ms ease-in-out); all animations honor `@media (prefers-reduced-motion: reduce)`.

---

## 4. Plain-Language Vocabulary

In the default UI, **technical jargon is strictly forbidden**. All internal system operations use everyday human phrasing:

| Internal / Prohibited Term | User-Facing Plain Phrasing |
|---|---|
| Agent | Team member |
| Triage Agent | Quick assessment |
| IOC Analysis Agent | Checking suspicious items |
| Threat Intelligence Agent | Known-threat check |
| Artifact Analysis Agent | File & log inspection |
| Correlation Agent | Connecting the dots |
| Risk Assessment Agent | Risk level |
| Verification Agent | Double-checking |
| Report Agent | Writing your report |
| Pipeline / Orchestration | Investigation progress |
| IOC (Indicators of Compromise) | Suspicious items |
| Confidence score | How sure we are (High / Medium / Low) |
| False positive | Likely harmless |
| MITRE ATT&CK tactic | How the attack works |
| RAG citations | Where this comes from |
| Verdict | Our conclusion |
| LLM / Model config | AI assistant |
| Raw JSON / Stack trace / Tokens | Under collapsed "Technical details" only |

---

## 5. Screen Hierarchy: Outcome First

Every completed investigation must answer three questions immediately:
1. **What happened?** (Plain-language narrative summary)
2. **How serious is it?** (Plain severity level + confidence assessment)
3. **What should I do next?** (Clear, step-by-step checklist of actions)
