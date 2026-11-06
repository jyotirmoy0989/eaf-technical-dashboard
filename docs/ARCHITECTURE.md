# Architecture

The application is a standalone Vite + React SPA. `src/main.tsx` mounts the active `src/App.jsx` dashboard and global styles. The preserved `src/App.tsx` and `src/data/dashboard.ts` are from the earlier implementation; they are not imported by the active app entry. `src/utils/calculations.ts` and `src/__tests__/calculations.test.ts` provide and verify the earlier reusable calculator.

No backend, external API, persistence, or plant system connection is present.
