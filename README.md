# Personal OS

**A self-hosted, web-native personal computing environment — designed to evolve.**

Personal OS is an experimental, browser-accessible desktop with in-house applications, a versioned OS API, owner-controlled file storage, and local AI as its intended capabilities. It is designed to begin on a **Raspberry Pi 5** using Linux-hosted services and eventually support hybrid or virtual execution backed by an **original kernel developed from the ground up**.

The repository is named `personal-os`. Its documentation retains the historical `PWOS` identifier prefix for stable references.

> **Current stage: System Concept v0.1 / D0 shell foundation.** npm installation and the desktop-shell TypeScript check succeeded in GitHub Codespaces on 2026-10-28. Browser delivery and the complete D0 smoke test remain unverified. This is **not** a secure production OS, deployed personal cloud, running local AI service, or working custom kernel.

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
| Browser desktop shell | Modular shell under `apps/web/src/shell/`: registry, launcher, dock, widgets and window panel |
| HTTP API | Starter available: `GET /health` and `GET /api/system` |
| Codespaces environment | Owner confirmed `npm ls --depth=0` and `npm run typecheck:desktop-shell` succeed (2026-10-28); no browser smoke test yet |
| Automated checks | Desktop-shell type check verified in Codespaces; browser build, API tests and documentation CI are not part of the current shell-first root scripts |
| Versioned OS API, SDK and Linux backend | Planned; package names reserved, contracts and backend implementations not built |
| Shared shell and app runtime packages | `desktop-shell` manifest, type-only `src/index.ts` and standalone `DesktopShell.tsx` layout created and type-checked; not yet exported from package or hosted in a browser; app runtime not implemented |
| Authentication, real file management and personal cloud | Not implemented |
| Local AI inference | Not implemented |
| Raspberry Pi production deployment | Not verified |
| Original kernel | Research track; not bootable or implemented |

For staged acceptance criteria and remaining work, see [PWOS-001 — Project Charter](docs/foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan).

## Quick start — GitHub Codespaces

1. Create or open the GitHub repository named `personal-os` in Codespaces.
2. Ensure the root `package.json` and `packages/desktop-shell/package.json` are **nonempty, valid JSON**. The shell-first root manifest manages npm workspaces without requiring an `apps/web` project.
3. In the repository root, install dependencies and verify the shell types:

   ```bash
   npm install
   npm ls --depth=0
   npm run typecheck:desktop-shell
   ```

4. Commit the generated `package-lock.json` for repeatable installs; do not commit `node_modules/`.

**There is no shell-first browser launch command yet.** The earlier archive contains a web/API starter, but the current Codespaces setup has not begun integrating `apps/web`. Do not expect `npm run dev` or forwarded ports to work with the current root manifest.

Any placeholder Files/Local AI/Tools/Settings tiles in the earlier archived starter are not evidence of working file access or AI inference.

## Repository organization

```text
personal-os/
├── .devcontainer/         # Codespaces development setup
├── .github/workflows/     # Documentation CI
├── apps/
│   ├── web/               # Current React/Vite desktop starter
│   ├── api/               # Current Fastify API starter
│   ├── desktop/           # Reserved alternative desktop host
│   ├── file-manager/      # Planned file application
│   └── ai-assistant/      # Planned local AI interface
├── packages/
│   ├── README.md          # Shared-package directory and dependency guide
│   ├── desktop-shell/     # Manifest, entry point and standalone layout component
│   ├── app-runtime/       # Target app host/lifecycle (not yet created)
│   ├── tsconfig/          # Shared TypeScript compiler baseline
│   ├── ui/                # Shared UI design tokens
│   ├── design-system/     # Future cross-host visual standards
│   ├── os-api/            # Planned backend-neutral contracts
│   ├── app-sdk/           # Planned application development SDK
│   └── protocols/         # Planned schemas and message formats
├── backends/
│   ├── linux/             # Planned initial OS API adapter
│   ├── virtual/           # Future guest-system integration
│   └── native/            # Future custom-OS integration
├── kernel/                # Original-kernel research and future implementation
├── services/              # Future privileged system services
├── platform/              # Future deployment and hardware integration
├── tests/                 # Cross-component and conformance tests
├── scripts/               # Repository maintenance tooling
└── docs/                  # Design and engineering documentation
```

