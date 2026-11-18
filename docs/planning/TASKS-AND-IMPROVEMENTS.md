# Personal OS Tasks and Improvements

This is the single development tracker for tasks, repository findings and improvement proposals. Follow [COMMUNICATION-STANDARD.md](../development/COMMUNICATION-STANDARD.md) for responsibilities, authorization, evidence language, verification and conversation templates; those rules are not repeated here.

## Current objective and immediate next action

The foundation documents were published to main in commit 3dcd28907b03a1f94750676b7e00d977843668a8; no owner acceptance is evidenced. Codex reports later review corrections to the README, AGENTS.md, the communication standard and the Git workflow as implemented locally and unpublished. The first functional milestone remains unimplemented: open a browser workspace, open Notes, create and edit multiple notes, save, restart, reopen, export and restore. Keyboard navigation and visible focus are part of that outcome.

Immediate next action: the owner decides the next task. POS-013 and the bounded stack/environment assessment under POS-005 remain candidates for separate authorization; neither is underway or authorized by this tracker.

Early GitHub Pages delivery is owner-requested. Its configuration and publication remain separate, unauthorized work. Public accounts, synchronization, local AI and third-party applications are outside the first milestone.

## Tracker conventions

- Keep each stable `POS-###` ID; never reuse it. Types are Task, Outcome, Review, Finding and Improvement. Broad outcomes become concrete single-file tasks before implementation; reference the parent outcome instead of duplicating its scope.
- Priorities: P0 blocks safe current work; P1 supports the first milestone; P2 is a nonblocking follow-up; P3 is later work. Priority does not grant authorization or impose a fixed execution order.
- Statuses: **Proposed** is a recommendation or newly recorded finding; **Ready** is explicitly authorized and sufficiently defined; **In progress** is authorized work underway; **Blocked** has an identified dependency preventing progress; **In review** has a local result awaiting review or acceptance; **Done** has explicit owner acceptance and supporting evidence; **Deferred** is intentionally postponed with a reason.
- Before an implementation task becomes Ready, record exactly one permitted file, acceptance criteria, dependencies and explicit authorization. Approved product goals do not authorize every implementation step. Read-only assessments must identify their scope. Split broad outcomes into new IDs when their concrete tasks are defined.
- Other implementation tasks report proposed tracker changes in their completion reports. Incorporate them only during a separately authorized update to this file. No task must edit the tracker alongside its permitted file.
- Keep one entry per issue. Add concise detail only when it supports a decision. Do not add activity logs, completion percentages or document-version synchronization. Passing checks and completion reports do not establish owner acceptance.

## Tasks, findings and proposals

| ID | Type | Priority | Status | Intended outcome |
| --- | --- | --- | --- | --- |
| POS-001 | Task | P1 | In review | Relocated communication standard with five conversation templates and explicit tracker-review authority |
| POS-002 | Task | P1 | In review | Tracker at its current location reconciled with inspected documentation and authorized proposals |
| POS-003 | Task | P1 | In review | Agent entry point implemented locally and directing agents to the standard and tracker |
| POS-004 | Outcome | P1 | Proposed | Establish a coherent visual and interaction direction for the workspace and Notes |
| POS-005 | Outcome | P1 | Proposed | Establish a small toolchain and reproducible verification of development and production output |
| POS-006 | Outcome | P1 | Proposed | Implement the workspace and useful multiple-note creation/editing workflow |
| POS-007 | Outcome | P1 | Proposed | Establish early GitHub Pages delivery through separately authorized preparation and publication |
| POS-008 | Outcome | P1 | Proposed | Save reliably, preserve edits after failures and reopen saved notes after full application restart |
| POS-009 | Outcome | P1 | Proposed | Export a user-controlled backup and restore safely into an empty store |
| POS-010 | Review | P1 | Proposed | Review the complete first milestone against the real workflow and quality evidence |
| POS-011 | Finding | P2 | In review | README project guidance locally implemented; original empty-file finding retained as history |
| POS-012 | Task | P1 | In review | Git workflow locally implemented with authorization rules, three templates and seven illustrative examples |
| POS-013 | Task | P1 | Proposed | Focused README cleanup clarifying pre-implementation status, delivery decisions and documentation links |

## Entry details and evidence

**Initial inspection, November 14, 2026:** GitHub metadata confirms `Sas8037/personal-os`, repository ID `1455766940`. Local and remote `main` point to `e49882dc7ef23f96ce6eeae31f4f7910b1dc0b7d`. The committed tree contains only `README.md`. The working README is empty after a pre-existing unstaged deletion; `COMMUNICATION-STANDARD.md` exists locally as an untracked file. Both were read directly. No application, dependency manifest, build configuration or tests were found. This is dated evidence, not a live repository-status record. The historical repository was not used as a write destination or code source.

