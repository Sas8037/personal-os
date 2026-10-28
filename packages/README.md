# Personal OS — Shared Packages

The `packages/` workspace contains reusable Personal OS components, public application contracts, and development tooling. These modules support the web-native system today and are designed to remain useful as Personal OS explores hybrid, virtual, and native execution environments.

**Architecture authority:** [PWOS-002 — System Architecture Foundation](../docs/architecture/PWOS-002-system-architecture-foundation.md). This README explains package organization and development practices; it does not supersede approved architectural decisions.

## Package directory

| Package | Import name | Purpose | Current state |
| --- | --- | --- | --- |
| [`desktop-shell/`](desktop-shell/) | `@personal-os/desktop-shell` | Reusable desktop, window management, dock, launcher, panels, and widgets | Manifest, type-only entry point, and standalone `src/DesktopShell.tsx` layout exist; TypeScript check passes in Codespaces; component not re-exported or host-integrated |
| `app-runtime/` | `@personal-os/app-runtime` (proposed) | Application discovery, lifecycle, host integration, and isolation coordination | Planned; directory not yet created |
| [`app-sdk/`](app-sdk/) | `@personal-os/app-sdk` | Public app-facing interfaces, manifest types, and lifecycle contracts | Reserved package identity; API not implemented |
| [`os-api/`](os-api/) | `@personal-os/os-api` | Backend-neutral system service contracts and errors | Reserved package identity; API not implemented |
| [`protocols/`](protocols/) | `@personal-os/protocols` (proposed) | Language-neutral wire schemas, versioning, and transport conventions | Documentation placeholder; no package manifest or schemas yet |
| [`ui/`](ui/) | `@personal-os/ui` | Shared UI primitives and design tokens | Minimal implementation exists |
| [`tsconfig/`](tsconfig/) | `@personal-os/tsconfig` | Shared TypeScript configuration | Minimal implementation exists |

Package existence does **not** imply a stable or production-ready API. Check each package's `package.json`, documented exports, and tests before depending on it.

## Packages versus applications

- `apps/` contains runnable hosts and independently owned user applications, such as the current `apps/web` host and planned `apps/file-manager`.
- `packages/` contains code or contracts intended for reuse across hosts, applications, or services.
- The launcher, dock, About panel, and window chrome belong to the **desktop shell**. They are not standalone applications merely because the user can interact with them.
- The browser host should eventually compose the public desktop-shell and runtime interfaces, not own their private implementations.

In particular, standalone applications must not import `apps/web/src/` or private desktop-shell internals. They should use supported `@personal-os/app-sdk` and `@personal-os/os-api` contracts when those contracts are implemented.

## Dependency boundaries

| Consumer | Intended public dependencies | Avoid |
| --- | --- | --- |
| `desktop-shell` | UI components, public runtime controls, host-provided status interfaces | Direct imports from individual apps, kernel code, or privileged services |
| `app-runtime` | App SDK, OS API, protocol contracts, and host adapters | Hard-coded private app modules or privileged backend internals |
| `app-sdk` | Portable OS API and protocol contracts as necessary | React shell implementation and backend-specific code |
| `os-api` and `protocols` | Portable types and language-neutral schemas | Browser UI or service implementations |
| `ui` | Shared styling and presentation abstractions | OS authorization logic, filesystem access, and kernel services |

These are **target dependency rules**. Shared source code does not cross a security boundary: a browser app's manifest, React state, or frontend permission check cannot grant privileged access. Privileged services must authenticate and authorize protected operations themselves.

## Public API and versioning conventions

1. Use the `@personal-os/<package-name>` naming scheme for npm workspace identities.
2. Publish a deliberately small package entry point (for example `src/index.ts`) through documented `package.json` exports **once that entry point exists**.
3. Consumers import declared package entry points, not another workspace's private `src/` paths.
4. Keep internal files replaceable without changing the public contract; explicitly version breaking interface changes.
5. Define cross-language or cross-process communication using versioned, machine-readable schemas. TypeScript types alone are not a wire protocol.
6. Keep dependencies directional and avoid circular dependencies between contracts and implementations.
7. Declare runtime, peer, and development dependencies in each package's own manifest as applicable.

Not all packages currently expose working entry points. Do not add placeholder exports that falsely suggest implemented functionality.

## Adding or changing a package

1. Confirm that the responsibility is reusable and belongs under `packages/`, rather than in a specific `apps/` host or `services/` implementation.
2. Define its owner, scope, allowed dependencies, and expected public boundary.
3. Add a package manifest with a unique `@personal-os/` name; create a public entry point when real code is available.
4. Add tests for meaningful behavior and cross-package contracts before promoting an API as supported.
5. Update this directory guide when a package is added, renamed, retired, or changes status.
6. Update the governing architecture document only if the change revises an accepted architectural decision.

The root workspace is configured in [`../package.json`](../package.json) with `apps/*` and `packages/*`. The initial Codespaces installation and TypeScript check were confirmed on 2026-10-28. From the repository root:

```bash
npm install
npm ls --depth=0
npm run typecheck:desktop-shell
```

Commit the generated root `package-lock.json` for reproducible installs; do not commit `node_modules/`. The current root manifest defines **only** the desktop-shell type-check script. Package-specific commands may use `npm run <script> -w @personal-os/<package-name>` once that package defines the script. No browser launch, package build, or automated test suite is established by this type check.

## Implementation sequence

Work is intentionally proceeding **one repository file at a time**:

1. Establish the `desktop-shell` package's public boundary (**started** with `src/index.ts` and a compiled `DesktopShell.tsx`; no runtime exports yet).
2. Export and expand the reusable shell independently of any frontend host.
3. Integrate a web host through public package interfaces when host work begins; preserve any pre-existing starter if migrating it.
4. Introduce the application runtime and app-facing contracts behind tested behavior.

This sequence describes intent, not completed functionality. See [PWOS-001 — Project Charter](../docs/foundation/PWOS-001-project-charter.md) for project scope and milestones, and the [Documentation Guide](../docs/DOCUMENTATION-GUIDE.md) for governing document conventions.
