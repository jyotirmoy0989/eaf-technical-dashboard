# Quality assurance

## Automated checks

- `npm run build` runs the TypeScript project build and Vite production build.
- `npm run test` runs Vitest calculation unit tests.
- `npm run lint` runs ESLint over `.js`, `.jsx`, `.ts`, and `.tsx` files, excluding dependencies, build output, Vite cache, coverage, and `reference/`.
- `npm run audit` runs `npm audit --audit-level=high`; it reports lower severities and fails for high/critical findings.
- GitHub CodeQL runs JavaScript/TypeScript static security analysis on pushes and pull requests to `main`, weekly, and on manual dispatch. Results require a completed GitHub Actions run; see [SECURITY.md](SECURITY.md).

## Results for the ESLint/security phase

- `npm ci` passed in a clean isolated copy. The live Vite server and its esbuild helper were left running; root `node_modules` was not replaced.
- `npm run lint` passed with 0 errors and 0 warnings. `src/App.jsx` and `src/App.tsx` were also linted explicitly and passed.
- Baseline `npm run audit` reported 16 affected package entries (13 moderate, 1 high, 2 critical); this blocked the configured high/critical threshold.
- `npm test` passed: 2 tests.
- `npm run build` passed: TypeScript and Vite; 1,579 modules transformed.
- Dashboard source changes were limited to removing unused imports and one unused local; no layout, data, calculation, or interaction changes were made.
- No commit or push was performed.

## Results for dependency remediation (2026-11-06)

- Updated Vitest from `^2.1.8` / lockfile `2.1.9` to `^4.1.12` / lockfile `4.1.12`. This removes the vulnerable `tinypool` and nested Vite 5 dependency paths while keeping root Vite at `6.4.5`.
- Pinned CI Node.js to `22.23.4`, compatible with ESLint 10's Node.js 22.13+ requirement.
- `npm ci` passed in the isolated copy. `npm run lint` passed. `npm run audit` passed its high/critical gate; the full audit reports 10 moderate package rows tied to the single open `minimatch@10.2.6` advisory (fixed upstream in 11.0.1). The full audit is not vulnerability-free.
- `npm test` passed: 1 test file, 2 tests.
- `npm run build` passed: TypeScript and Vite; 1,579 modules transformed.
- Reference files and dashboard UI/engineering content were not changed as part of this remediation. No commit or push was performed.

## Manual acceptance checklist

- Switch between all four dashboard views and confirm KPI cards remain visible.
- Select each of the six anatomy components by hotspot and quick selector.
- Step through all six cycle stages; check previous, next, autoplay, pause, and reset.
- Adjust EAF intensity, BF-BOF intensity, and annual production; confirm displayed results update.
- Review comparison matrix scrolling on mobile widths and keyboard focus visibility.
- Check 360, 390, 768, 1024, and 1440 px viewports for unintended page-level horizontal overflow.

The five viewport measurements (360, 390, 768, 1024, and 1440 px) were not rerun during this tooling phase.
