# 3-Minute Demo Script — v7 · Three Pauses

**Target**: 2:30–3:00. Three tabs pre-opened. Joule messages appear step-by-step — some auto-play, some pause on a **▸ Continue** button so you control the pace.

The story: Aurora Industries (Shanghai HQ) is expanding into Saudi Arabia. HR posts a Riyadh role, employee Lin Chen applies, HR coordinates, IT surfaces an identity case for governance review. Same event, three views, **three intentional pauses** — each with a clear "who does the next step".

## Setup

1. `prototype/index.html` full-screen · Ctrl-click each role card → 3 tabs open.
2. Tab order (left to right): Employee · HRBP · IT · (Landing).
3. Reset demo once from any tab.
4. Pacing:
   - **▸ Continue buttons** = intentional pauses. Click after you finish narrating.
   - Info messages auto-advance with a short delay.
   - Action buttons block until clicked.

---

## 0:00 – 0:15 · Opening

**Land on the Landing page** (`index.html`). Show all three role cards on one screen.

> "Aurora Industries — 一家中国新能源集团 — 要出海沙特,建立利雅得子公司。这件事牵动三个人:HR 要发岗位、员工要决定去不去、IT 要处理系统权限切换。今天演示的核心不是 AI 能做多少,而是它在哪 3 个点**停下**,并说明下一步归谁处理。"

Fast-cut through the three role cards (visual only, no click yet).

## 0:15 – 0:55 · Employee · Discover → **Pause #1** (职业决策不代替员工)

**Switch to Employee tab, Step 1 (Discover).**

Joule auto-plays: "I surfaced 4 opportunities..."

> "林晨,Aurora 上海总部的资深方案顾问。Joule 把利雅得的储能岗位作为**内部机会推荐**给她 —— 这不是招聘筛选,是员工侧的机会曝光。她打开。"

**Click Riyadh card → Step 2 (Evaluate).**

Joule auto-plays two info messages, then pauses on **▸ Ask Joule for a personal analysis**.

> "现在关键一刻。员工不会直接问 AI '我该接吗' —— 她更可能问的是 '帮我基于我的经验和长处 · 分析这个岗位对我发展有什么优劣势'。这是员工在职场里真实会问的问题。"

**Option A** · Click ▸ Ask Joule for a personal analysis — the user bubble appears.
**Option B** · Type into Joule input: `Analyze this role for my development` → Enter.

Joule auto-plays the response (900ms delay).

**⚠ Hold the shot for 3 seconds after the response appears.** Let the audience read it.

> "**这是第一次停下**。Joule **具体地帮她比较** · 列出了三样东西:她的**匹配优势**(方案顾问经验 · BESS 认证)、**待关注的差距**(阿拉伯语是自述项 · 不是系统记录)、**Trade-offs**(区域视野 vs 搬迁适应)。但它明确说 · '只有你能判断的 —— 家庭、人生阶段、对新市场的胃口 —— **这些不在我的数据里 · 我不会猜**' · 引导她去和经理或导师聊。**帮到位 · 但不越界**。"

## 0:55 – 1:15 · Employee · Apply → Track

Skip Prep quickly. Click Apply → **Submit application** → Step 5 (Track).

Joule auto-plays tracker status.

> "她决定申请、面试通过、Offer 接受。系统生成申请记录,进入 HR 的队列。"

**Note**: this section is intentionally quick — no pause here. Just show the tracker briefly, then switch to HRBP.

## 1:15 – 1:50 · HRBP · Impact review → **Pause #2** (专家推荐 · 不代替决定)

**Switch to HRBP tab.**

> "HR Mira 打开林晨的调动请求。同步是即时的 —— 我没刷新页面。"

**Click Lin Chen row → Step 2 (Detail) → Step 3 (Impact review).**

Joule auto-plays overview, then pauses on **▸ How I filter recommendations**.

> "9 项影响审查,3 项要专家参与。看 Joule 怎么给建议。"

**Click ▸ How I filter recommendations.** Joule explains the 4-layer filter.

**Click Route to specialist on `Payroll & benefits`.**

> "推荐是 **Global Mobility · Nikola** —— 但注意 Joule 的说法:『推荐,不是决定』。它的筛选顺序是 **责任 → 资格 → 授权 → 容量**。责任、资格、授权都符合的候选人中,再考虑容量。**Payroll ME 团队也覆盖此责任,只是当前排了 3 单**。是否发送请求给 Nikola,由 Mira 拍板。**这是第二次停下 —— AI 给排序过的推荐,人做最终选择**。"

## 1:50 – 2:15 · HRBP · Change date → 精确说清谁受影响 · 谁需要单独判断

