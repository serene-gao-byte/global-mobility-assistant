/* ============================================================
   Joule panel — step-by-step playback + interactive input
   Frames auto-play or pause on ▸ Continue.
   Input is real: keydown → intent router → preset reply.
============================================================ */

function jouleHTML(role, title) {
  return `
    <aside class="joule-panel open" id="joulePanel">
      <div class="joule-header">
        <span class="book-icon">📖</span>
        <span class="title" id="jouleTitle">${title || "Joule"}</span>
        <button class="h-btn" title="Menu">⋯</button>
        <button class="h-btn" title="Expand">⤢</button>
        <button class="h-btn" id="jouleClose" title="Close">✕</button>
      </div>
      <div class="joule-body" id="jouleBody"></div>
      <div class="joule-continue-slot" id="jouleContinueSlot"></div>
      <div class="joule-suggestions" id="jouleSuggestions"></div>
      <div class="joule-footer">
        <div class="joule-input-wrap">
          <span class="plus">+</span>
          <span class="at">@</span>
          <input id="jouleInput" class="joule-input" type="text" placeholder="Message Joule…" autocomplete="off" />
          <button id="jouleSend" class="send" title="Send">➤</button>
        </div>
      </div>
      <div class="joule-verify">Joule uses AI. Verify results.</div>
    </aside>
  `;
}

// ---- Player state (in-memory per page) ----
const JOULE_STATE = {
  frames: [],
  pos: 0,
  onAction: null,
  autoTimer: null,
  intentRouter: null,   // function(userText) → { reply, actions?, sources? } | null
  suggestions: []       // string[] shown as chips above input
};

function _stopAuto() {
  if (JOULE_STATE.autoTimer) { clearTimeout(JOULE_STATE.autoTimer); JOULE_STATE.autoTimer = null; }
}

function _renderShownFrames() {
  const body = document.getElementById("jouleBody");
  body.innerHTML = "";
  const shown = JOULE_STATE.frames.slice(0, JOULE_STATE.pos);
  shown.forEach(f => {
    const cls = f.role === "user" ? "joule-msg user" : "joule-msg bot";
    const m = document.createElement("div");
    m.className = cls;
    m.innerHTML = f.html || f.text;
    body.appendChild(m);
    if (f.role === "bot") {
      const fb = document.createElement("div");
      fb.className = "joule-feedback-row";
      fb.innerHTML = `
        <span title="Copy">📋</span>
        <span title="Like">👍</span>
        <span title="Dislike">👎</span>
        <span title="Insights">💡</span>
        ${f.sources ? `<span class="sources">Sources <span class="badge-num">${f.sources}</span></span>` : ""}
      `;
      body.appendChild(fb);
    }
    if (f.actions) {
      const row = document.createElement("div");
      row.className = "joule-actionrow";
      f.actions.forEach(a => {
        const b = document.createElement("button");
        b.className = "joule-action-btn " + (a.kind === "primary" ? "primary" : "");
        b.textContent = a.label;
        if (a.event) b.addEventListener("click", () => JOULE_STATE.onAction && JOULE_STATE.onAction(a.event, a.meta));
        row.appendChild(b);
      });
      body.appendChild(row);
    }
  });
  body.scrollTop = body.scrollHeight;
  _renderContinueButton();
  _renderSuggestions();
}

function _renderContinueButton() {
  const slot = document.getElementById("jouleContinueSlot");
  slot.innerHTML = "";
  const nextIdx = JOULE_STATE.pos;
  if (nextIdx >= JOULE_STATE.frames.length) return;
  const next = JOULE_STATE.frames[nextIdx];
  if (next.autoplay === false) {
    const b = document.createElement("button");
    b.className = "joule-continue-btn";
    b.innerHTML = next.continueLabel || "▸ Continue";
    b.addEventListener("click", () => _advance());
    slot.appendChild(b);
  }
}

function _renderSuggestions() {
  const slot = document.getElementById("jouleSuggestions");
  if (!slot) return;
  slot.innerHTML = "";
  if (!JOULE_STATE.suggestions || !JOULE_STATE.suggestions.length) return;
  // Only show suggestions when player is idle (no pending continue, no autoplay next)
  const nextIdx = JOULE_STATE.pos;
  const next = JOULE_STATE.frames[nextIdx];
  if (next) return; // still frames to play
  JOULE_STATE.suggestions.forEach(s => {
    const chip = document.createElement("button");
    chip.className = "joule-suggestion-chip";
    chip.textContent = s;
    chip.addEventListener("click", () => _submitUserText(s));
    slot.appendChild(chip);
  });
}

function _advance() {
  _stopAuto();
  if (JOULE_STATE.pos >= JOULE_STATE.frames.length) return;
  JOULE_STATE.pos += 1;
  _renderShownFrames();
  const next = JOULE_STATE.frames[JOULE_STATE.pos];
  if (next && next.autoplay !== false) {
    JOULE_STATE.autoTimer = setTimeout(_advance, next.delay || 500);
  }
}

