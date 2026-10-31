# Personal OS — Shared Packages

The `packages/` workspace currently contains one implemented package: `desktop-shell`. Public application contracts, shared UI, and shared development tooling remain planned. The actual Codespaces checkout is the implementation source of truth; the inventory below reflects the checkout reviewed on 2026-10-31.

The shared desktop shell must remain **deployment-neutral**: no imports from a GitHub Pages-only web host, no hardcoded `github.io` paths, and no direct knowledge of Pi addresses or privileged credentials. A frontend host chooses a deployment profile (public mock/demo or private authenticated service) and provides only the capabilities available in that environment. A missing backend must be presented as unavailable rather than silently treated as authorized or operational.

**Architecture authority:** [PWOS-002 — System Architecture Foundation](../docs/architecture/PWOS-002-system-architecture-foundation.md). This README explains package organization and development practices; it does not supersede approved architectural decisions.

## Package directory

| Package | Import name | Purpose | Current state |
| --- | --- | --- | --- |
| [`desktop-shell/`](desktop-shell/) | `@personal-os/desktop-shell` | Current implementation: reusable presentation frame and public status/props types; window management, launcher, dock behavior, panels, and widgets remain future work | Strict package tsconfig, build/typecheck scripts, public exports, generated JavaScript/declarations/maps verified per prior owner-reported evidence (IMP-002, 2026-10-29); public-package browser integration implemented; GP-01 accepted per owner report (IMP-001 Verified) |
| `app-runtime/` | `@personal-os/app-runtime` (proposed) | Application discovery, lifecycle, host integration, and isolation coordination | Planned but absent; no directory or manifest |
| `app-sdk/` | `@personal-os/app-sdk` (proposed) | Public app-facing interfaces, manifest types, and lifecycle contracts | Planned but absent; no implemented contracts |
| `os-api/` | `@personal-os/os-api` (proposed) | Backend-neutral system service contracts and errors | Planned but absent; no implemented API |
| `protocols/` | `@personal-os/protocols` (proposed) | Language-neutral wire schemas, versioning, and transport conventions | Planned but absent; no placeholder directory or schemas |
| `ui/` | `@personal-os/ui` (proposed) | Shared UI primitives and design tokens | Planned but absent; no shared UI implementation |
| `tsconfig/` | `@personal-os/tsconfig` (proposed) | Shared TypeScript configuration | Planned but absent; the desktop shell has its own package-specific tsconfig |
| `design-system/` | Not yet defined | Future cross-host visual standards | Planned but absent |

**Historical/removed claims:** Earlier documentation described `ui` and `tsconfig` as minimally implemented and `app-sdk`, `os-api`, and `protocols` as existing reserved packages/placeholders. None of these directories exists in this checkout. Their roles above describe planned architecture, not retained starter code.

The existing shell directory contains `package.json`, `tsconfig.json`, `src/DesktopShell.tsx`, `src/index.ts`, and generated `dist/` output. On-disk presence and Git tracking are distinct: `dist/` is ignored build output; the package manifest, tsconfig, and source files are now tracked and committed. The [File Registry](../docs/FILE-REGISTRY.md) now includes the tracked browser HTML, React entry and Vite configuration, with evidence limits. Environment-specific tooling directories outside `packages/` do not establish tracked project components.

Package existence does **not** imply a stable or production-ready API. Check each package's `package.json`, documented exports, and tests before depending on it.

## Packages versus applications

- `apps/` is intended for runnable hosts and independently owned applications. Current `apps/web` is an implemented React/Vite host: `index.html` loads `src/main.tsx`, which mounts DesktopShell through `@personal-os/desktop-shell`; `vite.config.ts` integrates React and a validated, exact Codespaces host allowance. The host displays truthful offline status; no backend, persistent storage, AI or application runtime is connected. `apps/file-manager` is planned and absent.
- `packages/` contains code or contracts intended for reuse across hosts, applications, or services.
- Future launcher, dock, About panel, and window chrome implementations belong to the **desktop shell**. They are not standalone applications merely because the user can interact with them.
- The browser host already composes the public desktop-shell interface. Future runtime integration remains Planned; the host does not own shell or runtime internals.

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

Only `desktop-shell` currently exists under `packages/` and exposes a public entry point; the web host is a separate workspace under `apps/`. Do not add placeholder exports that falsely suggest implemented functionality.

## Adding or changing a package

1. Confirm that the responsibility is reusable and belongs under `packages/`, rather than in a specific `apps/` host or `services/` implementation.
2. Define its owner, scope, allowed dependencies, and expected public boundary.
3. Add a package manifest with a unique `@personal-os/` name; create a public entry point when real code is available.
4. Add tests for meaningful behavior and cross-package contracts before promoting an API as supported.
5. Update this directory guide when a package is added, renamed, retired, or changes status.
6. Update the governing architecture document only if the change revises an accepted architectural decision.

The root workspace is configured in [`../package.json`](../package.json) with `apps/*` and `packages/*`. The committed root [`package-lock.json`](../package-lock.json) records installed shell/web dependencies and exact Playwright Test `1.64.1` tooling. From the repository root, use the lockfile for a clean installation, then build the shell before the web host consumes its compiled exports:

