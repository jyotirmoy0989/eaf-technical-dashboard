# Dependency security

The project runs `npm audit` against the complete lockfile, including development dependencies. Run `npm run audit`; npm reports all severities, and the script exits unsuccessfully for high or critical advisories. GitHub Actions runs the same command after `npm ci`.

Remediate through reviewed dependency updates and the lockfile. Do not use `npm audit fix --force`, weaken the audit threshold, omit development dependencies from the audit, or add unexplained overrides. If a safe compatible fix is not available, keep the advisory visible and document it as an open risk.

## Phase 1A findings and remediation (2026-11-06)

The baseline full audit reported 16 affected package entries: 13 moderate, 1 high, and 2 critical. These were development-tool dependencies. Package rows in npm's audit output include transitive dependents of one advisory; the table below records the unique security issues and their dependency paths.

| Advisory / package | Baseline installed version and dependency path | Severity and affected range | Fixed version | Compatibility and result |
| --- | --- | --- | --- | --- |
| [GHSA-5xrq-8626-4rwp](https://github.com/vitest-dev/vitest/security/advisories/GHSA-5xrq-8626-4rwp), `vitest` | `vitest@2.1.9` (direct) | Critical; `<3.2.5` on Vitest 2/3 line; Vitest 4.0.0 through `<4.1.0` | `3.2.5` on 3.x or `4.1.0` on 4.x | Fixed by `vitest@4.1.12`; major upgrade from 2.x. No dashboard runtime dependency or UI change. |
| [GHSA-5gmw-xhrv-c9v3](https://github.com/advisories/GHSA-5gmw-xhrv-c9v3) and [GHSA-85c8-ppgw-ccpr](https://github.com/tinylibs/tinypool/security/advisories/GHSA-85c8-ppgw-ccpr), `tinypool` | `tinypool@1.1.1` (transitive: `vitest@2.1.9` → `tinypool`) | Critical; first advisory `<=2.1.0`; second `<2.1.2` | `2.1.2` for both advisories | Fixed by removing the package from the resolved graph with Vitest 4. Vitest 4 removes Tinypool and reworks pools; the project has no custom pool configuration. |
| [GHSA-587h-7wmj-h5pm](https://github.com/vitejs/launch-editor/security/advisories/GHSA-587h-7wmj-h5pm), `vite` / `launch-editor` | `vite@5.4.21` (transitive copies under `vitest@2.1.9` and `vite-node@2.1.9`). Root `vite@6.4.5` was not in this advisory's affected range. | High; Vite `<=6.4.3` (and affected ranges on later major lines) | `6.4.4` on Vite 6; the advisory also specifies patched releases per newer Vite line | Fixed by deduplicating to the already-present root `vite@6.4.5`. No Vite major upgrade required. |
| [GHSA-82fw-gwwq-j7x9](https://github.com/vitest-dev/vitest/security/advisories/GHSA-82fw-gwwq-j7x9), `@vitest/mocker` | `@vitest/mocker@2.1.9` (transitive: `vitest@2.1.9` → `@vitest/mocker`) | Moderate; `>=2.1.0 <4.1.11` | `4.1.11` | Fixed by `@vitest/mocker@4.1.12` through the Vitest 4 upgrade. |
| [GHSA-qxg6-89mg-rqv8](https://github.com/vitest-dev/vitest/security/advisories/GHSA-qxg6-89mg-rqv8), `@vitest/mocker` | `@vitest/mocker@2.1.9` (transitive through Vitest) | Moderate; `>=2.1.0-beta.7 <4.1.12` | `4.1.12` | Fixed by `@vitest/mocker@4.1.12`. |
| [GHSA-67mh-4wv8-2f99](https://github.com/advisories/GHSA-67mh-4wv8-2f99), `esbuild` | `esbuild@0.21.5` (transitive copies under nested Vite 5 in the Vitest 2 tree) | Moderate; `<=0.24.2` | `0.25.0` or later | Fixed in the resolved graph: old nested Vite/esbuild copies are gone; Vite 6.4.5 uses `esbuild@0.25.12`. |
| `vite-node` dependency roll-up through the Vite advisories | `vite-node@2.1.9` (transitive: `vitest@2.1.9` → `vite-node` → nested `vite@5.4.21`) | Moderate; `<=2.2.0-beta.2`, via affected nested Vite | Not independently upgraded; removed from Vitest 4.1.12's graph | Fixed as part of the Vitest 4 upgrade and removal of the vulnerable nested Vite path. |
| [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), `minimatch` | `minimatch@10.2.6` (transitive through ESLint 10 / `@eslint/config-array` and typescript-eslint) | Moderate; `>=7.0.0 <11.0.1` | `11.0.1` | **Open moderate risk.** The present consumers resolve version 10 and their semver ranges do not accept minimatch 11. No override was added and no consumer downgrade was made. This is below the configured high/critical CI failure threshold, but remains in the complete audit output. |

The remaining moderate package rows in npm audit are dependent-package roll-ups for the `minimatch` advisory: `eslint@10.14.0` → `@eslint/config-array@0.23.5` → `minimatch@10.2.6`; `@eslint/js@10.0.1` → ESLint; and `typescript-eslint@8.72.1` → `@typescript-eslint/eslint-plugin@8.72.1`, `@typescript-eslint/parser@8.72.1`, `@typescript-eslint/type-utils@8.72.1`, `@typescript-eslint/typescript-estree@8.72.1`, and `@typescript-eslint/utils@8.72.1` → `minimatch@10.2.6`. The TypeScript ESLint packages are transitive except for the direct `typescript-eslint` package. `npm audit` lists package roll-ups separately even though they refer to one remaining advisory.

### Vitest upgrade compatibility

The selected change is `vitest` `^2.1.8` → `^4.1.12` (resolved lockfile version `4.1.12`), a major tool upgrade. The official [Vitest 4 migration guide](https://v4.vitest.dev/guide/migration.html) requires Vite 6 or later and Node 20 or later. This project already uses Vite 6.4.5 and has no Vitest pool configuration, coverage configuration, or deprecated Vitest APIs in its tests. Vitest 4 removes Tinypool, eliminating that affected dependency path. The test suite passed after the upgrade.

Vitest 5 was not needed to resolve these findings. Staying on Vitest 4 avoids adopting its additional Vite 6.4 / Node 22.12 prerequisites and the extra changes documented by its migration guide. Vite itself remains at major version 6; the application, calculations, illustrations, and UI were not changed.

## Node.js runtime

ESLint 10 requires Node.js `^20.19.0`, `^22.13.0`, or `>=24`. The workflow pins Node.js `22.23.4`, which meets that requirement and is the latest Node 22 patch available on 2026-11-06. Developers should use Node.js 20.19+, 22.13+, or 24+.

## Current validation

Validation used a clean isolated project copy because the active Vite development process must remain undisturbed. `npm ci`, `npm run lint`, `npm run audit`, `npm test`, and `npm run build` all completed successfully there. The full audit reports 10 moderate package rows (all from the one minimatch advisory), zero high, and zero critical. `npm run audit` passes its configured high/critical threshold; the full audit is not vulnerability-free.
