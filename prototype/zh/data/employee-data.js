/* 员工侧数据 · 中文版
   林晨从 Aurora 上海调往利雅得的场景 · 内容 100% 原创中文改写 */

window.EMPLOYEE_DATA = {
  self: {
    id: "EMP-CN-2381",
    name: "林晨",
    currentTitle: "资深方案顾问",
    currentOrg: "Aurora Industries · 上海总部",
    country: "中国",
    photo: "LC"
  },

  opportunities: [
    {
      id: "JOB-ME-SC-14",
      title: "资深方案顾问 — 中东区(利雅得)",
      location: "利雅得,沙特阿拉伯",
      entity: "Aurora Middle East LLC",
      type: "全职 · 内部调动",
      posted: "2026-07-15",
      matchScore: "高度匹配",
      matchColor: "green",
      summary: "加入利雅得储能交付团队,担任资深个人贡献者岗位。要求可再生能源与 BESS 领域经验,阿拉伯语工作能力优先(非硬性),英语必备。",
      highlight: true,
      requirements: [
        "8 年以上企业级方案顾问经验(能源或制造业方向)",
        "公用事业级储能或光伏项目交付经验",
        "适应沙特化(Saudization)用工监管环境",
        "阿拉伯语客户沟通能力 · 优先项,非硬性要求"
      ],
      responsibilities: [
        "牵头沙特公用事业与工业客户的售前工作坊",
        "与区域 BD 合作 · 交付 100–300 MWh 级储能方案",
        "将中东区域的产品反馈回流总部产品线"
      ]
    },
    {
      id: "JOB-SG-CS-08",
      title: "客户成功经理 — 亚太区",
      location: "新加坡",
      entity: "Aurora Asia Pte Ltd",
      type: "全职 · 内部调动",
      posted: "2026-08-02",
      matchScore: "部分匹配",
      matchColor: "yellow",
      summary: "亚太企业客户 CSM 岗位 · 更偏交付而非售前。"
    },
    {
      id: "JOB-CN-SC-22",
      title: "方案顾问团队负责人 — 大中华区",
      location: "上海,中国",
      entity: "Aurora Industries · 上海总部",
      type: "全职 · 平级调动",
      posted: "2026-08-20",
      matchScore: "高度匹配",
      matchColor: "green",
      summary: "总部团队 lead 岗位 · 更靠近家庭 · 属于管理线转型。"
    },
    {
      id: "JOB-EU-PM-05",
      title: "产品经理 — 储能平台",
      location: "慕尼黑,德国",
      entity: "Aurora Europe GmbH",
      type: "全职 · 跨职能",
      posted: "2026-08-25",
      matchScore: "拓展方向",
      matchColor: "grey",
      summary: "产品经理岗 · 从 SC 转 PM 属于路线切换 · 上手期较长。"
    }
  ],

  evidence: [
    {
      req: "能源或制造业方向的企业级方案顾问经验",
      match: "2024–2025 主导 3 个中国国有电力集团的公用事业级储能项目售前",
      source: "system", srcLabel: "CRM 2024-CN-BESS-018", period: "2024-04 → 2025-01"
    },
    {
      req: "阿拉伯语客户沟通能力",
      match: "作为观察员/翻译支持,参与过一次海湾地区客户的跨区工作坊",
      source: "self", srcLabel: "员工自述", period: "2025-06",
      note: "系统内无正式合作记录 · 招聘环节需要核实"
    },
    {
      req: "公用事业级储能 / 光伏项目经验",
      match: "Aurora BESS 平台认证(2022 取证 · 2025 复审)",
      source: "system", srcLabel: "Learning Hub CERT-BESS-224801", period: "2022-11 · 2025-05 复审"
    },
    {
      req: "跨文化 / 跨境项目经验",
      match: "在授权范围内的系统记录里未找到相关项目",
      source: "unverified", srcLabel: "无来源", period: "—",
      note: "记录里没有 ≠ 实际没有 · 可以在候选人档案里补充"
    }
  ],

  interviews: [
    { round: "第一轮 · 招聘筛选",       with: "招聘方 · Tim Weiss",              date: "2026-08-11", status: "done", modality: "视频" },
    { round: "第二轮 · 目标经理面",     with: "Anna Becker(利雅得目标经理)",  date: "2026-08-18", status: "done", modality: "视频" },
    { round: "第三轮 · 案例研讨",       with: "评审组 · 2 位资深方案顾问",       date: "2026-08-25", status: "done", modality: "现场(利雅得)" }
  ],

  interviewPrep: {
    questions: [
      "你会如何为沙特某公用事业客户设计一次 90 天的项目发现阶段?",
      "描述一次你把强监管行业的需求,转化为可交付方案的经历?",
      "如果客户 demo 现场发现某个本地化功能缺失,你会如何应对?"
    ],
    reverse: [
      "利雅得的方案团队按区域组织还是按行业垂直组织?",
      "跨国调动到岗后,通常会有什么样的 ramp-up 支持?",
      "中东区域客户的反馈,如何进入产品路线图?"
    ]
  },

  application: {
    id: "APP-2026-ME-0071",
    reqId: "REQ-ME-2044",
    submittedOn: "2026-08-04",
    trackerStages: [
      { key: "submitted",   label: "申请已提交",         date: "8 月 4 日" },
      { key: "screening",   label: "初筛",               date: "8 月 8 日" },
      { key: "interviews",  label: "面试",               date: "8 月 11–25 日" },
      { key: "offer",       label: "收到 Offer",         date: "8 月 28 日" },
      { key: "moveprep",    label: "调动准备",           date: "进行中" },
      { key: "approvals",   label: "正式审批",           date: "下一步" },
      { key: "startwork",   label: "新岗位入职",         date: "11 月 1 日" }
    ]
  },

  personalImpact: {
    compensation: {
      current: { base: "人民币 480,000 / 年", freq: "按月", bonus: "15% 目标奖金",
                 components: "基本工资 + 目标奖金 + 餐补",
                 version: "2025 年度调整", date: "2025-04-01 生效" },
      proposed: { base: "沙特里亚尔 360,000 / 年", freq: "按月", bonus: "18% 目标奖金",
                  components: "基本工资 + 目标奖金 + 住房补贴 + 一次性搬迁补偿",
                  version: "Offer v2 · 已向你披露",
                  date: "拟 2026-11-01 生效" }
    },
    reporting: {
      current: "汇报给 Wei Zhang(上海总部方案顾问团队)",
      proposed: "汇报给 Anna Becker(中东区方案顾问团队)"
    },
    workLocation: "利雅得,沙特阿拉伯 — 阿卜杜拉国王金融区,4 号楼,12 层"
  },

  myActions: [
    { title: "确认你的入职时间偏好",              state: "done",   date: "9 月 5 日" },
    { title: "签署数据保护同意书(法务提供表单)",  state: "todo",   date: "10 月 20 日前" },
    { title: "填写入职前信息与签证材料表",        state: "todo",   date: "10 月 25 日前" },
    { title: "预约 Global Mobility 团队搬迁咨询", state: "info",   date: "与 Global Mobility 团队联系" }
  ]
};
