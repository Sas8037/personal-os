# Documentation Guide

## Principle

Documentation must describe the design **as it is known**, distinguish plans from implemented behavior, and be navigable from [`README.md`](README.md).

### Current document inventory

The current **five governing project documents** are `personal-os/README.md`, `docs/README.md`, `docs/DOCUMENTATION-GUIDE.md`, `docs/foundation/PWOS-001-project-charter.md`, and `docs/architecture/PWOS-002-system-architecture-foundation.md`. **PWOS-001 v0.12 and PWOS-002 v0.2 are both accepted.** Supporting developer guides, such as [`packages/README.md`](../packages/README.md), are not additional governing specifications. Other specification, decision, milestone and research files from earlier iterations are **not currently governing project documentation**, even if they still exist in the working tree.

Before adding another numbered document, define its responsibility, identify who reviews it, give it a stable name and metadata, then update the documentation index. Do not silently promote a legacy draft by linking to it as authoritative.

## Naming conventions

### 1. Repository and folder names

| Convention | Meaning | Example |
| --- | --- | --- |
| `personal-os` | Canonical Git repository name | `personal-os/` |
| Lowercase, hyphen-separated folders | A functional documentation category | `requirements/`, `architecture/` |
| `README.md` | An index or introduction for the directory containing it | `docs/README.md` |
| `DOCUMENTATION-GUIDE.md` | The rules for maintaining project documentation | `docs/DOCUMENTATION-GUIDE.md` |

Folder names describe **what kind of information** belongs there. They do not imply a subsystem is implemented.

### Directory README titles

Every directory-level `README.md` should start with a consistent, human-readable H1 heading:

- Repository root: `# Personal OS`.
- Documentation navigation root: `# Personal OS — Documentation Index`.
- Other directory indexes and guides: `# Personal OS — <Directory Purpose>`, using a concise title-cased purpose rather than the literal folder name when a clearer label exists.

For example, `packages/README.md` uses `# Personal OS — Shared Packages`; a future `apps/README.md` could use `# Personal OS — Applications`. The heading identifies the page to readers, while the unchanged `README.md` filename lets GitHub show it automatically. **Do not rename README files to match their headings.** This title convention applies to directory READMEs, not numbered specification titles or ordinary component source files.

### Application workspace and package naming

- **Current:** `apps/web/src/shell/` contains the launcher, About panel, dock, windows, widgets, static registry, and browser state. These are shell internals, not standalone applications.
- **Target:** `packages/desktop-shell/` owns reusable desktop interface implementations and `packages/app-runtime/` owns app discovery, lifecycle, hosting and isolation policy integration. `apps/web/` is a thin browser bootstrap host; `apps/desktop/` is reserved for a distinct host whose purpose must be decided before it is activated.
- `apps/*` at the monorepo root holds independently built application or host targets. For example, `apps/file-manager/` and `apps/ai-assistant/` are planned full application workspaces. An internal shell panel must not be presented as an independently deployable application.
- Shared package names use the canonical `@personal-os/<package-name>` scope, such as `@personal-os/app-sdk` and `@personal-os/os-api`. A package's directory or manifest **does not** imply it already exports a stable API.
- Standalone applications must use documented public SDK/API contracts, not imports from `apps/web/src/shell/` or private `packages/desktop-shell/` internals. Keep shell-local React state distinct from the future hardware kernel in `kernel/`.
- Use kebab-case for directories and package names; use PascalCase for React component filenames (`WindowManager.tsx`) and descriptive camelCase for hooks (`useSystemInfo.ts`).

### Architectural boundaries and implementation status

When creating a module, document **owner, purpose, allowed dependencies, public interface, trust boundary, and status**. Keep the following directions clear:

1. Frontend hosts compose public shell/runtime entry points; they must not become the permanent owner of shell logic or privileged services.
2. The desktop shell renders UI. The application runtime owns application loading/lifecycle semantics; privileged authorization belongs to trusted services and backends.
3. Applications depend on the SDK, OS API and permitted UI libraries rather than private host components.
4. `packages/os-api/` and `packages/protocols/` describe compatibility contracts; backend implementations are owned elsewhere. A native kernel may implement the contracts using another language or runtime.
5. `kernel/` owns low-level OS execution/protection work, not browser state or React context.

