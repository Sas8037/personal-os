# Personal OS — Documentation Index

This is the navigation hub for Personal OS engineering documentation. The project begins as a browser-accessible, self-hosted personal environment targeting a Raspberry Pi 5. An original kernel is a separate long-term research objective.

## Current documentation baseline

**These five documents form the current governing documentation set.** PWOS-001 and PWOS-002 have both been formally accepted. Implementation-oriented READMEs may supplement them without becoming governing specifications.

| Document | Purpose | Review state |
| --- | --- | --- |
| [Repository README](../README.md) | Project vision, verified checkout inventory and current developer commands | Living entry point |
| [Documentation Index](README.md) (this file) | Navigation and documentation inventory | Living index |
| [Documentation Guide](DOCUMENTATION-GUIDE.md) | Naming, IDs, frontmatter, statuses, links and review rules | Living policy |
| [PWOS-001 — Project Charter](foundation/PWOS-001-project-charter.md) | Objectives, target direction, project scope, staged delivery, risks and owner approval | v0.12 — Accepted (2026-10-28) |
| [PWOS-002 — System Architecture Foundation](architecture/PWOS-002-system-architecture-foundation.md) | System layers, component ownership and eight approved architectural decisions | v0.2 — Accepted (2026-10-27) |

### Supplementary documentation (non-governing)

| Guide | Purpose |
| --- | --- |
| [Shared Packages Guide](../packages/README.md) | Current and proposed shared packages, public API boundaries, dependency rules and package development workflow |
| [Improvement Register](IMPROVEMENTS.md) | Living prioritized ideas, tradeoffs, owner decision gates and verification evidence (non-governing) |
| [File Registry](FILE-REGISTRY.md) | Living inventory of actual files, Git tracking states, Current/Planned/Historical classifications, responsibilities and relationships |
| [Development Workflow](DEVELOPMENT-WORKFLOW.md) | Edit, verify, review, stage, commit, push and confirmation standard, including Conventional Commits |

