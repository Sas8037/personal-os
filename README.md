# Personal OS

**A self-hosted, web-native personal computing environment — designed to evolve.**

Personal OS is an experimental, browser-accessible desktop with in-house applications, a versioned OS API, owner-controlled file storage, and local AI as its intended capabilities. It is designed to begin on a **Raspberry Pi 5** using Linux-hosted services and eventually support hybrid or virtual execution backed by an **original kernel developed from the ground up**.

The repository is named `personal-os`. Its documentation retains the historical `PWOS` identifier prefix for stable references. Proposed enhancements and their status are tracked in the [Improvement Register](docs/IMPROVEMENTS.md).

> **Current stage: System Concept v0.1 / D0 shell foundation.** Owner-reported verification on 2026-10-29 covers desktop-shell strict TypeScript checking, compilation, compiled public export resolution, and source/declaration map generation. Browser delivery and the complete D0 smoke test remain unverified. This is **not** a secure production OS, deployed personal cloud, running local AI service, or working custom kernel.

## What we are building

| Area | Initial direction | Long-term direction |
| --- | --- | --- |
| Experience | Desktop launched by opening a website | Consistent user experience across supported execution modes |
| Applications | In-house web apps and SDK | Portable applications using stable OS interfaces |
| Backend | Linux-hosted services on Raspberry Pi 5 | Linux, virtual, and original native backends |
| Storage | Pi-hosted personal cloud, with separate backups | Backend-independent storage services |
| AI | Local inference on owner-controlled hardware | Permission-scoped integration across applications |
| Kernel | Linux provides host OS functionality initially | Independently researched original kernel and userspace |

**Design principle:** Applications should depend on documented OS APIs rather than directly on Linux-specific or kernel-specific internals. Changing the execution backend will still require compatibility tests and may introduce new constraints. The browser is intended to remain a **thin delivery host**, with desktop-shell and application-runtime implementations owned by independent packages.

## Project status

| Component | State |
| --- | --- |
| Desktop shell | Existing reusable presentation frame in `packages/desktop-shell`; strict TypeScript checks, build, compiled public exports, and source/declaration maps verified per the prior owner report on 2026-10-29 (IMP-002); no verified browser rendering |
| Browser host | `apps/web/package.json` only; workspace `@personal-os/web` and Vite scripts declared; dependency installation, HTML entry, configuration, source, and browser integration pending |
| Browser preview | No preview running; browser build, rendering, refresh, and complete D0 smoke test unverified (IMP-001 is next) |
| GitHub Pages demo | Proposed static demonstration-only profile; no deployment configuration or verified site |
| HTTP API | No `apps/api` implementation or verified endpoints in this checkout |
| Automated checks | Shell workspace type-check/build commands previously verified per the owner report; no checked-in CI workflows, browser/API tests, or documentation checker |
| Application runtime, versioned OS API, SDK and backends | Planned architecture; no corresponding implementation directories in this checkout |
| Shared UI and TypeScript configuration | `packages/ui` and `packages/tsconfig` absent; the shell owns its existing package-specific tsconfig |
| Authentication, real file management, personal cloud and local AI | Not implemented |
| Raspberry Pi production deployment | Planned; not verified |
| Original kernel | Long-term research direction; no kernel source directory or bootable implementation |

For staged acceptance criteria and remaining work, see [PWOS-001 — Project Charter](docs/foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan).

## Quick start — GitHub Codespaces

1. Create or open the GitHub repository named `personal-os` in Codespaces.
2. The root manifest manages `apps/*` and `packages/*` workspaces. The existing packages are `@personal-os/desktop-shell` and the manifest-only `@personal-os/web`.
3. In the repository root, install dependencies, check the shell types, and build the package:

   ```bash
   npm install
   npm ls --depth=0
   npm run typecheck -w @personal-os/desktop-shell
   npm run build -w @personal-os/desktop-shell
   ```

   The web manifest was added after the verified shell installation; installing its declared dependencies and updating the lockfile remain pending. The commands above describe setup, not a completed web installation.

4. Review and commit intentional generated `package-lock.json` changes with their dependency manifest changes for repeatable installs. The root `.gitignore` excludes `node_modules/` and `packages/desktop-shell/dist/`; already tracked dependency files remain tracked. Build output is regenerated locally.

The web manifest declares workspace `dev`, `build`, and `preview` scripts, but `apps/web` has no HTML entry, Vite configuration, or source files yet. Those commands are not a working browser preview at this stage. `DesktopShell` needs a host to render it; no browser preview is running. The root manifest has no `dev` command.

## Proposed GitHub Pages preview

Personal OS plans to support **two web delivery profiles** using the same reusable desktop shell:

