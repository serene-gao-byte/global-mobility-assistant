/* IT 侧数据 · 中文版 */

window.IT_DATA = {
  self: {
    name: "Tom Reeves",
    role: "IT 管理员 · 身份与访问",
    photo: "TR"
  },

  alerts: [
    { id: "ALT-2026-091501", severity: "high",   type: "身份映射需人工审查", affects: "EMP-CN-2381",   opened: "2026-11-01 03:14", primary: true },
    { id: "ALT-2026-091488", severity: "medium", type: "属性同步延迟",         affects: "region-eu 租户", opened: "2026-09-14 22:07" },
    { id: "ALT-2026-091482", severity: "low",    type: "SSO 证书即将到期",     affects: "region-jp 租户", opened: "2026-09-14 08:00" }
  ],

  tasks: [
    { id: "EXEC-01", label: "结束原雇佣(HR · 上海总部)",           deps: [],          state: "confirmed",   system: "HR",       owner: "系统" },
    { id: "EXEC-02", label: "建立新雇佣记录(HR · 利雅得法人)",      deps: ["EXEC-01"], state: "confirmed",   system: "HR",       owner: "系统" },
    { id: "EXEC-03", label: "岗位分配 · POS-ME-SC-14",              deps: ["EXEC-02"], state: "confirmed",   system: "HR",       owner: "系统" },
    { id: "EXEC-04", label: "身份供应 · 目标区域",                   deps: ["EXEC-02"], state: "pending-review", system: "Identity", owner: "IT 身份团队(你)",
      note: "自动身份映射未返回单一明确匹配。存在多个候选记录 · 需人工审查。" },
    { id: "EXEC-05", label: "属性同步(源 → 目标)",                  deps: ["EXEC-04"], state: "pending-dep", system: "Identity", owner: "系统" },
    { id: "EXEC-06", label: "撤销源国访问角色",                       deps: ["EXEC-04"], state: "pending-dep", system: "Access",   owner: "系统" },
    { id: "EXEC-07", label: "分配目标国访问角色",                     deps: ["EXEC-05"], state: "pending-dep", system: "Access",   owner: "系统" },
    { id: "EXEC-08", label: "首次登录验证",                           deps: ["EXEC-07"], state: "pending-dep", system: "SSO",      owner: "系统" }
  ],

  diagnosis: {
    observation: "针对用户 'lin.chen' 的自动身份映射,在多个区域返回了多个候选记录。系统无法在没有人工判断的情况下,确定哪条记录是权威的。",
    whyManual: "这些记录是否代表同一个人 · 以及应如何建立关联,属于治理决策。本工具不提议操作路径 —— 相关判断由你的身份治理 / IdP 团队负责,任何数据保护与跨境处理的适用性由具备资质的专业人员评估。",
    whatToDoNext: [
      "确认候选记录是否指向同一个人(身份验证)",
      "如需建立关联,按 IdP 治理策略路由到治理团队决策",
      "跨境数据处理的合规适用性由 法务 / 隐私 专业人员评估 · 不由本工具判定",
      "在治理决策记录之前 · 下游供应任务保持暂停"
    ],
    references: [
      "贵组织 IdP 治理策略(负责人:IT 安全 / 身份团队)",
      "适用的数据保护框架 —— 具体要求由具备资质的专业人员评估"
    ]
  },

  downstream: ["EXEC-05", "EXEC-06", "EXEC-07", "EXEC-08"],

  systemHealth: [
    { name: "身份服务 · 目标区域", state: "degraded",  note: "1 例待人工审查" },
    { name: "身份服务 · 源区域",   state: "healthy",   note: "无待处理项" },
    { name: "属性同步",              state: "healthy",   note: "队列 12 项" },
    { name: "访问角色引擎",          state: "healthy",   note: "无队列积压" },
    { name: "SSO",                    state: "healthy",   note: "平均 240ms" }
  ]
};

window.IT_JOULE_FRAMES = {
  overview: [
    { role: "bot", html: `
      Tom · 早上好。当前告警队列:
      <ul>
        <li>🔴 <strong>1 项高优</strong> · 身份映射需审查(林晨的调动) — <strong>4 项下游任务暂停</strong></li>
        <li>🟡 1 项中优 · 属性同步延迟</li>
        <li>⚪ 1 项低优 · SSO 证书到期</li>
      </ul>
      我可以帮你诊断身份异常、给出建议路径、把结果回执给 HR。<strong>但我不代你合并账号</strong> —— 那需要你的判断。
    `, actions: [
      { label: "诊断身份异常", event: "diagnose" }
    ], sources: 2 }
  ]
};
