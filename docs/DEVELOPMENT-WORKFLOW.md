# Personal OS — Development Workflow

**Classification:** Current living, non-governing supplementary guide.
**Last reviewed:** 2026-10-29

This guide describes Git practices for Personal OS. It does not approve implementation work or replace the [Documentation Guide](DOCUMENTATION-GUIDE.md), [Improvement Register](IMPROVEMENTS.md), charter, or architecture. Use the actual checkout as the source of truth. The [File Registry](FILE-REGISTRY.md) distinguishes tracked source, local project files, and generated output.

## One file at a time; one logical change per commit

Inspect, edit, verify, and review each file separately before proceeding to the next authorized file. A logical commit may contain several related files that have each completed this process. For example, package configuration and its supporting documentation may belong together; unrelated editor settings or dependency cleanup do not belong in that commit.

Keep commits focused, reviewable, and as independently usable as practical. Do not split a manifest from a required lockfile update merely to make a one-file commit. One-file editing is a review discipline, not a requirement for one-file commits. Honor narrower task restrictions; permission to edit a file is not automatically permission to commit or publish it.

## Inspect → edit → verify → review → stage → commit → push → confirm

The commands below are workflow examples, not operations already performed or authorization to run them. Run commands from the repository root. Replace illustrative branch names and placeholders with the actual intended targets.

1. **Inspect.** Read task scope, relevant guidance, the register, and affected files. Record pre-existing changes so they are not accidentally committed. Inspect branch, upstream, remotes, and tracking:

   ```bash
   git status --short
   git branch --show-current
   git branch -vv
   git remote -v
   git ls-files
   git diff --stat
   git diff --cached --stat
   ```

   Check untracked files individually. Use `git check-ignore` for ignored output; `git check-ignore --no-index` can examine ignore rules for already tracked dependencies. Do not print secret contents during inspection. A detached HEAD needs an intentional branch before new work is committed.

2. **Edit.** Change one authorized file at a time. Preserve unrelated work. When a file is created, deleted, renamed, or changes role/status, plan a separate registry synchronization step. Follow the existing improvement-register maintenance rules; inconsequential content edits do not automatically require registry updates.

3. **Verify.** Run checks appropriate to each file and the resulting logical change. Existing shell workspace commands are:

   ```bash
   npm run typecheck -w @personal-os/desktop-shell
   npm run build -w @personal-os/desktop-shell
   ```

   Their prior successful verification is recorded under IMP-002. Report fresh results only when actually rerun. Build output goes to the ignored shell `dist/` directory. For documentation, check referenced paths, classification, metadata where applicable, and whitespace. No documentation checker, root `docs:check`, or documentation CI is currently implemented; future tooling is IMP-008.

4. **Review.** Read the complete diff, not just the summary. For an existing documentation file, for example:

   ```bash
   git diff --check
   git diff -- docs/IMPROVEMENTS.md
   ```

   Ordinary `git diff` omits untracked files. Read a new file directly and, when useful, use `git diff --no-index -- /dev/null path/to/new-file` and its `--check` option. That path is illustrative. A no-index diff normally exits 1 when differences exist; distinguish that from an actual error. Confirm that only intended files changed and no generated output or secrets are included.

5. **Stage.** Stage explicit reviewed paths rather than blanket staging. For a reviewed registry-only change:

   ```bash
   git add -- docs/FILE-REGISTRY.md
   git diff --cached --name-status
   git diff --cached --check
   git diff --cached
   git status --short
   ```

   Do not use `git add .`, `git add -A`, or `git commit -a` as defaults. Review the entire staged diff, including any changes already staged before this task. Staged content is the commit content; later edits require another review and explicit staging. Stop if the index includes unrelated work.

6. **Commit.** Once authorized and the staged scope/checks are satisfactory, create a Conventional Commit. This illustrative message refers to the existing registry improvement:

   ```bash
   git commit -m "docs(registry): document the repository file inventory" -m "Record tracking states and evidence limits." -m "Refs: IMP-016"
   git show --stat --oneline HEAD
   ```

   A local commit is not a push, CI result, or browser test. Inspect the resulting commit for the intended files and message.

