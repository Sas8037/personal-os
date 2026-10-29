# Personal OS — File Registry

**Classification:** Current living inventory; non-governing supplementary documentation.
**Last reviewed:** 2026-10-29
**Source of truth:** Actual Codespaces checkout, including local untracked project files.

This registry describes files and their relationships. It grants no approval, changes no architectural decision, and does not replace the [Documentation Guide](DOCUMENTATION-GUIDE.md), [documentation index](README.md), or [Improvement Register](IMPROVEMENTS.md). Current means present, not complete or production-ready. Approval and implementation verification remain separate.

## Current project files

Paths are relative to the repository root. Tracking states describe the inspection snapshot before staging this registry, not a future commit. This registry was untracked at inspection and will become tracked when the authorized registry-only commit is created; other files retain their inspected states. Tracked modified files include changes accumulated before this registry task. The empty local editor configuration is included explicitly so it cannot be mistaken for committed project tooling.

| Path | Classification | Git tracking state | Responsibility | Implementation/review status | Last reviewed | Evidence/notes |
| --- | --- | --- | --- | --- | --- | --- |
| `.gitignore` | Current | Untracked | Exclude dependencies and shell build output | Minimal rules inspected | 2026-10-29 | Rules cover `node_modules/` and `/packages/desktop-shell/dist/`; ignore checks match, but tracked dependencies remain tracked. |
| `.vscode/settings.json` | Current | Untracked | Local editor configuration | Empty JSON object; environment-specific | 2026-10-29 | Present on disk, absent from `git ls-files`; not evidence of project functionality. |
| `README.md` | Current | Tracked, modified | Governing project entry point, checkout inventory and setup | Living; IMP-015 accuracy edits present | 2026-10-29 | Existing file; local support-directory wording still needs tracked-versus-environment clarification. |
| `package.json` | Current | Tracked, clean | npm workspace configuration | Existing root manifest | 2026-10-29 | Declares `apps/*`, `packages/*`, TypeScript and the legacy inline `typecheck:desktop-shell` script; no root dev/build/docs checker. |
| `package-lock.json` | Current | Tracked, clean | Dependency resolution record | Existing shell dependency lockfile | 2026-10-29 | Does not yet record the new web workspace/dependencies; web installation pending. |
| `apps/web/package.json` | Current | Untracked | `@personal-os/web` browser-host manifest | Manifest only; dependencies not yet installed; browser integration unverified | 2026-10-29 | Declares Vite dev/build/preview scripts and shell/React dependencies; no host HTML, configuration or source exists. |
| `packages/README.md` | Current | Tracked, modified | Supplementary package inventory and boundary guide | Living; IMP-015 accuracy edits present | 2026-10-29 | Separates the implemented shell from absent planned packages. |
| `packages/desktop-shell/package.json` | Current | Tracked, modified | Shell package identity, peers, scripts and public exports | Configuration implemented; owner-reported verification | 2026-10-29 | Build/typecheck scripts use package tsconfig; public import/types targets are `dist/index.js` and `dist/index.d.ts`. |
| `packages/desktop-shell/tsconfig.json` | Current | Untracked | Package compiler and output configuration | Strict settings implemented; owner-reported type-check/build success | 2026-10-29 | ES2022, ESNext/Bundler, React JSX, strict/index/switch/module checks; declarations and both map types; output to `dist/`. |
| `packages/desktop-shell/src/DesktopShell.tsx` | Current | Tracked, clean | Reusable deployment-neutral React presentation frame | Implemented layout; browser rendering unverified | 2026-10-29 | Header/workspace/dock/overlay slots and host-supplied display status; no app lifecycle or backend authorization implementation. |
| `packages/desktop-shell/src/index.ts` | Current | Tracked, clean | Public shell source entry and status types | Implemented exports; owner-reported public entry verification | 2026-10-29 | Exports `DesktopShell`, props, and connection/status types. |
| `docs/README.md` | Current | Tracked, modified | Governing documentation navigation | Living; IMP-015 accuracy edits present | 2026-10-29 | Lists five governing documents and supplementary register; this new registry is not yet linked there. |
| `docs/DOCUMENTATION-GUIDE.md` | Current | Tracked, modified | Governing documentation conventions | Living; classification and tooling accuracy updates present | 2026-10-29 | Current/Planned/Historical, approval, metadata, supersession and traceability rules; IMP-008 tooling remains Planned. |
| `docs/IMPROVEMENTS.md` | Current | Tracked, modified | Supplementary living improvement register | Non-governing; IMP-002 Verified, IMP-001 next priority, IMP-015 In progress | 2026-10-29 | Register records IMP-016 as Implemented with owner-reported evidence and IMP-017 as Candidate; workflow-guide registration and remaining integration require separate documentation steps. |
| `docs/foundation/PWOS-001-project-charter.md` | Current | Tracked, clean | Governing scope, vision and delivery gates | v0.12 accepted, owner approval dated 2026-10-28 | 2026-10-29 | Frontmatter/review record inspected; approval does not establish feature readiness; older implementation snapshot needs separate accuracy review. |
| `docs/architecture/PWOS-002-system-architecture-foundation.md` | Current | Tracked, clean | Governing architectural boundaries and design baseline | v0.2 accepted, owner approval dated 2026-10-27 | 2026-10-29 | Accepted target architecture, not proof of implemented subsystems; older implementation descriptions need separate review. |
| `docs/DEVELOPMENT-WORKFLOW.md` | Current | Untracked | Non-governing supplementary Git development, commit and push guide | Content reviewed; workflow examples are instructions, not executed operations | 2026-10-29 | File inspected on disk; absent from `git ls-files` and reported untracked by `git status --short`. Covers one-file review, logical commits, Conventional Commits, explicit staging, safe recovery and reporting. |
| `docs/FILE-REGISTRY.md` | Current | Untracked | Supplementary file inventory and synchronization map | Initial descriptive inventory | 2026-10-29 | Existing registry updated to inventory the workflow guide; untracked at inspection, to be tracked by the authorized registry-only commit. No approval authority or new governing specification. |

