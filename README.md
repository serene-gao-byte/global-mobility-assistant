# Global Mobility Assistant

**Learning prototype** · Role-scoped AI copilot for cross-border employee moves.
Not an SAP official product · Fictional data · Simulated execution.

一个学习性原型 · 面向跨境员工调动的角色隔离 AI 副驾。
非 SAP 官方产品 · 虚构数据 · 模拟执行。

---

## 查看演示 · View the demo

- **英文版 · English:** https://serene-gao-byte.github.io/global-mobility-assistant/prototype/index.html
- **中文版 · 中文:** https://serene-gao-byte.github.io/global-mobility-assistant/prototype/zh/index.html

**仓库 · Repository:** https://github.com/serene-gao-byte/global-mobility-assistant

---

## 一句话 · In one sentence

> **The agent never invents a permission layer. It acts strictly inside the SF role the signed-in user already holds — and where a decision falls outside that role, it pauses and names who owns it.**
>
> **Agent 不自造权限层。它严格在当前登录用户已持有的 SF 角色内行动 —— 一旦某个决定落在该角色之外,它就暂停,并指名该由谁接手。**

A Chinese renewable-energy group is expanding into Saudi Arabia. One employee's international move ties three people together — the employee, the HR business partner, and the IT admin — each with their own view, responsibilities, and boundaries. Joule (the copilot) coordinates the process, flags risks, and moves tasks forward, while leaving key decisions and approvals to the right people.

一家中国新能源集团正在拓展沙特市场。一次国际调动把三个人绑在一起 —— 员工、HRBP、IT 管理员 —— 各有各的视图、职责与边界。Joule(副驾)负责协调流程、提示风险、推动任务,同时把关键判断与审批交回给对的人。

---

## 产品思路 · Product thinking

**这个原型不是"让 AI 做得更多",而是"让 AI 知道在哪里帮、在哪里停手交接"。** 三处刻意的暂停贯穿演示:

**This prototype is not about "AI doing more" — it's about AI knowing where to help, and where to pause and hand off.** Three intentional pauses run through the demo:

| # | 场景 · Scene | AI 做什么 · What AI does | 谁拍板 · Who decides |
|---|---|---|---|
| 1 | 员工问"我该接这个岗吗?" · Employee: *"should I take this role?"* | 摆出利弊、匹配、差距 · Lays out trade-offs, matches, gaps | **员工本人** · The employee — life-stage fit isn't in the data |
| 2 | HR 路由一位专家 · HR routes a specialist | 按 责任→资质→授权→产能 推荐 · Recommends by responsibility → qualification → authorization → capacity | **HRBP** · HR sends the request; the agent only recommends |
| 3 | IT 观察到身份异常 · IT observes an identity anomaly | 描述所见、路由至治理团队 · Describes what it sees, routes to governance | **身份治理 / 合规团队** · The agent does not conclude a root cause or propose an operation |

Same event, three views, cross-tab state synced in real time. 同一事件,三个视角,跨标签页实时同步。

---

## 架构一览 · Architecture at a glance

The agent is an **orchestration layer over SAP SuccessFactors** — not a parallel system with its own permissions. Everything it can *know*, *change*, and *reach* is inherited from three existing SF platform mechanisms.

Agent 是 **SAP SuccessFactors 之上的编排层** —— 不是一个自带权限的旁挂系统。它能"知道"、能"改"、能"去"的一切,都继承自三个既有的 SF 平台机制。

> 以下为基于 SAP SuccessFactors / Joule 既有权限与集成机制的**设计思路**。当前原型通过角色视图和本地状态模拟相关交互,**尚未连接真实 SAP 系统**,也未实际执行 RBP 校验或 IPS / Work Zone 授权同步。
> The following describes the **design approach** built on existing SF / Joule permission and integration mechanisms. This prototype simulates the interactions via role views and local state; it is **not connected to a real SAP system** and does not perform actual RBP checks or IPS / Work Zone provisioning sync.

```
          ┌─────────────────────────────────────────────┐
          │   Joule agent · orchestration layer          │
          │   编排层:识别变更 · 拉取上下文 · 推动/暂停    │
          └───────────────┬─────────────────────────────┘
                          │  every action must resolve against ↓
        ┌─────────────────┼─────────────────────┐
        ▼                 ▼                     ▼
   ┌─────────┐      ┌──────────────┐      ┌────────────┐
   │  RBP    │      │  Document    │      │ Navigation │
   │ 角色权限 │      │  Grounding   │      │  路由配置   │
   ├─────────┤      ├──────────────┤      ├────────────┤
   │ 能看什么 │      │ 依据从哪来    │      │ 能去哪里    │
   │ 能改什么 │      │ 来源可见      │      │ 落在已配置  │
   │ what it  │      │ no source,   │      │ routes only│
   │ sees /   │      │ no claim     │      │ 的目的地上  │
   │ can edit │      │              │      │            │
   └─────────┘      └──────────────┘      └────────────┘
```

