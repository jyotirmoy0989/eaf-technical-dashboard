# Project handoff

Status recorded 2026-11-06. Check GitHub and the local working tree for changes made after this handoff.

## Project overview

The EAF Technical Dashboard is a frontend-only interactive Electric Arc Furnace engineering demonstration with simulated telemetry. It uses React 19, Vite 6, Tailwind CSS 4, Lucide React, JavaScript, and TypeScript.

`index.html` loads `src/main.tsx`, which imports the active dashboard from `src/App.jsx`. `src/App.tsx` is an older, inactive implementation. `src/data/` and `src/utils/` contain data and calculation utilities from the earlier implementation; `src/__tests__/` contains calculation tests. `reference/` holds supplied source copies, `docs/` contains project documentation, and `.github/workflows/` contains CI and CodeQL workflows.

Use Node.js 20.19+, 22.13+, or 24+ and npm. CI pins Node.js 22.23.4. After `npm ci`, start the development server with `npm run dev`; Vite prints its local URL. See [README.md](../README.md) for more project details.

## GitHub status

- Repository: https://github.com/jyotirmoy0989/eaf-technical-dashboard
- Default branch: `main`.
- Working branch: `feature/codeql-security-scan`.
- CodeQL workflow commit preceding this handoff: `ad46401f3c4ad94433d118fb7395d4f32c16698b`. Use `git log -1` for the current branch tip, including this handoff.
- [PR #2](https://github.com/jyotirmoy0989/eaf-technical-dashboard/pull/2) targets `main` and was open and unmerged when this status was recorded.

## Completed work

- The initial dashboard project was committed to GitHub. Phase 1 added ESLint, quality checks, npm audit, and a GitHub Actions CI workflow. Dependency remediation updated Vitest and pinned the CI Node.js version; see [QA.md](QA.md) and [SECURITY.md](SECURITY.md).
- Phase 2 added a dedicated JavaScript/TypeScript CodeQL workflow and security documentation on the feature branch. It uses GitHub's default query suite and runs on pushes and PRs targeting `main`, weekly, and by manual dispatch.
- In a clean isolated copy, `npm ci`, lint, the high/critical audit gate, two tests, and the production build passed. The audit reported 10 moderate dependency rows associated with a minimatch advisory. These results are historical; rerun the checks on the current dependency tree.
- CodeQL [run 42204526218](https://github.com/jyotirmoy0989/eaf-technical-dashboard/actions/runs/42204526218), job `127847720271`, completed successfully. Success does not establish complete file coverage or a zero-alert result.

## CodeQL coverage investigation

The original extraction log was reported to list `src/App.tsx` but not `src/App.jsx`. The active dashboard component's coverage needs verification and correction if it was excluded. The prior investigation could not access the original logs or database independently, so whether `App.jsx` entered the database and final analysis remains **unverified**.

Locally, TypeScript 5.7.3 `--listFilesOnly` listed `App.tsx` but not `App.jsx`. `--traceResolution` showed that the `./App.jsx` import in `src/main.tsx` resolves to the neighboring `App.tsx` for TypeScript analysis, despite `allowJs: true`. This is a plausible factor in the discrepancy, not proof of CodeQL's separate JavaScript extraction behavior. The cause remains under investigation. No workflow correction has been approved or implemented.

The Code Scanning alert count remains unknown: the previous investigation could not access the alerts API. Public job annotations included a checkout Node.js deprecation warning and an Ubuntu runner-image notice; those are diagnostics, not security findings. See [SECURITY.md](SECURITY.md) for alert investigation guidance.

## Outstanding work

1. Perform a controlled CodeQL extraction experiment and inspect the database or file coverage for `src/App.jsx`.
2. Review actual Code Scanning security alerts and extraction diagnostics separately.
3. If the active JSX file is excluded, identify the smallest correct fix and validate coverage without changing dashboard behavior.
4. Re-run CI and CodeQL after any correction and verify the resulting coverage and findings.
5. Review PR #2 and merge only after the outstanding checks are resolved.

The previously reported moderate advisory for `minimatch@10.2.6` remains an open item to recheck against the current dependency tree and advisory data. The audit gate fails for high or critical findings; passing it does not mean there are no moderate findings.

## Start on another computer

For a fresh clone, install Git, a supported Node.js version, and npm, then run:

```sh
git clone https://github.com/jyotirmoy0989/eaf-technical-dashboard.git
cd eaf-technical-dashboard
git fetch origin
git switch --track origin/feature/codeql-security-scan
npm ci
npm run lint
npm run audit
npm test
npm run build
npm run dev
```

For an existing clone, first inspect `git status`. If it reports local changes, preserve and resolve them before switching or pulling; do not discard them. Once the tree is clean:

```sh
git fetch origin
git switch feature/codeql-security-scan
git pull --ff-only origin feature/codeql-security-scan
npm ci
npm run lint
npm run audit
npm test
npm run build
npm run dev
```

If the branch has not yet been created locally, use `git switch --track origin/feature/codeql-security-scan` after fetching. If the fast-forward-only pull fails because histories diverged, inspect the commits before deciding how to reconcile them. `npm ci` recreates `node_modules` from the lockfile and removes the existing installation; do not upload `node_modules` to GitHub.
