# Changelog · Global Mobility Assistant

**用途**:记录这个原型从初稿到当前状态的演化路径 —— 每一版做了什么、为什么改、怎么改的。既是自我复盘,也是给面试官/评审官看的**"我懂产品迭代节奏"**证据。

时间线倒序(最新在上)。每一版都是一次真实的自我审视 + 决策 + 落地。

---

## v7 · Credibility hardening · 主线从"三次拒绝"改成"三次停下"

### 触发问题
外部 review 指出了 8+ 条可信度问题,最严重的是**把未证实的假设写成了可执行修复路径**:

1. IAS 场景里"合并 + 保留 90 天"是编的操作路径,没有证据支持
2. 混合了 Career Profile / Candidate Profile / Marketplace / Skills Matching 四个不同对象
3. "用 Joule 优化 JD"混写了 Recruiting-native 的 Enhance JD AI 和 Joule 两个不同能力
4. "三套独立审批引擎"是对内部架构的推断
5. "按容量而非按角色派专家"把职责边界放到了容量之后
6. "生效日期不影响 Offer" 是无据断言
7. "点合并后全部就绪"违反了自己立的"submitted ≠ verified"规则
8. tech-modules.md 里的百分比、"最常见"、具体客户名违反脱敏

### 决策
- **主线从"三次拒绝"改成"三次停下"** —— AI 帮助推进任务,在缺乏证据/权限/批准时停下,并说明下一步归谁
- **IAS 场景整段重写**:从"根因确定 + 合并"降级到"多候选记录 + 等待治理审查"
- **合规表述统一软化**:一律"由专业人员在具体场景下评估适用性",不下结论
- **不再声称"完成"**:handoff 从"全绿"改为"submitted · awaiting verification"

### 落地
- **可信度层面**(P0):IAS 诊断卡整段重写 · 移除"合并 + 90 天保留" · IT 按钮改为"Route to governance"而非"Merge & retry" · 员工/HRBP handoff 改为"awaiting verification" · tech-modules.md 移除所有百分比/客户名/"最常见"断言 · 合规表述加限定语
- **专业度层面**(P1):分离 Career/Candidate/Marketplace/Skills Matching · JD AI 明确为 Recruiting-native · 专家推荐改为 责任→资格→授权→容量 四层筛选 · Offer 改为"待单独检查" · 统一"目标法人直接雇佣"用工架构
- **主线层面**(P2):narrative / scenario / role-boundaries / landing 全部改用"三次停下",每次停下明确说"下一步归谁"

### 从 review 中学到的
- 追求叙事流畅时最容易把"假设"写成"事实"
- Support 出身的观众对"未经证实的操作路径"敏感度极高
- "拒绝"容易让 AI 显得刻意谨慎;"停下并交给正确的人"才是产品该有的样子
- 每次做完 demo 都值得找一个 support/product 视角的人 review,自己太容易看不见

---

## v6 · 三次拒绝叙事收敛 · Read-only preview 一致性

### 触发问题
Review 时发现两个不一致:
1. HRBP 的职责描述用了行话("版本漂移"),对非技术观众距离感强
2. "员工告诉 HR 私事"这一场景抽象度高,占演示时间但不好讲清

### 决策
- 把"四次拒绝"收敛为**三次拒绝**(员工职业决策 · HR 专家分派 · IT 敏感执行)
- Signal feature 的代码保留为 extension hook,但从演示脚本移除
- 术语层面用"签字失效 / 重新确认"替代"version chain / version drift"

### 落地
- `narrative.md` / `scenario.md` / `role-boundaries.md` / `README.md` 全部同步到三次拒绝
- 员工 Tracking 页移除 Signal 卡的视觉呈现,event bindings 清理
- HRBP nav label "Edit & version" → "Edit request"(7 处)
- Read-only preview 标签在员工/HRBP/IT 三个视图的非主行统一应用(消除 3 处 alert 弹窗)

---