- **RBP (Role-Based Permissions)** — the spine. The agent inherits the session user's exact scope: fields the user can't see, the agent can't fetch; objects the user can't edit, the agent can't edit for them.
  主轴。Agent 继承当前会话用户的确切范围:用户看不到的字段,Agent 拉不到;用户不能改的对象,Agent 不能替他改。
- **Document Grounding** — the evidence. Every claim the agent surfaces carries a source label (`system` / `self-report` / `unverified`). No source, no claim.
  依据。Agent 呈现的每条依据都带来源标签,无来源不发言。
- **Navigation** — the reach. The agent's "next step" must land on a route already configured in SF; it can't send the user to a page it invented. Navigation decides *which page* the agent may reach — it is not authorization to *edit data or start approvals* there; write actions still go through RBP and workflow.
  可达。Agent 的"下一步"必须落在 SF 已配置的路由上,不能跳去它自己发明的页面。导航只决定**能去哪个页面**,不等于获得在该页面**改数据或发起审批**的授权;写操作仍走 RBP 与工作流。

Full write-up: [`docs/security-agent-design.md`](docs/security-agent-design.md) · 完整设计说明见此。

---

## 为什么这套权限设计是合理的 · Why the permission design is sound

The design is deliberately **not novel**. It is the SF-native expression of two patterns that leading enterprise-AI and identity platforms already codify. That is the point: a reviewer should recognize the shape, not have to trust an invention.

这套设计刻意 **不追求原创**。它是两个业界既有模式在 SF 平台上的本地化表达。这正是要点:评审看到的应是熟悉的形状,而不必去信任一个凭空发明的东西。

