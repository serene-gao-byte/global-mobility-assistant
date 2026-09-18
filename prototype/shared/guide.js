/* ============================================================
   Guidance layers · JS
   Provides: role ribbon, hint bubbles, guide overlay, first-visit auto-show.
   Uses sessionStorage keys so users see intro once per browser session.
============================================================ */

const GUIDE_STORAGE = "gma-guide-seen";
const RIBBON_STORAGE = "gma-ribbon-dismissed";
const HINT_STORAGE = "gma-hint-seen";
const JOULE_ONBOARD_STORAGE = "gma-joule-onboarded";

function _readSet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) { return new Set(); }
}
function _writeSet(key, set) {
  sessionStorage.setItem(key, JSON.stringify(Array.from(set)));
}

// -------- Layer 2 · Role context ribbon --------
const ROLE_RIBBON_CONTENT = {
  employee: {
    icon: "👤",
    text: "You are viewing as <b>林晨 (Lin Chen)</b> — Senior Solution Consultant at Aurora Shanghai HQ. You just received a new job opportunity in Riyadh."
  },
  hrbp: {
    icon: "👤",
    text: "You are viewing as <b>Mira Klein</b> — HRBP for the Middle East. Your inbox has 4 active move requests; Lin Chen's is high priority."
  },
  it: {
    icon: "👤",
    text: "You are viewing as <b>Tom Reeves</b> — IT Admin for Identity &amp; Access. You monitor identity and provisioning alerts across tenants."
  }
};

function mountRoleRibbon(role) {
  const cfg = ROLE_RIBBON_CONTENT[role];
  if (!cfg) return;
  const dismissed = _readSet(RIBBON_STORAGE);
  if (dismissed.has(role)) return;

  const ribbon = document.createElement("div");
  ribbon.className = "role-ribbon";
  ribbon.innerHTML = `
    <span class="rr-icon">${cfg.icon}</span>
    <div class="rr-text">${cfg.text}</div>
    <button class="rr-close" title="Dismiss">✕</button>
  `;
  // Insert after topbar / topbar-divider
  const topbar = document.querySelector(".topbar");
  const divider = document.querySelector(".topbar-divider");
  const anchor = divider || topbar;
  if (anchor && anchor.parentNode) {
    anchor.parentNode.insertBefore(ribbon, anchor.nextSibling);
  } else {
    document.body.insertBefore(ribbon, document.body.firstChild);
  }
  ribbon.querySelector(".rr-close").addEventListener("click", () => {
    ribbon.classList.add("hidden");
    dismissed.add(role);
    _writeSet(RIBBON_STORAGE, dismissed);
  });
}

// -------- Layer 3 · Hint bubbles --------
/**
 * showHint({ id, title, body, anchor: 'top-right'|'bottom-right'|'bottom-center', offset })
 * Anchored to viewport corners. Each hint id is shown at most once per session.
 */
function showHint(cfg) {
  const seen = _readSet(HINT_STORAGE);
  if (seen.has(cfg.id)) return;

  const el = document.createElement("div");
  el.className = "hint-bubble";
  el.innerHTML = `
    <button class="hb-close" title="Dismiss">✕</button>
    ${cfg.title ? `<span class="hb-title">${cfg.title}</span>` : ""}
    <div class="hb-body">${cfg.body}</div>
  `;
  // Position
  const pos = cfg.anchor || "bottom-right";
  const offset = cfg.offset || 24;
  if (pos === "bottom-right") {
    el.style.right = offset + "px";
    el.style.bottom = (offset + 24) + "px";
  } else if (pos === "top-right") {
    el.style.right = offset + "px";
    el.style.top = (offset + 80) + "px";
  } else if (pos === "bottom-center") {
    el.style.left = "50%";
    el.style.transform = "translateX(-50%)";
    el.style.bottom = (offset + 60) + "px";
  } else if (pos === "top-left") {
    el.style.left = offset + "px";
    el.style.top = (offset + 80) + "px";
  }
  document.body.appendChild(el);
  el.querySelector(".hb-close").addEventListener("click", () => {
    el.classList.add("hidden");
    seen.add(cfg.id);
    _writeSet(HINT_STORAGE, seen);
  });
  // Auto-dismiss after 20 seconds if user doesn't close it (still records "seen")
  setTimeout(() => {
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
      seen.add(cfg.id);
      _writeSet(HINT_STORAGE, seen);
    }
  }, 20000);
}

// -------- Layer 4 · Joule onboarding flag --------
function shouldOnboardJoule(role) {
  const seen = _readSet(JOULE_ONBOARD_STORAGE);
  return !seen.has(role);
}
function markJouleOnboarded(role) {
  const seen = _readSet(JOULE_ONBOARD_STORAGE);
  seen.add(role);
  _writeSet(JOULE_ONBOARD_STORAGE, seen);
}

