/* ============================================================
   Employee data — Lin Chen's perspective (multi-step path)
   Scenario: Aurora Industries · Shanghai HQ → Riyadh subsidiary
============================================================ */

window.EMPLOYEE_DATA = {
  self: {
    id: "EMP-CN-2381",
    name: "林晨 (Lin Chen)",
    currentTitle: "Senior Solution Consultant",
    currentOrg: "Aurora Industries (Shanghai HQ)",
    country: "China",
    photo: "LC"
  },

  // Career Opportunities marketplace — 4 sample roles
  opportunities: [
    {
      id: "JOB-ME-SC-14",
      title: "Senior Solution Consultant — Middle East (Riyadh)",
      location: "Riyadh, Saudi Arabia",
      entity: "Aurora Middle East LLC",
      type: "Full-time · Internal transfer",
      posted: "2026-07-15",
      matchScore: "Strong match",
      matchColor: "green",
      summary: "Support the Riyadh energy-storage delivery team as a senior IC. Renewable / BESS domain expertise required. Arabic preferred (not required), English required.",
      highlight: true,
      requirements: [
        "8+ years enterprise solution consulting in energy or manufacturing",
        "Utility-scale storage or PV project experience",
        "Comfort working within local workforce regulations (specifics evaluated by HR)",
        "Arabic-language client interaction — preferred, not required"
      ],
      responsibilities: [
        "Lead pre-sales workshops with Saudi utility and industrial prospects",
        "Partner with regional BD on 100–300 MWh storage proposals",
        "Contribute to Middle East regional product feedback loop"
      ]
    },
    {
      id: "JOB-SG-CS-08",
      title: "Customer Success Manager — APAC",
      location: "Singapore",
      entity: "Aurora Asia Pte Ltd",
      type: "Full-time · Internal transfer",
      posted: "2026-08-02",
      matchScore: "Partial match",
      matchColor: "yellow",
      summary: "CSM for APAC enterprise accounts. Requires post-sales delivery focus rather than pre-sales."
    },
    {
      id: "JOB-CN-SC-22",
      title: "Solution Consultant Lead — Greater China",
      location: "Shanghai, China",
      entity: "Aurora Industries (Shanghai HQ)",
      type: "Full-time · Lateral",
      posted: "2026-08-20",
      matchScore: "Strong match",
      matchColor: "green",
      summary: "Team lead role at HQ. Keeps you close to family; a management-track move."
    },
    {
      id: "JOB-EU-PM-05",
      title: "Product Manager — Storage Platform",
      location: "Munich, Germany",
      entity: "Aurora Europe GmbH",
      type: "Full-time · Cross-functional",
      posted: "2026-08-25",
      matchScore: "Aspirational",
      matchColor: "grey",
      summary: "PM role. Would be a track change — SC to PM. Long ramp expected."
    }
  ],

  // Evidence match (for detail page)
  evidence: [
    {
      req: "Enterprise solution consulting in energy or manufacturing",
      match: "Led pre-sales for 3 utility-scale storage pursuits with Chinese state-owned power groups (2024–2025)",
      source: "system", srcLabel: "CRM 2024-CN-BESS-018", period: "2024-04 → 2025-01"
    },
    {
      req: "Arabic-language client interaction",
      match: "Supported one cross-region workshop with a GCC prospect (as observer / translator support)",
      source: "self", srcLabel: "Self-reported", period: "2025-06",
      note: "System has no formal engagement record — will need verification during hiring"
    },
    {
      req: "Utility-scale storage / PV project experience",
      match: "Certified in the Aurora BESS Platform (2022), refreshed 2025",
      source: "system", srcLabel: "Learning Hub CERT-BESS-224801", period: "2022-11, refreshed 2025-05"
    },
    {
      req: "Cross-cultural / cross-border project experience",
      match: "Not found in authorized records for this scope",
      source: "unverified", srcLabel: "No source", period: "—",
      note: "Absent from records does not mean absent in fact — you can add via Candidate Profile"
    }
  ],

  // Interview details
  interviews: [
    { round: "R1 · Screening",       with: "Recruiting (Tim Weiss)",             date: "2026-08-11", status: "done", modality: "Video" },
    { round: "R2 · Hiring manager",  with: "Anna Becker (target manager, Riyadh)", date: "2026-08-18", status: "done", modality: "Video" },
    { round: "R3 · Case discussion", with: "Panel · 2 senior SCs",               date: "2026-08-25", status: "done", modality: "Onsite (Riyadh)" }
  ],

  interviewPrep: {
    questions: [
      "How would you structure a 90-day discovery with a Saudi utility client?",
      "Describe a time you translated a regulated-industry requirement into a solution design.",
      "How would you handle a live localization gap during a client demo in Riyadh?"
    ],
    reverse: [
      "How is the Riyadh solution team structured — regional or vertical?",
      "What is the typical ramp-up support for a new international transfer?",
      "How does customer feedback from the ME region feed back into product roadmap?"
    ]
  },

  application: {
    id: "APP-2026-ME-0071",
    reqId: "REQ-ME-2044",
    submittedOn: "2026-08-04",
    trackerStages: [
      { key: "submitted",   label: "Application submitted",   date: "Aug 4"   },
      { key: "screening",   label: "Screening",               date: "Aug 8"   },
      { key: "interviews",  label: "Interviews",              date: "Aug 11-25" },
      { key: "offer",       label: "Offer received",          date: "Aug 28"  },
      { key: "moveprep",    label: "Move preparation",        date: "in progress" },
      { key: "approvals",   label: "Formal approvals",        date: "next" },
      { key: "startwork",   label: "Start at new entity",     date: "Nov 1" }
    ]
  },

  personalImpact: {
    compensation: {
      current: { base: "CNY 480,000/yr", freq: "Monthly", bonus: "15% target",
                 components: "Base + Target Bonus + Meal Allowance",
                 version: "2025 review", date: "effective 2025-04-01" },
      proposed: { base: "SAR 360,000/yr", freq: "Monthly", bonus: "18% target",
                  components: "Base + Target Bonus + Housing + Relocation (one-time)",
                  version: "Offer v2 · disclosed to you",
                  date: "proposed effective 2026-11-01" }
    },
    reporting: {
      current: "Wei Zhang (Shanghai HQ Solution Consulting)",
      proposed: "Anna Becker (Middle East Solution Consulting)"
    },
    workLocation: "Riyadh, Saudi Arabia — King Abdullah Financial District, Tower 4, Floor 12"
  },

  myActions: [
    { title: "Confirm your preferred start date",              state: "done",   date: "Sep 5" },
    { title: "Sign data protection consent (form provided by Legal)", state: "todo",   date: "before Oct 20" },
    { title: "Complete pre-arrival + visa information form",   state: "todo",   date: "before Oct 25" },
    { title: "Book relocation appointment",                    state: "info",   date: "with Global Mobility team" }
  ]
};