7. **Push.** Confirm the destination repository, local branch, remote branch, and upstream immediately before publishing. At this guide's review, `origin` points to `https://github.com/Sas8037/personal-os` and the local branch is `main`; this observation is not permission to push to main or a promise that future remotes are unchanged. Fetch the intended remote when authorized, inspect divergence, and resolve it without overwriting others' work. On an authorized new topic branch, an explicit example is:

   ```bash
   git remote get-url --push origin
   git branch --show-current
   git push --set-upstream origin docs/imp-015-accuracy
   ```

   `docs/imp-015-accuracy` is an illustrative branch, not a claim that it exists. Use the actual reviewed branch. Avoid implicit destinations when upstream configuration is uncertain. A rejected non-fast-forward push requires inspection and integration; never default to force-pushing. Force-push and published-history rewriting require separate explicit authorization and coordination.

8. **Confirm.** After an authorized push, inspect status and compare the remote branch's advertised hash to the intended commit:

   ```bash
   git rev-parse HEAD
   git status --short --branch
   git ls-remote origin refs/heads/docs/imp-015-accuracy
   ```

   Replace the illustrative branch with the actual destination. Report a mismatch, network failure, or remaining local changes honestly. Do not claim synchronization from a local commit or stale remote-tracking reference alone. Check CI separately if available; push success does not establish CI success.

## Conventional Commits

Use `type(scope): imperative summary`. Keep the subject concise (aim for 72 characters or fewer), use an imperative verb such as “add,” “correct,” or “document,” and omit a trailing period. Choose a type that describes the actual change.

| Type | Use |
| --- | --- |
| `feat` | Add user-facing functionality or a public capability |
| `fix` | Correct faulty behavior |
| `docs` | Change documentation |
| `refactor` | Restructure code without intended behavior changes |
| `test` | Add or correct tests |
| `build` | Change dependencies, compilation, packaging, or build configuration |
| `chore` | Perform repository maintenance |
| `ci` | Change CI configuration, when it is introduced |
| `perf` | Improve measured performance without changing intended behavior |
| `security` | Remediate a security weakness; avoid disclosing sensitive details |

Useful scopes are `web`, `shell`, `runtime`, `api`, `docs`, `registry`, `repo`, `kernel`, `storage`, and `ai`. Scopes identify responsibility, not implementation status: the shell exists, the web host is manifest-only, and runtime/API/kernel/storage/AI implementations remain Planned. Select the narrowest useful scope; use `repo` for a genuinely repository-wide logical change.

Separate the optional body from the subject with a blank line. Explain the problem, resulting behavior, meaningful constraints, and verification where useful; do not merely list filenames. Separate footers from the body with a blank line. Use `Refs: IMP-015` for traceability. Reserve `BREAKING CHANGE: ...` and a subject `!` for actual incompatible public changes, with migration details. IMP references do not close or approve register entries automatically; update status based on evidence and owner decisions.

Illustrative messages using existing IMP identifiers (not claims that the work is committed or approved):

```text
build(shell): expose compiled desktop shell entry points

Provide the public JavaScript and type declaration targets.
Verification: package typecheck and build passed in the recorded IMP-002 work.

Refs: IMP-002
```

```text
docs(docs): distinguish current files from planned architecture

Replace historical starter claims with checkout-backed descriptions.

Refs: IMP-015
```

```text
chore(repo): stop tracking installed dependency files

Preserve local dependencies and verify the staged scope before committing.

Refs: IMP-017
```

The IMP-017 example is conditional on future approval; cleanup remains Candidate.

## Branches, grouping, and pull requests

Use short-lived topic branches for distinct changes, with descriptive names such as the illustrative `docs/imp-015-accuracy` or `feat/imp-001-preview`. Confirm the intended base before creating or switching branches. Do not switch away from unrelated uncommitted work without first agreeing how to preserve it. Keep main ready for reviewable integration; direct pushes to main require the owner's chosen workflow and repository permissions.

Group only files that implement or explain the same coherent change, even if reviewed in separate steps. Keep tracked-dependency cleanup separate from feature implementation. Avoid mixing accidental formatting churn with substantive changes.

