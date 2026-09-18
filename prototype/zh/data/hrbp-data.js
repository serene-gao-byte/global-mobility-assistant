/* HRBP 侧数据 · 中文版 */

window.HRBP_DATA = {
  self: {
    name: "Mira Klein",
    role: "HR 业务伙伴 · 中东区",
    photo: "MK"
  },

  queue: [
    { id: "DEMO-REQ-2026-MV-0071", employee: "林晨", route: "上海 → 利雅得", stage: "审批准备中", priority: "high", flag: "key-field-change", primary: true },
    { id: "REQ-2026-MV-0064",      employee: "P. Silva",  route: "圣保罗 → 里斯本", stage: "影响审查中",   priority: "medium" },
    { id: "REQ-2026-MV-0058",      employee: "K. Tanaka", route: "东京 → 新加坡",   stage: "执行中",       priority: "medium" },
    { id: "REQ-2026-MV-0049",      employee: "A. Kumar",  route: "班加罗尔 → 奥斯汀", stage: "交接中",     priority: "low" }
  ],

  linChen: {
    empId: "EMP-CN-2381",
    name: "林晨",
    appId: "APP-2026-ME-0071",
    reqId: "REQ-ME-2044",
    posTitle: "资深方案顾问 — 中东区(利雅得)",
    sourceEntity: "Aurora Industries · 上海总部",
    targetEntity: "Aurora Middle East LLC · 利雅得",
    sourceManager: "Wei Zhang",
    targetManager: "Anna Becker",
    effectiveDate: "2026-11-01",
    contactFreq: "过渡期每周沟通",
    v1ApprovedBy: ["HRBP(源国 · 你本人)", "Payroll ME", "Global Mobility"]
  },

  impactChecklist: [
    { area: "雇佣记录(结束原雇佣 + 目标法人建立新雇佣)",       status: "verified-sim", owner: "HR 运营",           verify: "国际调动参考路径", specialistKey: null },
    { area: "IT 账号供应(身份 / 权限 / 访问角色)",              status: "pending",      owner: "IT 身份团队",       verify: "由 IT 侧负责的里程碑 · 进度可在 IT 视图查看", specialistKey: "IT 账号供应(身份 / 权限 / 访问角色)" },
    { area: "跨境个人数据处理授权",                              status: "pending",      owner: "法务 / 隐私",       verify: "适用规则与具体要求由专业人员评估",             specialistKey: "跨境个人数据处理授权" },
    { area: "MDF 补充记录 + 数据保留标记",                       status: "verified-sim", owner: "HR 运营",           verify: "MDF 割接 · 保留标记已配置",                    specialistKey: null },
    { area: "审批 / 提醒责任分工",                                status: "verified-sim", owner: "HRBP(你本人)",     verify: "详见下方审批流程表",                            specialistKey: null },
    { area: "DRTM 数据保留期(依国家规则)",                       status: "blocked",      owner: "法务 / 税务",       verify: "需沙特侧具体决策 · 本演示范围之外",             specialistKey: null },
    { area: "AI / 文档上下文的适用性重估",                        status: "pending",      owner: "IT 治理",           verify: "割接后计划重新评估",                            specialistKey: null },
    { area: "薪资与福利 + 专业审查",                              status: "pending",      owner: "Payroll ME + Global Mobility", verify: "首个周期计划在 11 月末 · 本地规则与计算由专业人员配置", specialistKey: "薪资与福利 + 专业审查" },
    { area: "本地用工与担保安排",                                  status: "verified-sim", owner: "HR 运营 · 中东区",  verify: "由 Aurora Middle East LLC 担保 · 本地规则由专业人员评估", specialistKey: null }
  ],

  experts: {
    "IT 账号供应(身份 / 权限 / 访问角色)": {
      candidates: [
        { name: "IT 身份团队(队列)", availability: "available", backlog: 1, note: "队列里有 1 个在排的工单" }
      ]
    },
    "跨境个人数据处理授权": {
      candidates: [
        { name: "Sabine Meier(全球法务)", availability: "available", backlog: 0, note: "本周有档期" },
        { name: "Franz Huber(隐私官)",    availability: "busy",      backlog: 4, note: "队列里 4 单 · 下一个档期 9 月 22 日" }
      ]
    },
    "薪资与福利 + 专业审查": {
      candidates: [
        { name: "Payroll ME 团队",         availability: "constrained", backlog: 3, note: "3 单待处理 · 建议下周一开始" },
        { name: "Global Mobility · Nikola", availability: "available",   backlog: 1, note: "可以立刻开始" }
      ]
    }
  },

  approvals: [
    { flow: "招聘 — Offer 审批",           version: "Offer v2",       status: "approved",       owners: "招聘经理 · 中东区薪酬" },
    { flow: "HR — 国际调动工作流",         version: "MoveRequest v1", status: "pending-submit", owners: "HRBP(源国)· HRBP(目标国)· Payroll ME" },
    { flow: "MDF — 补充调动信息",           version: "MDF v1",         status: "pending-submit", owners: "HR 运营" }
  ],

  performancePrepAgent: {
    for: "Wei Zhang(当前经理 · 上海总部)",
    purpose: "为林晨的调动前发展谈话做准备:目标、成就、反馈、来源与期间。",
    note: "已文档化的原生 AI 能力 · 在此仅作为相关能力示意 · 本原型未重建。跨角色分享需要单独授权。"
  }
};
