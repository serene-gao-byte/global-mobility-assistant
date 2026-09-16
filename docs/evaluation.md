# Evaluation & Evidence Register

Aligned with v0.2 spec §9 acceptance criteria and §10 documentation anchors.

## What the prototype claims

| # | Claim | Verifiable how |
|---|---|---|
| 1 | Every card carries one of three capability labels | Visual — see `.cap-tag` on all cards |
| 2 | Missing required fields cannot submit | Simulated — Phase 4 blocks when invalidated |
| 3 | Data without permission is not disclosed | By design — no external inputs; all fixtures declared |
| 4 | Key-field change invalidates prior confirmation | **Actually runs** — Phase 3 effective-date change invalidates Phase 2 v1 and blocks Phase 4 |
| 5 | Chat confirmation is not approval | Joule action buttons never write to approval flows; Phase 4 has its own controls |
| 6 | Repeated clicks do not duplicate requests | Approval submit toggles a boolean, not append |
| 7 | Pending-effective does not display as complete | Phase 5 task states are labeled distinctly |
| 8 | Unknown state is not auto-retried | Phase 6 verification `unknown` remains unknown |
| 9 | Partial failure results in correct handoff | IAS failure branch produces the handoff card |
| 10 | Reset leaves no residue | `location.reload()` reset |
| 11 | All simulated / extended items are labeled | Cap-tags + footer |

## What the prototype does NOT claim

- That any SAP AI feature has been rebuilt (Enhance JD, Skills Matching, PPA, Interview Questions, Career Insights, Joule navigation — all referenced, not implemented)
- That Joule chat has real intent parsing
- That any real employee, tenant, or SAP system was touched
- That international transfer requires no country-specific validation
- Post-tax income calculations
- DRTM country-specific retention decisions

## Reference documentation anchors (from spec §10)

Deployment-time re-verification required for version / license / tenant.

- [Position Org Chart](https://help.sap.com/docs/successfactors-employee-central/implementing-position-management/position-organization-chart)
- [Enhance Job Description with AI](https://help.sap.com/docs/successfactors-recruiting/setting-up-and-maintaining-sap-successfactors-recruiting/enhancing-job-description-with-ai)
- [AI-Assisted Skills Matching](https://help.sap.com/docs/successfactors-recruiting/setting-up-and-maintaining-sap-successfactors-recruiting/ai-assisted-skills-matching-for-assisted-applicant-screening)
- [Joule Recruiting use cases](https://help.sap.com/docs/successfactors-platform/setting-up-and-using-joule-in-sap-successfactors/recruiting-use-cases)
- [Performance Preparation Agent](https://help.sap.com/docs/successfactors-release-information/e9989dc2e5b046ec929e2ad5e8305d24/8f0c8c022178439cbab3c07fb03230ba.html)
- [Interview Questions generation](https://help.sap.com/docs/successfactors-recruiting/setting-up-and-maintaining-sap-successfactors-recruiting/generating-interview-questions)
- [Premium AI features for Recruiting](https://help.sap.com/docs/successfactors-recruiting/setting-up-and-maintaining-sap-successfactors-recruiting/premium-ai-features-for-recruiting)
- [Joule use cases](https://help.sap.com/docs/successfactors-platform/setting-up-and-using-joule-in-sap-successfactors/use-cases-supported-in-joule)
- [International Transfer (1H2026)](https://help.sap.com/docs/successfactors-employee-central/manage-hire-rehire-test-script/manage-international-transfer)
- [Rehire with new employment](https://help.sap.com/docs/successfactors-employee-central/manage-hire-rehire-test-script/rehire-employee-with-new-employment)

## Test log template

Reproduce and mark pass/fail/not-run before claiming pass.

| # | Step | Expected | Actual | Pass/Fail |
|---|---|---|---|---|
| 1 | Open index.html | Phase 1 loads, footer visible, Joule open | | |
| 2 | Click Continue in Phase 1 | Phase 2 shown, stepper updates, Phase 1 marked done | | |
| 3 | In Phase 3, change effective date and click Apply | Alert appears; Phase 2 shows red banner; stepper Phase 2 blocked | | |
| 4 | Try to advance to Phase 4 while invalidated | Blocked with message | | |
| 5 | Reset demo | State clears; Phase 1 active | | |
| 6 | Run full happy path via Event Control (Specialist → Submit → Trigger) | Phases 4 & 5 render populated | | |
| 7 | Click Simulate IAS failure | EXEC-04 shows Needs manual; EXEC-05 waits on dep. | | |
| 8 | Advance to Phase 6 | Verification shows Failed / Unknown; handoff card lists partial completion | | |

## Personal contribution accurate statement

- Scenario design and product mapping (SF/Joule capabilities → phase-appropriate entries)
- Interaction pattern (state machine, version invalidation, capability tagging)
- Boundary articulation (what is standard, what is native AI, what is project extension)
- Acceptance criteria and evaluation framing
- Code assisted by Claude Code