```bash
npm ci
npm ls --depth=0
npm run typecheck -w @personal-os/desktop-shell
npm run build -w @personal-os/desktop-shell
npm run build -w @personal-os/web
```

`npm ci` replaces local installed dependencies using the committed lockfile; clean-checkout reproducibility remains a GP-02 acceptance check, not a result rerun here. Use `npm install` for intentional dependency changes and review/commit the generated root lockfile with the relevant manifest. Do not fabricate lockfile entries.

The root `.gitignore` excludes `node_modules/`, shell/web `dist/` and web Playwright `test-results/` and `playwright-report/`. Fresh Git inspection confirms **zero tracked node_modules entries** after IMP-017; ignore rules alone do not untrack files. The shell build emits `DesktopShell.js` and `index.js`, their `.js.map` files, `DesktopShell.d.ts` and `index.d.ts`, and their `.d.ts.map` files into ignored `dist/`. Rebuild after source changes before consuming the package.

The package scripts are `typecheck: tsc -p tsconfig.json --noEmit` and `build: tsc -p tsconfig.json`. Its configuration targets ES2022 with ESNext modules, Bundler resolution, React JSX, `src` as the source root, and `dist` as output. It enables declaration output, source maps, declaration maps, and `noEmitOnError`, plus `strict`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`, and `isolatedModules`. The existing root `typecheck:desktop-shell` script uses inline compiler options instead. Prior owner-reported evidence records successful workspace type checking, compilation, and public JavaScript/type entry resolution on 2026-10-29. Configuration was published in commit `9ca6fc081c2a2367cf278bc2fc268d567ac05c9c`; prior Codex tasks also passed shell typecheck/build and web production build, including the Playwright dependency task. GP-01 browser acceptance is complete based on owner-reported rendering, truthful offline status, refresh, usable desktop/mobile layouts and a clean Incognito console. These are distinct evidence sources; no install, compiler, build or browser tests were rerun for this documentation update. Fresh checks cover paths, tracking, declarations, public exports and links.

The existing web host uses React/React DOM `19.3.1`, satisfying the shell’s `^19.2.0` peers. Its [`main.tsx`](../apps/web/src/main.tsx) imports the public component; consumers may also import its exported props type:

```tsx
import { DesktopShell } from '@personal-os/desktop-shell';
import type { DesktopShellProps } from '@personal-os/desktop-shell';
```

The `exports` map resolves ESM imports to `./dist/index.js` and TypeScript declarations to `./dist/index.d.ts`. The output targets a bundler-based frontend host. Avoid private `src/` and `dist/` imports. The package build does not start a browser host or establish browser smoke-test coverage.

## Browser host and testing foundation

The web workspace declares `dev: vite --host 0.0.0.0`, `build: vite build`, `preview: vite preview --host 0.0.0.0` and `test:e2e: playwright test`. After building the shell, run from the repository root:

```bash
npm run dev -w @personal-os/web -- --port 5173 --strictPort
```

For Codespaces, forward port 5173 privately. Vite derives the exact allowed forwarded hostname from environment values; the browser host is a reusable-shell preview, not an implemented service backend. See the [root quick start](../README.md#quick-start--github-codespaces) for build and production-preview commands.

`@playwright/test` `1.64.1` is an exact web development dependency, with matching `playwright` and `playwright-core` in the root lockfile. The `test:e2e` script exists, but Chromium installation has not been reported complete and `apps/web/playwright.config.ts` and `apps/web/tests/smoke.spec.ts` are Planned and absent. Automated browser tests are not implemented; accessibility integration and testing CI are pending. Do not interpret installed tooling as a passing suite or run `test:e2e` before its prerequisites exist. IMP-007 Stage A will establish isolated local Chromium smoke tests, followed by accessibility in Stage B and dedicated testing CI in Stage C. GP-02 remains In progress, acceptance pending.

## Implementation sequence

Work is intentionally proceeding **one repository file at a time**:

1. Establish the `desktop-shell` source-level public boundary (**done**: `src/index.ts` re-exports `DesktopShell` and its props; the manifest exposes the built public entry).
2. Add package-specific TypeScript configuration and manifest exports (**verified**: strict type checking, build output, and public entry resolution; IMP-002 complete).
3. Integrate the thin React/Vite web host through public package exports (**implemented**); GP-01 Completed and IMP-001 Verified per owner-reported browser acceptance. Legacy starter shell components remain absent.
4. **Current priority: IMP-007 Stage A / GP-02.** Establish repeatable automated smoke tests, then accessibility acceptance and CI; also verify reproducible static builds, `/personal-os/` assets and production-preview routing/refresh.
5. Keep GP-03 public-demo safety and explicit owner approval separate; GP-04 deployment and GP-05 live verification remain pending. No public deployment is approved or claimed.
6. Introduce the Planned application runtime and app-facing contracts behind tested behavior as separately scoped future work.

The labels distinguish completed evidence from remaining plans; browser acceptance does not imply every D0 charter capability is implemented. See [PWOS-001 — Project Charter](../docs/foundation/PWOS-001-project-charter.md) for project scope and milestones, and the [Documentation Guide](../docs/DOCUMENTATION-GUIDE.md) for governing document conventions.
