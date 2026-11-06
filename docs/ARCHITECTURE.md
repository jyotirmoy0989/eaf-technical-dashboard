# Architecture

The application is a standalone Vite + React + TypeScript SPA. `src/main.tsx` mounts the app and global styles. `src/App.tsx` contains view state and the dashboard UI, including both inline SVG visualizations. Reference content is structured in `src/data/dashboard.ts`; `src/utils/calculations.ts` provides the decarbonization calculation shared by the UI and tests. `src/__tests__/calculations.test.ts` verifies the default calculation and input validation.

No backend, external API, persistence, or plant system connection is present.