Classify each subsystem as **existing implementation**, **reserved workspace**, or **proposed target**. Do not present future folder layouts as current source-tree listings. A module README may be created as a local ownership note without adding another governing specification.

These boundaries are recorded as the **accepted design direction** in [PWOS-002 — System Architecture Foundation](architecture/PWOS-002-system-architecture-foundation.md). Implementing them still requires concrete API schemas, isolation verification, compatibility tests, and evidence of cross-backend conformance before those capabilities may be declared operational.

### 2. Document prefixes and identifiers

| Prefix | Stands for | Used for | Example |
| --- | --- | --- | --- |
| `PWOS` | **Personal Web OS**, the project's original name | Numbered, project-wide specifications and governing documents | `PWOS-002-system-architecture-foundation.md` |
| `ADR` | **Architecture Decision Record** | Important design choices, alternatives and rationale | `ADR-006-backend-contracts.md` *(future)* |
| `M` | **Milestone** | Planned work with deliverables and exit criteria | `M01-desktop-foundation.md` |
| `FR` | **Functional Requirement** | A behavior or capability the system must provide | `FR-01` inside a future requirements document |
| `NFR` | **Non-Functional Requirement** | A quality, constraint or assurance requirement | `NFR-04` inside a future requirements document |

`PWOS` remains the stable document identifier prefix even though the repository is now called `personal-os`. Changing old identifiers would unnecessarily break references. New project-wide specifications continue the `PWOS` sequence unless a formal naming decision changes it.

The existing decision log uses `ADR-001` through `ADR-005`. Any new individual decision should continue with `ADR-006`, **not** restart numbering at `ADR-0001`.

Research notes do not yet need a numbered prefix. Use a descriptive filename such as `capability-scheduler-hypothesis.md`; introduce a research ID scheme only when tracking requires it.

### 3. Filename format

For numbered specifications and decisions:

```text
<IDENTIFIER>-<short-description>.md
```

For milestones:

```text
M<two-digit-number>-<short-description>.md
```

Rules:

1. Keep identifier letters uppercase (`PWOS`, `ADR`, `M`, `FR`, `NFR`).
2. Use lowercase **kebab-case** for the description: words joined by hyphens.
3. Use `.md` for Markdown documentation.
4. Give each numbered document a unique, permanent identifier; never reuse a retired number.
5. Choose descriptions based on the document's enduring subject, not its temporary status.
6. Do **not** put version numbers, `draft`, `final`, or dates into specification filenames. Put those values in the document and Git history.

Examples:

| Correct | Why |
| --- | --- |
| `foundation/PWOS-001-project-charter.md` | Stable charter identifier and descriptive filename |
| `architecture/PWOS-002-system-architecture-foundation.md` | Accepted architecture specification |
| `architecture/PWOS-003-system-architecture.md` | Architecture specification with a permanent ID |
| `roadmap/M01-desktop-foundation.md` | First milestone with a two-digit milestone number |
| `decisions/decision-log.md` | Living index of decisions, not a separate numbered ADR |

Avoid names such as `requirements-final-v3.md`, `new-design.md`, `misc.md`, or `PWOS-002_SystemRequirements.MD`.

### 4. Directory versus document identity

Paths locate documents; identifiers **refer to** documents. For example, `PWOS-002` remains PWOS-002 even if it moves from `requirements/` to another folder.

Files in different directories may share a name such as `README.md`, because their full paths differ. Numbered project specifications should nevertheless have globally unique IDs for searchability and traceability.

### 5. Numbering policy

- `PWOS-001`, `PWOS-002`, ...: consecutive three-digit document IDs; gaps are allowed if a document is retired.
- `ADR-001`, `ADR-002`, ...: consecutive three-digit decision IDs, continuing the existing log.
- `M01`, `M02`, ...: consecutive two-digit milestone IDs; numbering reflects planning order, not a guaranteed release date.
- `FR-01`, `FR-02`, ... and `NFR-01`, `NFR-02`, ...: requirement IDs unique **within their owning specification**. Outside that document, qualify the ID using its document ID (for example, `PWOS-005:FR-01` if a future requirements document is assigned PWOS-005).

