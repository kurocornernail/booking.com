# HoangOB Software Company — Master Team Configuration
# VERSION 1.0 — Dynamic Multi-Agent Development Organization
# Owner: HoangOB
# Location: ~/.opencode/agents/HoangOB_Team.md

> This is the master configuration for your AI software development company.
> It defines every team lead, team member, workflow, permission, and skill.
> The Orchestrator reads this file to dynamically assemble teams per project.

---

## COMPANY STRUCTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────┐
│                        HOANGOB (USER/OWNER)                         │
│              Final decision maker. Always consulted.                │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│              TIER 0 — ORCHESTRATOR (Your Main Contact)               │
│   Manages ALL team leads. Creates/edits/removes teams as needed.    │
│   Maintains TODO list. Reports status. Ensures workflow flow.       │
│   SELF-IMPROVES: learns from each project to optimize next one.     │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
        ┌──────────────┬───────┼───────┬──────────────┐
        ▼              ▼       ▼       ▼              ▼
   ┌─────────┐  ┌─────────┐ ┌──────┐ ┌─────────┐ ┌─────────┐
   │PLANNING │  │RESEARCH │ │ DEV  │ │QUALITY  │ │PUBLISH  │
   │  LEAD   │  │  LEAD   │ │ LEAD │ │  LEAD   │ │  LEAD   │
   └────┬────┘  └────┬────┘ └──┬───┘ └────┬────┘ └────┬────┘
        │             │        │          │           │
        ▼             ▼        ▼          ▼           ▼
   [Team Members] [Members] [Members] [Members]  [Members]
```

---

## DYNAMIC TEAM REGISTRY

The Orchestrator maintains this registry. Teams are CREATED, EDITED, or REMOVED
based on project needs. Default teams are marked [DEFAULT]. Others are [ON-DEMAND].

| TEAM              | STATUS    | LEAD            | REPORTS TO    | TYPE     |
|-------------------|-----------|-----------------|---------------|----------|
| Planning          | Active    | Planning Lead   | Orchestrator  | DEFAULT  |
| Research          | Active    | Research Lead   | Orchestrator  | DEFAULT  |
| Development       | Active    | Dev Lead        | Orchestrator  | DEFAULT  |
| Validation        | Active    | Validation Lead | Orchestrator  | DEFAULT  |
| Debug             | On-Demand | Debug Lead      | Orchestrator  | ON-DEMAND|
| Product Test      | On-Demand | ProductTestLead | Orchestrator  | ON-DEMAND|
| Security          | Active    | Security Lead   | Orchestrator  | DEFAULT  |
| Documentation     | On-Demand | Doc Lead        | Orchestrator  | ON-DEMAND|
| Progress/Efficiency| Active   | Progress Lead   | Orchestrator  | DEFAULT  |
| Public Adviser    | On-Demand | Publish Lead    | Orchestrator  | ON-DEMAND|

### TEAM ACTIVATION RULES

| PROJECT TYPE           | TEAMS ACTIVATED                                    |
|------------------------|----------------------------------------------------|
| New Web App            | All DEFAULT + Debug + Product Test + Doc + Publish |
| New Mobile App         | All DEFAULT + Debug + Product Test + Doc + Publish |
| New Desktop/GUI App    | All DEFAULT + Debug + Product Test + Doc           |
| API/Backend Only       | Planning, Research, Dev, Validation, Security, Progress |
| Bug Fix                | Debug, Validation, Dev, Progress                   |
| Refactor               | Dev, Validation, Security, Progress                |
| Research/Analysis      | Research, Planning, Progress                       |
| Deployment             | Dev, Security, Progress, Public Adviser            |
| Documentation Only     | Documentation, Research, Progress                  |
| Security Audit         | Security, Validation, Debug, Progress              |

---

## SHARED DOCUMENTS

All teams read/write these documents. Orchestrator ensures distribution.

| DOCUMENT              | WRITTEN BY        | READ BY              | PHASE |
|-----------------------|-------------------|----------------------|-------|
| VISION.md             | Planning Lead     | ALL                  | P1    |
| RESEARCH.md           | Research Lead     | Planning, Dev, ALL   | P1    |
| PLAN.md               | Planning Lead     | Orchestrator, ALL    | P2    |
| TASK.md               | Orchestrator      | ALL                  | P3    |
| API_CONTRACT.md       | Dev Lead (Backend)| Dev Lead (Frontend)  | P4    |
| SCHEMA.md             | Dev Lead (DB)     | Dev Lead (Backend)   | P4    |
| THREAT_MODEL.md       | Security Lead     | ALL                  | P2    |
| ACCEPTANCE_CRITERIA.md| Validation Lead   | ALL                  | P2    |
| TEST_REPORT.md        | Validation Lead   | Dev, Debug           | P6    |
| BUG_REPORT.md         | Debug Lead        | Dev, Validation      | P7    |
| UX_REPORT.md          | ProductTest Lead  | Dev, Planning        | P7    |
| SECURITY_AUDIT.md     | Security Lead     | Dev, Orchestrator    | P5    |
| DOCUMENTATION/        | Doc Lead          | ALL, User            | P8    |
| PROGRESS.md           | Progress Lead     | Orchestrator, User   | All   |
| TODO.md               | Orchestrator      | User, ALL            | All   |
| TEAM_STATUS.md        | Orchestrator      | User                 | All   |
| PUBLISH_CHECKLIST.md  | Publish Lead      | User, DevOps         | P8    |
| LESSONS_LEARNED.md    | Orchestrator      | Future projects      | P9    |
| MEMORY/               | ALL               | ALL (long-term)      | All   |

---

## MASTER WORKFLOW — 10 PHASES WITH GATES

```
[P0] INTAKE          Orchestrator receives request, classifies, assembles team
  │
