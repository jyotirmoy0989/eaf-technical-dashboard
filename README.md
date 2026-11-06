# EAF Technical Dashboard

Standalone interactive Electric Arc Furnace engineering dashboard. The active React application is loaded from the supplied TSX source copied verbatim to `src/App.jsx`; the original source copy remains under `reference/`.

## Technology

- React 19
- Vite 6
- Tailwind CSS 4 with the official Vite plugin
- Lucide React

## Installation

```sh
npm ci
```

## Requirements

Node.js 20.19+, 22.13+, or 24+ and npm. ESLint 10 requires one of those Node release lines. GitHub Actions pins the Node.js 22 runtime to 22.23.4, which meets ESLint's 22.13+ requirement. The local setup was validated with Node.js 24 and npm 11.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL after startup.

## Build

```sh
npm run lint
npm run audit
npm test
npm run build
npm run preview
```

`npm run audit` checks the committed dependency lockfile and fails CI for high or critical advisories. GitHub CodeQL also scans JavaScript and TypeScript source for security issues. See [docs/SECURITY.md](docs/SECURITY.md) for review and remediation guidance.

## Project structure

```text
reference/          Supplied functional TSX sources
src/App.jsx         Active dashboard, copied verbatim from the supplied file
src/main.tsx        Vite entry point
src/index.css       Tailwind CSS import
src/data/           Reference dashboard data from the earlier implementation
src/utils/          Reusable calculation utility
src/__tests__/      Calculation unit tests
docs/               Project and content documentation
.github/workflows/  GitHub Actions CI and CodeQL
```

This is a frontend-only demonstration. Telemetry is simulated and is not connected to a plant.