Do not renumber an existing document or requirement solely to change its order in a table or folder.

## Header metadata — YAML frontmatter

Numbered specifications (`PWOS-*`), individual decision records (`ADR-*`), milestones (`M*`), and substantive research notes must begin with **YAML frontmatter**. It is enclosed between two lines containing exactly `---`, before the Markdown title.

Example:

```yaml
---
id: "PWOS-002"
title: "System Architecture Foundation"
type: "architecture"
version: "0.2"
status: "accepted"
scope: "system"
last_reviewed: "2026-10-27"
superseded_by: null
---
```

The required keys are:

| Key | Meaning | Rule |
| --- | --- | --- |
| `id` | Stable document identifier | Must match the identifier in the filename |
| `title` | Human-readable document title | Nonempty string |
| `type` | Document class | `charter`, `requirements`, `architecture`, `interface`, `decision`, `milestone`, or `research` |
| `version` | Internal document version | Quoted string such as `"0.4"`; never embed it in the filename |
| `status` | Review status | `draft`, `proposed`, `accepted`, or `superseded` |
| `scope` | System or subsystem governed | Short nonempty string |
| `last_reviewed` | Date of last content review | Quoted `YYYY-MM-DD` string |
| `superseded_by` | Replacement document ID | `null` unless status is `superseded` |

We intentionally use a small **flat YAML subset** for metadata—quoted string scalars and `null`, with one key per line—so standard YAML parsers and our lightweight CI checker interpret it consistently. `README.md`, the documentation index, the documentation guide, and the living `decision-log.md` are navigation or policy pages and do not require numbered-document frontmatter.

Use `accepted` only when the document has actually been reviewed and adopted. `implemented` and `verified` describe engineering evidence, not frontmatter review statuses.

For a charter, acceptance additionally requires an explicit owner approval of a stated version and a recorded approver/date inside the document. A passed linter or an assistant suggestion is not approval.

### Status meanings

| Status | Meaning |
| --- | --- |
| `draft` | Being developed; incomplete and subject to change |
| `proposed` | Ready for review, but not yet adopted as the baseline |
| `accepted` | Reviewed and adopted as the current design or requirement baseline |
| `superseded` | Replaced by a newer, explicitly referenced decision or specification |

Status is **not** implementation progress. A specification may be `Accepted` even if the system described by it has not been built. Implementation and verification evidence belong in tests, milestone records, and traceability tables.

### Version meanings

- `0.1`, `0.2`, etc.: early iterations of a document whose baseline is still evolving.
- `1.0`: an intentionally established first stable document version, not an automatic claim of production readiness.
- Later versions: meaningful changes recorded with Git history and, when necessary, a short revision note.

The **filename does not change** simply because its internal version changes.

### Deprecation and supersession

Any document marked `status: "superseded"` **must**:

1. Set `superseded_by` to the stable ID of an existing replacement document (for example, `"ADR-012"`).
2. Include a prominent forward link immediately after its Markdown title, such as `**Superseded by:** [ADR-012](../decisions/ADR-012-replacement.md)`.
3. Preserve the original document and its ID for traceability; do not silently rewrite history or reuse its identifier.
4. Update indexes and inbound references that describe which document is authoritative.

Documents not marked `superseded` must use `superseded_by: null`. A supersession chain should lead to a current document; circular references are prohibited.

### Requirement references and collisions

Within a future requirements specification, a table may use the short ID `FR-01`. Outside that specification—in another document, a Git commit, an issue, a test name, or design review—use a **qualified reference** such as `PWOS-005:FR-01` (or `PWOS-005:NFR-04`) if PWOS-005 is assigned to that document. PWOS-002 now identifies the architecture foundation, **not** the historical requirements draft.

If requirements later split into subsystem-specific specifications, the owning document ID remains the primary namespace. Prefixes such as `AUTH-FR-01` may be introduced only through an explicit architecture decision and a migration map. Existing requirement IDs are not renumbered casually.

## Structure and traceability

