# Evidence Register — capability sources referenced in the prototype

Each item lists what the card **simulates**, what **real SAP capability** underpins it, and what would need to be verified before making any deployment claim.

| Prototype card | Capability tag | Underlying SAP reference | Deployment verification |
|---|---|---|---|
| Job Application status card (Phase 1) | 标准业务功能模拟 | Recruiting Job Applications / Candidate Profile | License + RBP + module permission |
| Requirement ↔ experience match (Phase 1) | 项目扩展设计 | Cross-module data assembly on top of Recruiting + Skills Matching universal taxonomy | Universal taxonomy availability; not tenant-specific JPB competency model |
| Interview prep pack (Phase 1) | 项目扩展设计 | Not a native SAP capability. Career Insights and Interview Question Generation are noted for entry-point awareness. | If ever productized, must respect Career Development AI boundaries and interviewer-only entry points |
| Move Request v1 form (Phase 2) | 标准业务功能模拟 | EC / MDF hybrid — EC provides prefill, MDF holds supplemental fields | MDF object definition, validation rules, RBP field-level authorization |
| Compensation 4-version compare (Phase 3) | 项目扩展设计 | EC Compensation Information + disclosed Offer; does not use Compensation Planning module | Data availability, disclosure rules, versioning source of truth |
| Cross-system impact checklist (Phase 3) | 项目扩展设计 | Aggregated from EC / IAS / IPS / RBP / MDF / DRTM domains | Each domain integration is a separate verification |
| Organization readiness (Phase 3) | 标准业务功能模拟 | EC Position Management / Position Org Chart | Position data completeness; decision rights not inferred from chart |
| Approval streams (Phase 4) | 标准业务功能模拟 | Recruiting Offer Approval + EC Workflow + MDF Workflow | Three separate configurations, not one composite |
| Execution tasks (Phase 5) | 标准业务功能模拟 | EC international transfer reference path (SAP Best Practices 1H2026) | End source employment + rehire w/ new employment pattern |
| Verification + handoff (Phase 6) | 项目扩展设计 | Aggregation across execution outputs | Each verification signal requires its own data source |

## Demo Event Control — why it exists

The panel loads specialist outcomes rather than asserting them. This mirrors the spec §5.5 constraint: **HR cannot one-click "confirm compliance"**. Operator authority is scoped; the panel makes that scoping visible.
