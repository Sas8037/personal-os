# Personal OS

A personal computing environment built around useful applications, understandable system behavior and owner-controlled data.

Personal OS is a long-term project for one developer working with ChatGPT and Codex. It begins with a browser workspace and Notes, with room to grow into richer applications, private services, self-hosted operation, local AI and experiments with native execution and an original kernel. These are directions to investigate and demonstrate, not promises of compatibility, performance or production readiness. Commercial delivery, multi-tenant operation and business-development processes are not project requirements.

## Independent starting point

This is the clean-slate `Sas8037/personal-os` repository, expected repository ID `1455766940`. The historical `personal-os-test` repository, ID `1434600370`, is reference material only. Its code, architecture, roadmap, governance and completion claims are not adopted automatically. New decisions and capabilities need their own justification and evidence.

The repository blueprint below describes the full intended ownership model. It does not authorize creating its directories, installing dependencies, implementing features or publishing anything. Work remains bounded by the owner's explicit authorization and the [communication standard](docs/development/COMMUNICATION-STANDARD.md).

## Current capabilities

The inspected working tree contains this README, [agent instructions](AGENTS.md), the [communication standard](docs/development/COMMUNICATION-STANDARD.md) and the [task and improvement tracker](docs/planning/TASKS-AND-IMPROVEMENTS.md). These establish project context and working practices. File existence does not establish owner acceptance, commitment or publication.

No workspace, Notes application, persistence, private service, AI integration or kernel is implemented. There is no dependency manifest, runnable application source, setup/build script, application test suite, Pages configuration or deployment workflow. No software build, runtime, recovery or deployment success is claimed. Setup commands will be documented when they actually exist and have appropriate verification evidence.

The tracker is the single record of task status, findings and improvement proposals. This README provides the project entry point and ownership blueprint rather than a second activity log.

## Vision and engineering principles

The goal is a coherent personal workspace whose applications remain useful as its implementation evolves. Over time, the owner should be able to manage documents and files, adjust settings, use authorized system capabilities and explore locally controlled AI and execution environments. Self-hosting and kernel research must earn their place through working behavior and measured feasibility.

- **Useful increments:** Deliver observable user workflows. Keep application development independent of long-term platform research.
- **Clear ownership:** Keep workspace presentation, application behavior, system services and platform mechanisms understandable and separate.
- **Proportionate structure:** Begin with one cohesive build. Introduce independent packages, processes, a general runtime or an SDK only when actual workflows justify them.
- **Data preservation:** Give documents stable identities, preserve edits after failures and verify backup and restoration separately from ordinary persistence.
- **Explicit authority:** Validate untrusted input and enforce privileged authorization at the mechanism performing the operation. UI state and directory boundaries do not grant permission.
- **Evidence before claims:** Distinguish proposals, implemented behavior, executed checks, attributed reports, assumptions and owner acceptance. Support portability and performance claims with relevant tests and measurements.
- **Deliberate dependencies:** Choose tools for current needs, with reproducible verification and understood maintenance costs. Historical dependency choices carry no automatic preference.

## First functional milestone

The approved first workflow is:

**Open workspace → open Notes → create and edit notes → save → restart → reopen → export → restore.**

Acceptance requires:

- Multiple notes with stable identities and usable creation, selection and editing.
- Clear saved, unsaved and failed-save states. A failed save preserves unsaved edits and previously saved content.
- Saved text survives a complete application restart in the supported environment; a reload alone is insufficient evidence.
- Export produces a user-controlled backup. Restoration works into an empty store, and invalid imports leave existing documents intact.
- Keyboard navigation, visible focus, readable status/error feedback and usable layouts throughout the workflow.
- Verification of the actual workflow, failed writes, invalid imports, restoration and the production artifact using synthetic data.

Browser delivery is the starting approach. Toolchain and persistence choices remain to be decided; the earlier Vite/TypeScript/IndexedDB assessment is a proposal, not an installed or accepted stack. Accounts, synchronization, local AI and third-party applications are outside this milestone. Early static Pages delivery is a separate requested delivery capability, described below.

If browser storage is selected, its limits must be visible: data belongs to a browser profile and origin, and can be lost through profile loss, site-data removal or browser storage policies. Reopening saved notes is not a backup guarantee. A user-controlled export and a tested restore path are required before treating the workflow as recoverable.

## Professional quality from the first increment

Each increment should have a clear visual hierarchy, readable typography, consistent spacing and layouts suited to its intended screen sizes. Interactions must communicate state, preserve input, handle failures and place focus predictably. Semantic controls, accessible names, keyboard operation and visible focus are foundational behavior.