// -------- Layer 5 · Guide overlay --------
const GUIDE_STEPS = [
  {
    role: "employee",
    title: "Discover",
    body: "Lin Chen sees a job recommendation on her Home page and clicks in for details."
  },
  {
    role: "employee",
    title: "Analyze (Pause #1)",
    body: "She asks Joule to analyze the role for her development. Joule compares strengths, gaps, trade-offs — but names what only she can weigh.",
    pause: true
  },
  {
    role: "hrbp",
    title: "Route specialist (Pause #2)",
    body: "HR sees the request. Joule recommends by responsibility → qualification → authorization → capacity. HR decides.",
    pause: true
  },
  {
    role: "hrbp",
    title: "Edit request → Trigger execution",
    body: "HR changes the effective date. Joule names who needs to re-sign and what to check separately. Approvals go through; execution starts."
  },
  {
    role: "it",
    title: "Identity review (Pause #3)",
    body: "IT sees a high-severity alert. Joule observes multiple candidate records — does not propose an operation. Case routes to governance.",
    pause: true
  }
];

function _buildGuideOverlay() {
  const stepsHTML = GUIDE_STEPS.map((s, i) => `
    <div class="guide-step ${s.pause ? "pause" : ""}">
      <div class="guide-step-num">${i + 1}</div>
      <div class="guide-step-content">
        <span class="guide-step-role ${s.role}">${s.role.toUpperCase()}</span>
        <h4>${s.title}</h4>
        <p>${s.body}</p>
      </div>
    </div>
  `).join("");

  return `
    <div class="guide-overlay hidden" id="guideOverlay">
      <div class="guide-panel">
        <div class="guide-panel-header">
          <div>
            <h2>How this demo works</h2>
            <div class="guide-sub">5 steps · 3 roles · about 5 minutes end-to-end</div>
          </div>
          <button class="guide-close" id="guideClose" title="Close">✕</button>
        </div>
        <div class="guide-panel-body">
          <div class="guide-context">
            <strong>Background.</strong> Aurora Industries is riding the Vision 2030 wave into Saudi Arabia,
            opening its first Middle East subsidiary in Riyadh to deliver utility-scale energy-storage projects.
            Behind every cross-border expansion is a harder problem — moving the right <em>people, workflows, and access</em> safely, together.
            Global Mobility Assistant is AI built for that moment: an accelerator for Chinese enterprises going global,
            one that helps each role advance and knows exactly where to pause.
          </div>
          <div class="guide-steps">${stepsHTML}</div>
          <div class="guide-pauses">
            <h3>The 3 intentional pauses — the theme of this demo</h3>
            <ol>
              <li><strong>Employee's career analysis</strong> — Joule compares (strengths / gaps / trade-offs) but names what only the employee can weigh.</li>
              <li><strong>HRBP's specialist routing</strong> — Joule recommends by responsibility → qualification → authorization → capacity. HR decides.</li>
              <li><strong>IT's identity case</strong> — Joule observes and routes to governance. It does not propose an operation.</li>
            </ol>
          </div>
        </div>
        <div class="guide-actions">
          <button class="guide-btn" id="guideDismiss">Got it — let me explore</button>
          <button class="guide-btn primary" id="guideStartEmployee">Start with the Employee view →</button>
        </div>
      </div>
    </div>
  `;
}

function mountGuideOverlay(opts) {
  opts = opts || {};
  // Inject overlay markup
  const wrap = document.createElement("div");
  wrap.innerHTML = _buildGuideOverlay();
  document.body.appendChild(wrap.firstElementChild);

  const overlay = document.getElementById("guideOverlay");
  const seen = _readSet(GUIDE_STORAGE);
  const isFirstVisit = !seen.has("intro");

  function show() {
    overlay.classList.remove("hidden");
    // Mark trigger as seen (removes pulse dot)
    document.querySelectorAll(".guide-trigger").forEach(t => t.classList.add("seen"));
  }
  function hide() {
    overlay.classList.add("hidden");
    seen.add("intro");
    _writeSet(GUIDE_STORAGE, seen);
  }

  document.getElementById("guideClose").addEventListener("click", hide);
  document.getElementById("guideDismiss").addEventListener("click", hide);
  const startBtn = document.getElementById("guideStartEmployee");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      hide();
      // If we're not already on employee's home, navigate there
      if (!/(home|employee)\.html/i.test(location.pathname)) {
        location.href = "home.html";
      }
    });
  }

  // Close on overlay backdrop click (but not on panel click)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) hide();
  });

  // Wire up trigger buttons
  document.querySelectorAll(".guide-trigger").forEach(t => {
    t.addEventListener("click", (e) => {
      e.preventDefault();
      show();
    });
    if (!isFirstVisit) t.classList.add("seen");
  });

  // Auto-show on first visit (unless disabled)
  if (isFirstVisit && !opts.suppressAutoShow) {
    setTimeout(show, 400);
  }

  return { show, hide };
}

// Helper: inject a Guide button into topbar-icons if there's a slot
function injectGuideButton() {
  const iconsContainer = document.querySelector(".topbar-icons");
  if (!iconsContainer) return;
  // Insert before the role-chip / avatar
  const roleChip = iconsContainer.querySelector(".role-chip");
  const avatar = iconsContainer.querySelector(".avatar");
  const insertBefore = roleChip || avatar || null;

  const btn = document.createElement("span");
  btn.className = "tb-icon guide-trigger";
  btn.title = "How this demo works";
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
    <span class="guide-trigger-dot"></span>
  `;
  if (insertBefore) {
    iconsContainer.insertBefore(btn, insertBefore);
  } else {
    iconsContainer.appendChild(btn);
  }
}

window.GUIDE = {
  mountRoleRibbon,
  showHint,
  shouldOnboardJoule,
  markJouleOnboarded,
  mountGuideOverlay,
  injectGuideButton
};
