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
| **IMP-001** | P0 | **Recommended** | First preview | Make the reusable desktop shell visible through a minimal `apps/web` host before expanding desktop features. | Early user feedback; requires host setup and temporary unstyled UI. | Desktop displays from a Codespaces URL and reloads successfully. |
| **IMP-002** | P0 | **Recommended** | Package build | Add `packages/desktop-shell/tsconfig.json`, build/type-check scripts, and a proper `package.json` `exports` map. | Reliable workspace imports; adds packaging and output configuration decisions. | A separate host resolves `@personal-os/desktop-shell` without private-path imports. |
| **IMP-003** | P0 | Candidate | Public-demo safety | Make GitHub Pages a clearly labeled **static demonstration-only** profile with no private Pi endpoints, credentials, or real file/AI access. | Accessible public preview with low risk; advanced services unavailable there. | Reviewed deployment artifact contains only safe assets and demo data. |
| **IMP-004** | P1 | Candidate | Capability UX | Expose host-supplied `available`, `unavailable`, and `demo` capability states; show honest UI labels. | Consistent shell behavior across Pages and Pi; requires a narrow capability contract. | Missing service never appears connected or grants an action. |
| **IMP-005** | P1 | Candidate | Deployment paths | Configure Vite asset base for the GitHub project path `/personal-os/`; define navigation/deep-link behavior. | Avoids broken assets and 404s; project subpaths complicate routing. | Direct visit, refresh, and assets work at the published project URL. |
| **IMP-006** | P1 | Candidate | Automated deployment | Deploy static demo artifacts through GitHub Actions after build and safety checks. | Repeatable preview releases; needs workflow permissions and artifact validation. | Clean workflow publishes and verifies an accessible Pages site. |
| **IMP-007** | P1 | Candidate | Testing | Add component rendering tests, accessibility checks, and a D0 browser smoke test. | Catches UI regressions; adds testing dependencies and maintenance. | CI verifies key interactions, keyboard use and a successful preview. |
| **IMP-008** | P1 | Candidate | Documentation QA | Restore `docs:check` in the shell-first root manifest and enforce README naming/link checks in CI. | Reduces documentation drift; requires keeping scripts and CI aligned. | Fresh checkout runs the command and fails on intentionally broken links. |
| **IMP-009** | P0 | **Recommended** | Repository reconciliation | Establish the actual Codespaces/GitHub checkout as the sole authoritative implementation baseline; compare its tracked and untracked project files against generated archives, isolate legacy prototypes and placeholders, and publish a verified inventory before generating more code or repository ZIPs. | Prevents accidental reintroduction of unused files and misleading progress reports; requires a one-time checkout audit and explicit decisions about retained files. | A recorded `git ls-files` and filtered on-disk inventory are reconciled; all retained files have a clear purpose; generated archives match approved active files; README and commands agree with the checkout. |
| **IMP-010** | P2 | Candidate | Shell design | Establish visual tokens, responsive layout, and accessible desktop regions before detailed widgets/windows. | Consistent future UI; requires up-front design-system choices. | Layout works on desktop and mobile without inaccessible controls. |
| **IMP-011** | P2 | Candidate | App separation | Introduce the minimal app-runtime lifecycle and build-time first-party app registry against public contracts. | Modular applications; premature runtime complexity is a risk. | First independent app opens/closes without importing private web-host files. |
| **IMP-012** | P2 | Candidate | Personal storage | Define authorized file identifiers, SQLite/blob consistency, backups and a tested restore path before real user data. | Protects owner data; requires service and Pi hardware work. | D2 restore drill recovers metadata and blobs consistently. |
| **IMP-013** | P2 | Candidate | Local AI | Benchmark replaceable inference adapters on chosen Pi 5 hardware before selecting a model. | Evidence-based resource planning; requires real hardware and test workloads. | Offline benchmark documents memory, throughput and latency. |
| **IMP-014** | P3 | Deferred | Original kernel | Keep emulator-first AArch64/Rust kernel experiments independent of the browser D0–D4 path. | Protects delivery schedule while retaining long-term research; adds separate engineering effort. | Reproducible emulator boot and isolated kernel test evidence. |

## Improvements worth discussing before the next step

### A. First visible desktop (IMP-001)

**Why it is appealing:** Seeing even a simple Personal OS frame in Codespaces gives immediate feedback on our actual architecture and design. It is a stronger milestone than adding multiple untested UI components.

**Suggested sequence:** Complete the package configuration (IMP-002), create the thinnest possible web host, render `DesktopShell`, then verify a browser preview. Do not wait for a window manager, AI or real storage.

### B. Public GitHub Pages demo (IMP-003–IMP-006)

**Why it is appealing:** A static demo would provide a link you can open on other devices without running your Pi. The public site must remain separate from privileged services.

**Decision still needed:** Explicitly approve a public demo-only profile; select the static routing strategy and required deployment checks before publishing. Do not interpret the presence of this idea as permission to expose private APIs or user data.

### C. Repository truth and repeatable setup (IMP-008–IMP-009)

**Why it is appealing:** The empty `package.json` issue and legacy starter files included in prior archives showed why our written architecture must match what is actually present in Codespaces. **IMP-009 is now P0 and Recommended: reconcile the real checkout before further file generation.** A verified setup and clear CI checks make every future file easier to validate.

## Review log

| Date | Update | Owner decision needed |
| --- | --- | --- |
| 2026-10-28 | Initial register created from desktop-shell work, Codespaces setup issues, static Pages proposal and longer-term architecture opportunities. | Choose whether to adopt the public demo-only Pages profile and confirm first-preview priority. |
| 2026-10-28 | Linked register from both README entry points and established mandatory register review/handoff conventions in the Documentation Guide. | No new architectural approval; Pages public-demo model remains proposed. |

| 2026-10-29 | Escalated IMP-009 to P0 / Recommended following discovery that generated packages contain unworked-on prototype files. The Codespaces checkout—not archived ZIP contents—is the source of truth. No reconciliation audit has been completed yet. | Verify real checkout inventory and decide which files to keep; do not treat archive inventory as verified implementation. |

## Next planned work

**Proposed next file:** `packages/desktop-shell/tsconfig.json` (IMP-002), followed by the desktop-shell package manifest exports. Then prioritize IMP-001 to display the first browser desktop.

**Documentation synchronization:** Completed on 2026-10-28: [`docs/README.md`](README.md), the [repository README](../README.md), and [`DOCUMENTATION-GUIDE.md`](DOCUMENTATION-GUIDE.md) now reference the register and define its maintenance policy. It remains **non-governing**.
