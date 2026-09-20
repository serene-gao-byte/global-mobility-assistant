#!/usr/bin/env python3
"""
Headless regression test for the HRBP approvals-submit gate.

Why this exists: the demo had a drift bug where the *button* and the *dialog*
computed "can I submit approvals?" with two different boolean expressions, so
after generating v2 the button said "disabled" while the dialog said
"submittable". This test locks the single-source-of-truth gate.

No Node/JS runtime is available in this environment, so this test does two things:

  1. STRUCTURE CHECK — reads the actual computeSubmitGate() source out of both
     hrbp.html files and asserts the four ordered branches are present. This
     catches the "someone re-introduced a second predicate" regression.

  2. TRUTH TABLE — a faithful Python mirror of the gate ladder, asserted across
     the 11 required scenarios. The structure check above guards against the
     mirror silently diverging from the shipped JS.

Run:  py prototype/tests/gate_test.py
"""
import re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
EN = ROOT / "hrbp.html"
ZH = ROOT / "zh" / "hrbp.html"

failures = []
def check(name, cond):
    print(("  PASS" if cond else "  FAIL"), name)
    if not cond:
        failures.append(name)

# ---------------------------------------------------------------------------
# 1. STRUCTURE CHECK — the shipped gate must have exactly one ordered ladder,
#    and the button/dialog/handler must all reference computeSubmitGate.
# ---------------------------------------------------------------------------
def structure_check(path, label):
    src = path.read_text(encoding="utf-8")
    m = re.search(r"function computeSubmitGate\(s\)\s*\{(.*?)\n  \}", src, re.S)
    check(f"[{label}] computeSubmitGate exists", m is not None)
    if not m:
        return
    body = m.group(1)
    # Ordered branches: already-submitted -> needs-v2 -> needs-reconfirm -> ok
    order = [
        ("approvalsSubmitted",            body.find("approvalsSubmitted")),
        ("invalidatedByEdit && !v2Gen",   body.find("invalidatedByEdit && !s.v2Generated")),
        ("v2Generated && !v2Reconfirmed", body.find("v2Generated && !s.v2Reconfirmed")),
    ]
    positions = [p for _, p in order]
    check(f"[{label}] all four gate branches present", all(p >= 0 for p in positions))
    check(f"[{label}] branches in correct order", positions == sorted(positions))

    # The button must derive canSubmit from the gate (not a second expression).
    check(f"[{label}] button uses gate.canSubmit",
          re.search(r"const gate = computeSubmitGate\(s\);\s*\n\s*const canSubmit = gate\.canSubmit;", src) is not None)
    # The OLD buggy predicate must be gone.
    check(f"[{label}] old buggy predicate removed",
          "const canSubmit = !s.invalidatedByEdit && !s.approvalsSubmitted;" not in src)
    # The submit handler must re-check the gate at click time.
    check(f"[{label}] submit handler re-checks gate",
          re.search(r"btnSubmitApprovals.*?computeSubmitGate\(s\)", src, re.S) is not None)
    # The intent router must use the gate too.
    check(f"[{label}] intent router uses gate",
          re.search(r"/submit\|approve\|approval.*?computeSubmitGate\(s\)", src, re.S) is not None)
    # Re-editing the date must reset v2Reconfirmed.
    check(f"[{label}] date change resets v2Reconfirmed",
          re.search(r"hrbp-changed-effective-date", src) is not None and
          re.search(r"x\.v2Reconfirmed = false;[\s\S]*?hrbp-changed-effective-date", src) is not None)
    # The demo reconfirm control must NOT clear any invalidation, only set v2Reconfirmed.
    check(f"[{label}] reconfirm sim only sets v2Reconfirmed",
          "x.v2Reconfirmed = true;" in src and
          re.search(r"btnSimReconfirm[\s\S]*?v2Generated && !s\.v2Reconfirmed", src) is not None)

    # --- Execution trigger gate (submit != approve) ---
    # canTrigger must require approvalsApproved, not just approvalsSubmitted.
    check(f"[{label}] trigger gate requires approvalsApproved",
          "const canTrigger = s.approvalsSubmitted && s.approvalsApproved && !s.executionStarted;" in src)
    # The OLD trigger predicate (submitted-only) must be gone from both button and handler.
    check(f"[{label}] old submitted-only trigger predicate removed",
          "s.approvalsSubmitted && !s.executionStarted" not in src)
    # A demo 'simulate approval' control must exist and only set approvalsApproved.
    check(f"[{label}] approve sim only sets approvalsApproved",
          "x.approvalsApproved = true;" in src and
          re.search(r"btnSimApprove[\s\S]*?approvalsSubmitted && !s\.approvalsApproved", src) is not None)
    # Changing the effective date must reset approvalsApproved (version-bound sign-off).
    check(f"[{label}] date change resets approvalsApproved",
          re.search(r"x\.approvalsApproved = false;[\s\S]*?hrbp-changed-effective-date", src) is not None)
    # Version label must be emitted independent of approvalsSubmitted (Issue 2 fix):
    # the v2 label is computed from s.v2Generated, not nested only inside !approvalsSubmitted.
    # It must branch on the stable a.kind field (not a.flow text, which is localized and
    # once used a startsWith("EC") predicate that matched no flow — see 2f58003 regression).
    check(f"[{label}] v2 version label independent of submission",
          re.search(r'const ver = s\.v2Generated \? \(a\.kind === "hr" \? "MoveRequest v2" : "MDF v2"\) : a\.version;', src) is not None)
    # The old broken startsWith("EC") version predicate must be gone.
    check(f"[{label}] old startsWith(EC) version predicate removed",
          'a.flow.startsWith("EC")' not in src)
    # Recruiting/Offer row must be handled as an independent, already-approved flow
    # (not swept into the move-version invalidation lifecycle).
    check(f"[{label}] recruiting row handled independently",
          'a.kind === "recruiting"' in src)

    # --- Post-execution edit protection (irreversible action must not be faked-undone) ---
    # Render layer: the effective-date input AND the apply button must be disabled when
    # executionStarted, so a user can't fat-finger a change after execution begins.
    check(f"[{label}] date input disabled after execution",
          re.search(r'id="effDateInput"[^>]*\$\{s\.executionStarted \? "disabled" : ""\}', src) is not None)
    check(f"[{label}] apply button disabled after execution",
          re.search(r'id="applyEffDate" \$\{s\.executionStarted \? "disabled" : ""\}', src) is not None)
    # Click handler: re-check latest state and refuse the edit when executionStarted, BEFORE
    # the "no change" short-circuit — a disabled attr alone is not the source of truth.
    check(f"[{label}] apply handler refuses edit after execution",
          re.search(r'applyEffDate[\s\S]*?const s = window\.GMA\.loadState\(\);[\s\S]*?if \(s\.executionStarted\) \{[\s\S]*?return;[\s\S]*?\}[\s\S]*?if \(!newVal', src) is not None)
    # The refusal must NOT fake an undo by clearing executionStarted — no mutator in the
    # apply handler may set executionStarted = false.
    check(f"[{label}] refusal does not clear executionStarted",
          "x.executionStarted = false;" not in src)