1. Begin with purpose, scope and assumptions.
2. Keep requirements measurable and give them stable IDs.
3. Link to upstream requirements or decisions when they determine an interface or component.
4. For interfaces, specify inputs, outputs, permissions, errors, versioning and compatibility.
5. For milestones, list verification methods and evidence required to exit.
6. For research, distinguish existing prior art, hypotheses, experimental methods, observed results and conclusions.

## Links and maintenance

- Prefer relative Markdown links so docs work in GitHub, Codespaces, and offline archives.
- Update the documentation index when adding or moving a document.
- Update any references affected by a move in the same change.
- Do not silently overwrite decision history; supersede outdated decisions with an explanation.
- Avoid duplicating authoritative requirements across multiple documents; cross-reference the requirements specification.

## Verification and enforcement

The repository snapshot includes `scripts/lint-docs.mjs`, which checks documentation conventions. The current **shell-first root package manifest** does not yet expose `npm run docs:check`, so run `node scripts/lint-docs.mjs` directly when the script is present. Restoring the root script and connecting CI to it is pending; do not claim that the current Codespaces setup enforces documentation checks automatically.

The check must fail when it finds:

1. Broken local Markdown links or references to moved paths.
2. Numbered document filenames that do not match the identifier naming scheme.
3. Missing, malformed, or duplicate YAML frontmatter fields in governed documents.
4. Invalid document statuses, versions, dates, or mismatches between filename and `id`.
5. Missing or invalid `superseded_by` pointers, or missing forward links for superseded documents.
6. Duplicate document IDs across governed Markdown files.

Requirement ID collisions **within one specification** are checked. Cross-document references must use a qualified `PWOS-XXX:FR-YY` or `PWOS-XXX:NFR-YY` form; prose-level enforcement is advisory initially because automated recognition of every mention is prone to false positives. A more advanced traceability linter may be added when the requirements catalog expands.

**Local review command:**

```bash
node scripts/lint-docs.mjs
```

The check validates documentation format and references, not the technical truth of its claims. Human review remains necessary for correctness, completeness, and feasibility.

## Improvement register maintenance

The non-governing [Personal OS Improvement Register](IMPROVEMENTS.md) is the single backlog for optional enhancements, discovered weaknesses, and follow-up engineering work. It **does not** change the five-document governing baseline or approve an architecture change by itself.

Whenever a project file or document is created, changed, or reviewed:

1. Review the register and add or revise relevant `IMP-###` entries. Do not reuse identifiers.
2. Record the proposed change, measurable benefit, costs and risks, priority, status, and acceptance evidence.
3. Use **Approved** only after the project owner explicitly accepts the proposal. Code added or documentation edited does not by itself mean an improvement is verified.
4. Highlight high-impact recommendations **before starting the next implementation step**, especially changes that affect architecture, security or public deployment.
5. Synchronize the relevant project README or governing document only when its stated responsibilities, status or approved design have actually changed.
6. In every change handoff, state which files were updated, which others still need updating (or **none**), what can be improved, and the proposed next file or task.

Proposed architectural changes must follow the review and approval processes in [PWOS-001](foundation/PWOS-001-project-charter.md) and [PWOS-002](architecture/PWOS-002-system-architecture-foundation.md), regardless of their status in the improvement register.

## Cross-document synchronization and handoff

For every document that is created or revised, the accompanying handoff should state:

1. **Document delivered:** exact file, version/status where applicable, and substance of changes.
2. **Related updates:** which of the other recognized documents need changes now or after owner approval; say explicitly when none are required.
3. **Improvements:** unresolved gaps, testable questions and proposed refinements.
4. **Next work:** one concrete next design or verification activity.

Current synchronization responsibilities:

| Change | Check and update if affected |
| --- | --- |
| Charter vision, scope, stages or approval | Root README project summary; docs index version and status |
| Repository startup or implemented capability | Root README and charter's evidence snapshot |
| Documentation naming or review policy | Documentation Guide; docs index instructions; affected governed frontmatter |
| Authoritative document inventory | Docs index; root README's document links; charter's governing-set section |

Do not treat documenting a proposed feature as implementing it. Keep claims of completion tied to observable evidence.
