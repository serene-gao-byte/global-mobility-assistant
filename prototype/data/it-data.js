/* ============================================================
   IT Admin view data — Identity & Access perspective.
   Scenario: Aurora Industries · region-cn → region-me tenants
============================================================ */

window.IT_DATA = {
  self: {
    name: "Tom Reeves",
    role: "IT Admin · Identity & Access",
    photo: "TR"
  },

  // Alert queue — global IT view
  alerts: [
    { id: "ALT-2026-091501", severity: "high", type: "Identity mapping needs review", affects: "EMP-CN-2381", opened: "2026-11-01 03:14", primary: true },
    { id: "ALT-2026-091488", severity: "medium", type: "IPS sync lag", affects: "region-eu tenant", opened: "2026-09-14 22:07" },
    { id: "ALT-2026-091482", severity: "low", type: "SSO cert expiring", affects: "region-jp tenant", opened: "2026-09-14 08:00" }
  ],

  // Move tasks — dependency-aware queue for Lin Chen
  tasks: [
    { id: "EXEC-01", label: "End source employment (HR · Shanghai HQ)",       deps: [],          state: "confirmed",   system: "HR",  owner: "System" },
    { id: "EXEC-02", label: "New employment record (HR · Riyadh entity)",     deps: ["EXEC-01"], state: "confirmed",   system: "HR",  owner: "System" },
    { id: "EXEC-03", label: "Position assignment · POS-ME-SC-14",             deps: ["EXEC-02"], state: "confirmed",   system: "HR",  owner: "System" },
    { id: "EXEC-04", label: "Identity provisioning · target region",          deps: ["EXEC-02"], state: "pending-review", system: "Identity", owner: "IT Identity (you)",
      note: "Automated identity mapping did not return a single unambiguous match. Multiple candidate records exist — human review required." },
    { id: "EXEC-05", label: "Attribute sync (source → target)",               deps: ["EXEC-04"], state: "pending-dep", system: "Identity", owner: "System" },
    { id: "EXEC-06", label: "Access role revocation (source region)",         deps: ["EXEC-04"], state: "pending-dep", system: "Access", owner: "System" },
    { id: "EXEC-07", label: "Access role assignment (target region)",         deps: ["EXEC-05"], state: "pending-dep", system: "Access", owner: "System" },
    { id: "EXEC-08", label: "First-login verification",                       deps: ["EXEC-07"], state: "pending-dep", system: "SSO", owner: "System" }
  ],

  // Diagnosis — describes symptoms, not root cause; proposes review, not operations
  diagnosis: {
    observation: "Automated identity mapping for user 'lin.chen' returned multiple candidate records across regions. The system cannot determine which record should be authoritative without human judgment.",
    whyManual: "Whether these records represent the same person, and how they should be linked, is a governance decision. This tool does not propose an operational path — that determination belongs to your Identity governance / IdP team, together with any applicable data-protection and cross-border transfer review by qualified specialists.",
    whatToDoNext: [
      "Confirm whether the candidate records correspond to the same person (identity verification)",
      "If linkage is required, route the decision to the Identity governance team per your IdP policy",
      "Any cross-border data handling implications should be reviewed by Legal / Privacy specialists — not by this tool",
      "Downstream provisioning tasks remain paused until the governance decision is recorded"
    ],
    references: [
      "Your organization's IdP governance policy (owner: IT Security / Identity team)",
      "Applicable data-protection frameworks — assessment of specific requirements belongs to qualified specialists"
    ]
  },

  // Downstream impact (what will unblock once EXEC-04 resolves)
  downstream: ["EXEC-05", "EXEC-06", "EXEC-07", "EXEC-08"],

  // System health
  systemHealth: [
    { name: "Identity · target region", state: "degraded",  note: "1 case awaiting human review" },
    { name: "Identity · source region", state: "healthy",   note: "no open items" },
    { name: "Attribute sync",           state: "healthy",   note: "queue: 12 items" },
    { name: "Access role engine",       state: "healthy",   note: "no queue backlog" },
    { name: "SSO",                      state: "healthy",   note: "avg 240ms" }
  ]
};

// IT Joule frames — diagnosis-oriented
window.IT_JOULE_FRAMES = {
  overview: [
    { role: "bot", html: `
      Good morning, Tom. Alert queue:
      <ul>
        <li>🔴 <strong>1 high</strong> · Identity mapping needs review (Lin Chen move) — <strong>4 downstream tasks paused</strong></li>
        <li>🟡 1 medium · IPS sync lag</li>
        <li>⚪ 1 low · SSO cert expiring</li>
      </ul>
      I can help diagnose the IAS conflict, suggest a resolution path, and submit receipt back to HR. I cannot merge accounts on your behalf — that requires your action.
    `, actions: [
      { label: "Diagnose IAS conflict", event: "diagnose" }
    ], sources: 2 }
  ]
};
