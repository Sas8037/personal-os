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

The reusable `packages/desktop-shell` package has passed strict TypeScript checking, compilation, public JavaScript/type export resolution, and source/declaration map generation (IMP-002, verified 2026-10-29). It provides a standalone presentation frame and public types. `apps/web` currently contains only `package.json`; web dependency installation, HTML entry, configuration, source, and browser integration remain pending. No browser preview is running.

IMP-001, the first browser preview, remains the next implementation priority. The accepted architecture keeps the web host thin, application lifecycle in a future runtime package, and privileged authorization in trusted backends. Independent apps, SDK/OS API contracts, real storage, sign-in, local AI, and kernel implementation remain planned. Use the [Shared Packages Guide](../packages/README.md) for package details and the [repository README](../README.md) for setup commands rather than treating architecture plans as a source-tree inventory.

| Stage | Practical user outcome | Current standing |
| --- | --- | --- |
| **D0 — Day-one desktop** | Launch a browser desktop, open/close placeholders, inspect system status | Shell strict type check, build and public exports verified; web host manifest only, dependency installation/integration pending; no preview running; optional Pages demo proposed |
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

**Next implementation priority: IMP-001.** Continue one file at a time from the manifest-only `apps/web` host: install declared dependencies, add minimal host files, render the shell through its verified public package entry, then check rendering and reload through a Codespaces preview. IMP-002 package configuration is complete. Any public Pages demo requires separate approval of isolation, visibility, routing, and deployment checks; it does not replace the local D0 browser gate or private Pi deployment work.
