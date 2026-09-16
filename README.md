# Global Mobility Assistant

**Learning prototype** · Role-scoped AI copilot for cross-border employee moves.
Not an SAP official product · Fictional data · Simulated execution.

---

## What this shows

A Chinese renewable-energy company (Aurora Industries, Shanghai HQ) is expanding into Saudi Arabia. An employee's international move ties three people together — the employee, HR business partner, and IT admin — each with their own view, their own responsibilities, and their own boundaries.

**The prototype is not about "AI doing more"** — it's about AI knowing where to help, and where to pause and hand off. Three intentional pauses run through the demo:

1. **Employee asks "should I take this role?"** — AI helps her compare, but the decision is hers
2. **HR routes a specialist** — AI recommends by responsibility → qualification → authorization → capacity; HR decides
3. **IT observes an identity anomaly** — AI describes what it sees and routes to the governance team; it does not conclude a root cause or propose an operation

Same event, three views, cross-tab state synced in real time.

---

## How to view

**Recommended (5 minutes)**

1. Open `prototype/index.html` in a modern browser (Chrome / Edge / Firefox).
2. Ctrl-click each of the three role cards on the landing page — three tabs open.
3. Follow the demo flow shown on the landing page. State syncs automatically across tabs.

**Best viewed on desktop with multiple tabs open.** Mobile / narrow-window layout is not optimized in this version.

---

## Repository layout

```
prototype/          Runnable prototype — open index.html to start
├── index.html      Landing page · 3 role entries
├── employee.html   Employee (Lin Chen) view · 6 steps
├── hrbp.html       HRBP (Mira Klein) view · 6 steps
├── it.html         IT Admin (Tom Reeves) view · 5 steps
├── shared/         SAP Horizon design tokens, shell, Joule panel, cross-tab state
└── data/           Per-role fixtures (fictional)

docs/               Design + narrative documents
├── narrative.md    Story · 90s / 60s / 30s versions
├── scenario.md     3-minute demo script, shot by shot
├── role-boundaries.md   Who sees what, who does what
├── tech-modules.md      Support-perspective deep dive on SAP SF modules
├── changelog.md    Iteration history (v1 → v7)
├── evaluation.md   Acceptance criteria + reference anchors
└── evidence-register.md  Per-card capability source mapping
```

---

## For reviewers · What to look for

- **Design decisions are visible in the UI** — every card carries a capability tag (标准业务功能模拟 / 原生 AI 功能模拟 / 项目扩展设计)
- **Version invalidation actually runs** — changing the effective date in the HRBP tab invalidates prior sign-offs and blocks approvals until re-confirmed
- **No view claims "complete" at the end** — proceeding is not the same as verified, and the demo respects that distinction
- **AI's pauses are the point** — three concrete moments where the tool stops and names who does the next step

If you have 30 minutes, start with `docs/narrative.md`, then run the prototype, then read `docs/changelog.md` to see how the design evolved through review.

---

## Boundaries

- No real model, no real SAP tenant, no database, no network calls
- All names, IDs, dates, and figures are fictional
- Native AI features are referenced but not rebuilt
- Compliance-related items (data protection, retention, cross-border processing, local employment rules) are shown as items requiring qualified specialists to evaluate — the tool does not draw legal conclusions
- Design tokens (colors, font stack) are extracted from public SAP artifacts for visual reference; no SAP brand assets are redistributed

---

## Security note

This prototype uses `innerHTML` with an `esc()` helper for HTML-escaping. Data is entirely embedded fictional content with no external inputs. If ever extended to accept real data or deployed as a real product, `innerHTML` patterns should be replaced with `textContent` / DOM APIs or a sanitizer library.
