# Personal OS — Improvement Register

**Register type:** Living planning and improvement tracker (not a governing specification)  
**Last updated:** 2026-10-29  
**Architecture authority:** [PWOS-002 — System Architecture Foundation](architecture/PWOS-002-system-architecture-foundation.md)  
**Project scope:** [PWOS-001 — Project Charter](foundation/PWOS-001-project-charter.md)

## Purpose

This is the single place to record improvements suggested during Personal OS design, implementation, review, or documentation changes. It preserves ideas without silently turning them into approved requirements or expanding scope. The five existing governing documents remain authoritative.

**Working agreement:** Whenever repository files or documentation are created or updated, review this register. Record newly identified improvements, revise the status of affected items, and call out particularly valuable proposals **before beginning the next implementation step**. Continue working one implementation file at a time unless the owner requests a broader update.

## How to use the register

1. Give each idea a stable `IMP-###` ID; never reuse an ID.
2. Record the problem, proposed improvement, expected benefit, cost/risk, and a concrete verification condition.
3. Use **Candidate** for an idea awaiting evaluation, **Recommended** for a suggested next choice, **Approved** only after explicit owner agreement, **In progress**, **Verified**, **Deferred**, or **Rejected** as appropriate.
4. Do not mark an improvement **Verified** just because a file exists; record the observable test or review evidence.
5. For significant changes to the accepted charter or architecture, update the appropriate `PWOS` document using its approval process. An `IMP` status is **not** an architecture decision record or owner approval of a governing document.
6. At each handoff, report new/changed improvement IDs, documents that need synchronization, the most appealing improvement worth discussing, and the next proposed file.

Priority meanings: **P0** blocks a safe or working next milestone; **P1** has high near-term impact; **P2** improves maintainability or later stages; **P3** is exploratory or long-term.

## Active improvement backlog

