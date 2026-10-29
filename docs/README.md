# Personal OS — Documentation Index

This is the navigation hub for Personal OS engineering documentation. The project begins as a browser-accessible, self-hosted personal environment targeting a Raspberry Pi 5. An original kernel is a separate long-term research objective.

## Current documentation baseline

**These five documents form the current governing documentation set.** PWOS-001 and PWOS-002 have both been formally accepted. Implementation-oriented READMEs may supplement them without becoming governing specifications.

| Document | Purpose | Review state |
| --- | --- | --- |
| [Repository README](../README.md) | Project introduction, working prototype and developer quick start | Living entry point |
| **Documentation Index** (this file) | Navigation and documentation inventory | Living index |
| [Documentation Guide](DOCUMENTATION-GUIDE.md) | Naming, IDs, frontmatter, statuses, links and review rules | Living policy |
| [PWOS-001 — Project Charter](foundation/PWOS-001-project-charter.md) | Objectives, target direction, project scope, staged delivery, risks and owner approval | v0.12 — Accepted (2026-10-28) |
| [PWOS-002 — System Architecture Foundation](architecture/PWOS-002-system-architecture-foundation.md) | System layers, component ownership and eight approved architectural decisions | v0.2 — Accepted (2026-10-27) |

### Developer guides

| Guide | Purpose |
| --- | --- |
| [Shared Packages Guide](../packages/README.md) | Current and proposed shared packages, public API boundaries, dependency rules and package development workflow |
| [Improvement Register](IMPROVEMENTS.md) | Living prioritized ideas, tradeoffs, owner decision gates and verification evidence (non-governing) |

The [project README](../README.md#proposed-github-pages-preview) describes the proposed GitHub Pages **static demo** profile and its separation from private Raspberry Pi hosting. This is a deployment proposal, not a sixth governing specification or a completed deployment.

Files remaining from earlier planning iterations outside this inventory do **not** become approved specifications merely by existing. The prior System Requirements draft that once used PWOS-002 has been preserved at [historical requirements draft](archive/legacy-system-requirements-2026-10-26.md) as non-governing material; **PWOS-002 now identifies the new architecture foundation**.

## Recommended reading order

1. Start with the [repository README](../README.md) to see the current code and how to launch it.
2. Read [PWOS-001](foundation/PWOS-001-project-charter.md) for the vision, boundaries and the **D0–D4 use-from-day-one delivery path**.
3. Read [PWOS-002](architecture/PWOS-002-system-architecture-foundation.md) for the accepted system-layer design, dependencies, app lifecycle and trust boundaries.
4. Use the [Documentation Guide](DOCUMENTATION-GUIDE.md) when writing, reviewing or updating documents.
5. Consult the [Shared Packages Guide](../packages/README.md) before adding shared code or extracting a system module.
6. Review the [Improvement Register](IMPROVEMENTS.md) for proposed enhancements and decisions worth discussing before implementation.
7. Return to this index for the current governing document inventory.

## What we are working on

The repository snapshot includes an earlier modular React/Vite browser starter (`apps/web/src/shell/`), shared TypeScript settings/UI tokens, and a Node.js/Fastify status API. **Current implementation work begins with `packages/desktop-shell/`, independently of the web host**: its manifest, public `src/index.ts` component/type exports, and standalone `DesktopShell.tsx` layout exist. The owner verified npm workspace installation and desktop-shell TypeScript checking in Codespaces on **2026-10-28**. The package still needs a declared manifest `exports` map, and **the new shell is not yet rendered by a browser host or available at a preview URL**. The accepted target keeps `apps/web` thin and owns application hosting in a separate runtime package. Independent apps and `@personal-os/app-sdk`/`@personal-os/os-api` working interfaces remain planned. See the [Shared Packages Guide](../packages/README.md). Real personal storage, secure sign-in, local AI inference and an original kernel are not implemented.

| Stage | Practical user outcome | Current standing |
| --- | --- | --- |
| **D0 — Day-one desktop** | Launch a browser desktop, open/close placeholders, inspect system status | Workspace install and shell type check verified; source exports exist; no runnable browser preview yet; optional Pages demo proposed |
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
4. Run `node scripts/lint-docs.mjs` when the documentation checker exists in your checkout. Reintroduce a root `docs:check` script before requiring it in CI. The checker validates supported metadata, filenames and local links, not the factual correctness of the design.
5. For each document update, record which other documents need synchronization, what remains improvable and the next agreed work item.

## Next action

**Before implementation**, review the proposed public-demo isolation rules, static asset/base-path strategy, GitHub Pages visibility, and deployment verification gates. Then continue one file at a time: package TypeScript configuration and exports, browser host, local Codespaces smoke test, and optionally a GitHub Pages deployment. The Pages demo does not replace private Pi deployment or the accepted D0 gate.