**Step 4 (Edit request).** Change effective date to `2026-11-15` → Apply.

Joule auto-plays user bubble, pauses on **▸ Show impact of this change**.

> "顺便看一下 Joule 的另一层能力 —— 精确追踪字段变更。"

**Click ▸ Show impact of this change.** The 3-approver breakdown appears.

> "Joule 具名说出**签字失效需要重新确认的 3 位** —— HRBP 自己、Payroll ME、Global Mobility。也**没有假设** Offer 一定不受影响 —— 而是把它列为『**需单独检查**』的项目,交给招聘经理确认。这是让审计和责任透明,不预设无据的结论。"

**Click ✓ Generate v2 & notify.**

**Step 5 (Approvals) → Submit approvals → Trigger execution.**

## 2:15 – 2:40 · IT · **Pause #3** (身份异常 · 停下等治理判断)

**Switch to IT tab.** New high-severity alert already visible (no refresh).

> "同样实时同步。IT 看到告警。"

**Console → Alert Detail → Task queue** (show EXEC-04 · pending-review, blocking 4 downstream) **→ Review.**

Joule auto-plays observation, pauses on **▸ Why I stop here**.

> "第三次停下。这里最微妙 —— Joule **本可以调 API 尝试某种自动关联操作**。但它没有:"

**Click ▸ Why I stop here.** Read the governance note.

> "Joule 说的是:『我观察到多个候选记录 —— 我不下结论说这是"冲突",也不提议操作路径。这些记录是否代表同一个人 · 如何关联 · 跨境数据处理规则 —— 都是**治理决策**,由 Identity governance 团队 + Legal / Privacy 专业人员评估。』"

**Click Route to Identity governance team.**

> "注意按钮的名字 —— 不是"合并" · 不是"解决",是"**路由到治理团队**"。下游任务**继续保持 pending**,等治理决策 + 目标端验证。"

**Step 5 → Log routing to HR.**

## 2:40 – 3:00 · Closing (三视图对齐 · 没有"完成")

Fast three-way switch — no narration on each, just show:

**Employee → Step 6 (My move).** 暖色 banner:"You start Nov 15 · System access submitted, awaiting target-side verification." **不是绿色欢欣。**

**HRBP → Handoff.** 暖色 banner:"Handoff in progress · IT case awaiting review." **也不是完成。**

**IT → still on Log routing.** "Routing logged · alert still open."

Return to any tab. Point at the compliance footer.

> "同一件事。三种视角。三次故意的停下 —— 员工问『帮我分析发展前景』时给对比不代替她决定、HR 分派专家时给推荐不下决定、IT 遇身份异常时停下等治理判断。**没有一个视图声称『完成』**,因为治理决策和目标端验证都还没回读。这就是设计原点:**帮你推进,在证据、权限或批准缺失时停下,并明确下一步归谁**。虚构公司,学习原型,虚构数据。"

---

## The three pauses — the theme in one line

1. **Employee "Analyze this role for my development"** — AI compares strengths/gaps/trade-offs; the growth judgment is hers
2. **HRBP Route by responsibility → qualification → authorization → capacity** — AI recommends; HR decides
3. **IT identity case** — AI observes and routes; governance team decides, target-side verification confirms

## Timing notes

- Auto-play delays are 300–900ms per message.
- **▸ Continue** buttons are your rhythm markers. Never let one linger more than 2 seconds unless intentionally holding for emphasis.
- The 3-second pause after Employee response (0:35 ish) is the single most important beat.

## Fallback trims (if under time)

- Skip Prep step entirely (already implicit).
- Cut Approvals table walk-through — just click Submit and Trigger.
- Cut IT Alert Detail — go Console → Queue directly.

Total achievable minimum: ~2:00. Recommended full: 2:30–3:00.

## What NOT to do

- **Do not describe the third pause as "AI refuses to merge"** — the story is "AI observes and routes to governance",not "AI knows it can't merge". Merging or not is not the point; **stopping when the decision belongs to a human team** is.
- Do not narrate over the 3-second Employee pause.
- Do not click **▸ Continue** while narrating the same beat — click after finishing the sentence.
- Do not make legal / retention / cross-border assertions during narration.
- Do not claim any view is "complete" at the end. Multiple threads are legitimately still awaiting verification or decision.
- Do not skip the compliance footer at the end.

## Note on the "signal to HR" feature

The Signal box on Employee Step 5 is kept in code as an extension hook, but is **not part of the 3-pause demo narrative**. If asked, explain it as "one direction we could extend this into" — but do not walk through it live.
