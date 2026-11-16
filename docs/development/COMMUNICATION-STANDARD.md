# Personal OS Communication Standard

Personal OS is a clean-slate, long-term personal project owned by one developer working with ChatGPT and Codex. This standard defines how work is proposed, authorized, performed, evaluated and carried between conversations. It is not a roadmap, task tracker or automatic authorization to implement recommendations.

## Responsibilities

| Participant | Responsibilities |
| --- | --- |
| Owner | Set the vision and priorities; decide significant architecture and scope questions; authorize work; accept or reject outcomes. Acceptance belongs to the owner and must not be inferred from silence or passing checks. |
| ChatGPT | Plan work, critique proposals, prepare bounded tasks, evaluate completion reports and recommend useful improvements. Identify missing evidence and distinguish recommendations from owner decisions. Do not claim repository inspection or execution that did not occur. |
| Codex | Inspect the repository, assess dependencies and risks, implement explicitly authorized changes, perform proportionate verification and report evidence, limitations and useful improvements. Preserve existing work and stop the affected action when it exceeds authorization. |

Both ChatGPT and Codex should challenge unsupported claims and explain material tradeoffs. The owner need not decide routine implementation details already covered by the authorized task. Existing decisions and authorization remain effective until changed; do not repeatedly request the same approval.

## Working cycle

1. **Objective:** State the user outcome, scope and observable acceptance criteria.
2. **Assessment:** Inspect the current repository, check consistency, identify dependencies and distinguish facts from proposals and assumptions.
3. **Owner decision:** Resolve significant choices and establish the exact authorized task. A specific owner instruction can supply this decision without another confirmation round.
4. **Implementation:** Perform only the authorized change to the single permitted file. Preserve unrelated work.
5. **Verification:** Check the change and whole-repository consistency; record commands, results, scope and limitations.
6. **Critical review:** Evaluate the outcome against acceptance criteria, challenge weak evidence and report remaining issues. The owner decides acceptance.
7. **Next objective:** Recommend one useful next task or explain why no further work is needed. A recommendation does not authorize its execution.

Read-only assessments skip implementation. Failed checks require an honest report, not a completion claim. An implementation error within the authorized file may be corrected within the existing scope; unrelated repairs require authorization.

## Scope and authorization

- Verify the canonical repository identity, using its stable repository ID as well as its URL, before work. The new repository is `Sas8037/personal-os`, expected ID `1455766940`. Stop writes if identity differs or cannot be established.
- The historical repository, `personal-os-test`, ID `1434600370`, is not a write destination. Its code, plans and decisions are not automatically adopted. Importing historical code requires separate explicit authorization.
- **One file per implementation task.** Name that file before editing. If another file must change, explain why, identify the dependency and propose a separate task. Do not edit it under the current task.
- For coupled changes, make the dependency and any incomplete intermediate state explicit. Do not split work in a way that falsely presents a broken intermediate state as usable or accepted. If safe progress requires broader scope, report the blocker and request an owner decision.
- Preserve pre-existing staged, unstaged and untracked work. Do not restore, overwrite, stage or discard unrelated changes. If existing edits conflict with the task, pause the conflicting action and explain the conflict.
- File-edit authorization does not by itself authorize dependency installation, branch creation, commits, pushes, merges, settings changes, external messages or deployment. Use the owner's explicit task scope and existing session authorization.
- Do not delete data, reset work, rewrite published history, replace stored documents or perform other destructive actions without explicit authorization for that action and its consequences. Prefer reversible approaches.
- Do not silently expand scope, install tools, add dependencies or introduce new frameworks or infrastructure. Explain any necessary scope change before proceeding with it.
- Inspect setup, build, test and automation commands before executing them. Check for file writes, network access, credentials and effects on real data. Use synthetic data and isolated environments where applicable.
- Never expose secrets or unnecessary personal data in output, screenshots, fixtures or reports. Respect task-specific restrictions on access and execution.

Early GitHub Pages delivery is requested by the owner. This is a delivery objective, not authorization to configure or publish it. Configuring Pages, changing settings, creating deployment automation and publishing are outside the task that introduces this standard and require separately authorized work. Review the intended artifact and exposure before any authorized publication.

## Evidence language

| Label | Required meaning |
| --- | --- |
| Proposed | A recommendation or design awaiting implementation or a decision. It is not an existing capability. |
| Implemented | A mechanism exists in the identified revision or working tree. This does not establish successful execution. |
| Tested | A named check was executed. State its result, environment and scope; tested behavior may have failed. Only passing evidence supports a passing-test claim. |
| Reported | A result was supplied by the owner, another agent or a historical record. Attribute it and state whether it was independently reproduced. |
| Assumed | An unverified premise. State why it is reasonable and what decision or check could invalidate it. |
| Owner-accepted | The owner explicitly accepted the identified outcome or scope. Record or reference that decision without expanding it to other capabilities. |

