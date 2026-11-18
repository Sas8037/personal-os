# Personal OS Git Workflow

This is the project standard for commits and pushes. Follow the [communication standard](COMMUNICATION-STANDARD.md) for roles, authorization, evidence language, whole-repository checks and conversation templates. The [tracker](../planning/TASKS-AND-IMPROVEMENTS.md) remains the single task/status record. This document provides Git-specific practice and reusable templates without creating another approval or activity log.

## Actions and authorization

| Action | Effect |
| --- | --- |
| Edit | Changes working files; creates no commit or remote publication. |
| Stage | Selects content in the index for a commit; does not commit it. |
| Commit | Records a local history snapshot; does not by itself publish it. |
| Push | Updates remote refs and can publish several commits, including earlier work. It can trigger automation. |
| Deploy | Publishes or changes a running site/service or other external artifact. It is a separate effect that may be triggered by a push. |

File-edit authorization does not automatically authorize staging, committing or pushing. A commit authorization does not automatically authorize a push, and push authorization must cover any publication it would trigger. Use authorization already given without asking repeatedly. If the action or effect exceeds it, stop that action and explain the specific gap.

Respect the one-file implementation rule. Default to one coherent commit containing the authorized changes to that file. A commit grouping previously authorized changes in several files requires explicit authorization for its complete scope; grouping does not authorize new edits to those files. Identify the actual paths or exact commits, not merely a broad product objective.

Keep the process proportional. Use existing task instructions and completion reports; no new approval documents, duplicate status logs or empty commits are required. Scale messages and checks to risk, and omit inapplicable template fields instead of leaving empty sections.

## Before committing

1. **Establish the baseline.** Verify canonical repository identity, including the expected repository ID, branch, HEAD, remotes, working changes and index. Read applicable instructions and perform the standard's start-of-task consistency check. Do not assume that a URL, branch name or old remote-tracking ref still identifies the intended destination.
2. **Review the intended scope.** Inspect the complete staged and unstaged diffs, untracked files and any earlier edits within the permitted file. Distinguish task changes from pre-existing work. A path authorization does not automatically include unrelated pre-existing content in that path.
3. **Preserve unrelated work.** If unrelated staged content would enter the commit, stop the commit action and report the conflict. Do not silently unstage, stash, discard or include it. Do not switch branches or otherwise disturb unrelated changes to make the index appear clean.
4. **Inspect execution effects.** Understand relevant check scripts and Git hooks before running them, including file writes, network access and credential use. If they require unauthorized changes or effects, report the dependency rather than expanding scope.

**Illustrative—not actual project progress**

The following are inspection examples, not a record of commands executed for a task:

```bash
git status --short --branch
git branch --show-current
git rev-parse HEAD
git remote -v
git diff --
git diff --cached --
git diff --check
git diff --cached --check
```