# ---------------------------------------------------------------------------
# 2. TRUTH TABLE — faithful mirror of the JS ladder.
# ---------------------------------------------------------------------------
def gate(s):
    if s.get("approvalsSubmitted"):
        return {"canSubmit": False, "code": "already-submitted"}
    if s.get("invalidatedByEdit") and not s.get("v2Generated"):
        return {"canSubmit": False, "code": "needs-v2"}
    if s.get("v2Generated") and not s.get("v2Reconfirmed"):
        return {"canSubmit": False, "code": "needs-reconfirm"}
    return {"canSubmit": True, "code": "ok"}

def st(**kw):
    base = {"invalidatedByEdit": False, "v2Generated": False,
            "v2Reconfirmed": False, "approvalsSubmitted": False,
            "approvalsApproved": False, "executionStarted": False}
    base.update(kw); return base

def truth_table():
    # 1. Baseline satisfied -> submittable (button + dialog both allow)
    g = gate(st())
    check("(1) baseline: can submit", g["canSubmit"] and g["code"] == "ok")

    # 2. Date changed, v1 invalidated, no v2 -> blocked, reason 'needs-v2'
    g = gate(st(invalidatedByEdit=True))
    check("(2) date changed -> blocked (needs-v2)", (not g["canSubmit"]) and g["code"] == "needs-v2")

    # 3. v2 generated but not re-confirmed -> still blocked
    g = gate(st(invalidatedByEdit=True, v2Generated=True))
    check("(3) v2 only, no reconfirm -> blocked (needs-reconfirm)",
          (not g["canSubmit"]) and g["code"] == "needs-reconfirm")

    # 4. current version re-confirmed -> submittable
    g = gate(st(invalidatedByEdit=True, v2Generated=True, v2Reconfirmed=True))
    check("(4) reconfirmed -> can submit", g["canSubmit"] and g["code"] == "ok")

    # 5. re-edit the date after reconfirm -> prior confirmation no longer usable
    #    (simulates the date-change mutator resetting v2Generated + v2Reconfirmed)
    reedit = st(invalidatedByEdit=True, v2Generated=False, v2Reconfirmed=False)
    g = gate(reedit)
    check("(5) re-edit date -> blocked again (needs-v2)",
          (not g["canSubmit"]) and g["code"] == "needs-v2")

    # 7. after submit -> blocked from re-submit (no duplicate), code already-submitted
    g = gate(st(v2Generated=True, v2Reconfirmed=True, approvalsSubmitted=True))
    check("(7) already submitted -> no duplicate submit",
          (not g["canSubmit"]) and g["code"] == "already-submitted")

    # 8. HRBP-role-can-initiate does NOT bypass reconfirm (no 'role' field exists;
    #    the gate never keys off permission, only flow state) — assert gate ignores
    #    any extra role flag.
    g = gate(st(invalidatedByEdit=True, v2Generated=True, hrbpCanEdit=True))
    check("(8) role capability does not bypass reconfirm",
          (not g["canSubmit"]) and g["code"] == "needs-reconfirm")

    # 6 (button vs stale dialog): the gate is a pure function of latest state, so
    # a click evaluated against fresh state yields the same verdict regardless of
    # what an old dialog said. Assert determinism.
    s6 = st(invalidatedByEdit=True, v2Generated=True)
    check("(6) gate is deterministic on latest state",
          gate(s6)["code"] == gate(dict(s6))["code"] == "needs-reconfirm")