| Profile | Intended location | Allowed functionality |
| --- | --- | --- |
| **Public demo** | GitHub Pages, provisionally `https://sas8037.github.io/personal-os/` | Statically built UI, sample apps, mock status and explicitly non-sensitive demonstration data |
| **Private OS** | Raspberry Pi 5, on an owner-controlled private connection | Authenticated services, private storage, and local AI once independently implemented and reviewed |

The Pages URL is **not active or verified**. GitHub Pages serves static files; it does not host the Personal OS service gateway, personal cloud, inference engine or custom kernel. A public demo must never embed credentials, private files, production API endpoints or a model-tool bridge. **Do not connect the public Pages origin directly to privileged Pi services as part of D0.** The production/private OS remains Pi-hosted.

When a web host is implemented, the planned deployment uses a Vite static build, an environment-specific asset base (`/personal-os/` for the GitHub project site), and a GitHub Actions Pages deployment. Navigation and asset loading must be verified under the repository subpath. A public Pages demo is **optional D0 distribution**, not a replacement for Codespaces browser smoke testing or an authorization/security review.

## Repository organization

The actual Codespaces checkout is the implementation source of truth. This Current inventory reflects the checkout reviewed on 2026-10-29. Entries are tracked first-party files unless explicitly marked untracked or generated. Tracked does not mean every working-tree edit has been committed; the shell manifest and package guide still have local modifications. The untracked project configuration files below are present locally but absent from the committed baseline.

```text
personal-os/
├── .gitignore                  # Untracked project configuration: dependency/build exclusions
├── README.md
├── package.json                # Workspace definitions and legacy shell type check
├── package-lock.json           # Existing dependency lockfile; web installation pending
├── apps/
│   └── web/
│       └── package.json        # Untracked project manifest only
├── packages/
│   ├── README.md               # Shared-package guide
│   └── desktop-shell/
│       ├── package.json        # Public exports and build/type-check scripts
│       ├── tsconfig.json       # Untracked project compiler configuration
│       ├── src/
│       │   ├── DesktopShell.tsx
│       │   └── index.ts
│       └── dist/               # Generated JavaScript, declarations and maps; ignored
└── docs/
    ├── README.md
    ├── DOCUMENTATION-GUIDE.md
    ├── IMPROVEMENTS.md
    ├── FILE-REGISTRY.md
    ├── DEVELOPMENT-WORKFLOW.md
    ├── architecture/
    │   └── PWOS-002-system-architecture-foundation.md
    └── foundation/
        └── PWOS-001-project-charter.md
```

Local support files are separate from the first-party tree above. `.vscode/settings.json` is an untracked, empty editor configuration. `.agents/`, `.codex/`, and `.aws/` are local environment/agent-support directories with no tracked project files or files found in this inspection. Their presence does not establish committed configuration or product functionality. `.git/` contains Git metadata.

The shell's `dist/` is ignored/generated output. Installed `node_modules/` is third-party dependency content: **259 entries remain tracked in Git** despite the existing local `.gitignore` rule. Ignore rules do not untrack committed files. IMP-017 proposes cleanup separately; no dependency cleanup has been performed. Neither generated output nor local environment tooling belongs in the first-party source inventory.

| Classification | Paths and meaning |
| --- | --- |
| Current implementation | `packages/desktop-shell/src/` contains the standalone, unstyled React presentation frame and public types. The package exports `dist/index.js` and `dist/index.d.ts` through `@personal-os/desktop-shell`; build before consuming it. `apps/web` contains only its manifest. |
| Historical — absent starters | Earlier references to `apps/web/src/shell/`, `apps/web/src/main.tsx`, and an `apps/api` starter do not describe files in this checkout. No starter application or API endpoints remain here. `docs/archive/` is also absent. |
| Planned architecture — absent from checkout | `apps/desktop`, `apps/file-manager`, `apps/ai-assistant`; `packages/app-runtime`, `packages/app-sdk`, `packages/os-api`, `packages/protocols`, `packages/ui`, `packages/tsconfig`, `packages/design-system`; `backends/`, `services/`, `platform/`, `kernel/`, and `tests/`. |
| Absent development tooling | `.devcontainer/`, `.github/workflows/`, and `scripts/` are not present; no repository-provided Codespaces configuration, CI workflow, or documentation checker is implemented. |

The proposed architecture keeps frontend hosts thin: they compose public shell/runtime interfaces. The shell owns presentation, the future runtime owns application lifecycle, and trusted services own privileged authorization. Independent applications should use the future SDK and OS API rather than private host or shell internals. An alternative desktop host must have a distinct role without duplicating the shell. Browser desktop state is separate from the future hardware kernel.

See the [Shared Packages Guide](packages/README.md) for dependency conventions and the [Improvement Register](docs/IMPROVEMENTS.md) for planning and verification. The package guide has local accuracy updates; use the actual checkout when checking current implementation status. [PWOS-001](docs/foundation/PWOS-001-project-charter.md) establishes project scope; [PWOS-002](docs/architecture/PWOS-002-system-architecture-foundation.md) governs ownership. Future `@personal-os/app-sdk` and `@personal-os/os-api` identities are proposed contracts, not existing packages or stable APIs.