| ID | Priority | Status | Area | Proposed improvement | Benefit and tradeoff | Acceptance evidence |
| --- | --- | --- | --- | --- | --- | --- |
| **IMP-001** | P0 | **Recommended — next implementation priority** | First preview | Make the reusable desktop shell visible through a minimal `apps/web` host before expanding desktop features. | Early user feedback; requires host setup and temporary unstyled UI. | Desktop displays from a Codespaces URL and reloads successfully. |
| **IMP-002** | P0 | **Verified** | Package build | Add `packages/desktop-shell/tsconfig.json`, build/type-check scripts, and a proper `package.json` `exports` map. | Reliable workspace imports; adds packaging and output configuration decisions. | Package configuration, public exports, and build verification complete. Workspace `typecheck` and `build` scripts passed; host-context TypeScript resolution found `dist/index.d.ts`, and public JavaScript entry resolution found `dist/index.js`. Source and declaration maps were generated. Browser integration remains IMP-001. |
| **IMP-003** | P0 | Candidate | Public-demo safety | Make GitHub Pages a clearly labeled **static demonstration-only** profile with no private Pi endpoints, credentials, or real file/AI access. | Accessible public preview with low risk; advanced services unavailable there. | Reviewed deployment artifact contains only safe assets and demo data. |
| **IMP-004** | P1 | Candidate | Capability UX | Expose host-supplied `available`, `unavailable`, and `demo` capability states; show honest UI labels. | Consistent shell behavior across Pages and Pi; requires a narrow capability contract. | Missing service never appears connected or grants an action. |
| **IMP-005** | P1 | Candidate | Deployment paths | Configure Vite asset base for the GitHub project path `/personal-os/`; define navigation/deep-link behavior. | Avoids broken assets and 404s; project subpaths complicate routing. | Direct visit, refresh, and assets work at the published project URL. |
| **IMP-006** | P1 | Candidate | Automated deployment | Deploy static demo artifacts through GitHub Actions after build and safety checks. | Repeatable preview releases; needs workflow permissions and artifact validation. | Clean workflow publishes and verifies an accessible Pages site. |
| **IMP-007** | P1 | Candidate | Testing | Add component rendering tests, accessibility checks, and a D0 browser smoke test. | Catches UI regressions; adds testing dependencies and maintenance. | CI verifies key interactions, keyboard use and a successful preview. |
| **IMP-008** | P1 | Candidate | Documentation QA | Restore `docs:check` in the shell-first root manifest and enforce README naming/link checks in CI. | Reduces documentation drift; requires keeping scripts and CI aligned. | Fresh checkout runs the command and fails on intentionally broken links. |
| **IMP-009** | P0 | **Completed (owner-confirmed)** | Repository reconciliation | Establish the actual Codespaces/GitHub checkout as the sole authoritative implementation baseline; compare its tracked and untracked project files against generated archives, isolate legacy prototypes and placeholders, and publish a verified inventory before generating more code or repository ZIPs. | Prevents accidental reintroduction of unused files and misleading progress reports; requires a one-time checkout audit and explicit decisions about retained files. | Owner confirmed completion on 2026-10-29; checkout includes reconciliation commit `70f4fc2`. Detailed acceptance evidence has not been independently reverified in this session. |
| **IMP-010** | P2 | Candidate | Shell design | Establish visual tokens, responsive layout, and accessible desktop regions before detailed widgets/windows. | Consistent future UI; requires up-front design-system choices. | Layout works on desktop and mobile without inaccessible controls. |
| **IMP-011** | P2 | Candidate | App separation | Introduce the minimal app-runtime lifecycle and build-time first-party app registry against public contracts. | Modular applications; premature runtime complexity is a risk. | First independent app opens/closes without importing private web-host files. |
| **IMP-012** | P2 | Candidate | Personal storage | Define authorized file identifiers, SQLite/blob consistency, backups and a tested restore path before real user data. | Protects owner data; requires service and Pi hardware work. | D2 restore drill recovers metadata and blobs consistently. |
| **IMP-013** | P2 | Candidate | Local AI | Benchmark replaceable inference adapters on chosen Pi 5 hardware before selecting a model. | Evidence-based resource planning; requires real hardware and test workloads. | Offline benchmark documents memory, throughput and latency. |
| **IMP-014** | P3 | Deferred | Original kernel | Keep emulator-first AArch64/Rust kernel experiments independent of the browser D0–D4 path. | Protects delivery schedule while retaining long-term research; adds separate engineering effort. | Reproducible emulator boot and isolated kernel test evidence. |
| **IMP-015** | P1 | **In progress** | Documentation accuracy | Historical starter applications are still described as current in both README files. Distinguish existing implementation, historical starters, and planned architecture throughout the documentation using the actual checkout as evidence. | Prevents misleading capability and repository claims; requires a separate documentation audit and synchronization effort. | Documentation paths and current-capability claims agree with the checkout; historical starters and planned architecture are explicitly labeled. |
| **IMP-016** | P1 | **Implemented — owner-reported verification** | File registry | Maintain a descriptive, non-governing [File Registry](FILE-REGISTRY.md) of actual project files, tracking states, responsibilities, relationships, and Current/Planned/Historical classifications. | Makes inventory and synchronization reviewable; requires maintenance when files or roles/statuses change, with registry updates performed as separate one-file steps. | Registry created. Owner-reported handoff evidence: 17 Current files, 12 tracked (6 modified, 6 clean) and 5 untracked in the reviewed checkout snapshot; Current paths checked for existence, listed Historical/Planned paths checked for absence, and diff/whitespace checks passed. Creation and these inventory checks do not independently verify every repository claim, prior build result, or accepted-document implementation statement; no builds/tests were rerun for the registry. |
| **IMP-017** | P1 | Candidate | Tracked dependency cleanup | Remove the 259 already-tracked `node_modules/` entries from Git tracking while preserving all local installed dependencies; retain the ignore rule. | Reduces dependency noise and prevents accidental commits of installed packages; index changes must be narrowly scoped and reviewed to avoid removing project source or local dependencies. | Before committing, verify `git ls-files node_modules` is empty, local installed dependencies remain intact, the ignore rule matches, and the staged diff contains only intended dependency untracking with no unrelated source changes. The 259-entry count is evidence from the registry snapshot, not completed cleanup. |
| **IMP-018** | P1 | **Implemented and reviewed — owner-reported evidence** | Development workflow | Establish the living, non-governing [Development Workflow](DEVELOPMENT-WORKFLOW.md) standard for Git changes. | Makes changes reviewable and publication traceable; requires deliberate adherence and maintenance, not automatic enforcement. | Owner-reported reviewed coverage: Conventional Commits; explicit staging and staged-diff verification; safe commit/push and recovery practices; branch/PR guidance; one-file-at-a-time edits with logical multi-file commits. Published commit `294eda8a5f54c55cc394ae78475ecc2e77d26720` on `main`, confirmed at `origin/main` in the owner’s report. Guide creation did not implement CI or automatic enforcement. |

## Improvements worth discussing before the next step

### A. First visible desktop (IMP-001)

**Why it is appealing:** Seeing even a simple Personal OS frame in Codespaces gives immediate feedback on our actual architecture and design. It is a stronger milestone than adding multiple untested UI components.

**Next implementation priority after documentation work:** Package configuration and build verification (IMP-002) are complete. Create the thinnest possible web host, render `DesktopShell` through its public package export, then verify a browser preview. Do not wait for a window manager, AI or real storage.

### B. Public GitHub Pages demo (IMP-003–IMP-006)

**Why it is appealing:** A static demo would provide a link you can open on other devices without running your Pi. The public site must remain separate from privileged services.

**Decision still needed:** Explicitly approve a public demo-only profile; select the static routing strategy and required deployment checks before publishing. Do not interpret the presence of this idea as permission to expose private APIs or user data.

### C. Repository truth and repeatable setup (IMP-008–IMP-009)

**Why it is appealing:** The empty `package.json` issue and legacy starter files included in prior archives showed why our written architecture must match what is actually present in Codespaces. **IMP-009 was confirmed completed by the owner on 2026-10-29.** A verified setup and clear CI checks make every future file easier to validate.

### D. Registry integration and tracked dependency hygiene (IMP-016–IMP-017)

