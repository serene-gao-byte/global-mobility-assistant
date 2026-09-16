# 技术模块深挖清单 · Product Support 视角

**用途**:这份文档把 demo 里涉及到的 SAP SuccessFactors 系统模块结构化列出。每个模块附带:
1. **是什么**(简短原理)
2. **在 demo 里怎么用**(具体页面/交互)
3. **落地时值得关注的地方**(可能踩坑的方向,不代表所有租户都会遇到)
4. **Support 视角能讲什么**(引导你从自己 case 经验往里填的空白栏)

**重要约束**:
- 文档不预设百分比、"典型"、"最常见"等无据断言
- 客户名、租户细节请你脱敏后自行填入
- 合规相关表述均需专业人员在具体场景下确认适用性,本文档不作法律或架构结论

---

## 一图看清 · Demo 涉及模块地图

```
┌─────────────── 员工侧 ─────────────── HR 侧 ─────────────── IT 侧 ─────────────┐
│                                                                                 │
│  Opportunity                Move Request                    Identity            │
│  Marketplace                (structured info +              Authentication      │
│                              MDF supplement)                                     │
│      ↓                            ↓                            ↓                 │
│  Career Profile          Cross-system Impact              Identity              │
│  (own view)              Checklist                        Provisioning          │
│      ↓                            ↓                            ↓                 │
│  Candidate Profile       Approval Streams                 Access Roles          │
│  (snapshot for           (Recruiting / EC /               (RBP)                 │
│  application)             MDF, configured                                        │
│                           separately)                          ↓                 │
│      ↓                            ↓                       SSO                    │
│  Recruiting              EC International                                        │
│  Job Requisition         Transfer (reference                   ↓                 │
│  + Enhance JD AI          path)                           DRTM                   │
│  (Recruiting-native)                                      (country-specific,     │
│                                                            evaluated by         │
│                                                            specialists)         │
│                                                                                  │
│  Joule (navigation / coordination / summarization) — spans all three roles       │
│  Native AI features referenced but not rebuilt:                                  │
│    · Enhance Job Description (Recruiting-native)                                 │
│    · Performance Preparation Agent (manager entry point)                         │
│    · Interview Question Generation (interviewer entry point)                     │
│    · Career Insights (employee-facing)                                           │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 员工侧模块

### 1. Opportunity Marketplace

**是什么**
SF 里的**内部机会曝光模块**。目标是让员工看到公司内部可以申请的岗位、项目、gig。它有自己的推荐引擎和可见性规则,和外部招聘的 Career Site 是不同产品面向。

**在 demo 里怎么用**
员工 Step 1(Discover)展示 4 个内部岗位。**这不是 Skills Matching** —— Skills Matching 是招聘人员用来筛选候选人的功能,这里是内部机会推荐给员工。

**落地时值得关注的地方**
- 员工 Career Profile 完整度会影响推荐质量
- 岗位对员工的可见性规则(国家、职级、部门等)配置得对不对
- 内部岗位与外部招聘 pipeline 的边界:同一 Job Requisition 是否同时对内对外
- 已关闭岗位是否及时下架

**Support 视角能讲什么**
- 内部机会可见性相关的排查思路
- Career Profile 数据源头的问题

**我的 support 经验**(自行填写,脱敏)
> _(填写你的具体观察:症状 · 你有哪些证据 · 排除了什么 · 哪些还不能确认 · 这怎样改变了你的原型设计?)_

---

### 2. Career Profile(员工侧,发展场景)vs Candidate Profile(申请侧,招聘场景)

**是什么**
**这是两个不同的对象**,不能混淆:
- **Career Profile** · 员工自己维护的能力/兴趣/职业期望。服务 Career Development、Opportunity Marketplace 推荐
- **Candidate Profile** · 员工申请时生成的申请材料快照,进入 Recruiting pipeline 供招聘方查看

**在 demo 里怎么用**
- 员工 Step 2(Evaluate)· "How your experience matches" 是**项目扩展设计**,展示员工自己视角的经历对照,**不是 Skills Matching AI**
- 员工 Step 4(Apply)· 显示 Candidate Profile 快照 · 员工确认要开放什么

**落地时值得关注的地方**
- Profile 快照与实时数据的时间差:申请提交时 snapshot,后续员工更新 Career Profile,招聘方看到的仍是旧快照
- 多语言:员工中文简历 vs 英文岗位描述 vs 系统分类学
- Career Profile 数据来源不唯一(员工手填 + Learning 完成记录 + Talent Review 结果),优先级要客户配置

**Support 视角能讲什么**
- Profile 数据源冲突的排查思路
- 申请后 Profile 更新对招聘方视图的影响

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 3. Recruiting · Job Requisition + Enhance Job Description AI(Recruiting-native)

**是什么**
- **Job Requisition** · 招聘申请对象,承载岗位职责、能力要求、审批链、法人实体绑定
- **Enhance Job Description AI** · Recruiting 应用内的原生 AI 功能,基于配置的 MDF 字段辅助生成/优化描述。**这不是 Joule 的功能**;Joule 可以做导航和协调,但 JD 优化是 Recruiting 应用内自己的按钮

**在 demo 里怎么用**
- HR 幕 0 · Mira 在 Recruiting 里用 Enhance JD AI 生成岗位描述(**Recruiting 原生 AI**)
- 员工 Step 2 · 看到的岗位详情就是 Job Requisition 的展示视图

**落地时值得关注的地方**
- Enhance JD AI 的读取范围由 MDF 配置决定,配置不当可能超出预期
- 多语言生成的准确性与文化适配
- Requisition ↔ Position 的关联关系维护
- Requisition 审批链与 Position Management 审批链是分别配置的

**Support 视角能讲什么**
- Enhance JD AI 相关的客户咨询(读取范围、生成内容的适配、语言)
- Requisition 审批不触发的排查

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 4. Skills Matching AI(招聘人员使用,不是员工使用)

**是什么**
文档记载的 AI 辅助筛选功能,**由招聘人员使用**,基于 SF 通用技能分类学做候选人筛选。**不冒充租户自定义的 JPB 能力模型**。

**在 demo 里怎么用**
**demo 里没有直接展示这个功能**。员工 Step 2 的"经历对照"是**项目扩展**,不是 Skills Matching。Skills Matching 属于招聘人员的工作台,demo 未重建。

**落地时值得关注的地方**
- 通用分类学与客户自定义 competency 模型的映射
- 简历文本匹配的语义边界
- 招聘筛选类 AI 的合规要求(欧盟 AI Act 已生效,其他地区在跟进)

**Support 视角能讲什么**
- Skills Matching 结果与客户预期不一致时的排查
- 自定义 competency 与通用分类学的映射思路

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

## HR 侧模块

### 5. Employee Central (EC) · 核心 HR 数据

**是什么**
SF 的核心 HR 数据平台。存员工雇佣、职位、汇报、薪酬、组织。国际调动的**结束原雇佣 → 目标法人建立新雇佣**流程在 EC 里执行。

**在 demo 里怎么用**
- HRBP Step 2 · Move Request 里的 Person、Employment、Position 引用
- IT Step 3 · EXEC-01(End source employment)+ EXEC-02(New employment record at target entity)代表 EC 事件

**落地时值得关注的地方**
- 国际调动有多种参考路径(结束/重建、Global Assignment、Concurrent Employment 等),客户实际配置需确认
- EC 中许多关键记录(如 Job Info、Compensation)是有效日期驱动的,改日期会引发关联的下游事件
- 已提交事件的回滚复杂度高
- Position ↔ Employment ↔ Compensation 存在关联关系

**Support 视角能讲什么**
- 国际调动 case 的数据一致性问题
- 生效日期改动引发的关联事件排查

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 6. MDF(Metadata Framework)

**是什么**
SF 的**元数据/自定义对象引擎**。既支撑标准业务对象,也支撑客户自定义对象。核心概念:Object、Field、Rule、Workflow、Permission。

**在 demo 里怎么用**
- HRBP Step 2 · Move Request 的"MDF supplemental records"承载 EC 不装的字段
- HRBP Step 5 · MDF Workflow 作为**独立配置的审批流**(与 EC 审批分开配置)

**落地时值得关注的地方**
- MDF 与 EC 数据的边界:哪些数据应该在哪
- Rule 引擎的可读性与 debug 成本
- MDF Workflow 与 EC Workflow 是分别配置的流程
- MDF 字段级权限的多层配置

**Support 视角能讲什么**
- MDF 配置相关的 case 排查思路
- Rule 不触发的常见原因

**我的 support 经验**(自行填写,脱敏)
> _(填写你处理过的 MDF 相关 case)_

---

### 7. Recruiting / EC / MDF 三条独立配置的审批流程

**是什么**
SF 里"审批"从**业务流程的角度**至少分三类,各自有独立的配置界面:
- **Recruiting Approval**(Offer 审批、Job Requisition 审批)
- **EC Workflow**(雇佣变更、Position 变更、Compensation)
- **MDF Workflow**(自定义对象的审批)

这三类**在业务上分别管理**;底层引擎的共用程度是内部实现细节,不做推断。

**在 demo 里怎么用**
HRBP Step 5 · Approval streams 展示三条流程,状态各自维护。**故意强调这不是一条统一审批**。

**落地时值得关注的地方**
- 三个配置界面视觉相似,但各自的规则和字段范围不同
- 审批人可能在多条流程中都有责任
- 审批完成 ≠ 生效:两者是分开的状态
- 各流程的回滚支持不对称

**Support 视角能讲什么**
- 客户"审批走完为什么没生效"类咨询的排查框架

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 8. Position Management + Position Org Chart

**是什么**
SF 里"岗位"是独立对象:每个 Position 有编号、汇报关系、目标 FTE、薪酬范围、法人实体绑定。Org Chart 是这些数据的可视化。

**在 demo 里怎么用**
- HRBP Step 3 · Organization readiness 展示汇报结构
- 岗位关联到 Aurora Middle East LLC 法人

**落地时值得关注的地方**
- Position 变化需要显式的 EC event 触发员工侧更新
- 多种汇报关系模型(Direct / Matrix / Dotted Line)在 Org Chart 里的显示方式不同
- **决策权 ≠ 汇报关系**(demo 里明确说明:decision rights are human-confirmed, not inferred from Org Chart)

**Support 视角能讲什么**
- Position 与 Employment 联动的排查
- 汇报关系变更未同步的 case

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 9. Performance Preparation Agent(引用的原生 AI · 未重建)

**是什么**
文档记载的原生 AI 能力,面向**员工的当前经理**,协助准备发展谈话(目标、成就、反馈、来源与期间)。**不是员工自助面试功能**,也**不假定可检索任意 MDF 附件**。

**在 demo 里怎么用**
HRBP Step 5 · 作为"related native AI"样例卡展示。强调**只在正确角色 + 入口下**可用。不重建。

**落地时值得关注的地方**
- 角色和入口点错位使用的风险
- AI 能读什么、不能读什么由配置决定
- 跨角色分享摘要需要单独授权

**Support 视角能讲什么**
- 原生 AI 功能的角色/入口混淆咨询

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

## IT 侧模块

### 10. Identity Authentication(IAS)

**是什么**
SAP 的身份认证服务。管理用户凭证、SSO 联邦、账号生命周期。多租户环境下不同区域通常是独立 tenant。

**在 demo 里怎么用**
- IT Step 3 · Dependency graph 里 EXEC-04(Identity provisioning · target region)
- IT Step 4 · **AI 观察到多候选记录,停下等待治理团队判断** —— 不推断根因,不提出操作路径

**落地时值得关注的地方**
- 跨区域调动时的身份关联决策属于治理决定,不宜由自动化推断
- 联邦 SSO 的配置漂移可能不易被立即发现
- 数据跨境传输的适用规则由 Legal / Privacy 专业人员评估

**Support 视角能讲什么**
- IAS 配置相关的排查思路
- 涉及治理决策的 case 应如何 escalation

**我的 support 经验**(自行填写,脱敏)
> _(填写你的 SSO / 联邦 / 多域相关经验)_

---

### 11. Identity Provisioning(IPS)

**是什么**
SAP 的账号供应服务。**从源头系统(如 SF EC)拉取用户属性,推送到目标系统**。SCIM 协议为主。

**在 demo 里怎么用**
- IT Step 3 · EXEC-05(Attribute sync)—— 依赖 EXEC-04 先完成
- 依赖图里清晰展示"IPS 卡在 Identity 之后"

**落地时值得关注的地方**
- 同步方向、频率、协议的配置组合
- 属性映射错误的下游影响
- 异步同步的延迟对用户感知的影响
- 失败恢复策略

**Support 视角能讲什么**
- IPS 同步失败的排查框架
- SCIM 协议踩过的坑

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 12. Role-Based Permissions(RBP)

**是什么**
SF 的权限模型。核心概念:**Permission Group**(谁)· **Permission Role**(能做什么)· **Target Population**(对谁做)。国际调动时,员工的 RBP 上下文会变化。

**在 demo 里怎么用**
- IT Step 3 · EXEC-06 + EXEC-07(access role revocation / assignment)
- 演示"person continuity ≠ all accounts unchanged"的核心

**落地时值得关注的地方**
- Target Population 配置错误可能导致权限过大或过小
- Permission Group 的动态更新与员工调动的同步
- 员工过渡期可能属于多个 Group
- 权限变更的审计要求

**Support 视角能讲什么**
- RBP 权限类 case 的排查思路
- Target Population 类问题的诊断

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 13. Single Sign-On(SSO)

**是什么**
员工用企业身份统一登录,访问多个关联系统。SF 里常用 SAML 2.0 或 OIDC,与企业 IdP 联邦,通常经过 IAS。

**在 demo 里怎么用**
- IT Step 3 · EXEC-08(first-login verification)· 依赖图最末端
- IT 诊断的下游影响里包括 SSO 验证

**落地时值得关注的地方**
- 首次登录问题涉及多层排查
- SAML 证书生命周期管理
- MFA 与 SSO 流程的集成
- 应急登录的策略(SSO 中断时的处置)

**Support 视角能讲什么**
- SSO 首次登录失败的排查思路
- SAML metadata 相关 case

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 14. Data Retention & Time Management(DRTM)

**是什么**
SF 里数据保留规则的**country-specific**配置能力。数据保留、归档、清除的时机与规则由**qualified specialists**基于适用法规评估后配置。

**在 demo 里怎么用**
- HRBP Step 3 · Impact checklist 里 DRTM 一栏被标 **"Blocked · country-specific decision · out of demo scope"**
- IT Step 4 · 诊断卡不假设具体保留期,只提示"任何跨境处理由 Legal / Privacy 评估"

**落地时值得关注的地方**
- 各国规则不同,配置需要按客户实际情况定制
- 保留期起算日与业务事件的关联
- 数据清除的不可逆性
- AI 训练数据的合规处理

**Support 视角能讲什么**
- DRTM 类咨询的引导(通常需要转交客户的合规团队)

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

## Joule / AI 层 · 横跨所有角色

### 15. Joule(导航 · 协调 · 摘要)

**是什么**
SAP 的 copilot。文档明确的能力:导航(打开某页)、事务查询(找某条记录)、有限的协调建议。**不是通用聊天机器人;JD 优化等操作在 Recruiting 应用内原生完成,不由 Joule 执行**。

**在 demo 里怎么用**
三个角色的 Joule 面板都是它的模拟视图。**关键设计**:导航共享业务状态;当证据不足、需要授权或治理决策时,Joule 停下并说明下一步归谁处理。

**落地时值得关注的地方**
- Joule 内容显示受 RBP 影响
- 多语言支持范围
- 上下文延续性
- 使用量的可见性与治理

**Support 视角能讲什么**
- Joule 类咨询的分类

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

### 16. AI Features 总表(许可、开关、区域可用性)

**是什么**
SF 里每个 Product Area 都有"AI 功能总表",列出所有原生 AI · 各自的启用开关、许可、租户支持、数据边界。

**在 demo 里怎么用**
每张卡都有能力标签 · 三类之一:
- **标准业务功能模拟**(现有 SF 非 AI 功能)
- **原生 AI 功能模拟**(spec 引用的文档 AI)
- **项目扩展设计**(demo 独有,不冒充 SAP 官方)

**落地时值得关注的地方**
- 文档支持 ≠ 租户启用
- AI 功能的 opt-in 机制
- 区域可用性
- 模型版本变更时客户感知

**Support 视角能讲什么**
- "这个 AI 功能能不能用"类咨询的答疑框架

**我的 support 经验**(自行填写,脱敏)
> _(填写)_

---

## 交叉议题 · 你能讲的"产品落地的困难"故事

这一节是 Fellowship 面试的核心弹药。基于上面所有模块,可以从 support 视角提炼几个**跨模块的观察**。每一条都可以配一句你自己的经历(不要用具体客户名,脱敏后再讲)。

### 议题 1 · "系统状态"与"用户感知状态"的差
- 员工问"我调动生效了吗?"——多个模块各自的状态汇总起来才是"用户视角状态",没有单一 owner
- 这个差常常是员工投诉的来源

**你可以怎么讲**
> "我在支持工作中见过多个系统各自返回成功,但用户仍然无法访问的情况。因此在这个原型里,我没有把'提交成功'当作完成,而是分别展示目标端的验证状态。"

### 议题 2 · 配置界面的隐性依赖
- 一个字段的修改可能触发下游事件
- 客户在配置时不总是知道自己触发了什么

**你可以怎么讲**
> "我在支持中处理过一类情况:客户改了某个配置后下游行为发生了变化,但配置界面没有明显提示。所以这里我让 AI 主动说明变更会影响哪些人 · 哪些流程需要重走。"

### 议题 3 · 合规要求 vs 系统灵活性
- 合规适用性由具体客户、地区、行业组合决定,不宜由工具直接下结论
- 支持工作能做的是**帮客户识别问题**,不是替客户判定合规

**你可以怎么讲**
> "我遇到过客户问'这样配置合不合规'。我的做法是列出可能涉及的规则和责任方,不给合规结论 —— 这也是我在原型里坚持'合规评估交给专业人员'的原因。"

### 议题 4 · AI 落地的边界配置
- AI 的"越界"行为通常源于配置边界不清
- Support 能观察到这类问题的模式

**你可以怎么讲**
> "在支持工作中,涉及 AI 功能的咨询大部分不是模型问题,而是配置或授权范围没有明确。所以这个原型强调:每一张卡片都标注能力来源,并让 AI 在授权不足时明确停下。"

### 议题 5 · 国际调动的隐藏成本
- Demo 里的多候选身份、跨系统同步、跨境审查、DRTM 决策 —— 每一个都是真实客户可能遇到的
- 这些成本在 HR 报销单上看不到,但支持数据里能看到

**你可以怎么讲**
> "我从支持数据里观察到,国际调动 case 的处理时长往往被 IT 侧和 Legal 侧的等待占据。所以我在原型里把这些'等待谁'显式表达,而不是让状态显示为'完成中'。"

---

## 用法建议

1. **每个模块的"我的 support 经验"栏,先按这个格式填**:
   - **出现什么症状** → 你有哪些证据 → 排除了什么 → 哪些还不能确认 → 这怎样改变了你的原型设计?
   - 具体越好,但**不要用真实客户名或披露租户细节**
2. **不试图记住所有模块** —— 挑 3-4 个你最熟的深挖,其他留成"如果被问再看"
3. **交叉议题是面试锚点** —— 面试官问"你怎么理解产品落地的困难",从议题 1-5 里挑一个,配一句你自己的经历
4. **不要在文档里预留统计或百分比** —— 只讲你有证据的观察

---

## 建议深挖顺序

从你可能最熟的开始:

1. **RBP + Target Population**
2. **MDF · Workflow / Rules / Objects**
3. **Recruiting · Job Requisition**
4. **IAS / SSO / SAML**
5. **DRTM / 合规咨询的引导**(相对陌生但方向重要)
6. **Joule / AI 层**(边界感为主,不必深)

填完 · 你在 Fellowship 面试里就有基于真实支持经验的产品判断,而不是纸面知识。