function loadSequence(frames, onAction, opts) {
  _stopAuto();
  const sig = JSON.stringify(frames.map(f => (f.text || f.html || "").slice(0, 40)));
  const preservePos = opts && opts.preservePos && JOULE_STATE.__sig === sig;
  JOULE_STATE.frames = frames;
  JOULE_STATE.__sig = sig;
  JOULE_STATE.pos = preservePos ? Math.min(JOULE_STATE.pos, frames.length) : 0;
  JOULE_STATE.onAction = onAction;
  _renderShownFrames();
  if (JOULE_STATE.pos < JOULE_STATE.frames.length) {
    const first = JOULE_STATE.frames[JOULE_STATE.pos];
    if (first.autoplay !== false) {
      JOULE_STATE.autoTimer = setTimeout(_advance, first.delay || 400);
    }
  }
}

function appendFrames(newFrames) {
  const wasAtEnd = JOULE_STATE.pos === JOULE_STATE.frames.length;
  JOULE_STATE.frames = JOULE_STATE.frames.concat(newFrames);
  JOULE_STATE.__sig = null;
  _renderShownFrames();
  if (wasAtEnd) {
    const next = JOULE_STATE.frames[JOULE_STATE.pos];
    if (next && next.autoplay !== false) {
      JOULE_STATE.autoTimer = setTimeout(_advance, next.delay || 400);
    }
  }
}

/**
 * Set the intent router. It receives raw user text and should return
 * either a reply object { html?, text?, sources?, actions? }, or null
 * (which triggers a generic fallback reply).
 */
function setIntentRouter(fn) { JOULE_STATE.intentRouter = fn; }

/**
 * Set quick-prompt chips shown above the input (empty array to hide).
 */
function setSuggestions(list) {
  JOULE_STATE.suggestions = list || [];
  _renderSuggestions();
}

function _submitUserText(text) {
  const clean = (text || "").trim();
  if (!clean) return;
  // Push user bubble
  appendFrames([{ role: "user", text: clean, autoplay: true, delay: 200 }]);
  // Route to intent
  const routed = JOULE_STATE.intentRouter ? JOULE_STATE.intentRouter(clean) : null;
  const isZh = (document.documentElement.lang || "").toLowerCase().startsWith("zh");
  const fallback = isZh
    ? { html: `关于 <strong>你的调动</strong>,我可以帮你解答:薪酬对比、匹配情况、面试准备、申请进度,或给 HR 发送信号。其他问题,建议直接与你的经理或 HR 聊聊。`, sources: 1 }
    : { html: `I can help with questions about <strong>your move</strong> — comparison of your comp, requirements match, interview prep, application status, or sending a signal to HR. For anything else I'd suggest a real conversation with your manager or HR.`, sources: 1 };
  const reply = routed || fallback;
  setTimeout(() => {
    appendFrames([{ role: "bot", ...reply, autoplay: true, delay: 350 }]);
  }, 600);
  // Clear input
  const inp = document.getElementById("jouleInput");
  if (inp) inp.value = "";
}

function bindJouleShell() {
  const panel = document.getElementById("joulePanel");
  const trigger = document.getElementById("jouleTrigger");
  const close = document.getElementById("jouleClose");
  const main = document.getElementById("mainArea");
  const input = document.getElementById("jouleInput");
  const send = document.getElementById("jouleSend");

  function isMobile() { return window.matchMedia("(max-width: 768px)").matches; }

  function open() {
    panel.classList.add("open");
    trigger.classList.add("joule-active");
    // On desktop, offset the main area so content isn't hidden under the panel
    if (!isMobile() && main) main.classList.add("joule-open");
    // On mobile, lock body scroll while the bottom sheet is open
    if (isMobile()) document.body.style.overflow = "hidden";
  }
  function shut() {
    panel.classList.remove("open");
    trigger.classList.remove("joule-active");
    if (main) main.classList.remove("joule-open");
    document.body.style.overflow = "";
  }
  function toggle() { panel.classList.contains("open") ? shut() : open(); }

  // On mobile, ensure the panel starts closed (regardless of initial HTML class)
  if (isMobile()) {
    panel.classList.remove("open");
    if (main) main.classList.remove("joule-open");
  }
  // Re-evaluate on resize/orientation change
  window.addEventListener("resize", () => {
    if (isMobile()) {
      // If switching to mobile while panel is desktop-open, close it
      main && main.classList.remove("joule-open");
    } else {
      document.body.style.overflow = "";
      // Restore desktop offset if panel is currently open
      if (panel.classList.contains("open") && main) main.classList.add("joule-open");
    }
  });

  trigger.addEventListener("click", toggle);
  close.addEventListener("click", shut);

  if (send) send.addEventListener("click", () => _submitUserText(input.value));
  if (input) input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); _submitUserText(input.value); }
  });

  return { open, shut, toggle };
}

window.JOULE = { jouleHTML, loadSequence, appendFrames, bindJouleShell, setIntentRouter, setSuggestions };