## v5 · 场景切换 · SAP 内部调动 → 中国企业出海

### 触发问题
观众更容易共鸣一个更具体的场景。原来的 "SAP CN → SAP DE 内部调动"是通用国际调动脚本,没有明显的**中国企业特色**。

### 决策
换成:**Aurora Industries(上海,新能源制造)出海沙特利雅得**。
- 更真实(2024-2026 年中国出海中东的浪潮)
- 加了跨境数据处理的关注维度(具体适用规则由 Legal / Privacy 专业人员评估)
- 加了本地雇佣与用工架构的关注维度(具体规定由 HR 专业人员评估)

### 落地
- 全部数据文件重写:employee-data.js / hrbp-data.js / it-data.js
- 三个 HTML 里所有字符串对齐(Aurora / Riyadh / region-me / Payroll ME)
- narrative.md · 加了"中国企业出海合规特殊性"章节
- 岗位、面试、影响 checklist、IT 诊断参考文档全部本土化

---

## v4 · Joule 分步播放 + 交互输入

### 触发问题
Joule 面板一次性 flush 所有消息,像广告牌 —— 观众没时间读。而且输入框只是装饰,不能真打字。

### 决策
- 消息**逐步播放**:每个 frame 有 `autoplay: true|false`
  - `autoplay: true` · 300-900ms 停顿后自动出现(像真实打字节奏)
  - `autoplay: false` · 停在紫色 **▸ Continue** 按钮,演示者按节奏点击
- 输入框改成真 `<input>` + **意图关键词路由 + 预设回复**(不接 LLM)
- Per-step 快捷提示 chips(建议问题)

### 落地
- `shared/joule.js` 重写:frame player + intentRouter + suggestions
- `shared/joule.css` 加 continue-btn 呼吸动画 + suggestion-chip 样式
- 三个角色页各自定义 `xxxIntentRouter(text)` 关键词匹配
- 关键的 4 个 Continue 节拍(员工职业决策、HRBP backlog 解释、HRBP 字段变更、IT 治理边界)成了演示脚本的"节奏锚点"

### 意外收获
Fallback 回复本身变成一次退让示范 —— 打了不相关的问题,Joule 说"我只回答本次调动的问题" —— **每次输入都是一次边界演示**

---

## v3 · 单页仪表盘 → 多屏交互式流程

### 触发问题
用户反馈:"这几个网页都不是可点击的,我需要能逐步点击的视图。"

### 决策
每个角色做 5-6 步**独立视图**,靠 URL hash 路由切换(前进后退能用浏览器按钮)。每步是一个独立屏,而不是所有内容堆在一页。

### 路径设计
- **员工** · 6 步:Discover / Evaluate / Interview prep / Apply / Track / My move
- **HRBP** · 6 步:Move requests / Request detail / Impact review / Edit / Approvals / Handoff
- **IT** · 5 步:Alert Console / Alert detail / Task queue / Diagnose / Receipt

### 落地
- 三个 HTML 从单页仪表盘重构为 hash 路由 SPA
- 每步顶部加 Journey nav(6/6/5 clickable steps)+ breadcrumb
- 每步 info-strip 明确说"Step N · 你在这一步该做什么"
- 加"Continue to next →" / "Back" 按钮,方向清晰

---

## v2 · 单一 HTML → 三个角色独立 HTML

### 触发问题
把员工、HR、IT 的视图混在同一个 tab 里显示所有卡片,是**典型的 AI 仪表盘反模式** —— 谁都能看到所有东西,没有"角色边界"。

### 决策
拆成三个独立 HTML 文件(`employee.html` / `hrbp.html` / `it.html`)。用户在演示时开三个 tab,分别代表三个角色的登录视角。

