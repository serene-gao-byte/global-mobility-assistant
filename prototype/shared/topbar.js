/* ============================================================
   Top bar renderer — used by all 3 role pages.
   role: "employee" | "hrbp" | "it"
============================================================ */

const ROLE_CONFIG = {
  employee: {
    app: "Career Opportunities",
    avatarInitials: "LC",
    avatarName: "林晨 · Lin Chen",
    chip: "Employee view",
    icons: ["search", "insight", "joule", "notif"],
  },
  hrbp: {
    app: "Talent Operations",
    avatarInitials: "MK",
    avatarName: "Mira Klein · HRBP",
    chip: "HRBP view",
    icons: ["search", "insight", "joule", "notif"],
  },
  it: {
    app: "Identity & Access",
    avatarInitials: "TR",
    avatarName: "Tom Reeves · IT Admin",
    chip: "IT Admin view",
    icons: ["search", "insight", "joule", "alert"],
  }
};

function renderTopbar(role) {
  const cfg = ROLE_CONFIG[role];
  const iconsHTML = cfg.icons.map(t => {
    if (t === "search") return `<span class="tb-icon" title="Search">🔍</span>`;
    if (t === "insight") return `<span class="tb-icon" title="Insights">💡</span>`;
    if (t === "joule") return `
      <span class="tb-icon" id="jouleTrigger" title="Ask Joule">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
          <path d="M12 2 L21 9 L12 22 L3 9 Z" />
          <path d="M3 9 L21 9" />
          <path d="M12 2 L8 9 L12 22" />
          <path d="M12 2 L16 9 L12 22" />
        </svg>
      </span>`;
    if (t === "notif") return `
      <span class="tb-icon" id="notifIcon" title="Notifications">
        <span style="font-size:15px;">🔔</span>
        <span class="badge" id="notifBadge" style="display:none;"></span>
      </span>`;
    if (t === "alert") return `
      <span class="tb-icon" id="notifIcon" title="Alerts">
        <span style="font-size:15px;">⚠</span>
        <span class="badge" id="notifBadge" style="display:none;"></span>
      </span>`;
    return "";
  }).join("");

  return `
    <div class="topbar">
      <div class="brand">
        <span class="brand-logo">SAP</span>
        <span class="brand-suffix">SUCCESS MAP</span>
      </div>
      <div class="app-selector">
        <span>${cfg.app}</span>
        <span class="caret">▾</span>
      </div>
      <div class="searchbar">Search for actions or people</div>
      <div class="topbar-icons">
        ${iconsHTML}
        <span class="role-chip">${cfg.chip}</span>
        <span class="avatar ${role}" title="${cfg.avatarName}">${cfg.avatarInitials}</span>
      </div>
    </div>
  `;
}

function setNotifBadge(count) {
  const b = document.getElementById("notifBadge");
  if (!b) return;
  if (count > 0) { b.textContent = count; b.style.display = "inline-block"; }
  else { b.style.display = "none"; }
}

window.TOPBAR = { renderTopbar, setNotifBadge };