## Useful commands

Run from the repository root:

| Command | Purpose |
| --- | --- |
| `npm install` | Install workspace dependencies |
| `npm ls --depth=0` | Inspect installed top-level workspace dependencies |
| `npm run typecheck -w @personal-os/desktop-shell` | Check shell source with the strict package tsconfig without emitting files |
| `npm run build -w @personal-os/desktop-shell` | Emit JavaScript, type declarations, and both map types into the package’s `dist/` directory |
| `npm run typecheck:desktop-shell` | Run the existing root check with inline compiler options; does not use the package tsconfig |

The root manifest does not define `dev`, `build`, `test` or `docs:check` scripts. The web workspace declares Vite scripts, but its dependencies and browser entry remain pending; they are not ready-to-run preview instructions. No `scripts/lint-docs.mjs` exists in this checkout. Shell checks do not establish browser, production or Raspberry Pi readiness.

## Documentation

**Start with the [Documentation Index](docs/README.md)**, which explains where authoritative specifications live and how to read them.

| Document | Role |
| --- | --- |
| [PWOS-001 — Project Charter](docs/foundation/PWOS-001-project-charter.md) | Vision, scope, guiding principles and evolution path |
| [PWOS-002 — System Architecture Foundation](docs/architecture/PWOS-002-system-architecture-foundation.md) | Accepted layer boundaries, ownership, dependency rules, trust and backend portability |
| [Documentation Guide](docs/DOCUMENTATION-GUIDE.md) | Naming, IDs, frontmatter, status and traceability rules |
| [Shared Packages Guide](packages/README.md) | Package inventory, ownership, dependency rules and development conventions |
| [File Registry](docs/FILE-REGISTRY.md) | Supplementary living inventory of files, tracking states, responsibilities, relationships and review evidence; refresh its dated snapshot against Git |
| [Development Workflow](docs/DEVELOPMENT-WORKFLOW.md) | Supplementary editing, verification, staging, Conventional Commit and publication practices |

The **five governing project documents** are the root README, documentation index, documentation guide, PWOS-001 and PWOS-002. The package guide, File Registry, Development Workflow, and Improvement Register are supplementary, non-governing documents; they do not expand that governing set. **PWOS-001 v0.12 and PWOS-002 v0.2 are both accepted.** Other specifications are future work. Document review status is separate from feature implementation status; governed specifications use stable IDs and YAML frontmatter.

The historical requirements draft is absent from this checkout; **PWOS-002 identifies the System Architecture Foundation**. Read [PWOS-002](docs/architecture/PWOS-002-system-architecture-foundation.md) before extracting shared packages or implementing new cross-module contracts.

**Approval record:** The project owner accepted PWOS-001 v0.12 on 2026-10-28 and PWOS-002 v0.2 on 2026-10-27. Together they establish the project charter and system architecture baseline. Acceptance does **not** establish implementation readiness or certify production security.

## Development and deployment principles

- **Owner-controlled data:** Store persistent personal data on self-hosted infrastructure; design and test a separate backup and recovery path.
- **Local AI:** Run production inference on self-hosted hardware. Feasible models, memory needs and performance remain to be measured.
- **Least privilege:** Authenticate and authorize privileged actions; browser interfaces should not have unrestricted access to host files or processes.
- **Private access first:** Avoid exposing development endpoints directly to the public internet. Remote access comes after security review.
- **Replaceable backends:** Define API semantics and conformance tests before migrating services to virtual or native execution.
- **Original software where it matters:** Prioritize in-house desktop, apps, APIs, services and future kernel while honestly documenting necessary dependencies such as browsers, compilers and platform firmware.

The planned Raspberry Pi deployment requires a separate implementation and verification effort for persistent storage, authentication, backups, local inference, networking, and service management. **No production deployment or Docker Compose configuration is currently supplied.**

Do not commit credentials, personal files, model weights, databases, or other private runtime state.

## Next working experience

**D0 — Day-one desktop:** Shell package configuration and build verification are complete (IMP-002). Next priority is IMP-001: install the declared web dependencies, add the minimal host files, render `DesktopShell` through its public package export, then run a development server and verify rendering and reload through the forwarded Codespaces URL. **The Personal OS desktop is not yet viewable in the browser; no preview is running.** Backend/API verification remains separate work because no API is implemented. Then **D1 — Useful local workspace** will add one genuinely useful in-house application with non-sensitive persisted data. Acceptance criteria remain in [PWOS-001](docs/foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan).

**Possible extra D0 deliverable:** a non-sensitive, read-only GitHub Pages demo after a working static build and deployment workflow are tested. Neither this extra preview nor Pi production hosting has been implemented.
