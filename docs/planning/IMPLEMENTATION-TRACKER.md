# Personal OS Implementation Tracker

## 1. Purpose

Use this checklist to order implementation, verify running results and reference owner acceptance for the four workstreams below. [TASKS-AND-IMPROVEMENTS.md](TASKS-AND-IMPROVEMENTS.md) remains the authoritative record of overall tasks, findings, improvements and statuses.

## 2. Scope, decisions and dependencies

- Development environment and local HTTP preview support M1. Complete ENV-01 and ENV-02, then create the entry point in M1-01.1 through M1-01.4 before starting the server in ENV-03.1. After startup, run M1-01.5 and ENV-03.2 through ENV-03.4 against the initial page. Reuse that preview for frontend work while the full ENV-03 result is pending.
- Select and record the verification browser and version and the desktop and narrow widths before any layout check. Complete ENV-03.5 after both views are reachable through the running launch and return flow.
- Treat early markup and view-switching work in M1-05 through M1-08 as scaffolding until both paths are wired. Connect launch (M1-09) and return (M1-10) together in one authorized, runnable increment to the proposed frontend file. Expose the launcher and return control when both work. Verify M1-05.5, M1-06.4 through M1-06.6, M1-09.6 and M1-10.5 against that complete flow.
- Original M1 ends when Personal OS opens to Workspace, Notes launches into an accurate empty view and the user can return to Workspace. The proposed implementation is `apps/web/index.html`, with dependency-free HTML, CSS and minimal JavaScript. Editing, saving, reopening, export and restore belong to the broader first functional workflow. [Proposed M1](TASKS-AND-IMPROVEMENTS.md#m1--workspace-and-empty-notes-view), [First functional milestone](../../README.md#first-functional-milestone).
- Backend integration and GitHub Pages delivery each have separate prerequisites and exit criteria. Neither is an automatic prerequisite for original M1. The local preview serves frontend files over HTTP and has no application backend responsibilities. The backend sequence becomes concrete once a chosen workflow needs a service. GitHub Pages hosts the static frontend. Backend runtime and hosting are separate responsibilities.
- Group order describes the intended sequence within each workstream. Follow explicit substep prerequisites across groups. Dependencies apply where the selected workflow, artifact or check requires them. Later groups do not authorize selecting tools, creating infrastructure or executing commands. Add implementation detail for M2–M13 when the relevant workflow, dependencies and acceptance criteria are sufficiently defined. Follow the timing and separate owner authorization requirements recorded for CP1–CP4. [Project-wide checkpoints](TASKS-AND-IMPROVEMENTS.md#project-wide-checkpoints).
- **Open decisions.** The supplied M1 visual direction is recorded under M1 frontend implementation. The verification browser and version, preview command, desktop and narrow verification widths, backend approach and Pages deployment method remain undecided. Record the chosen preview directory, port, bind address and URL when defined. Persistence, hosting and Pages timing depend on the workflow or preview scope the owner selects. [Preview and unresolved decisions](TASKS-AND-IMPROVEMENTS.md#preview-and-unresolved-decisions).
- **Existing outcomes.** Environment and preview cover the applicable subset of POS-005. M1 covers the first slice of POS-006 and relevant POS-004 and POS-005 work. Pages delivery maps to POS-007. Map any backend work to the workflow it supports, including POS-008 or POS-009 where saving or recovery actually requires it. POS-010 covers review of the combined first functional workflow. Checklist identifiers such as `ENV-01.1`, `M1-01.1`, `BE-01.1` and `PAGE-01.1` are local to this document. Preserve them in later updates and use existing POS IDs for cross-references. [Existing outcome details](TASKS-AND-IMPROVEMENTS.md#entry-details-and-evidence).

## 3. Completion and evidence rules

- Each authorized implementation task names one permitted file, the checklist steps in scope, acceptance criteria and checks. Dependencies that require other files are scoped separately.
- Codex reports implementation and verification evidence and suggests exact completion marks. ChatGPT reviews the evidence. The owner decides acceptance and authorizes exact tracking changes.
- A checked item records owner-accepted completion of that specific step, supported by an evidence reference. Passing checks, reporting completion, committing or publishing does not automatically check a box. Parent groups remain unchecked until the required substeps and the expected result are accepted.
- Changes to this checklist and changes to TASKS-AND-IMPROVEMENTS.md require separate authorized single-file tasks. Reconcile them in batches at meaningful boundaries. The main tracker references detailed checklist evidence here and need not change after every application edit.
- Preserve accepted evidence and report findings that invalidate earlier conclusions. Environment acceptance alone does not complete M1. [Communication standard](../development/COMMUNICATION-STANDARD.md).

## 4. Development environment and local web preview

### ENV-01 — Inspect the environment

**Expected result.** Development and verification capabilities are known.

- [ ] Accept the ENV-01 result.
  - [ ] ENV-01.1 Identify the development environment, operating system and available runtimes.
  - [ ] ENV-01.2 Identify an available browser and its version.
  - [ ] ENV-01.3 Inspect existing ports, processes and applicable instructions.
  - [ ] ENV-01.4 Record available tools without installing anything.
  - [ ] ENV-01.5 Identify missing capabilities that actually block preview.

### ENV-02 — Define preview

**Expected result.** The preview arrangement specifies how to serve and reach the frontend at the intended visibility.

- [ ] Accept the ENV-02 result.
  - [ ] ENV-02.1 Select an existing HTTP-serving command within the authorized scope.
  - [ ] ENV-02.2 Define the served directory, port and browser URL.
  - [ ] ENV-02.3 Distinguish the server bind address from the browser-accessible URL.
  - [ ] ENV-02.4 Identify port forwarding and visibility if development is remote.
  - [ ] ENV-02.5 Limit exposure to the intended audience.
  - [ ] ENV-02.6 Identify command side effects before execution authorization.

### ENV-03 — Run and inspect

**Expected result.** The frontend preview is reproducible over HTTP in the named environment.

- [ ] Accept the ENV-03 result.
  - [ ] ENV-03.1 Start the preview with the authorized command.
  - [ ] ENV-03.2 Open the application over HTTP.
  - [ ] ENV-03.3 Verify the entry path and relative resources.
  - [ ] ENV-03.4 Inspect refresh behavior, console errors and network failures.
  - [ ] ENV-03.5 Inspect the available layouts at desktop and narrow widths.
  - [ ] ENV-03.6 Verify stopping and restarting the server.
  - [ ] ENV-03.7 Record the command, URL, environment and limitations.

### ENV-04 — Prepare later tooling only when needed

**Expected result.** Justified tooling changes have defined outputs, scoped configuration and a reproducible preview. This group is optional for a no-build M1.

- [ ] Accept the ENV-04 result when needed.
  - [ ] ENV-04.1 Decide whether later work requires build or test tooling.
  - [ ] ENV-04.2 Define commands and generated outputs before execution.
  - [ ] ENV-04.3 Plan `.gitignore` before commands create dependencies or build artifacts.
  - [ ] ENV-04.4 Author necessary manifests or configuration through separately scoped tasks.
  - [ ] ENV-04.5 Verify that the preview remains reproducible.

## 5. M1 frontend implementation

Recheck structural steps where newly connected interactions affect them. Demonstrate behavior in the running application after wiring it up. Structural implementation alone does not satisfy the behavior checks.

### Visual direction for M1

**Reference evidence.** Codex's earlier rendered Chrome inspection of the supplied mock at 1440 × 900 and 768 × 860 showed a vivid wallpaper behind a slim bar, a translucent dock and dark framed panels. At the narrow width, parts of the right rail and dock clipped. That inspection describes the reference. Verify the Personal OS implementation separately through the running checks below.

Carry the color, typography and surface treatment into the Workspace → Notes → Workspace journey using original styling. Keep the mock HTML, screenshots, embedded libraries and reference assets outside the repository. M1 excludes simulated browser chrome, widgets, command search, extra apps, profile or status controls without implemented behavior, minimizing, dragging, application-window resizing and general window management. Include only working controls.

### M1-01 — Browser entry point

**Expected result.** A valid page runs over HTTP.

- [ ] Accept the M1-01 result.
  - [ ] M1-01.1 Create `apps/web/index.html` and its necessary parent directories.
  - [ ] M1-01.2 Add the document type, language, character encoding, viewport, title, head and body.
  - [ ] M1-01.3 Add organized CSS and JavaScript sections.
  - [ ] M1-01.4 Add the visible application container.
  - [ ] M1-01.5 Load the page through the selected server.

### M1-02 — Visual foundations

**Expected result.** Shared styling is consistent across the rendered application.

- [ ] Accept the M1-02 result.
  - [ ] M1-02.1 Define shared variables for deep navy surfaces, near-white text, muted blue-gray secondary text, a warm yellow or amber Notes accent, borders, focus, spacing and radii.
  - [ ] M1-02.2 Use compact system sans-serif typography with a clear hierarchy for headings and secondary text and readable line heights.
  - [ ] M1-02.3 Establish consistent sizing rules.
  - [ ] M1-02.4 Define shared hover and pressed states for buttons and a clearly visible keyboard focus treatment.
  - [ ] M1-02.5 Check text and focus contrast over the wallpaper and verify usable control sizes. Provide a sufficiently opaque fallback for translucent surfaces.
  - [ ] M1-02.6 Evaluate the visual foundations in actual application components.

### M1-03 — Application structure

**Expected result.** Workspace and Notes share a stable outer structure.

- [ ] Accept the M1-03 result.
  - [ ] M1-03.1 Add a slim top bar that shows Personal OS identity and Workspace context. Include the working navigation and main content.
  - [ ] M1-03.2 Create distinct Workspace and Notes containers.
  - [ ] M1-03.3 Define the shared layout and scrolling. Keep the top bar and wallpaper present across views.
  - [ ] M1-03.4 Establish semantic headings and landmarks.

### M1-04 — Workspace home

**Expected result.** Workspace is a clear starting screen with Notes as its available application.

- [ ] Accept the M1-04 result.
  - [ ] M1-04.1 Add the Workspace heading and a compact, centered, translucent dock-like launcher tray.
  - [ ] M1-04.2 Place only the Notes launcher in the tray.
  - [ ] M1-04.3 Add only the explanatory text needed to use the screen.
  - [ ] M1-04.4 Use an original cobalt and indigo wallpaper with broad, soft violet and magenta accents. Leave open space around the single launcher.
  - [ ] M1-04.5 Check that the screen excludes invented activity, files, accounts and statistics.

### M1-05 — Notes launcher

**Expected result.** The Notes launcher is an accessible application entry point.

- [ ] Accept the M1-05 result.
  - [ ] M1-05.1 Use a native button with a visible Notes label and the warm Notes accent.
  - [ ] M1-05.2 Give the button an accessible name that identifies Notes.
  - [ ] M1-05.3 Apply the shared hover, pressed and visible focus treatments to the Notes launcher.
  - [ ] M1-05.4 Make the intended launcher area clickable.
  - [ ] M1-05.5 Verify keyboard reachability and activation after connecting launch behavior in M1-09.

### M1-06 — View switching

**Expected result.** Navigation consistently displays and focuses the intended view.

- [ ] Accept the M1-06 result.
  - [ ] M1-06.1 Establish the agreed initial Workspace state.
  - [ ] M1-06.2 Define Workspace and Notes view names.
  - [ ] M1-06.3 Implement one view-switching mechanism.
  - [ ] M1-06.4 Update view visibility, navigation indication and focus on each switch.
  - [ ] M1-06.5 Keep inactive view content out of the tab order in both directions.
  - [ ] M1-06.6 Handle repeated navigation without duplicate content or handlers.
  - [ ] M1-06.7 Keep navigation free of a general router or framework.

### M1-07 — Notes frame

**Expected result.** Notes has a recognizable application surface for the empty view.

- [ ] Accept the M1-07 result.
  - [ ] M1-07.1 Add a compact Notes header with a heading and a native Back to Workspace button.
  - [ ] M1-07.2 Define the future note-list and document regions.
  - [ ] M1-07.3 Establish desktop proportions.
  - [ ] M1-07.4 Provide the empty layout without editing behavior.
  - [ ] M1-07.5 Style Notes as a dark, rounded surface with a fine border, a divider below the header and a soft shadow.

### M1-08 — Empty state

**Expected result.** The Notes view clearly communicates its empty state and available actions.

- [ ] Accept the M1-08 result.
  - [ ] M1-08.1 Use an accurate empty-state message such as “No notes yet.”
  - [ ] M1-08.2 Add brief, accurate supporting text.
  - [ ] M1-08.3 Give the empty state generous spacing and clear alignment beneath the Notes header.
  - [ ] M1-08.4 Check that the content and layout convey the actual capabilities of the view.
  - [ ] M1-08.5 Omit nonfunctional creation, saving and export controls.
  - [ ] M1-08.6 Check readability at narrow width and increased zoom.

### M1-09 — Launch behavior

**Expected result.** Notes opens end to end from the Workspace launcher.

- [ ] Accept the M1-09 result.
  - [ ] M1-09.1 Connect the launcher to the view-switching mechanism.
  - [ ] M1-09.2 Show Notes and hide Workspace content on launch.
  - [ ] M1-09.3 Update any active navigation indication.
  - [ ] M1-09.4 Move focus to the Notes heading when Notes opens.
  - [ ] M1-09.5 Keep programmatic focus targets out of the normal tab order where appropriate.
  - [ ] M1-09.6 Verify equivalent pointer and keyboard activation.

### M1-10 — Return behavior

**Expected result.** Returning from Notes restores Workspace and launcher focus reliably.

- [ ] Accept the M1-10 result.
  - [ ] M1-10.1 Connect Back to Workspace to the view-switching mechanism.
  - [ ] M1-10.2 Restore Workspace and clear stale navigation indications.
  - [ ] M1-10.3 Restore focus to the Notes launcher.
  - [ ] M1-10.4 Reuse the existing content and handlers on return.
  - [ ] M1-10.5 Verify repeated open and return cycles.

### M1-11 — Keyboard behavior

**Expected result.** The complete Workspace and Notes journey works without a mouse.

- [ ] Accept the M1-11 result.
  - [ ] M1-11.1 Check forward and reverse tab order.
  - [ ] M1-11.2 Launch Notes with Enter and Space.
  - [ ] M1-11.3 Verify that keyboard launch focuses the Notes heading and that Back to Workspace restores focus to the launcher.
  - [ ] M1-11.4 Confirm hidden controls are unreachable by keyboard.
  - [ ] M1-11.5 Remove unnecessary custom keyboard handling and positive `tabindex` values.
  - [ ] M1-11.6 Check visible focus across surfaces.

### M1-12 — Responsive behavior

**Expected result.** Both views remain usable at the selected desktop and narrow sizes.

- [ ] Accept the M1-12 result.
  - [ ] M1-12.1 Inspect both selected verification widths.
  - [ ] M1-12.2 Adapt the top bar and launcher tray to the available width with consistent page gutters.
  - [ ] M1-12.3 Fit the Notes surface and its regions to the available width within those gutters.
  - [ ] M1-12.4 Prevent the bar, tray and Notes surface from clipping or overlapping, and avoid unnecessary horizontal scrolling.
  - [ ] M1-12.5 Keep both views and Back to Workspace reachable through appropriate vertical scrolling at reduced heights.
  - [ ] M1-12.6 Resize while each view is open.

### M1-13 — Accessibility and interaction finish

**Expected result.** Navigation and content are understandable and accessible in the verified conditions.

- [ ] Accept the M1-13 result.
  - [ ] M1-13.1 Check headings, landmarks, control names and treatment of decorative graphics.
  - [ ] M1-13.2 Check contrast and increased zoom.
  - [ ] M1-13.3 Verify essential actions are available without hover.
  - [ ] M1-13.4 Respect reduced-motion preferences if transitions exist.
  - [ ] M1-13.5 Check focus and scrolling during navigation.

### M1-14 — Robustness and organization

**Expected result.** Repeated use gives consistent behavior, and the single file is easy to inspect.

- [ ] Accept the M1-14 result.
  - [ ] M1-14.1 Verify the agreed initial state after reload.
  - [ ] M1-14.2 Repeat navigation and resizing.
  - [ ] M1-14.3 Inspect the browser console for errors.
  - [ ] M1-14.4 Confirm handlers register once.
  - [ ] M1-14.5 Remove unused state, duplicate styles and dead code.
  - [ ] M1-14.6 Clearly organize foundations, Workspace, Notes, responsive styles, HTML and navigation logic.
  - [ ] M1-14.7 Confirm there are no required external resources or unintended network requests.

### M1-15 — Final running-result pass

**Expected result.** The running M1 journey is ready for owner inspection.

- [ ] Accept the M1-15 result.
  - [ ] M1-15.1 Start from a fresh load.
  - [ ] M1-15.2 Complete the pointer and keyboard-only journeys.
  - [ ] M1-15.3 Repeat both journeys at both verification widths.
  - [ ] M1-15.4 At both verification widths, inspect the wallpaper, palette, typography, bar, tray, Notes framing and empty-state spacing and alignment. Verify contrast with the opaque fallback, visible focus and layout fit through both journeys.
  - [ ] M1-15.5 Correct issues within the authorized file and task scope.
  - [ ] M1-15.6 Repeat checks affected by corrections.
  - [ ] M1-15.7 Record the environment, serving method, viewport sizes, results and limitations.

## 6. Backend development and integration

Apply the persistence checks below to the chosen workflow, including browser-only storage. For an authorized workflow that requires a service, use these outcomes in the relevant backend checks, including BE-05.4 and BE-06.2 through BE-06.3.

- For saving under POS-008, verify that a failed save preserves both the draft and the prior committed data. Verify that competing writes follow the selected policy and that retry saves the intended version and reports success. After the defined restart, reopen the saved data and verify that it matches the last successful save.
- For backup and restore under POS-009, use synthetic data. Verify that a backup and restore round trip preserves record identities and text. Test invalid input and interrupted restoration separately. In each case, verify that applicable existing data remains intact and that no partial import is applied.

The storage approach, restart procedure, competing-write policy and treatment of existing records and unsaved drafts during restoration remain open until chosen for the applicable workflow.

Begin the numbered backend groups when an authorized workflow requires a service. Use that workflow to determine which contracts, failure cases and hosting checks apply. Empty-view M1 can finish independently.

### BE-01 — Define the first responsibility

**Expected result.** An existing outcome has a bounded service responsibility and identified failure and trust boundaries.

- [ ] Accept the BE-01 result.
  - [ ] BE-01.1 Identify the workflow requiring a backend.
  - [ ] BE-01.2 Distinguish browser persistence from owner-hosted services.
  - [ ] BE-01.3 Define the smallest server responsibility and its exclusions.
  - [ ] BE-01.4 Identify data ownership, trusted boundaries and relevant failure cases.
  - [ ] BE-01.5 Map the responsibility to existing POS outcomes.

### BE-02 — Prepare the backend environment

**Expected result.** Startup, verification, generated outputs and secret handling are defined.

- [ ] Accept the BE-02 result.
  - [ ] BE-02.1 Select a runtime and verification approach when authorized.
  - [ ] BE-02.2 Define the entry point, configuration and startup.
  - [ ] BE-02.3 Define permissions for dependencies and generated outputs.
  - [ ] BE-02.4 Define environment variables and secret handling.
  - [ ] BE-02.5 Keep private data and credentials outside frontend assets.

### BE-03 — Define contracts

**Expected result.** The workflow has explicit contracts and an implementable single-file task order.

- [ ] Accept the BE-03 result.
  - [ ] BE-03.1 Define records and stable identities.
  - [ ] BE-03.2 Define required operations and request and response formats.
  - [ ] BE-03.3 Define validation, error behavior and compatibility.
  - [ ] BE-03.4 Define save acknowledgment and behavior for stale or competing writes where relevant.
  - [ ] BE-03.5 Identify the concrete single-file implementation order.

### BE-04 — Implement behavior

**Expected result.** Required server operations validate inputs, use selected storage and enforce access at trusted boundaries.

- [ ] Accept the BE-04 result.
  - [ ] BE-04.1 Implement the required server operations.
  - [ ] BE-04.2 Validate input.
  - [ ] BE-04.3 Connect the selected storage.
  - [ ] BE-04.4 Enforce access restrictions at trusted boundaries.
  - [ ] BE-04.5 Return accurate success and failure results.
  - [ ] BE-04.6 Separate system behavior from transport and presentation.

### BE-05 — Integrate the frontend

**Expected result.** The frontend uses the backend through focused interfaces and accurately presents operation and connection state.

- [ ] Accept the BE-05 result.
  - [ ] BE-05.1 Configure the backend address without exposing secrets.
  - [ ] BE-05.2 Connect the required operations through focused interfaces.
  - [ ] BE-05.3 Display loading, success and failure accurately.
  - [ ] BE-05.4 Preserve drafts during interrupted or failed operations.
  - [ ] BE-05.5 Handle unavailable connections.
  - [ ] BE-05.6 Verify cross-origin behavior if applicable.

### BE-06 — Verify reliability

**Expected result.** End-to-end evidence covers the supported workflow and its applicable failure and access cases.

- [ ] Accept the BE-06 result.
  - [ ] BE-06.1 Check valid and invalid requests and applicable access restrictions.
  - [ ] BE-06.2 Exercise storage and connection failures.
  - [ ] BE-06.3 Verify restart, preservation, retry and competing-write behavior where required.
  - [ ] BE-06.4 Check logs and errors for secret exposure.
  - [ ] BE-06.5 Inspect the complete frontend and backend workflow.

### BE-07 — Prepare owner-hosted operation

**Expected result.** Where owner hosting is needed, the selected host has a repeatable operating and recovery procedure demonstrated before relying on real data.

- [ ] Accept the BE-07 result when owner hosting is required.
  - [ ] BE-07.1 Select the host when the workflow and its operating requirements are defined and selection is authorized.
  - [ ] BE-07.2 Define installation, configuration and startup.
  - [ ] BE-07.3 Define backup, restore, update and recovery.
  - [ ] BE-07.4 Verify access arrangements.
  - [ ] BE-07.5 Demonstrate recovery before relying on real data.

## 7. GitHub Pages preparation and publication

Pages hosts the static frontend. A preview that needs an application backend depends on a separately hosted service and verification of that connection. Publication requires an approved scope, an inspected artifact and authorization covering the delivery effects. [Git workflow and standing publication authorization](../development/GIT-WORKFLOW.md#standing-publication-authorization).

Complete PAGE-03.5 before building or verifying the artifact. Identify any required build inputs, commands and outputs. If artifact preparation depends on delivery configuration in PAGE-04, prepare that configuration through a separately scoped task. Inspect the artifact before applying any configuration that would publish it. Before publication, complete PAGE-06.1 and PAGE-06.2 by defining how to correct or withdraw the preview and confirming that user data stays separate.

Immediately before the publication trigger in PAGE-05.1, verify the actual artifact, intended audience, permitted backend connections and data exposure, and explicit authorization for that trigger. Apply this check to any action that deploys the site, including a push or configuration change. Perform PAGE-05.2 through PAGE-05.7 after deployment. Run the recovery exercise in PAGE-06.3 only when separately authorized.

### PAGE-01 — Define preview scope

**Expected result.** The preview has an agreed purpose, timing, data scope and accurately stated capabilities.

- [ ] Accept the PAGE-01 result.
  - [ ] PAGE-01.1 Choose preview timing and the capabilities to demonstrate.
  - [ ] PAGE-01.2 Define non-sensitive or synthetic preview content.
  - [ ] PAGE-01.3 Label unavailable persistence and recovery accurately, including draft-loss limits if applicable.
  - [ ] PAGE-01.4 Decide whether the preview is static-only or connects to a separately hosted backend.

### PAGE-02 — Select publication arrangement

**Expected result.** The publication source, deployment trigger and permitted effects are explicit.

- [ ] Accept the PAGE-02 result.
  - [ ] PAGE-02.1 Inspect existing Pages settings and automation.
  - [ ] PAGE-02.2 Select the source, deployment method and trigger when authorized.
  - [ ] PAGE-02.3 Define how a repository push relates to deployment.
  - [ ] PAGE-02.4 Obtain explicit authorization covering configuration and publication effects.
  - [ ] PAGE-02.5 Reassess applicable standing-publication conditions if the arrangement affects them.

### PAGE-03 — Prepare the artifact

**Expected result.** The intended frontend artifact serves correctly at its project path and contains only approved content.

- [ ] Accept the PAGE-03 result.
  - [ ] PAGE-03.1 Establish serving at the intended Pages project path.
  - [ ] PAGE-03.2 Account for `apps/web/index.html` as the proposed frontend source.
  - [ ] PAGE-03.3 Check relative assets, navigation and refresh.
  - [ ] PAGE-03.4 Exclude secrets, private records and unintended files.
  - [ ] PAGE-03.5 Define any necessary build commands and outputs before execution.

### PAGE-04 — Implement delivery configuration

**Expected result.** The selected arrangement has the necessary delivery configuration and verified artifact scope and permissions.

- [ ] Accept the PAGE-04 result.
  - [ ] PAGE-04.1 Author necessary configuration or workflows through separate single-file tasks.
  - [ ] PAGE-04.2 Verify artifact and publication permissions.
  - [ ] PAGE-04.3 Inspect which files and audiences the deployment includes.
  - [ ] PAGE-04.4 Limit configuration to what the selected arrangement requires.

### PAGE-05 — Publish and inspect

**Expected result.** The authorized preview runs at the verified live URL and deployed revision, with evidence for its claimed capabilities.

- [ ] Accept the PAGE-05 result.
  - [ ] PAGE-05.1 Execute the authorized deployment.
  - [ ] PAGE-05.2 Verify the live URL and deployed revision.
  - [ ] PAGE-05.3 Check launch, navigation, refresh and relative assets in the live preview.
  - [ ] PAGE-05.4 Inspect console output, layouts and keyboard behavior.
  - [ ] PAGE-05.5 Investigate origin and storage implications before claiming persistence.
  - [ ] PAGE-05.6 Verify separately hosted backend connections where applicable.
  - [ ] PAGE-05.7 Record separate evidence for repository push, deployment and running browser behavior.

### PAGE-06 — Define recovery

**Expected result.** The owner has a verified way to correct or withdraw the preview while keeping user data separate.

- [ ] Accept the PAGE-06 result.
  - [ ] PAGE-06.1 Identify correction or withdrawal procedures.
  - [ ] PAGE-06.2 Keep user data separate from software deployment.
  - [ ] PAGE-06.3 Verify recovery under applicable authorization.

## 8. Workstream acceptance summaries

Passing one workstream does not complete another. Use each summary to review the workstream's required results, evidence and owner acceptance.

### Local preview readiness

- [ ] Owner accepts a reproducible HTTP preview in the named environment, with the command, served directory, port, URL and visibility recorded. Evidence covers entry and relative resources, refresh, console and network checks, desktop and narrow inspection, and server stop and restart. Apply ENV-04 only if the chosen work requires it.

### Original M1 frontend behavior

- [ ] Owner accepts the running journey. Personal OS opens to Workspace. The Notes launcher opens an accurate empty view from both pointer and keyboard. Return restores Workspace and launcher focus, and hidden controls stay out of the tab order. Evidence covers repeated navigation, desktop and narrow layouts, increased zoom, visible focus, console and network checks, preservation of existing work, and the owner's acceptance of this scope.

### Backend integration when implemented

- [ ] Owner accepts the chosen end-to-end workflow with evidence for contracts, applicable access restrictions, storage, accurate frontend feedback, and preservation through relevant failures. Include startup, restart, retry, competing writes and host operation or recovery as required by the workflow.

### GitHub Pages delivery when implemented

- [ ] Owner accepts the authorized live artifact at its verified URL and revision. Evidence covers preview scope and exposure, live interaction and layout, accurate persistence or recovery claims, any separately hosted backend connection and the applicable correction or withdrawal procedure.

## 9. Evidence and owner-acceptance references

- With a completion mark, reference the checklist ID or workstream summary, the report or working revision, the executed checks and relevant environment and limitations, and the owner's exact acceptance reference. Reuse a report reference across related steps where its scope supports each one.
- Retain the evidence label supported by the record. Distinguish proposed work, implemented behavior, tested results, attributed reports, assumptions and owner acceptance. For a Pages preview, identify the deployed revision and URL separately from repository publication evidence. [Evidence language](../development/COMMUNICATION-STANDARD.md#evidence-language).
- At reconciliation, reference the accepted checklist IDs and evidence from the applicable POS outcome. Review the evidence and obtain authorization for the exact single-file tracking edits. [Tracker update rules](../development/COMMUNICATION-STANDARD.md#task-progress-and-suggested-tracker-updates).
