# Quality assurance

## Automated checks

- `npm run build` runs the TypeScript project build and Vite production build.
- `npm run test` runs Vitest calculation unit tests.
- Production build passed (TypeScript and Vite; 1,581 modules transformed).
- Calculator unit tests passed (2 tests).
- `npm audit` reported 0 vulnerabilities.
- Local Vite server returned HTTP 200 for `/`.

## Manual acceptance checklist

- Switch between all four dashboard views and confirm KPI cards remain visible.
- Select each of the six anatomy components by hotspot and quick selector.
- Step through all six cycle stages; check previous, next, autoplay, pause, and reset.
- Adjust EAF intensity, BF-BOF intensity, and annual production; confirm displayed results update.
- Review comparison matrix scrolling on mobile widths and keyboard focus visibility.
- Check 360, 390, 768, 1024, and 1440 px viewports for unintended page-level horizontal overflow.

The browser access host was unavailable during this run, so browser interaction checks and the five viewport measurements could not be performed. The 360, 390, 768, 1024, and 1440 px checks remain outstanding.