The registry now makes checkout facts and evidence limits visible. Integrating it into documentation navigation and maintenance rules is the next documentation step. Cleaning up the 259 tracked dependency entries is a valuable separate P1 proposal; IMP-017 remains Candidate and no index cleanup is authorized or performed by this register update.

## Review log

| Date | Update | Owner decision needed |
| --- | --- | --- |
| 2026-10-28 | Initial register created from desktop-shell work, Codespaces setup issues, static Pages proposal and longer-term architecture opportunities. | Choose whether to adopt the public demo-only Pages profile and confirm first-preview priority. |
| 2026-10-28 | Linked register from both README entry points and established mandatory register review/handoff conventions in the Documentation Guide. | No new architectural approval; Pages public-demo model remains proposed. |
| 2026-10-29 | Escalated IMP-009 to P0 / Recommended following discovery that generated packages contain unworked-on prototype files. The Codespaces checkout—not archived ZIP contents—is the source of truth. No reconciliation audit has been completed yet. | Verify real checkout inventory and decide which files to keep; do not treat archive inventory as verified implementation. |
| 2026-10-29 | Owner confirmed IMP-009 is completed; recorded the confirmation and reconciliation commit `70f4fc2`. This supersedes the earlier pending-audit status; detailed acceptance evidence was not independently reverified in this session. | IMP-002 remains Recommended and requires owner approval before implementation. |
| 2026-10-29 | IMP-002 package configuration, exports, and build verification completed: strict TypeScript checks and workspace build passed, generated JavaScript/declarations/maps were confirmed, and public entry resolution passed. Minimal root `.gitignore` created for `node_modules/` and `/packages/desktop-shell/dist/`; `git check-ignore` confirmed generated JavaScript and declaration maps are ignored. Existing tracked dependencies remain tracked. Owner identified IMP-001 as the next implementation priority. | No additional configuration changes are necessary now; first browser preview remains unverified. |
| 2026-10-29 | Closed pending README status synchronization: `README.md` and `packages/README.md` now reflect the verified package build, exports, commands, and IMP-001 priority. IMP-002 remains Verified. Logged IMP-015 for a separate documentation accuracy review of historical starters versus existing implementation and planned architecture. | IMP-015 is Candidate; its documentation audit is separate from this synchronization task. |
| 2026-10-29 | Recorded IMP-016 as Implemented with owner-reported registry verification: 17 Current files, 12 tracked and 5 untracked in the reviewed snapshot. Inventory existence/tracking checks are distinct from independent verification of every repository claim. Logged IMP-017 for the 259 already-tracked dependency entries; cleanup must preserve local installed dependencies and be verified before committing. IMP-015 is In progress: README/index/guide accuracy work has progressed, but remaining documentation review and registry integration are pending. | IMP-017 is Candidate, not Approved or Verified. No cleanup performed. IMP-001 remains the next implementation priority after documentation work. |
| 2026-10-29 | Recorded IMP-018 as Implemented and reviewed with owner-reported workflow coverage and publication evidence: commit `294eda8a5f54c55cc394ae78475ecc2e77d26720` on `main`, confirmed at `origin/main`. The guide documents Git standards; it does not implement CI or automatic enforcement. IMP-015 remains In progress, IMP-017 remains Candidate, and IMP-001 remains the next implementation priority after documentation work. | Navigation and Documentation Guide integration for the workflow and registry remain pending, as separate one-file documentation steps. |

## Next planned work

**Next implementation priority after documentation work:** IMP-001 — display the first browser desktop through the manifest-only `apps/web` host; `apps/web/package.json` already exists, with dependency installation and browser integration pending. Continue one implementation file at a time when implementation resumes. IMP-002 is complete; no additional configuration changes are necessary right now.

**Documentation synchronization:** Completed on 2026-10-28: [`docs/README.md`](README.md), the [repository README](../README.md), and [`DOCUMENTATION-GUIDE.md`](DOCUMENTATION-GUIDE.md) now reference the register and define its maintenance policy. It remains **non-governing**.

**Completed status synchronization — October 29, 2026:** `README.md` and `packages/README.md` now reflect the verified desktop-shell package build, public exports, workspace commands, and IMP-001 as the next implementation priority. No further synchronization is required for this package-status update. No governing architecture change is required. The separate documentation accuracy improvement is recorded as IMP-015 (In progress).

**Pending registry integration:** `docs/README.md` still needs supplementary registry navigation, and `docs/DOCUMENTATION-GUIDE.md` still needs registry maintenance integration. Proposed next documentation file: `docs/README.md`, followed by the guide in a separate step. Keep IMP-015 In progress until all required documentation is reviewed, including remaining root README environment/tracking distinctions and older charter/architecture implementation snapshots. Synchronize the registry’s IMP-015 status description in a later registry-only step; this update changes only the Improvement Register.

**Pending workflow integration (IMP-018):** Add supplementary workflow navigation to `docs/README.md` and reference the workflow from `docs/DOCUMENTATION-GUIDE.md` without changing the governing set or architectural approval rules. These integrations remain pending alongside registry integration. Update the File Registry separately for the workflow’s committed tracking state and changed register status; its earlier snapshot is not a current tracking guarantee.
