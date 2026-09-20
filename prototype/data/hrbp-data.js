/* ============================================================
   HRBP data — Talent Operations perspective (multi-step path)
   Scenario: Aurora Industries · Shanghai HQ → Riyadh subsidiary
============================================================ */

window.HRBP_DATA = {
  self: {
    name: "Mira Klein",
    role: "HR Business Partner · Middle East",
    photo: "MK"
  },

  queue: [
    { id: "DEMO-REQ-2026-MV-0071", employee: "林晨 (Lin Chen)", route: "Shanghai → Riyadh", stage: "Approval preparation", priority: "high", flag: "key-field-change", primary: true },
    { id: "REQ-2026-MV-0064",      employee: "P. Silva",         route: "São Paulo → Lisbon", stage: "Impact review",       priority: "medium" },
    { id: "REQ-2026-MV-0058",      employee: "K. Tanaka",        route: "Tokyo → Singapore",  stage: "Execution",           priority: "medium" },
    { id: "REQ-2026-MV-0049",      employee: "A. Kumar",         route: "Bangalore → Austin", stage: "Handoff",             priority: "low" }
  ],

  linChen: {
    empId: "EMP-CN-2381",
    name: "林晨 (Lin Chen)",
    appId: "APP-2026-ME-0071",
    reqId: "REQ-ME-2044",
    posTitle: "Senior Solution Consultant — Middle East (Riyadh)",
    sourceEntity: "Aurora Industries (Shanghai HQ)",
    targetEntity: "Aurora Middle East LLC (Riyadh)",
    sourceManager: "Wei Zhang",
    targetManager: "Anna Becker",
    effectiveDate: "2026-11-01",
    contactFreq: "Weekly during transition",
    v1ApprovedBy: ["HRBP (source, self)", "Payroll ME", "Global Mobility"]
  },

  // Cross-system impact checklist — 9 items
  impactChecklist: [
    { area: "Employment record (end + rehire in HR system)",                    status: "verified-sim", owner: "HR Ops",              verify: "International transfer reference path", specialistKey: null },
    { area: "IT account provisioning (IAS / IPS / RBP)",                        status: "pending",      owner: "IT Identity",         verify: "Milestone owned by IT — see progress in IT view",   specialistKey: "IT account provisioning (IAS / IPS / RBP)" },
    { area: "Cross-border data handling authorization",                          status: "pending",      owner: "Legal / Privacy",     verify: "Applicable frameworks and specific requirements evaluated by qualified specialists", specialistKey: "Cross-border data handling authorization" },
    { area: "MDF supplemental records + retention flags",                       status: "verified-sim", owner: "HR Ops",              verify: "MDF cutover with retention flags",                  specialistKey: null },
    { area: "Approval / reminder responsibility split",                         status: "verified-sim", owner: "HRBP (self)",         verify: "See approval stream table below",                   specialistKey: null },
    { area: "DRTM retention (country-specific)",                                status: "blocked",      owner: "Legal / Tax",         verify: "Requires SA-specific decision — out of demo scope", specialistKey: null },
    { area: "AI / document context relevance",                                  status: "pending",      owner: "IT Governance",       verify: "Post-cutover re-evaluation scheduled",              specialistKey: null },
    { area: "Payroll & benefits + specialist review",                           status: "pending",      owner: "Payroll ME + GM",     verify: "First cycle scheduled end of Nov; local rules and calculations configured by specialists",   specialistKey: "Payroll & benefits + specialist review" },
    { area: "Local workforce & sponsorship arrangements",                       status: "verified-sim", owner: "HR Ops ME",           verify: "Sponsorship under Aurora Middle East LLC; local regulatory specifics evaluated by qualified specialists", specialistKey: null }
  ],

  // Expert availability — AI is aware of who's busy
  experts: {
    "IT account provisioning (IAS / IPS / RBP)": {
      candidates: [
        { name: "IT Identity Team (queue)", availability: "available", backlog: 1, note: "1 open ticket ahead of yours" }
      ]
    },
    "Cross-border data transfer authorization (CN → SA)": {
      candidates: [
        { name: "Sabine Meier (Legal, Global)", availability: "available", backlog: 0, note: "Available this week" },
        { name: "Franz Huber (Privacy Officer)", availability: "busy", backlog: 4, note: "4 items in queue · next slot Sep 22" }
      ]
    },
    "Payroll & benefits + specialist review": {
      candidates: [
        { name: "Payroll ME team", availability: "constrained", backlog: 3, note: "3 items backlog · specialist recommends starting next Monday" },
        { name: "Global Mobility (Nikola)", availability: "available", backlog: 1, note: "Can start immediately" }
      ]
    }
  },

  approvals: [
    { kind: "recruiting", flow: "Recruiting — Offer Approval",           version: "Offer v2",          status: "approved",       owners: "Hiring Manager · ME Compensation" },
    { kind: "hr",          flow: "HR — International Transfer Workflow",  version: "MoveRequest v1",    status: "pending-submit", owners: "HRBP (source) · HRBP (target) · Payroll ME" },
    { kind: "mdf",         flow: "MDF — Supplemental Move Info",          version: "MDF v1",            status: "pending-submit", owners: "HR Ops" }
  ],

  performancePrepAgent: {
    for: "Wei Zhang (current manager, Shanghai HQ)",
    purpose: "Prepare development conversation with Lin Chen ahead of the move — goals, achievements, feedback, sources & periods.",
    note: "Documented native AI · shown here only as a related capability. Not rebuilt in this prototype. Cross-role share requires separate authorization."
  }
};
