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

Node.js 20.19+ or 22.12+ and npm. The project was set up with Node.js 24 and npm 11.

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local URL after startup.

## Build

```sh
npm run build
npm run preview
```

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
.github/workflows/  GitHub Actions CI
```

This is a frontend-only demonstration. Telemetry is simulated and is not connected to a plant.
