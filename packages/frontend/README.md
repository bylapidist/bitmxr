# Frontend

This package contains the React + TypeScript frontend for Bitmxr built with Vite and TailwindCSS.
Routing is handled via React Router's `HashRouter`, which means URLs include a `#` fragment (e.g. `/#/`).

## Scripts

- `pnpm dev` – start development server
- `pnpm build` – build for production
- `pnpm test` – run unit tests with Vitest
- `pnpm test:e2e` – run Playwright end-to-end tests
- `pnpm storybook` – start Storybook UI component explorer

## State management

Zustand powers the global state. The store is defined in `src/state/useStore.ts`
and accessed via the `useStore` hook. Components can read or modify the track
list and selected device through this hook.