### 关键设计
- **共享状态跨 tab 同步**:`localStorage` + `storage` 事件 —— 一个 tab 写状态,其他 tab 自动感知(无需刷新、无需轮询)
- **同一事件的三种呈现**:HR 改日期 → HR 看到"3 位签字失效"、员工看到"HR 更新了日期"、IT 什么都不显示(还没触发)
- **每个角色的 Joule 有不同能力**:同一个 Joule 组件,但员工版能做的和 IT 版能做的完全不同

### 落地
- 抽出 `shared/` 目录:tokens.css / shell.css / joule.css / state.js / topbar.js / joule.js
- 三个 data 文件按角色隔离
- 加 landing 页 `index.html`,3 张角色卡片作为演示入口

---

## v1 · 骨架:SF 视觉外壳 + 6 阶段状态机

### 起点
用户提供 v0.2 spec + 3 张 SF Success Map 参考截图 + 内部 SAP SuccessFactors PowerPoint 模板(用于提取品牌色板)。

### 决策
- 视觉:提取 SAP Horizon 色板(#0070F2 主蓝 · #049F9A Teal · #5D36FF Joule 紫 · 顶栏 #00144A) —— 从模板 theme 里读,不复制品牌资产
- 布局:SF Success Map 顶栏 + 右侧 Joule 面板 + 中间主内容
- 结构:六阶段主线状态机(面试评估 · 结构化申请 · 影响审查 · 审批 · 执行 · 交接)
- 合规底 bar 常驻:"非 SAP 官方产品 · 学习原型 · 虚构数据与模拟执行"

### 关键功能
- 关键字段修改 → 旧确认失效 → 阶段 4 提交被阻断(**演示真的能跑**,不是装饰)
- 一次 IT 供应失败 → 阶段 6 部分完成交接(**真实失败叙事**)
- 每张卡的能力标签(标准业务模拟 / 原生 AI 模拟 / 项目扩展设计)

---

## 全流程贡献总结

从 v1 到 v6 的**核心迭代方向**:

| 维度 | 起点(v1) | 现在(v6) |
|---|---|---|
| **视图结构** | 单页六阶段仪表盘 | 三角色独立视图 · 各自 5-6 步 |
| **叙事焦点** | "AI 能做什么"(六阶段全流程) | "AI 不该做什么"(三次拒绝) |
| **交互方式** | 静态卡片展示 | 可点击流程 + Joule 分步对话 + 真实输入 |
| **场景** | SAP CN → SAP DE 通用调动 | Aurora 中国出海沙特(有行业特色) |
| **状态同步** | 单 tab 内状态 | localStorage 跨 tab 实时同步 |
| **语言** | 内部行话(version chain 等) | 大白话(sign-offs / 签字失效) |
| **合规声明** | 页脚免责 | 页脚 + 每卡能力标签 + AI 主动退让 |

## 迭代节奏的启发

- **每次 review 都先自我批判,再问用户** —— 我先自己列出可改进点,让用户从有限选项中选,而不是"任由改"
- **场景切换比重构容易** —— v5 场景切换只改文案 + 常量;架构不动
- **拒绝比添加价值大** —— v6 从"四次拒绝"收敛到"三次拒绝"减了一个场景,demo 反而更紧
- **状态设计要早** —— v2 加 localStorage 后,后续所有跨角色叙事都简单;如果不早做会重构很痛
- **AI 的边界演示是产品价值** —— 不是靠 disclaimer,是靠 UI 层面的"AI 不做 X"

---

## 现在的项目状态

- 三视图各自完整可点(员工 6 · HRBP 6 · IT 5)
- Joule 分步对话 · 支持真输入 · 意图关键词路由
- **三次停下叙事**:员工职业决策 / HRBP 专家推荐 / IT 身份异常等治理判断
- 场景对齐 · Aurora 出海沙特 · 中国企业出海视角
- 术语通俗化 · 无内部行话 · 合规表述均带"由专业人员评估适用性"限定
- Read-only preview 统一 · 消除所有 alert 弹窗
- **不声称"完成"**:handoff 从"全绿"改为"submitted · awaiting verification"