When the repository workflow calls for a pull request, push the topic branch and describe the problem, outcome, IMP references, checks performed, checks not performed, and remaining limitations. Review every file and the destination branch before merging. PR creation, review, and merge are distinct from pushing; no automated checks or branch protections are assumed to exist. Follow configured protections and the owner's approval process, without treating a PR as architecture approval.

## Files requiring care

- **Untracked files:** Inspect purpose, contents, and relevance before explicit staging. A local file is not yet part of the committed baseline. Local editor/environment settings are not automatically shared project configuration.
- **Ignored/generated output:** Keep `packages/desktop-shell/dist/` out of source commits. Do not force-add ignored files by default. Rebuild when needed; generated files are not proof of fresh verification.
- **Tracked dependencies:** The registry snapshot reports 259 tracked `node_modules/` entries despite ignore rules. IMP-017 proposes removing them from Git tracking while preserving installed files. This guide authorizes no cleanup. Before any approved cleanup commit, confirm local dependencies remain intact, tracked dependency entries are gone, ignore rules match, and staged changes contain only the intended untracking.
- **Secrets:** Review staged configuration and lockfile registry URLs for credentials, tokens, private endpoints, and personal data without echoing secrets into logs. Keep environment credentials out of Git. If a secret has been committed or pushed, stop publication, revoke/rotate it as appropriate, and coordinate remediation; deleting a file in a later commit does not erase history.
- **Lockfiles:** Commit intentional changes to the existing root `package-lock.json` with the dependency-manifest change they resolve. Do not edit generated lock data manually or regenerate it to hide unrelated changes. Review dependency/version and registry changes. Web dependency installation and lockfile synchronization are pending; a manifest alone does not establish installed dependencies or a reproducible web build.

## Safe recovery

Inspect `git status`, unstaged/staged diffs, and the intended commit before recovery. Preserve wanted work before discarding anything. Use explicit paths, and do not operate on unrelated changes.

| Situation | Preferred approach and effect |
| --- | --- |
| Accidentally staged a reviewed file | `git restore --staged -- docs/IMPROVEMENTS.md` unstages that example file while preserving working-tree content. It does not undo an already committed change. |
| Want to discard an unwanted tracked-file edit | Only after confirming that the edit can be lost, `git restore --source=HEAD -- path/to/file` replaces the illustrative path's working-tree content with HEAD. This can destroy uncommitted work; it is not the default response to a dirty tree. |
| Need to undo a published commit | After reviewing its effects and dependencies, use `git revert <commit>` to create a new inverse commit rather than rewriting shared history. Placeholder syntax must be replaced with the actual reviewed commit. Handle conflicts deliberately; merge reverts require additional parent selection and review. |
| Need to unstage with older Git | `git reset HEAD -- path/to/file` resets only the illustrative path's index state and preserves working-tree files. Prefer the clearer `git restore --staged` form where available. |
| Need to revise an unpublished local commit | Consider a follow-up commit first. Moving a branch with `git reset` requires explicit agreement and a recovery reference; `--soft` preserves index/worktree content, while mixed reset preserves working-tree content but resets the index. Neither is a default action on shared history. |

Do not default to `git reset --hard`, `git clean`, force-push, or deleting directories. Resetting tracked paths is not a way to recover untracked files. If recovery is uncertain, stop and preserve the work before proceeding.

## Verification and reporting

Distinguish evidence precisely:

- **Local verification:** Commands actually run and their results, with relevant scope. Strict shell type checking and compilation do not establish browser behavior.
- **Browser testing:** Actual rendering, refresh, interactions, and URL/environment checked. No Personal OS browser preview has been verified yet.
- **CI verification:** A specific remote workflow/run and result. CI is not currently implemented; a successful local check or push is not a CI pass.
- **Owner-reported evidence:** Attribute prior results explicitly rather than implying they were rerun.

For each commit/push handoff, report the commit hash (or “not committed”), branch, changed files, checks/tests and results, checks not run, and remote status (not pushed, push failed, or confirmed remote branch/hash). Include remaining staged/unstaged/untracked work relevant to the task. Never describe local completion as published completion.

Registry/index integration and any Improvement Register entry for this guide are separate one-file documentation steps. Creating this supplementary guide changes neither the five-document governing set nor approved architecture.