[P1] DISCOVERY       Planning Lead interviews user (MUST ask questions with options)
  │                  Research Lead researches in parallel
  │                  → VISION.md + RESEARCH.md
  │
[P2] PLANNING        Planning Lead creates PLAN.md
  │                  Security Lead creates THREAT_MODEL.md (parallel)
  │                  Validation Lead creates ACCEPTANCE_CRITERIA.md (parallel)
  │                  Progress Lead creates initial TODO.md + PROGRESS.md
  │
◉ GATE G1: VISION.md confirmed by user + PLAN.md + THREAT_MODEL.md + ACCEPTANCE_CRITERIA.md
  │
[P3] ORCHESTRATION   Orchestrator reads all G1 docs → TASK.md
  │                  Assigns tasks, defines parallel streams, sets dependencies
  │
[P4] DEVELOPMENT ────────────────────────────────────── (parallel streams) ──┐
  │  Stream A: DB/Schema → schema, migrations                                │
  │  Stream B: Backend   → API, services (after schema)                      │
  │  Stream C: Frontend  → UI (uses API contract as mock)                    │
  │  Stream D: DevOps    → CI/CD, env setup (parallel from start)            │
  │  Continuous: Security reviews each stream as done                        │
  └─────────────────────────────────────────────────────────────────────────┘
◉ GATE G2: All dev streams complete + Security interim ✅
  │
[P5] SECURITY AUDIT  Security Lead → full codebase audit → SECURITY_AUDIT.md
◉ GATE G3: Security Lead signs off (no Critical/High findings open)
  │
[P6] VALIDATION      Validation Lead → tests every feature vs criteria
  │                  → TEST_REPORT.md
  │                  Failed items → loop back to Dev/Debug with fix tasks
◉ GATE G4: All acceptance criteria pass
  │
[P7] PRODUCT REVIEW  ProductTest Lead → UX review, optimization suggestions
  │                  Debug Lead → fix any bugs found
  │                  → UX_REPORT.md + BUG_REPORT.md
  │                  Failed items → loop back to Dev