These labels can coexist. For example, a feature may be implemented and pass a narrow test while remaining unaccepted. Document acceptance, compilation, browser behavior, accessibility, recovery, security and deployment each require their own relevant evidence. Missing evidence means unverified, not necessarily broken. Do not call a security boundary enforced without identifying its enforcement mechanism.

## Task progress and suggested tracker updates

Substantive Codex reports must compare task results with the current tracker and include a **Suggested tracker updates** section. Codex reports evidence, completed implementation, verification, active work and remaining acceptance criteria; it only suggests tracker changes. ChatGPT evaluates those suggestions and recommends justified changes. The owner decides acceptance and authorizes specific tracker edits. Codex applies only the changes the owner authorizes.

Codex must never independently mark tasks Done, accept work or treat its completion report as owner acceptance. General authorization to edit the tracker does not grant discretion to accept work or choose additional status changes. Use the tracker's existing status meanings; do not redefine them in a report.

For relevant work, report:

- Stable IDs and their recorded statuses, distinguishing current tracker facts from suggestions.
- Implementation completed, verification performed and remaining acceptance criteria, including any outstanding owner acceptance.
- Work actually underway and what remains active after the report; distinguish it from proposed next work. Do not label a recommendation In progress.
- Suggested status changes with evidence and reasons. Even a suggestion to mark Done must identify any outstanding owner acceptance requirement; tests or a completion report do not satisfy it.
- Suggested new tasks, findings or improvements with their purpose, evidence/source, acceptance criteria and dependencies. Avoid duplicating existing entries.
- Useful merges, splits or ordering changes, with reasons and relationships that preserve stable IDs and evidence. Do not silently reuse or discard IDs.
- Whether a separately authorized tracker-update task is warranted, and which proposed changes need review or a decision first.

Use a compact table when helpful: `ID | Recorded status | Suggested change | Evidence / remaining work`. Reference verification or findings elsewhere in the same report instead of copying them. If no changes are justified, write **No tracker changes suggested**. Do not manufacture work, imply that suggestions have been applied or create a second status log.

ChatGPT must evaluate the suggestions against the evidence, distinguish supported conclusions from missing evidence and recommend specific tracker changes for the owner's decision. Its recommendations are not owner acceptance. A proposed tracker-update prompt must remain labeled proposed while decisions are pending. Once authorized, the implementation prompt must identify the exact owner-authorized IDs, fields and edits, preserve unresolved decisions and exclude unapproved changes.

All suggestions remain pending ChatGPT review and specific owner authorization. Reporting them does not authorize editing the tracker. When the tracker is outside the permitted file scope, applying changes requires a separately authorized single-file tracker task.

## Mandatory repository consistency checks

Perform a whole-repository consistency check **at task start and after implementation**, before the completion report. For read-only work, finish by checking that the assessed baseline remains applicable and no changes were made.

At both checkpoints:

1. Confirm repository identity, branch, commit and relevant remote state. Capture working-tree/index changes and distinguish pre-existing work from task changes.
2. Read applicable repository instructions. Inventory tracked and untracked project files and account for all project areas, including source, configuration, dependencies, tests, automation and documentation where present.
3. Compare the task and repository claims with actual files, entry points, imports, scripts, contracts and verification evidence. Look for conflicting instructions, stale paths/status, missing dependencies and unsafe execution effects.
4. Assess cross-file consequences of the permitted change: references, interfaces, configuration, tests, documentation and generated artifacts. Do not modify a dependent file without its own authorization.
5. Report material findings, their evidence, impact and confidence. Identify what was not checked. At completion, inspect the entire permitted diff, including a newly created file, and confirm unrelated work was preserved.

Depth must be proportional to risk. For a small documentation change, inventory the repository and check the relevant claims, links, instructions and file relationships. For code, storage, dependency or security changes, trace affected execution paths and failure cases and run appropriate authorized checks. Whole-repository coverage does not mean rereading all dependency code or reconstructing all history on every task; explain the coverage actually achieved.

Discovered issues remain **report-only unless their repair is explicitly authorized**. If an issue blocks the permitted task, explain the dependency and propose a separate task. Do not silently repair it, create another tracking file or claim a partial scan was exhaustive. Never run an unsafe or prohibited check merely to complete a checklist; report it as not run and explain what would be needed.

## Quality expectations

Apply these dimensions where relevant to the task and milestone. State exclusions rather than implying universal coverage.