Functionality, visual design, interaction and accessibility need direct inspection of the running result. Reliability needs failure and recovery evidence. Security needs identified enforcement mechanisms, conservative exposure and protected data. Performance needs representative workloads and measurements when claims are made. Maintainability needs clear state ownership, focused modules, directional dependencies and reproducible checks. A build pass alone does not establish these qualities.

Apply verification in proportion to risk and record its limits. Full quality expectations and reporting practices live in the [communication standard](docs/development/COMMUNICATION-STANDARD.md#quality-expectations).

## Repository blueprint

**Existing** means present in the inspected working tree, not necessarily committed or published. **Planned** means an ownership destination without an implementation. A planned annotation applies to the entire subtree unless an entry is explicitly marked otherwise.

```text
personal-os/
├── README.md                                  [existing: project entry point]
├── AGENTS.md                                  [existing: agent entry point]
├── apps/                                      [planned]
│   ├── web/
│   ├── desktop/
│   ├── api/
│   ├── notes/
│   ├── file-manager/
│   ├── settings/
│   └── ai-assistant/
├── packages/                                  [planned]
│   ├── contracts/
│   ├── app-sdk/
│   ├── runtime/
│   ├── desktop-shell/
│   └── ui/
├── services/                                  [planned]
│   ├── identity/
│   ├── permissions/
│   ├── documents/
│   ├── storage/
│   ├── recovery/
│   ├── search/
│   ├── jobs/
│   ├── notifications/
│   └── ai/
├── backends/                                  [planned]
│   ├── browser/
│   ├── linux/
│   └── native/
├── kernel/                                    [planned research]
│   ├── arch/
│   ├── boot/
│   ├── memory/
│   ├── scheduler/
│   ├── ipc/
│   ├── capabilities/
│   └── drivers/
├── tests/                                     [planned]
│   ├── integration/
│   ├── end-to-end/
│   ├── conformance/
│   ├── performance/
│   └── fixtures/
├── tools/                                     [planned]
│   ├── development/
│   ├── verification/
│   └── diagnostics/
├── deployment/                                [planned]
│   ├── pages/
│   ├── self-hosted/
│   └── hardware/
├── experiments/                               [planned]
├── docs/                                      [existing]
│   ├── development/                           [existing]
│   │   ├── COMMUNICATION-STANDARD.md           [existing]
│   │   └── GIT-WORKFLOW.md                     [planned]
│   ├── planning/                              [existing]
│   │   └── TASKS-AND-IMPROVEMENTS.md           [existing]
│   ├── architecture/                          [planned]
│   └── decisions/                             [planned]
└── .github/                                   [planned]
    └── workflows/
```

### Ownership and dependency boundaries

| Area | Intended ownership and allowed direction |
| --- | --- |
| `apps/web`, `apps/desktop` | Hosts assemble the environment, select platform adapters and compose supported application/shell interfaces. They do not own application business logic. |
| `apps/api` | A possible service host or gateway: compose services and transport endpoints, validate requests and route authorized operations. System behavior belongs in `services/`, not a second implementation inside the gateway. |
| `apps/notes`, `apps/file-manager`, `apps/settings`, `apps/ai-assistant` | Own their application's interface, editor/domain state and user behavior. Applications use supported system interfaces rather than importing host internals or privileged platform implementations. |
| `packages/contracts` | Shared data, operation and error contracts. Remain independent of application UI, service implementation and platform code. Define serialization when crossing an actual process or trust boundary. |
| `packages/app-sdk`, `packages/runtime` | Potential app-facing helpers and lifecycle/coordination behavior. Depend on supported contracts and injected host/platform capabilities; they must not become owners of every application's state or imply support for untrusted extensions. |
| `packages/desktop-shell`, `packages/ui` | Shell owns workspace chrome and presentation; UI owns reusable controls and visual primitives. Shell code does not contain Notes or other application business logic. Neither owns privileged authorization. |
| `services/` | Own system behavior: identity, permissions, documents, storage policy, recovery, search, background jobs, notifications and AI operations. Use contracts and configured backend interfaces; enforce protected operations at trusted boundaries. |
| `backends/` | Supply platform implementations for browser, Linux or future native execution. Implement supported capabilities and report unsupported behavior explicitly. Do not duplicate service policy or depend on application UI. |
| `kernel/` | Own low-level architecture, boot, memory, scheduling, IPC, capabilities and drivers. No dependency on browser UI or application-framework internals. Kernel work does not block hosted development. |
| `tests/` | Integration and end-to-end workflows, backend conformance, performance evidence and synthetic fixtures. A planned test directory is not passing evidence; focused tests may live with modules when appropriate. |
| `tools/` | Development, verification and diagnostic helpers. Their side effects and required access must be understood before execution. |
| `deployment/`, `.github/workflows/` | Target-specific delivery/deployment assets and automation. Build and verify the intended artifact; keep publication authorization separate from test success. Hardware setup belongs to an explicitly selected target. |
| `experiments/` | Bounded research with stated hypotheses and evidence. Experimental success does not automatically promote code into supported applications or services. |
| `docs/` | Development practices, the single planning tracker, architecture explanations and consequential decisions. Keep durable knowledge concise; avoid copying live statuses across documents. |

The intended direction is host composition → application/shell interfaces → supported system contracts → services → platform backends. Contract definitions remain independent of their implementations. Same-build calls can satisfy these boundaries; process or privilege crossings require explicit protocols, identity and enforcement.

### Architectural cautions and recommended adjustments

The full hierarchy is a logical blueprint, not an initial scaffolding checklist. Its breadth risks premature fragmentation. Keep the first workflow in one cohesive build, with clear internal ownership, and materialize only the directories justified by its implementation. Logical boundaries do not automatically require independent packages, independent builds or separate processes.

Avoid overlapping owners. `apps/api` should compose services rather than compete with them. Within services, documents should own document semantics, storage should supply persistence behavior through platform mechanisms, and recovery should coordinate consistent backup/restore across them. These responsibilities can initially be modules within the same build rather than separate services. Keep editor drafts owned by Notes and committed document state owned by persistence; shell state must not silently become a second document store.

Treat portable interfaces as hypotheses until another backend passes conformance tests. A browser/backend module boundary is not a security sandbox, and a native backend does not imply that an original kernel is ready. Keep kernel and local-AI research independent of the useful hosted workflow. These cautions refine implementation choices without replacing the requested hierarchy or authorizing new infrastructure.

## Capability-based roadmap

These outcomes have no deadlines or guaranteed delivery order. The tracker owns their task breakdown, authorization and status.

| Capability | Evidence required before claiming it |
| --- | --- |
| Workspace and useful Notes | Open the workspace, create/select/edit multiple identified notes, and complete the interaction with keyboard and visible focus. |
| Reliable saving and reopening | Accurate save states; saved text after full restart; failed writes preserve drafts and prior committed data. |
| Backup and restore | User-controlled export; restoration into an empty store; invalid input and failed restores preserve the applicable existing state. |
| Early Pages preview | The intended static artifact works at the actual project path, communicates its capabilities honestly and contains only appropriate preview data. This can be an early delivery thread without claiming the entire Notes milestone is complete. |
| Broader personal applications | File Manager, Settings and other applications solve demonstrated needs through supported interfaces, without duplicating shell or service ownership. |
| Private system services and self-hosting | Authorized access, validated inputs, reliable storage, tested recovery and repeatable operation on a selected host. |
| Local AI | Useful behavior measured on chosen hardware, verified local inference and separately enforced authorization for any tools or data access. |
| Alternative hosts and backends | A defined capability subset passes relevant workflow and conformance checks on each claimed environment. |
| Original kernel research | Reproducible experiments demonstrate specifically claimed low-level mechanisms; hosted application progress remains independent. |

## Early GitHub Pages delivery

The owner requests early GitHub Pages delivery. It is not implemented: no Pages artifact, configuration, deployment workflow or verified live preview is supplied in this repository.

Pages is intended for static preview hosting. A preview may demonstrate the browser workspace and supported local behavior, using synthetic or explicitly non-sensitive content. Label incomplete capabilities accurately. Before a release claim, verify the actual asset base, direct visits, refresh, browser errors, layout and keyboard behavior against the built or static artifact at its intended path.

Future private services, authentication, owner data and privileged AI/tool actions have separate hosting and security requirements. A public preview must not silently acquire access to them. Browser-local data and downloaded backups also need clear handling limits. Preparing this README authorizes neither Pages configuration nor publication; the candidate contents, visibility and publication action require separately authorized work.

## Documentation and contributing work

| Document | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Agent entry point; read the referenced standard and tracker before each task. |
| [Communication standard](docs/development/COMMUNICATION-STANDARD.md) | Roles, bounded authorization, evidence language, quality expectations and conversation/report templates. |
| [Tasks and improvements](docs/planning/TASKS-AND-IMPROVEMENTS.md) | Authoritative task, finding and improvement record; proposed changes are incorporated through separately authorized tracker updates. |

`docs/development/GIT-WORKFLOW.md` is the planned home for commit/push standards and reusable Git templates. It does not exist yet, so no active link or substitute standard is provided here. Architecture and decision directories are also planned; create documentation only when it preserves consequential knowledge.

Use the existing communication standard for the working cycle and task preparation. Verify repository identity, preserve existing changes, keep each implementation task to its authorized file and report unrelated findings without repairing them. No setup, build, test, commit, push or deployment result should be inferred from this blueprint.
