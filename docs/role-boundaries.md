# Role Boundaries — Who sees what, who does what (v3 · multi-step)

The design thesis: **AI-assisted is not "one copilot for everyone".** Each role has a scoped Joule that sees different data, calls different capabilities, and can trigger different actions.

## Journey per role

| Role | Steps | Time in demo |
|---|---|---|
| **Employee** (林晨) | Discover → Evaluate → Interview prep → Apply → Track progress → My move | 6 steps |
| **HRBP** (Mira Klein) | Move requests → Request detail → Impact review → Edit request → Approvals → Handoff | 6 steps |
| **IT Admin** (Tom Reeves) | Alert Console → Alert detail → Task queue → Review → Log routing | 5 steps |

## Boundary matrix

| Concern | Employee | HRBP | IT Admin |
|---|---|---|---|
| Own application status | ✓ | ✓ (all in queue) | ✗ |
| Own compensation | ✓ | ✓ (aggregate view) | ✗ |
| Others' compensation | ✗ | ✓ | ✗ |
| Interview content | ✓ (own prep only) | ✗ (respects candidate privacy) | ✗ |
| Approver identities | ✗ (not disclosed) | ✓ (owns coordination) | ✗ |
| Move Request sign-off state (who signed, whose signature is invalidated) | ✗ (soft "HR updated the date") | ✓ (fully visible + editable) | ✗ |
| Cross-system impact checklist | ✗ (personal impact only) | ✓ (full 9 items) | Partial (own items only) |
| Approval streams | ✗ | ✓ | ✗ |
| Technical dependency graph | ✗ | ✗ (milestone view only) | ✓ |
| Identity case details (multiple candidate records, governance routing) | ✗ (soft "awaiting verification") | ✗ ("case with governance team") | ✓ (observation + routing action) |
| System health (tenant status) | ✗ | ✗ | ✓ |

## What each role's Joule can do — and cannot

### Employee Joule
- ✓ Explain move status in plain language
- ✓ Compare requirements to matched experience (source-tagged, own-view · not招聘方的 Skills Matching)
- ✓ Interview prep (questions, reverse questions — practice, not predictions)
- ✓ Help the employee compare options
- ✗ Answer "should you take this role?" — this is a personal decision; AI helps compare, does not conclude
- ✗ Look up other candidates
- ✗ Modify Move Request fields

### HRBP Joule
- ✓ Query queue status and flag stale sign-offs (when a field change invalidates prior confirmations)
- ✓ Detect key-field changes; name affected approvers; flag other items (e.g., Offer) as separate checks rather than asserting "unaffected"
- ✓ **Recommend specialists via responsibility → qualification → authorization → capacity filter** — recommendation, not decision
- ✓ Show milestone status across execution
- ✗ Approve on HRBP's behalf (spec §5.5 — no one-click compliance)
- ✗ Assert "not affected" without checking (Offer or other coupled objects need explicit re-check)
- ✗ See IT case details (only "case with governance team")

### IT Admin Joule
- ✓ Describe what was observed (e.g., "multiple candidate identity records returned")
- ✓ Explain why the tool pauses (governance decision belongs to a human team)
- ✓ Auto-detect downstream tasks that stay paused
- ✓ Draft a routing note to HR (records routing action, not resolution)
- ✗ **Conclude a "root cause"** — presence of multiple records does not by itself imply a specific issue category
- ✗ Propose operational paths (e.g., merging, retention periods) — those are governance decisions with cross-border implications for qualified specialists
- ✗ Close the alert or mark the case resolved
- ✗ See compensation, Offer, interview material
- ✗ Modify approval streams
- ✗ Do identity linkage / merging on admin's behalf — this belongs to Identity governance decision, with cross-border implications evaluated by qualified specialists
- ✗ See compensation, Offer, interview material
- ✗ Modify approval streams

## Three intentional pauses

The demo doesn't try to show "an AI that says no". It shows an AI that **helps advance a task, and stops when evidence, authority, or approval is missing — always naming who does the next step**.

1. **Employee Step 2 · Career decision belongs to the employee** — when asked to analyze the role for personal development, Joule offers concrete comparison (aligned strengths, gaps to consider, trade-offs) and names what only the employee can weigh (family, life stage, appetite for a new market). It doesn't produce a recommendation on the personal decision itself. Next step: the employee (with her manager / mentor / own reflection).

2. **HRBP Step 3 · Recommendation, not decision** — for specialist routing, Joule filters candidates by responsibility → qualification → authorization → capacity, then surfaces the top match with its current status. HRBP retains the decision.

3. **IT Step 4 · Observation, not root-cause conclusion** — when automated identity mapping returns multiple candidate records, Joule describes what it observed and pauses. It does not label this a "conflict", does not propose an operational path (e.g., merging), and does not close the alert. Next step: the Identity governance team, with any cross-border data considerations evaluated by Legal / Privacy specialists.

## The hard boundaries (spec §5)

1. **Chat confirmation ≠ approval.** Version binding enforces this.
2. **HR cannot one-click "confirm compliance".** Specialist outcomes come from specialists.
3. **Unknown is not pass.** No silent retry.
4. **Approval ≠ effective.** IT-side execution states are distinct from approval states.
5. **Submitted ≠ verified.** Target-side verification is a separate signal.
6. **Person continuity ≠ all accounts unchanged.** IT view exists specifically to make this visible.

## Narrative payoff

Change the effective date on the HRBP tab and the same underlying event produces three different experiences:

- **HRBP**: prior sign-offs invalidated · 3 stakeholders named for re-confirmation · Offer flagged for separate check (not asserted "unaffected") · v2 generation proposed
- **Employee**: "HR updated your effective date. No action needed."
- **IT**: nothing yet — they only care after execution triggers

Trigger execution:

- **HRBP**: "IT surfaced an identity case for governance review · no HR action while under review"
- **Employee**: "System access submitted, awaiting target-side verification"
- **IT**: multiple candidate identity records observed · dependency graph shows downstream paused · button says "Route to Identity governance team" (not "merge", not "resolve")

**No view claims "complete" at the end**, because the governance decision and target-side verification haven't come back. That's the point.