| Dimension | Expected evidence and behavior |
| --- | --- |
| Functionality | The promised user workflow works end to end, including meaningful failure cases. UI scaffolding and mock data are identified. |
| Visual design | Clear hierarchy, readable typography, consistent spacing and useful layouts at the intended sizes. Inspect rendered output when relevant; compilation does not establish visual quality. |
| Interaction | Predictable actions, understandable progress and errors, preserved input, sensible navigation and focus, and explicit consequences for destructive actions. |
| Accessibility | Semantic controls, labels, keyboard operation, visible focus and understandable status/error feedback. Use automated checks and manual interaction review as appropriate; neither alone establishes full accessibility. |
| Reliability | Correct state ownership, failed-operation handling and recovery. For persistence, verify restart behavior, preservation after failed writes and backup/restore separately. |
| Security and privacy | Minimize authority and exposure, protect secrets, validate untrusted input and identify actual enforcement boundaries. Browser state or module separation alone does not enforce privileged authorization. |
| Performance | Check representative workloads and responsiveness where relevant. Distinguish measurements from expectations; avoid optimizations without a demonstrated need. |
| Maintainability | Understandable ownership, directional dependencies, consistent checks, focused changes and proportionate documentation. Add abstractions and dependencies only for demonstrated needs. |

Tests should assert user-visible outcomes and important contracts, including failure and recovery. Use mocks deliberately and disclose what they bypass. Do not add tests that merely mirror the implementation or run unrelated suites without a reason. Report the exact scope of passing evidence.

## Reusable task template

```text
Objective and user outcome:
Repository URL and expected ID:
Starting branch/commit and known existing changes:
Task type: read-only assessment | single-file implementation
Permitted file, if implementing:
Authorized actions and explicit exclusions:
Relevant owner decisions and assumptions:
Start-of-task whole-repository consistency check:
Dependency on other files, if any; proposed separate task:
Observable acceptance criteria:
Verification plan and execution/data constraints:
End-of-task consistency and preservation checks:
Required report: evidence, findings, limitations, improvements, next task
```

Keep the task as short as its risk allows. Include enough context to execute it without importing an entire conversation. Preparing a task is not approving it; the owner's instruction supplies authorization.

## Conversation templates

Use the appropriate copyable template for substantive conversations. Brief acknowledgments, clarifications and progress replies do not need a full template; the shared rules still apply. Follow Scope and authorization, Evidence language and Mandatory repository consistency checks rather than repeating their rules in each response.

For Codex reports, include repository ID, branch, commit, working changes and local/remote publication state in the baseline or outcome. Identify the permitted file and preserved work, where applicable. Verification names the check or command, result, environment and scope. Findings identify location, mechanism, impact and confidence; limitations include checks not run and unmet acceptance criteria. Use Task progress and suggested tracker updates above for the shared tracker comparison; improvement recommendations may reference that section without duplicating its entries.

Recommendations, acceptance recommendations and drafted next prompts remain distinct from owner decisions. Preparing a next prompt does not authorize execution; identify whether its scope is proposed or already authorized. For an implementation prompt, use the Reusable task template and name exactly one file. For an assessment prompt, explicitly state read-only scope. Explain any cross-file dependency and propose a separate task under the one-file rule.

Scale the report to the work. Lead with the outcome; include failures and limitations near the claims they constrain. Do not describe local edits as committed, a commit as published, a reported pass as freshly reproduced, or a successful check as owner acceptance.

ChatGPT's substantive planning and review reports and Codex's substantive assessment and completion reports must each include useful improvement recommendations, or explicitly say none are justified. Prefer a few evidence-backed recommendations with benefit and cost. Do not invent work, repeat unchanged suggestions or turn recommendations into authorized tasks.

### ChatGPT planning

```text
Objective:
Engineering assessment:
Recommendation:
Owner decision needed, if any:
Next Codex prompt:
```

### Codex assessment

```text
Repository baseline:
Whole-repository findings (start/end coverage):
Relevant options/tradeoffs:
Recommended approach:
Limitations:
Suggested tracker updates:
Next task:
```

### Codex implementation report

```text
Outcome: completed | partial | blocked; acceptance criteria met/missing
Changed file and preserved existing work:
Verification:
Whole-repository findings (start/end coverage):
Limitations:
Improvement recommendations:
Suggested tracker updates:
Owner inspection instructions: where to inspect and what to check
Next task:
```

### ChatGPT review of Codex

```text
Plain-language explanation:
What the evidence establishes:
Concerns or missing evidence:
Acceptance recommendation:
Useful improvements:
Suggested tracker updates:
Next single-file Codex prompt:
```

### New-conversation handoff

```text
Project purpose:
Current objective:
Accepted decisions and authorization:
Repository/revision and working changes:
Verified progress:
Blockers:
Next action:
```

## Continuity between conversations

Use the New-conversation handoff template above. Keep it concise and reference existing reports or decisions instead of copying their full history.

Repository files and fresh inspection establish implementation facts. Conversation summaries preserve decisions and authorization but do not prove current repository state. Recheck the baseline when resuming, and distinguish stale or reported results from fresh evidence.

Keep durable documentation limited to setup, verification, limitations, agent instructions and consequential decisions. The [task tracker](../planning/TASKS-AND-IMPROVEMENTS.md) is the single task/improvement record. Use Task progress and suggested tracker updates above to propose changes; reference that record instead of duplicating its statuses across the README, this standard and conversation handoffs.