The [project README](../README.md#proposed-github-pages-preview) describes the proposed GitHub Pages **static demo** profile and its separation from private Raspberry Pi hosting. This is a deployment proposal, not a sixth governing specification or a completed deployment.

The files currently inside `docs/` are this index, `DOCUMENTATION-GUIDE.md`, `IMPROVEMENTS.md`, `FILE-REGISTRY.md`, `DEVELOPMENT-WORKFLOW.md`, `foundation/PWOS-001-project-charter.md`, and `architecture/PWOS-002-system-architecture-foundation.md`. The governing table also includes the root README outside this directory; the Shared Packages Guide is supplementary and lives outside `docs/`.

No `docs/archive/` or historical requirements draft exists in this checkout. Earlier use of the PWOS-002 identifier for requirements is historical; **PWOS-002 identifies the accepted architecture foundation**. Planned documents are listed separately below and have no index links until they exist.

## Recommended reading order

1. Start with the [repository README](../README.md) for the actual checkout inventory, verified shell commands, and browser-host limitations.
2. Read [PWOS-001](foundation/PWOS-001-project-charter.md) for the vision, boundaries and the **D0–D4 use-from-day-one delivery path**.
3. Read [PWOS-002](architecture/PWOS-002-system-architecture-foundation.md) for the accepted system-layer design, dependencies, app lifecycle and trust boundaries.
4. Use the [Documentation Guide](DOCUMENTATION-GUIDE.md) when writing, reviewing or updating documents.
5. Consult the [Shared Packages Guide](../packages/README.md) before adding shared code or extracting a system module.
6. Review the [Improvement Register](IMPROVEMENTS.md) for proposed enhancements and decisions worth discussing before implementation.
7. Consult the [File Registry](FILE-REGISTRY.md) for file existence, tracking states, responsibilities and relationships; check the actual checkout when its snapshot needs refreshing.
8. Follow the [Development Workflow](DEVELOPMENT-WORKFLOW.md) for reviewed edits, Conventional Commits, staging and publication.
9. Return to this index for governing and supplementary navigation.

## What we are working on

The reusable `packages/desktop-shell` presentation package has verified strict TypeScript checking, compilation, compiled public exports and source/declaration maps (IMP-002 Verified). Current `apps/web` includes an HTML entry, React bootstrap and Vite configuration. React mounts DesktopShell through `@personal-os/desktop-shell`, with truthful offline/preview status and no connected private services.

**GP-01 is Completed and IMP-001 Verified**, based on owner-reported private Codespaces rendering, refresh, usable desktop/mobile layouts and a clean Incognito console. Prior Codex checks separately passed shell/web builds, exact-host acceptance and unrelated-host rejection. This index update checks documentation, files and declarations; no implementation or browser tests were rerun. An earlier CSP warning did not reproduce in Incognito; its source remains unconfirmed.

**IMP-007 is Approved, with Stage A implementation underway.** Exact `@playwright/test` 1.64.1 is installed in the web workspace and its `test:e2e` script exists. Chromium installation is not confirmed complete; Playwright configuration and automated browser tests, accessibility tests and testing CI are not implemented. The approved order is **smoke testing → accessibility → testing CI**. Tool installation is not a passing automated suite.

**GP-02 is In progress, acceptance pending:** reproducible clean installation/static build, correct `/personal-os/` assets, passing smoke/accessibility criteria, a passing testing CI pipeline and production-preview validation remain required. GP-03 retains separate public-demo safety and explicit owner-publication approval; GP-04 deployment and GP-05 live-site verification remain pending. GP-02 progress does not authorize publication.

The accepted architecture keeps the web host thin, application lifecycle in a future runtime package, and privileged authorization in trusted backends. Independent apps, SDK/OS API contracts, real file management, persistent storage, authentication, local AI and a native kernel remain Planned. Use the [Shared Packages Guide](../packages/README.md) for package relationships, the [File Registry](FILE-REGISTRY.md) for current paths/tracking and the [repository README](../README.md) for setup. Accepted governing documents state scope and architecture; older implementation snapshots in PWOS-001/PWOS-002 and process guides still require separate IMP-015 review. Their acceptance is not evidence that the proposed subsystems exist.

| Stage | Practical user outcome | Current standing |
| --- | --- | --- |
| **D0 — Day-one desktop** | Launch a browser desktop, open/close placeholders, inspect system status | IMP-002 Verified; React/Vite host implemented; GP-01 first-preview acceptance complete per owner report. Broader D0 functions and automated coverage are not certified by that acceptance; Pages publication remains pending approval |
| **D1 — Useful local workspace** | Use one real in-house notes/tasks-style app with non-sensitive persistence | Planned |
| **D2 — Private Pi alpha** | Authenticated owner storage with tested backup and restore on the Pi | Planned |
| **D3 — Local AI alpha** | Offline inference through an authorized assistant UI | Planned |
| **D4 — Stable personal service** | Repeatable private deployment with verified rollback and recovery | Planned |

See [PWOS-001 §8](foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan) for acceptance evidence and limitations. Kernel research runs separately and is not a gate for the usable web-native experience.

## Creating new documents

The following document types are **future additions**, not currently authoritative project documents:

- System requirements and traceability specifications.
- Detailed subsystem designs and formally decided interface contracts.
- Versioned interface contracts and backend conformance plans.
- Individual architecture decision records.
- Detailed milestones, kernel research notes and experiment reports.

Introduce a new document only when it has a defined purpose, an owner review decision and an index entry. Follow the [Documentation Guide](DOCUMENTATION-GUIDE.md) for IDs, YAML metadata and cross-references. When a document is approved or superseded, synchronize the current index and any affected governing summaries.

**PWOS-002 now records owner-approved approaches for ARC-01 through ARC-08**, including app trust assumptions, host roles, public protocols, storage, local AI and kernel research. This is an **accepted design baseline, not an implemented or security-certified system**; detailed parameters and verification gates remain in the document. Future requirements will receive a different, unique document ID.

## Keeping documentation accurate

1. Check that the charter and both README files describe the same project scope and phase.
2. Distinguish **document review status** from engineering **implementation and verification**.
3. Use relative links; do not treat planned directories as proof of working functionality.
4. Check local links against actual files and review diffs. This checkout has no `scripts/` directory, `scripts/lint-docs.mjs`, root `docs:check` command, or `.github/workflows/` CI configuration. Documentation automation remains proposed (IMP-008); do not present those tools as available checks.
5. For each document update, record which other documents need synchronization, what remains improvable and the next agreed work item.

## Next action

**Next implementation priority: IMP-007 Stage A / GP-02.** Continue one file at a time with Chromium/system prerequisites, isolated local Playwright configuration and repeatable desktop/mobile smoke tests, then accessibility criteria/testing and a dedicated testing CI workflow. Playwright tooling and output ignore rules are already present. GP-02 acceptance remains pending, and GP-03 public-demo safety/explicit owner approval cannot be bypassed. Keep stale workflow, register and PWOS implementation descriptions scheduled as separate documentation tasks; preserve accepted architectural decisions and prior evidence.