Ordinary `git diff` omits untracked files. Read new files directly and inspect their complete contents before staging. A no-index comparison can help review a new file; its differences exit status must not be mistaken for a failed implementation check. `git diff --cached` shows the staged content relative to HEAD. See the [Git diff reference](https://git-scm.com/docs/git-diff) for command semantics.

## Stage, verify and commit

- Stage only explicit authorized paths and relevant changes. Never stage everything indiscriminately with blanket commands such as `git add .` or `git add -A`, or sweep tracked modifications into a commit with `git commit -a`.
- Inspect the entire staged diff and staged path list, including deletions, renames and existing index content. Confirm they match the authorized scope. Check for credentials, private data and unintended generated artifacts without printing sensitive values into reports.
- Run relevant authorized checks and staged whitespace checks. Identify failures and checks not performed, with their scope and impact. Check the content being committed: passing checks against a different working version do not verify the staged version. If edits occur after staging or verification, review, restage and repeat affected checks as needed.
- When the reviewed scope and required checks support the authorized commit, create it using an accurate message. A failed required check blocks a passing-completion claim; report it and resolve it within scope or obtain an explicit decision about any exception before committing.
- Inspect the resulting commit's SHA, full patch and included paths. Recheck local status and confirm unrelated work remains preserved. Report any hook-generated or unexpected change without automatically adding or reverting it.

Verification-only work with no intended content change needs no empty commit. Committing does not establish owner acceptance or public availability.

## Before pushing

1. **Verify the destination and range.** Confirm repository identity, every effective push URL, the explicit destination branch/ref and the exact source revision. Use fresh remote information. Inspect every outgoing commit's message, files and patch, as well as the aggregate change; a push can publish earlier commits beyond the latest task. For a new branch, identify its intended base and the history being exposed.
2. **Match authorization.** Every outgoing commit and ref must be within the approved publication scope. If an earlier commit is outside it, stop the push and report it. Use an explicit, narrow destination rather than relying on implicit push defaults; inspect whether configuration would also publish tags or additional refs.
3. **Inspect automation.** Examine relevant workflow events, branch/tag/path filters, Pages source settings and other repository-side publication triggers. The absence of a committed workflow file does not establish that no automation runs. Authorization must cover any release, site deployment or other publication the push would trigger. If relevant effects cannot be established, report them as unknown and stop the push until the gap is resolved. Unavailable inspection is missing evidence, not evidence of a problem. Where the agent cannot inspect a repository-side fact, such as whether webhooks exist, an owner statement addressing that fact can resolve that specific gap. Attribute it as owner-reported and not independently verified, and do not extend it beyond what was stated. A factual statement does not authorize additional automation or publication effects. Keep inspection proportional to the authorized operation and identify the specific evidence still needed. Do not ask again for a fact the owner has already stated for the same destination and scope unless there is reason to believe it has changed. Do not silently change automation settings.
4. **Handle divergence safely.** Inspect remote changes and conflicts before choosing an integration strategy. Do not force-push, rewrite published history or resolve conflicts destructively without explicit authorization. `--force-with-lease` is still a history-replacement operation, not an authorization substitute. A rejected push is a reason to inspect, not to force it through.

Git's [push reference](https://git-scm.com/docs/git-push) explains source/destination refs and push options. These mechanics do not grant project authorization.

## After pushing

Verify the destination branch's advertised remote SHA through fresh read-only remote access and compare it with the intended revision. A local commit, stale tracking ref or successful command alone does not establish the final remote revision. If confirmation is unavailable, report the push as unverified. If the remote differs or the connection failed after an attempted push, inspect the actual state before retrying or attempting recovery.

Report relevant automation and deployment separately, tied to the revision and specific run when available. Pending, failed or unavailable checks remain identified as such. A verified push is not a successful workflow or deployment, and a green deployment job is not evidence that the intended application works. Provide a live URL only when established, and distinguish deployment execution from live behavior verification.

Finish with the standard's end-of-task consistency check and remaining-local-changes report. When the tracker is outside the permitted scope, report proposed updates without editing it.

## Proportionate recovery

Inspect the current state and affected content first. Recovery actions need the applicable authorization and must preserve unrelated work.

| Situation | Preferred response |
| --- | --- |
| Wrong staged selection before a commit | Stop the commit. With appropriate authorization, unstage only the affected selection while preserving working content; never silently alter someone else's staged work. |
| Unwanted uncommitted edit | Correct it within authorized scope or preserve it for review. Discarding work, hard resets and cleanup/deletion require explicit authorization for the data loss involved. |
| Faulty local, unpublished commit | Prefer a focused corrective commit. Amend or other local-history changes require scoped authorization and confirmation that the history is unpublished. |
| Faulty published change | Prefer an authorized corrective commit or revert, with appropriate checks. A revert records a new reversal commit; it does not erase the original. Review the full affected scope, including any files beyond the current implementation authorization. |
| Push rejection or merge/revert conflict | Inspect divergence and conflict contents; preserve work and propose an integration or recovery action. Do not automatically force, reset or accept one side wholesale. |
| Published secret or harmful external effect | Stop further publication and report without exposing sensitive values. Credential revocation/rotation, deployment recovery or other external remediation requires the relevant authorization; deleting Git content alone is insufficient. |

Git reversal does not necessarily undo external effects such as a deployment, data migration, notification or credential exposure. Verify external recovery separately. Refer to [Git revert](https://git-scm.com/docs/git-revert) for reversal semantics; no recovery command is authorized merely by its inclusion here.

## Copyable templates

Write enough for someone to understand the reason and outcome without reading the entire conversation. Explain the resulting behavior or guidance rather than listing every editing action. Use plain language and name technical details only when they help explain the change.

Scale detail to the change. A small documentation correction can use a short message; a feature or reliability fix needs enough explanation to assess behavior and remaining work. Remove unnecessary sections and empty fields from final messages. Keep material failures, checks not performed and limitations visible.

Angle-bracket placeholders below are for preparation and illustration. Actual commit messages and completion reports must contain facts, actual checks and results, and established identifiers or URLs. For ordinary editing/planning conversations, use the communication standard's templates.

### Commit message

```text
<type>(<area>): <clear summary of the change>

Reason:
<What problem or need prompted this change, and why it matters.>

What changed:
- <Main changes and their resulting behavior or guidance.>
- <Affected files when useful.>

Checks performed:
- <Actual checks and results.>
- <Checks not performed and why.>

Remaining work:
<Material unfinished work, limitations or dependencies.
Omit when unnecessary.>
```

Choose a type that describes what the commit actually contains. The area names the affected part, such as `notes`, `web` or `readme`; it does not claim that an entire application is complete.

| Type | Plain-language meaning |
| --- | --- |
| `feat` | Add a user-facing capability. |
| `fix` | Correct behavior that is not working as intended. |
| `docs` | Change documentation or guidance. |
| `refactor` | Reorganize code while intending to preserve its behavior. |
| `test` | Add or improve checks, tests or test data. |
| `build` | Change dependencies, build tools or how the software is packaged. |
| `ci` | Change automated checks or delivery workflows, such as GitHub Actions configuration. |

### Commit/push task scope

```text
Scope status: proposed | owner-authorized (cite the owner's instruction):
Repository and expected ID:
Starting branch and commit:
Exact changes or commits authorized for inclusion:
Operation authorized: commit | push | both
Push destination, when applicable:
Required checks:
Permitted automation or deployment effects:
Actions and changes excluded:
```

Existing authorization can supply these details; another approval document is unnecessary. A prepared scope remains proposed until the owner's instruction authorizes it; preparing it grants no authority. The template fields record authorization only to the extent that instruction supplies it. Use it without asking for the same permission again. Identify any missing decision that affects the action before proceeding. A multi-file commit scope must identify the previously authorized changes it groups; it does not authorize new multi-file implementation.

### Commit/push completion report

```text
Outcome:
<What was committed or pushed. Identify partial success,
failure or unverified results.>

Destination:
<Repository and branch.>

Commits and files:
<Included commits, their purpose, affected files and verified
remote commit identifier when available.>

Checks:
<Actual checks, results and checks not performed.>

GitHub automation and deployment:
<What ran, its status and whether live behavior was checked.>

Local work remaining:
<Changes not included in the commit or push.>

Remaining work and recovery:
<Next action, material limitations and an appropriate
correction or reversal option.>
```

Distinguish a local commit, a verified push, successful automation, deployment execution and tested application behavior. Report partial success accurately, including a local commit whose push is blocked. An unconfirmed push remains unverified. Include a live URL only when established; a deployment result alone does not prove that the application works.

Apply the communication standard's [suggested tracker updates guidance](COMMUNICATION-STANDARD.md#task-progress-and-suggested-tracker-updates) to substantive reports, including those using this Git template. Codex may suggest changes for ChatGPT review and owner decision; it cannot independently accept work, change statuses or mark tasks Done. A tracker edit applies only the specific changes the owner authorizes within the separately permitted tracker scope.

For a task that only edits a file, use the communication standard's implementation report and state that no commit or push occurred.

## Practical examples

Each example assumes a hypothetical starting revision in which its stated prerequisites exist. None describes actual project progress, grants authorization or establishes owner acceptance. Replace placeholders with verified facts in real messages and reports; never copy placeholder results as evidence.

### 1. Small README documentation commit

**Illustrative—not actual project progress**

A concise message for an authorized README correction. The hypothetical starting commit already contains the README; this example does not authorize including unrelated existing README edits.

```text
docs(readme): link the Git workflow standard

Replace the outdated absence statement with a link to the Git workflow
and mark that document as existing in the repository blueprint.

Checks: <ACTUAL_LINK_AND_MARKDOWN_CHECKS_AND_RESULTS>.
```

### 2. Notes creation and editing feature commit

**Illustrative—not actual project progress**

This hypothetical change adds session-only editing to an existing workspace through one authorized file. It does not claim that Notes exists in the current repository.

```text
feat(notes): create and edit notes in the workspace

Reason:
Make the workspace useful for writing and switching between notes.

What changed:
- Add note creation and editing in <AUTHORIZED_NOTES_FILE>.
- Give each draft a stable identity and preserve it when switching notes
  during the current session.

Checks performed:
- <ACTUAL_CREATE_EDIT_AND_SWITCH_CHECK>: <ACTUAL_RESULT>.
- <ACTUAL_KEYBOARD_AND_FOCUS_CHECK>: <ACTUAL_RESULT>.
- Save, restart recovery, export and restore checks were not performed
  because those features are not part of this hypothetical change.

Remaining work:
Saving remains unavailable. Drafts exist only in memory and are lost
when the application closes. Persistence and backup need separate work.
```

### 3. Failed-save correction commit

**Illustrative—not actual project progress**

This later hypothetical revision already has a save operation. The example describes a fix in one authorized file, not an existing persistence capability or an executed project test.

```text
fix(notes): preserve unsaved text when saving fails

Reason:
A failed save must not erase the writer's latest edits or replace the
last successfully saved version.

What changed:
- Keep the editor draft when storage rejects a save in
  <AUTHORIZED_SAVE_FILE>.
- Preserve previously saved content, show the failed-save state and
  allow the user to retry.

Checks performed:
- <ACTUAL_FAILED_WRITE_AND_DRAFT_RETENTION_CHECK>: <ACTUAL_RESULT>.
- <ACTUAL_PREVIOUS_SAVED_CONTENT_CHECK>: <ACTUAL_RESULT>.
- <ACTUAL_RETRY_CHECK>: <ACTUAL_RESULT>.
- Full restart and backup/restore checks were not performed because
  this verification covered the failed-save correction only.

Remaining work:
Broader restart and backup/restore behavior still needs separate
verification; this focused fix does not establish it.
```

### 4. Commit-only task

**Illustrative—not actual project progress**

The hypothetical owner authorizes committing the README correction from example 1. Any other staged content would block this commit until the scope conflict is resolved.

```text
Repository and expected ID:
Sas8037/personal-os; 1455766940.

Starting branch and commit:
<AUTHORIZED_BRANCH> at <BASE_SHA_WITH_README>.

Exact changes or commits authorized for inclusion:
Only the reviewed README.md Git workflow link, absence-statement and
blueprint corrections; exclude all other existing edits.

Operation authorized:
Commit only.

Required checks:
Confirm identity, branch and exact staged scope; check the local link
and Markdown; preserve unrelated working and staged content.

Permitted automation or deployment effects:
Only reviewed local verification hooks; no deployment or publication.

Actions and changes excluded:
Pushing is explicitly excluded. Do not change other files, create a
branch, publish, configure deployment or rewrite history.
```

### 5. Commit-and-push task

**Illustrative—not actual project progress**

In this hypothetical scenario, the named verification workflow already exists and its effects have been reviewed. Both local and destination branches start at the stated base. This example authorizes no earlier outgoing commits or deployment.

```text
Repository and expected ID:
Sas8037/personal-os; 1455766940.

Starting branch and commit:
Existing <AUTHORIZED_BRANCH> at <BASE_SHA_WITH_README>; the destination
branch has been freshly verified at that same commit.

Exact changes or commits authorized for inclusion:
Create and publish one commit containing only the reviewed README.md
correction from example 1. Inspect all outgoing commits before pushing.

Operation authorized:
Both commit and push.

Push destination, when applicable:
<VERIFIED_PUSH_URL>, branch <AUTHORIZED_BRANCH>.

Required checks:
Verify identity, staged scope, Markdown and links; inspect the created
commit and outgoing history; verify the destination commit after push.

Permitted automation or deployment effects:
Only the reviewed verification workflow <CHECK_WORKFLOW_NAME>.
No Pages publication, releases, deployment or other publishing effects.

Actions and changes excluded:
Unrelated edits or commits, other branches or tags, settings changes,
deployment, force-pushing and history rewriting.
```

### 6. Successful push report

**Illustrative—not actual project progress**

This continues example 5's hypothetical authorized scope. The placeholders represent evidence an actual report would need to obtain.

```text
Outcome:
Created and published the authorized documentation commit. Fresh
remote verification confirmed <DOC_COMMIT_SHA>.

Destination:
Sas8037/personal-os at <VERIFIED_PUSH_URL>, branch <AUTHORIZED_BRANCH>.

Commits and files:
<DOC_COMMIT_SHA> corrects the Git workflow references in README.md.
Only README.md was included. The remote branch identifier matches
<DOC_COMMIT_SHA>; no earlier outgoing commits were included.

Checks:
<ACTUAL_DIFF_LINK_AND_MARKDOWN_CHECKS>: <ACTUAL_RESULTS>.
<ACTUAL_REMOTE_READBACK_CHECK>: <MATCHING_REMOTE_SHA_RESULT>.
Application tests were not performed for this documentation-only change.

GitHub automation and deployment:
<CHECK_WORKFLOW_NAME>, run <RUN_IDENTIFIER>: <VERIFIED_SUCCESS_RESULT>.
No deployment was permitted or triggered. Live application behavior
was not checked, and no live URL is claimed.

Local work remaining:
Unrelated unstaged edits in <UNRELATED_LOCAL_FILE> remain unchanged.
The index contained only the authorized README.md changes at commit
time; unrelated content was not staged or included.

Remaining work and recovery:
Owner acceptance remains pending. Review the published documentation;
if a correction is needed, use a separately authorized corrective
commit or revert. Verification success does not mark a task Done.
```

### 7. Blocked push report

**Illustrative—not actual project progress**

Here the hypothetical authorization covers pushing only `<AUTHORIZED_DOC_SHA>`. The branch also contains an earlier commit `<UNAUTHORIZED_EARLIER_SHA>` that the push would publish. This is a different scenario from examples 5 and 6.

```text
Outcome:
Push blocked before execution. Nothing was pushed and no new commit
was created by this push-only task.

Destination:
Sas8037/personal-os at <VERIFIED_PUSH_URL>, branch <AUTHORIZED_BRANCH>.

Commits and files:
The outgoing history contains <UNAUTHORIZED_EARLIER_SHA>, changing
<EARLIER_FILE>, followed by the authorized <AUTHORIZED_DOC_SHA>,
changing README.md. The earlier commit is outside the permitted scope.
Neither commit was published by this task.

Checks:
<ACTUAL_OUTGOING_HISTORY_REVIEW>: <ACTUAL_SCOPE_CONFLICT_RESULT>.
<ACTUAL_REMOTE_READBACK_CHECK>: <UNCHANGED_REMOTE_BASE_SHA_RESULT>.
Post-push checks were not performed because no push was attempted.

GitHub automation and deployment:
No push-triggered automation or deployment was initiated by this task.
No live application behavior was checked and no URL is claimed.

Local work remaining:
Both outgoing commits remain local. Working files and the index were
left unchanged.

Remaining work and recovery:
Owner decision is needed about the earlier commit or a separately
authorized publication approach. Preserve the local work; do not
force-push or rewrite history. No remote rollback is needed because
nothing was pushed by this task.
```

For Git-task reports using these examples, append suggested tracker updates under the communication standard's rules, including **No tracker changes suggested** when appropriate. Examples and successful checks never authorize acceptance or tracker edits.