**Fresh inspection, November 15, 2026:** Repository identity and the local/remote `main` revision still match that baseline. The working README now provides project guidance; `AGENTS.md`, the relocated communication standard, this tracker and the Git workflow exist locally. Direct inspection supports the owner-specified POS-003 and POS-011 transitions. No equivalent Git-workflow or focused-README-cleanup entry existed before adding POS-012 and POS-013. Application source, a dependency manifest, application tests and deployment configuration remain absent. The README is modified relative to HEAD; the other documents are untracked. No commit, push, publication or owner acceptance of these working versions is evidenced.

**Publication evidence, November 16, 2026:** Repository history shows commit `3dcd28907b03a1f94750676b7e00d977843668a8` on main (committed November 16, 2026, 19:55 UTC; parent `e49882dc7ef23f96ce6eeae31f4f7910b1dc0b7d`, the November 14 baseline). It added AGENTS.md, the communication standard, the Git workflow and this tracker, and modified README.md. Publication does not establish owner acceptance. The inspection paragraphs above and evidence labeled “Fresh” in the entries below record the November 14 and 15 inspections and are historical. Codex reports later review corrections to the README, AGENTS.md, the standard and the Git workflow as implemented locally and unpublished; these are attributed reports, not a fresh working-tree inspection.

Earlier completion reports in this conversation are attributed reports of local work and checks, not fresh execution results. This reconciliation performs document/content and Git-state inspection; its completion report records Markdown, IDs, links, status consistency and preservation results. No application or recovery tests were run. The source of the added requirements is the owner's current instruction and inspected documents; `README-PROPOSAL.md` and `STACK-DECISION-PROPOSAL.md` are not adopted as project decisions or implementation sources.

### POS-001 — Communication standard

- Source: owner instructions in this conversation authorized creation, template changes, relocation and tracker-reporting guidance. Earlier completion reports described those local changes and structural checks.
- Fresh evidence: [the relocated standard](../development/COMMUNICATION-STANDARD.md) contains all five conversation templates. Codex only suggests tracker changes, ChatGPT evaluates them, and the owner decides acceptance and authorizes exact edits; Codex cannot independently accept work or mark it Done. The existing single-file, evidence and preservation rules remain present. Owner acceptance is pending.

### POS-002 — Tracker

- Authorization history: owner instructions authorized initial creation at the repository root and later relocation/reference correction. Current location: `docs/planning/TASKS-AND-IMPROVEMENTS.md`. The current instruction authorizes only the specified reconciliation, conditional transitions and proposals in this file.
- Acceptance criteria: one task table; stable unique IDs; realistic statuses; attributed historical versus fresh evidence; the authorized requirements and new entries; concise completed references; preservation of existing work without copying the standard's templates.
- Verification: direct comparison with current documents supports this reconciliation; this task's completion report supplies the final structural and preservation results. Updating the tracker itself does not establish acceptance. Owner acceptance remains pending.

### POS-003 — Agent entry point

- Authorization history: the owner explicitly requested creating only `AGENTS.md`, then separately authorized correcting its two relocated-document link targets. Earlier completion reports described local implementation and link/preservation checks; they did not establish owner acceptance.
- Acceptance criteria: concise instructions link to the existing standard and tracker, require reading them before work, and preserve their scope and source-of-truth boundaries without copying their rules or templates.
- Fresh evidence: `AGENTS.md` is present, concise and meets those recorded criteria; its two links target the existing relocated documents. Both dependencies exist. The current owner instruction permits the supported transition to In review; owner acceptance is still pending.

### POS-004–POS-010 — First-milestone outcomes

Source: the owner's approved Notes workflow, engineering constraints, early Pages request and current README-review requirements. The product objective is approved; these implementation and review tasks are not individually authorized, and no runtime verification results exist. The [README capability/evidence table](../../README.md#capability-based-roadmap) remains the reference for capability expectations. Before implementation, define a concrete single-file task and its acceptance criteria; toolchain, environment, storage and preview choices remain unresolved proposals.