| 本原型的机制 · Our mechanism | 对应的行业标准 · Maps to industry standard | 为什么这样对 · Why it's right |
|---|---|---|
| Agent 严格继承会话用户的 RBP 范围 · Agent inherits the session user's RBP scope | **最小权限 RBAC** · least-privilege RBAC (e.g. Microsoft Entra ID's governing principle) | 边界是**结构性**的,不是 prompt 里的一句软约束 · The boundary is *structural*, not a soft instruction in a prompt |
| Agent 只能触达已配置的 Navigation 路由 · Agent can only reach configured Navigation routes | **工具白名单** · tool allowlist (Anthropic MCP: don't expose write/destructive tools → forces a human confirmation step) | 没暴露的动作就调不到 —— 与"高风险步骤留人确认"同构 · An un-exposed action simply can't be called |
| 无来源不发言,来源标签可见 · No source, no claim; source labels visible | **透明性原则** · transparency (Anthropic: show planning, document tool boundaries) | 防止"看起来合理的编造" —— AI 最常见的失败模式 · Defends against confident, unsourced fabrication |
| 操作边界与人工确认要求由**既有权限 + 工作流约束 + 业务影响**共同确定,而非 prompt 维护 · Operation boundaries and human-confirmation requirements are determined by existing permissions + workflow constraints + business impact, not maintained in a prompt | **poka-yoke / 防呆** (Anthropic: design so mistakes are hard to make) | 客户改 RBP 或工作流,Agent 边界自动跟着变 —— 不重训、不改 prompt · Change the config, the boundary follows |

**风险分层如何从配置推导 · How risk tiers fall out of config:**

- **低 · Low** — 不改变任何业务状态,只读当前用户 RBP 域内数据 → Agent 直接完成。 *No state change, reads only within RBP scope → agent proceeds.*
- **中 · Medium** — 触发既有签署失效或产生新对象,但仍在用户授权内 → Agent 执行机械步骤,但**关键决定必须由持相应角色的人做出**。锚点:*是否触发既有签署失效*(工作流配置可查询)。 *Triggers existing sign-off invalidation but stays in scope → agent does the mechanical steps; the human with the role makes the call.*
- **高 · High** — 涉及跨专业域判断(合规/隐私/身份治理),或该判断权限不属于当前角色 → Agent **拒绝自动化解决**,只观察、描述、路由。锚点:*该决定是否在当前角色权限之外*(RBP 可查询)。 *Cross-domain judgment, or authority the current role doesn't hold → agent observes and routes, does not resolve.*

> 独到之处 · What's distinctive: **风险分层的判定与 SF 平台机制同源** —— 中风险 = 触发签署失效(工作流可查询);高风险 = 当前用户无该决策权限(RBP 可查询)。这是"嫁接在平台上"与"外挂在平台旁"的根本区别。
> The risk tiers share a source of truth with the platform itself. That's the difference between *grafted onto* the platform and *bolted beside* it.

---

## 本地启动 · Run locally

**零依赖 · 无需 build 步骤 · No dependencies, no build step.**

```bash
git clone https://github.com/serene-gao-byte/global-mobility-assistant.git
cd global-mobility-assistant
```

任选一种方式打开 · Open it either way:

**方式一 · 直接双击 · Double-click**

在文件管理器中双击 `prototype/index.html`(英文)或 `prototype/zh/index.html`(中文) —— 浏览器打开即可看到 Landing 页。

**方式二 · 起一个本地静态服务器 · Local static server**(推荐 · 避免个别浏览器对 `file://` 的限制)

```bash
# Python 3
python -m http.server 8000
# 然后打开 http://localhost:8000/prototype/index.html

# 或用 Node · or with Node
npx serve
```

**浏览体验建议 · Viewing tip:** 从 Landing 页 Ctrl-Click 三个角色卡片,在三个标签页里同时打开员工/HRBP/IT 三个视图 —— 跨标签页的业务状态会实时同步(通过 `localStorage`),同一个事件从三个视角看会同步演进。手机端可以单角色浏览,布局已适配窄屏。
Ctrl-Click the three role cards on the Landing page to open Employee / HRBP / IT side by side; state syncs across tabs via `localStorage`. Mobile is supported single-role; the layout adapts to narrow screens.

---

## Repository layout · 仓库结构

```
prototype/          Runnable prototype — open index.html to start
├── index.html      Landing page · 3 role entries (English)
├── employee.html   Employee (Lin Chen) view · 6 steps
├── hrbp.html       HRBP (Mira Klein) view · 6 steps
├── it.html         IT Admin (Tom Reeves) view · 5 steps
├── shared/         SAP Horizon design tokens, shell, Joule panel, cross-tab state
├── data/           Per-role fixtures (fictional)
└── zh/             Chinese localized mirror · 中文本地化镜像

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

## For reviewers · 给评审

- **Design decisions are visible in the UI** — every card carries a capability tag (标准业务功能模拟 / 原生 AI 功能模拟 / 项目扩展设计).
- **Version invalidation actually runs** — changing the effective date in the HRBP tab invalidates prior sign-offs and blocks approvals until re-confirmed. 改生效日期会真的让先前签署失效,并阻断审批直到重新确认。
- **No view claims "complete" at the end** — proceeding is not the same as verified, and the demo respects that distinction.
- **AI's pauses are the point** — three concrete moments where the tool stops and names who does the next step. 三处暂停才是重点。

30 分钟建议路径 · If you have 30 minutes: start with `docs/narrative.md`, run the prototype, then read `docs/security-agent-design.md` for the safe-autonomous-action design.

---

## Boundaries · 边界

- No real model, no real SAP tenant, no database, no network calls. 无真实模型、无真实 SAP 租户、无数据库、无网络调用。
- All names, IDs, dates, and figures are fictional. 所有姓名、ID、日期、数字均为虚构。
- Native AI features are referenced but not rebuilt. 原生 AI 能力被引用但未重建。
- Compliance-related items (data protection, retention, cross-border processing, local employment rules) are shown as items requiring qualified specialists to evaluate — the tool does not draw legal conclusions. 合规相关事项呈现为需要有资质的专家评估的项,工具不下法律结论。
- Design tokens (colors, font stack) are extracted from public SAP artifacts for visual reference; no SAP brand assets are redistributed. 设计 token 仅作视觉参考,不再分发任何 SAP 品牌素材。

---

## Security note · 安全说明

This prototype uses `innerHTML` with an `esc()` helper for HTML-escaping. Data is entirely embedded fictional content with no external inputs. If ever extended to accept real data or deployed as a real product, `innerHTML` patterns should be replaced with `textContent` / DOM APIs or a sanitizer library.

本原型使用 `innerHTML` 配合 `esc()` 做 HTML 转义。数据全部为内嵌虚构内容,无外部输入。若将来接入真实数据或作为真实产品部署,应将 `innerHTML` 模式替换为 `textContent` / DOM API 或引入 sanitizer 库。

---

## References · 参考

行业实践锚点,佐证上文"为什么合理"一节 · Industry-practice anchors behind the *why it's sound* section:

- Anthropic — *Building Effective Agents*: simplicity, transparency, well-documented tool boundaries, human checkpoints. https://www.anthropic.com/engineering/building-effective-agents
- Anthropic — *MCP connector* (tool allowlist / denylist; denylisting write or destructive tools to force a human confirmation step). https://platform.claude.com/docs/en/agents-and-tools/mcp-connector
- Microsoft Entra ID — role-based access control and the principle of least privilege. https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/custom-overview