This is a **mixed current/target overview**: `desktop-shell/` has a manifest, preliminary status types in `src/index.ts`, and a standalone `DesktopShell.tsx` presentation frame. The React component is not yet re-exported through `index.ts`, styled, or integrated with an application host; the package has no declared public `exports` map. `app-runtime/` and `design-system/` remain planned paths. See the [Shared Packages Guide](packages/README.md) for status and dependency conventions. [PWOS-001](docs/foundation/PWOS-001-project-charter.md) establishes the project scope; [PWOS-002](docs/architecture/PWOS-002-system-architecture-foundation.md) governs architectural ownership. Individual OS API contracts are **not yet defined or stable**.

The supplied repository snapshot contains an earlier `apps/web/src/` starter with a `shell/` directory and `main.tsx`. **The active implementation sequence now begins in `packages/desktop-shell/` independently of `apps/web`; the earlier starter is not a prerequisite or evidence that the new host integration is underway.** Browser desktop state is not the experimental hardware kernel. When a frontend host is integrated, `apps/web` should remain thin; `apps/desktop` must have a distinct role and must not duplicate the shell. Independent user applications belong in root workspaces such as `apps/file-manager/` and `apps/ai-assistant/`.

The future public interfaces are reserved as `@personal-os/app-sdk` and `@personal-os/os-api`; they are **not implemented yet**. User applications must not import private shell components. `packages/ui` and `packages/tsconfig` provide initial shared building blocks.

## Useful commands

Run from the repository root:

| Command | Purpose |
| --- | --- |
| `npm install` | Install workspace dependencies |
| `npm ls --depth=0` | Inspect installed top-level workspace dependencies |
| `npm run typecheck:desktop-shell` | Type-check the current reusable shell source without emitting files |

The current shell-first root manifest does not define `dev`, `build`, `test` or `docs:check` scripts. The archive's documentation checker can still be run directly with `node scripts/lint-docs.mjs` if that script exists in your checkout. These checks do not establish browser, production or Raspberry Pi readiness.

## Documentation

**Start with the [Documentation Index](docs/README.md)**, which explains where authoritative specifications live and how to read them.

| Document | Role |
| --- | --- |
| [PWOS-001 — Project Charter](docs/foundation/PWOS-001-project-charter.md) | Vision, scope, guiding principles and evolution path |
| [PWOS-002 — System Architecture Foundation](docs/architecture/PWOS-002-system-architecture-foundation.md) | Accepted layer boundaries, ownership, dependency rules, trust and backend portability |
| [Documentation Guide](docs/DOCUMENTATION-GUIDE.md) | Naming, IDs, frontmatter, status and traceability rules |
| [Shared Packages Guide](packages/README.md) | Package inventory, ownership, dependency rules and development conventions |

The **five governing project documents** are the root README, documentation index, documentation guide, PWOS-001 and PWOS-002. The package guide is supplementary developer documentation, not a sixth governing specification. **PWOS-001 v0.12 and PWOS-002 v0.2 are both accepted.** Other specifications are future work. Document review status is separate from feature implementation status; governed specifications use stable IDs and YAML frontmatter.

The former requirements draft labeled PWOS-002 has been preserved in `docs/archive/` as non-governing history; **PWOS-002 now identifies the System Architecture Foundation**. Read [PWOS-002](docs/architecture/PWOS-002-system-architecture-foundation.md) before extracting shared packages or implementing new cross-module contracts.

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

**D0 — Day-one desktop:** Complete and connect the reusable desktop shell to a web host, then open the Codespaces preview, verify app panels and API responses, and record smoke-test results. An earlier starter remains in the supplied snapshot but is not a dependency of the current shell-first implementation sequence. Then **D1 — Useful local workspace** will add one genuinely useful in-house application with non-sensitive persisted data. The staged acceptance gates and proposed metrics are defined in [PWOS-001](docs/foundation/PWOS-001-project-charter.md#8-use-from-day-one-delivery-plan).