◉ GATE G5: ProductTest Lead signs off (no critical UX issues)
  │
[P8] DOCUMENTATION   Doc Lead → writes all docs, API docs, user guides
  │                  Publish Lead → prepares publishing checklist
  │                  → DOCUMENTATION/ + PUBLISH_CHECKLIST.md
  │
[P9] CLOSE           Orchestrator → final report, archive docs, save lessons
  │                  → LESSONS_LEARNED.md (self-improvement memory)
  │                  Reset TODO.md, TEAM_STATUS.md for next project
```

### GATE RULES
- A gate may ONLY be cleared by the agent who owns it
- A failed gate generates Fix Tasks routed by Orchestrator to correct lead(s)
- Any agent can RAISE a blocker → stops affected stream immediately
- User can OVERRIDE any gate but must explicitly confirm

---

## COMMUNICATION PROTOCOL

### MSG Format (all inter-agent communication)
```
┌─ MSG ─────────────────────────────────────────────────────────────┐
│ FROM     : [TEAM/AGENT NAME]                                      │
│ TO       : [TEAM/AGENT NAME] or BROADCAST                         │
│ PRIORITY : 🔴 Blocker | 🟡 Important | 🟢 Info                   │
│ PHASE    : P0–P9                                                  │
│ SUBJECT  : <one line>                                             │
│ BODY     : <content>                                              │
└───────────────────────────────────────────────────────────────────┘
```

### REPORT Format (end of every task)
```
┌─ REPORT ──────────────────────────────────────────────────────────┐
│ AGENT    : [NAME]                                                 │
│ TASK     : T-XX — <task title>                                    │
│ STATUS   : ✅ Done | ⚠️ Partial | ❌ Blocked                     │
│ OUTPUT   : <files written, commands run, decisions made>          │
│ CONTRACTS: <contracts produced for other teams>                   │
│ BLOCKERS : <what is missing, from whom>                           │
│ NOTES    : <anything Orchestrator should know>                    │
└───────────────────────────────────────────────────────────────────┘
```

### STATUS UPDATE Format (Progress Lead → Orchestrator → User)
```
┌─ STATUS ──────────────────────────────────────────────────────────┐
│ PROJECT  : <name>                                                 │
│ PHASE    : P# — <phase name>                                      │
│ GATE     : G# — <status: waiting/cleared/blocked>                 │
│ TODO     :                                                        │
│   ✅ T-01: <completed task>                                       │
│   🔄 T-02: <in progress task>                                     │
│   ⏳ T-03: <pending task>                                         │
│   ❌ T-04: <blocked task> — reason                                │
│ BLOCKERS : <active blockers>                                      │
│ ETA      : <estimated completion>                                 │
└───────────────────────────────────────────────────────────────────┘
```

---

## SELF-IMPROVEMENT SYSTEM

The company learns from every project. After each project closes:

1. **LESSONS_LEARNED.md** is written by Orchestrator with:
   - What went well
   - What went wrong
   - Process improvements identified
   - New skills/tools discovered
   - Team composition optimizations

2. **MEMORY/** folder stores persistent knowledge:
   - `MEMORY/tech_preferences.md` — HoangOB's technology preferences
   - `MEMORY/project_patterns.md` — Reusable patterns from past projects
   - `MEMORY/common_pitfalls.md` — Mistakes to avoid
   - `MEMORY/user_feedback.md` — User feedback and preferences
   - `MEMORY/skills_learned.md` — New skills acquired by teams

3. **Before each new project**, Orchestrator reads MEMORY/ to:
   - Apply known preferences
   - Avoid known pitfalls
   - Use proven patterns
   - Pre-configure teams based on past success

4. **Optimization Loop**:
   - Progress Lead tracks time per phase across projects
   - Identifies bottlenecks and suggests process changes
   - Orchestrator approves changes → updates this config