- **POS-004:** Define the workspace layout, Notes list/editor, save and error feedback, responsive behavior, keyboard navigation and visible focus. Choose the form and permitted file of the design work before authorizing it; visual polish must support the actual workflow.
- **POS-005:** Through a bounded assessment and owner decision, select build tools, persistence method, supported browser/OS targets, export-versioning approach and test tools for one cohesive build. Compare at least localStorage and IndexedDB. These decisions block persistence implementation and support claims, not independent visual exploration. Document reproducible setup/check commands and verify the production artifact. Vite, TypeScript, IndexedDB, Vitest and Playwright remain earlier recommendations, not installed or accepted choices. Coordinate manifests, lockfiles, configuration and checks through separate scoped tasks; do not label an incomplete setup reproducible.
- **POS-006:** Open Notes from the workspace, create/edit multiple notes with stable identities, and preserve editor state during navigation. Dependencies: a defined interaction direction and usable toolchain. Saving and backup acceptance are owned by POS-008 and POS-009; this outcome does not introduce a general runtime, SDK or independent packages.
- **POS-007:** Retain early Pages delivery as an objective. The ordering choice is unresolved: normal preview after the recovery workflow is proven, or an earlier explicitly non-persistent demo with prominent draft-loss guidance. Neither option is accepted by this update. Verify asset paths and browser behavior from the intended artifact; dependencies are build output and review of published contents. Configuration, workflow files, settings and publication need their own authorized scope; a green deployment alone is not functional acceptance. Do not import historical deployment assumptions.
- **POS-008:** Define and verify edits made during a pending save, stale or competing writes, failed writes, retry and full-browser restart in the selected environment. Show saved, unsaved and failed-save states; preserve drafts and prior committed content after failures. Depends on concrete editor/persistence work under POS-006 and POS-005. State profile/origin, eviction and device-loss limits. Restart checks do not establish power-loss protection or a backup guarantee.
- **POS-009:** Define a versioned export format, validation rules and compatibility policy; preserve identities and text. Decide how restoration handles existing notes and unsaved drafts. Empty-store-only restore is a recommendation, not an accepted restriction. Invalid input and failed restoration must preserve existing data and prevent partial imports; test with synthetic data. Depends on a defined document format and persistence behavior, neither implemented yet.
- **POS-010:** Prepare a practical verification plan covering each important failure case, its trigger, expected result and evidence limits. Distinguish simulated errors, real browser-storage checks and manual restart checks. Introduce relevant checks alongside implementation rather than postponing all tests until this final review. Then perform the separately authorized read-only milestone review across the workflow, keyboard/focus behavior, production build and proportionate quality dimensions in the standard. Depends on implementation and evidence from the outcomes above; findings remain report-only and owner acceptance is separate.

### POS-011 — README guidance; original finding retained

- Historical observation — November 14, 2026: "`README.md` is zero bytes; `git diff -- README.md` shows the pre-existing deletion of the committed `# personal-os` heading. No setup or project-entry guidance is available there. Confidence: high for the inspected working tree; the deletion's intent is unknown."
- Authorization/evidence: a later owner instruction authorized updating only README. Its earlier completion report described the local project entry point and structural checks. Fresh inspection confirms purpose, vision, current capabilities, the Notes milestone, full blueprint, ownership guidance, capability/evidence table and resolving documentation links. The original lack of guidance is locally repaired; owner acceptance is pending. Remaining focused cleanup belongs to POS-013, not a recurrence of the empty-file defect.

### POS-012 — Git workflow

- Source: owner instructions authorized creating the Git workflow and later revising its plain-language templates/examples. Prior completion reports described local implementation, Markdown/link checks and preservation; no actual example commits or pushes were reported as executed.
- Fresh evidence: [GIT-WORKFLOW.md](../development/GIT-WORKFLOW.md) contains authorization, staging, outgoing-publication and recovery rules, three copyable templates and seven numbered practical examples labeled illustrative. Direct inspection confirms the requested local implementation. No commit, push or publication of this working file is evidenced.
- Dependency: the communication standard. Remaining acceptance criterion: owner acceptance; local implementation and passing document checks do not supply it.

### POS-013 — Focused README cleanup

- Source: the owner's specified README-review requirements in the current instruction. Permitted file if separately authorized: `README.md` only. This Proposed entry does not authorize editing it.
- Acceptance criteria:
  - Add a concise pre-implementation status line and short purpose explanation. Explain that the tree is a direction map and implementation folders are created when their code requires them.
  - Preserve the full hierarchy, ownership table and capability/evidence table.
  - Explain the proposed delivery sequence and meaningful phase exit criteria without claiming owner acceptance; identify environment, stack and preview choices as unresolved until decided.
  - Link the existing Git workflow and correct its planned/nonexistent descriptions. Consolidate repeated authorization wording and keep the entry page human-readable.
  - Keep detailed test procedures, backup schemas and decision templates outside the README.
- Dependencies: current project documents and owner authorization of the actual README task. No implementation or verification result exists for this follow-up. The stack assessment follows as separately scoped work under POS-005.
- Reported partial implementation: Codex reports the Git workflow link and the correction of its planned/nonexistent descriptions (the first clause of the fourth criterion) as implemented locally through a separate README-only correction task. This is an attributed report, unpublished, with no owner acceptance evidenced. This entry’s status, scope and remaining criteria are unchanged; if it is authorized, verify that clause against the README as it then stands.

## Completed

No owner-accepted completions are currently evidenced. When an entry becomes Done, retain its ID and one task-table row, compact its detail here to the accepted outcome and evidence/decision references, and remove superseded detail rather than maintaining a second status record.