**Inventory count:** 18 individual files at the pre-staging inspection: 12 tracked (6 modified, 6 clean) and 6 untracked. After this registry alone is committed, the same inventory comprises 13 tracked files (6 modified, 7 clean) and 5 untracked files, assuming no other changes. No ignored/generated file is included in this main table.

## Evidence and excluded directories

Inventory evidence uses file listings, `git ls-files`, `git status --short`, and ignore checks. Counts apply only to the main table; tracked third-party dependencies are excluded.

Desktop-shell strict TypeScript checking, build, generated JavaScript/declarations/maps, and public package export resolution are recorded as **owner-reported prior verification** from the implementation handoff. No compiler, build, installation, or browser tests were rerun for this registry. Generated output exists on disk; its presence alone is not fresh verification. No browser preview is running.

| Directory | Classification | Git tracking state | Responsibility | Implementation/review status | Last reviewed | Evidence/notes |
| --- | --- | --- | --- | --- | --- | --- |
| `packages/desktop-shell/dist/` | Current | Ignored generated output | Compiled shell JavaScript, types and maps | Present; excluded from source inventory | 2026-10-29 | Contains `DesktopShell` and `index` outputs in `.js`, `.js.map`, `.d.ts`, and `.d.ts.map` forms; `git check-ignore` matches. |
| `node_modules/` | Current | Ignore rule applies; 259 entries already tracked | Installed third-party dependencies and workspace links | Existing shell dependencies; not first-party source | 2026-10-29 | `git ls-files node_modules` counts tracked entries. `git check-ignore --no-index` confirms the rule; ordinary ignore checks omit tracked files. |
| `.git/` | Current | Git metadata, not project source | Repository history/index | Excluded from inventory | 2026-10-29 | Metadata directory present. |
| `.agents/`, `.codex/`, `.aws/` | Current | No tracked project files found within these directories | Local environment/agent support | Directories present; no project files found during listing | 2026-10-29 | Environment presence does not make these first-party implementation or committed configuration. |

## File relationships and synchronization