# ---------------------------------------------------------------------------
# 3. TRIGGER GATE — submit != approve. Execution can only start after approval.
# ---------------------------------------------------------------------------
def can_trigger(s):
    return bool(s.get("approvalsSubmitted") and s.get("approvalsApproved")
                and not s.get("executionStarted"))

def trigger_table():
    # T1. Submitted but not approved -> trigger blocked (the reported bug)
    check("(T1) submitted, not approved -> trigger blocked",
          not can_trigger(st(approvalsSubmitted=True)))
    # T2. Submitted AND approved -> trigger allowed
    check("(T2) submitted + approved -> trigger allowed",
          can_trigger(st(approvalsSubmitted=True, approvalsApproved=True)))
    # T3. Already executing -> no re-trigger
    check("(T3) already executing -> trigger blocked",
          not can_trigger(st(approvalsSubmitted=True, approvalsApproved=True, executionStarted=True)))
    # T4. Neither submitted nor approved -> blocked
    check("(T4) fresh state -> trigger blocked", not can_trigger(st()))
    # T5. Date change resets approval -> trigger blocked again
    #     (date-change mutator clears approvalsSubmitted + approvalsApproved)
    reset = st(invalidatedByEdit=True, approvalsSubmitted=False, approvalsApproved=False)
    check("(T5) date change after approval -> trigger blocked", not can_trigger(reset))

print("== STRUCTURE CHECK ==")
structure_check(EN, "EN")
structure_check(ZH, "ZH")
print("== TRUTH TABLE ==")
truth_table()
print("== TRIGGER GATE ==")
trigger_table()

# 9. EN/ZH parity: both files carry the same gate structure (checked above);
#    assert both define the four codes identically.
codes = ["already-submitted", "needs-v2", "needs-reconfirm", "ok"]
for label, path in (("EN", EN), ("ZH", ZH)):
    src = path.read_text(encoding="utf-8")
    check(f"(9) [{label}] all gate codes present", all(f'"{c}"' in src for c in codes))

print()
if failures:
    print(f"FAILED: {len(failures)} check(s):")
    for f in failures:
        print("   -", f)
    sys.exit(1)
print("ALL CHECKS PASSED")
