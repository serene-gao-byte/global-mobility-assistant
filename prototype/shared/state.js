/* ============================================================
   Cross-tab shared state via localStorage — v3 (multi-step)
   Includes: step tracking per role, cross-role signals, expert routing
============================================================ */

const GMA_STATE_KEY = "gma-state-v3";

const DEFAULT_STATE = {
  scenario: "lin-chen-2026-de",
  moveRequestId: "DEMO-REQ-2026-MV-0071",
  applicationId: "APP-2026-DE-0071",
  reqId: "REQ-DE-2044",

  // ---------- Employee journey ----------
  employeeStep: "browse",           // browse | detail | apply | tracking | mymove
  employeeApplied: false,
  employeeShortlistedJobs: ["JOB-DE-SC-14"],
  interviewsScheduled: false,
  interviewsCompleted: false,

  // ---------- Move request state ----------
  moveRequestVersion: 1,
  effectiveDate: "2026-11-01",
  v1ConfirmedBy: ["HRBP (source)", "Payroll ME", "Global Mobility"],
  invalidatedByEdit: false,
  v2Generated: false,
  v2Reconfirmed: false,

  // ---------- HRBP journey ----------
  hrbpStep: "inbox",                // inbox | detail | impact | edit | approvals | handoff
  specialistsRouted: {              // area -> routed?
    "IT account provisioning (IAS / IPS / RBP)": false,
    "Historical data / attachments authorization": false,
    "Payroll & benefits + specialist review": false
  },

  // Approvals + execution
  approvalsSubmitted: false,
  approvalsApproved: false,
  specialistSigned: false,
  executionStarted: false,
  provisioningIssue: false,
  iasConflictResolved: false,
  receiptSubmitted: false,

  // ---------- IT journey ----------
  itStep: "console",                // console | alertDetail | queue | diagnose | receipt

  // ---------- Cross-role signals ----------
  // Signal from employee to HRBP (info only, never a commitment)
  signals: [],   // { from, to, kind, text, timestamp, acked }

  // ---------- Notifications badges (roll-up) ----------
  notifications: { employee: 0, hrbp: 0, it: 0 },

  lastUpdated: new Date().toISOString(),
  lastEvent: "initial"
};

function loadState() {
  try {
    const raw = localStorage.getItem(GMA_STATE_KEY);
    if (!raw) {
      localStorage.setItem(GMA_STATE_KEY, JSON.stringify(DEFAULT_STATE));
      return JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
    return Object.assign(JSON.parse(JSON.stringify(DEFAULT_STATE)), JSON.parse(raw));
  } catch (e) {
    console.error("loadState failed", e);
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState(state, eventName) {
  state.lastUpdated = new Date().toISOString();
  if (eventName) state.lastEvent = eventName;
  localStorage.setItem(GMA_STATE_KEY, JSON.stringify(state));
}

function resetState() {
  localStorage.setItem(GMA_STATE_KEY, JSON.stringify(DEFAULT_STATE));
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function onStateChange(cb) {
  window.addEventListener("storage", (ev) => {
    if (ev.key !== GMA_STATE_KEY) return;
    try {
      const newState = ev.newValue ? JSON.parse(ev.newValue) : DEFAULT_STATE;
      const oldState = ev.oldValue ? JSON.parse(ev.oldValue) : DEFAULT_STATE;
      cb(newState, oldState);
    } catch (e) { console.error(e); }
  });
}

function mutateState(updater, eventName) {
  const s = loadState();
  updater(s);
  saveState(s, eventName);
  return s;
}

// Route helpers — hash-based navigation per role
function currentStep(defaultStep) {
  const h = (location.hash || "").replace("#", "");
  return h || defaultStep;
}
function goStep(step) {
  location.hash = "#" + step;
}

window.GMA = { loadState, saveState, resetState, onStateChange, mutateState, currentStep, goStep, DEFAULT_STATE };
