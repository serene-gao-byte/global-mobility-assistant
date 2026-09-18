# Global Mobility Assistant

**Learning prototype** · Role-scoped AI copilot for cross-border employee moves.
Not an SAP official product · Fictional data · Simulated execution.

---

## 查看演示 · View the demo

- **英文版 · English:** https://serene-gao-byte.github.io/global-mobility-assistant/prototype/index.html
- **中文版 · 中文:** https://serene-gao-byte.github.io/global-mobility-assistant/prototype/zh/index.html

**仓库 · Repository:** https://github.com/serene-gao-byte/global-mobility-assistant

---

## What this shows

A Chinese renewable-energy company is expanding into Saudi Arabia. An employee's international move ties three people together — the employee, HR business partner, and IT admin — each with their own view, their own responsibilities, and their own boundaries.

**The prototype is not about "AI doing more"** — it's about AI knowing where to help, and where to pause and hand off. Three intentional pauses run through the demo:

1. **Employee asks "should I take this role?"** — AI helps her compare, but the decision is hers
2. **HR routes a specialist** — AI recommends by responsibility → qualification → authorization → capacity; HR decides
3. **IT observes an identity anomaly** — AI describes what it sees and routes to the governance team; it does not conclude a root cause or propose an operation

Same event, three views, cross-tab state synced in real time.

---

## 本地启动 · Run locally

**零依赖 · 无需 build 步骤。**

```bash
git clone https://github.com/serene-gao-byte/global-mobility-assistant.git
cd global-mobility-assistant
```

任选一种方式打开:

**方式一 · 直接双击**

在文件管理器中双击 `prototype/index.html`(英文)或 `prototype/zh/index.html`(中文) —— 浏览器打开即可看到 Landing 页。

**方式二 · 起一个本地静态服务器**(推荐 · 避免个别浏览器对 `file://` 的限制)

```bash
# Python 3
python -m http.server 8000
# 然后打开 http://localhost:8000/prototype/index.html
```

或用 Node:

```bash
npx serve
```

**浏览体验建议:** 从 Landing 页 Ctrl-Click 三个角色卡片,在三个标签页里同时打开员工/HRBP/IT 三个视图 —— 跨标签页的业务状态会实时同步(通过 `localStorage`),同一个事件从三个视角看会同步演进。手机端可以单角色浏览,布局已适配窄屏。

---

## 设计决策 · Safe autonomous action

> **Agent 的护栏不是自己发明的,而是嫁接在 SF 平台既有机制上 —— 以 RBP(角色权限)为主轴,Document Grounding 和 Navigation 配置作为两侧支撑。**
>
> 大多数 AI Copilot 把权限写在 prompt 里,那是软约束 · 不可审计 · 易漂移。本原型的主张相反:Agent 的自主行动完全落在当前会话用户的 SF RBP 权限内 —— 用户看不到的字段,Agent 拉不到;用户不能改的对象,Agent 不能替他改;用户不能去的页面,Agent 不能跳过去。其"依据"来自 Document Grounding 授权范围内的对象和文档,无来源不编造;其"手脚"是 SF 的 route 配置,只能触达平台已开放的落地页。
>
> **独到之处:** 低/中/高风险分层可以直接从 SF 配置推导 —— 触发既有签署失效即中风险,涉及当前角色决策权限之外即高风险。因此当客户调整 RBP 或工作流,Agent 边界会自动跟着变,不需要重训模型、不需要重写 prompt。这是"嫁接在平台上"与"外挂在平台旁"的根本区别。

完整设计说明:[`docs/security-agent-design.md`](docs/security-agent-design.md)

---

## Repository layout

```
prototype/          Runnable prototype — open index.html to start
├── index.html      Landing page · 3 role entries (English)
├── employee.html   Employee (Lin Chen) view · 6 steps
├── hrbp.html       HRBP (Mira Klein) view · 6 steps
├── it.html         IT Admin (Tom Reeves) view · 5 steps
├── shared/         SAP Horizon design tokens, shell, Joule panel, cross-tab state
├── data/           Per-role fixtures (fictional)
└── zh/             Chinese localized mirror

docs/               Design + narrative documents
├── security-agent-design.md   ★ Safe autonomous action · Agent 设计说明
├── narrative.md               Story · 90s / 60s / 30s versions
├── scenario.md                3-minute demo script, shot by shot
├── role-boundaries.md         Who sees what, who does what
├── tech-modules.md            Support-perspective deep dive on SAP SF modules
├── changelog.md               Iteration history (v1 → v7)
├── evaluation.md              Acceptance criteria + reference anchors
└── evidence-register.md       Per-card capability source mapping
```

---

## For reviewers · What to look for

- **Design decisions are visible in the UI** — every card carries a capability tag (标准业务功能模拟 / 原生 AI 功能模拟 / 项目扩展设计)
- **Version invalidation actually runs** — changing the effective date in the HRBP tab invalidates prior sign-offs and blocks approvals until re-confirmed
- **No view claims "complete" at the end** — proceeding is not the same as verified, and the demo respects that distinction
- **AI's pauses are the point** — three concrete moments where the tool stops and names who does the next step

If you have 30 minutes, start with `docs/narrative.md`, then run the prototype, then read `docs/security-agent-design.md` for the safe-autonomous-action design.

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