| Files | Relationship and synchronization responsibility |
| --- | --- |
| `package.json`, workspace manifests, `package-lock.json` | Root workspace globs discover the shell and web manifests. Installation resolves their declared dependencies into the lockfile; the new web manifest is not yet synchronized with the lockfile. |
| `apps/web/package.json`, `packages/desktop-shell/package.json` | Web declares a dependency on shell version `0.1.0`; the shell exposes built entry points. This declaration is not implemented browser composition. |
| Shell `package.json`, `tsconfig.json`, `src/index.ts`, `src/DesktopShell.tsx` | Build/typecheck scripts use the tsconfig; the source entry re-exports the component/types; compiled entry points must match manifest exports. Generated output must be rebuilt after source changes. |
| `DesktopShell.tsx`, `src/index.ts` | The component imports its display-status type from the source entry; the entry re-exports the component and props. These are actual source relationships. |
| `.gitignore`, shell `tsconfig.json` | The configured `dist` output directory matches the ignore rule. Ignore rules do not remove existing tracked dependency files. |
| Root README, package guide, documentation index, charter and architecture | Synchronize capability/inventory claims when roles or verification status change; preserve accepted scope and architecture. Governing acceptance remains independent of implementation evidence. |
| Documentation Guide, Improvement Register, this registry | The guide defines documentation conventions; the register tracks proposals/decisions/evidence; this registry records file existence and roles. New registry navigation and progress updates remain separate one-file documentation steps. |
| `docs/DEVELOPMENT-WORKFLOW.md`, `docs/DOCUMENTATION-GUIDE.md`, `docs/IMPROVEMENTS.md`, `docs/FILE-REGISTRY.md` | The supplementary workflow applies the guide’s classification/approval rules, references existing IMP IDs without granting approval, and requires registry synchronization for meaningful file changes. The registry records the workflow file and its tracking/evidence limits; documentation index and guide integration remain separate steps. |

## Planned paths (not present)

These paths are explicitly proposed in existing documentation, not automatically approved implementation tasks. All are absent; they are code-formatted examples, not live links. The current `apps/web/package.json` is not a Planned file: it exists, while its browser integration remains Planned.

| Path | Classification | Git tracking state | Responsibility | Implementation/review status | Last reviewed | Evidence/notes |
| --- | --- | --- | --- | --- | --- | --- |
| `apps/web/index.html` | Planned | Absent, untracked | Minimal browser entry | Proposed for IMP-001 | 2026-10-29 | No HTML entry exists; exact host implementation remains future work. |
| `packages/app-runtime/` | Planned | Absent, untracked | Application lifecycle and hosting | Accepted architectural role; implementation absent | 2026-10-29 | Proposed package, not an implemented runtime. |
| `packages/app-sdk/`, `packages/os-api/`, `packages/protocols/` | Planned | Absent, untracked | Public application/service/wire contracts | Proposed package paths | 2026-10-29 | Roles documented in package guide and architecture; no working contracts. |
| `scripts/lint-docs.mjs`, `.github/workflows/` | Planned | Absent, untracked | Documentation validation and automation | IMP-008 proposal; no checker or CI | 2026-10-29 | No root `docs:check` script exists either. |

## Historical or removed paths

Historical classifications here describe earlier documentation references, not verified restoration locations. No links to absent files are created. Retention in archives or Git history has not been verified in this task.

| Path | Classification | Git tracking state | Responsibility | Implementation/review status | Last reviewed | Evidence/notes |
| --- | --- | --- | --- | --- | --- | --- |
| `apps/web/src/main.tsx`, `apps/web/src/shell/` | Historical | Absent; not tracked in active checkout | Earlier browser starter entry and shell | Removed/absent starter references | 2026-10-29 | Active `apps/web` contains its manifest only. |
| `apps/api/` | Historical | Absent; not tracked in active checkout | Earlier API starter | No active API implementation or endpoints | 2026-10-29 | Earlier starter claims do not establish a current backend. |
| `packages/ui/`, `packages/tsconfig/` | Historical | Absent; not tracked in active checkout | Earlier claimed shared UI/compiler starters | Earlier implementation claims unsupported by checkout | 2026-10-29 | Their future architectural roles remain Planned; no historical starter files remain here. |
| `docs/archive/legacy-system-requirements-2026-10-26.md` | Historical | Absent; not tracked in active checkout | Earlier requirements draft reference | Not an active or retained checkout document | 2026-10-29 | `docs/archive/` is absent; PWOS-002 now identifies the accepted architecture foundation. |

## Maintenance

Update this registry when project files are created, deleted, renamed, or change their responsibility, classification, tracking state, or implementation/review status. Do not automatically update it for every inconsequential content edit. Record the review date and observable evidence, separating owner-reported verification from checks performed during the update.

Preserve the one-file-at-a-time workflow: when another file changes, schedule registry synchronization as its own file step and disclose any temporary drift in the handoff. Inventorying a proposed path does not approve it. Before publishing an update, verify every Current path exists, verify the stated presence/absence of Historical paths, reconcile tracking/ignore states, and run `git diff --check` plus review the registry changes.
