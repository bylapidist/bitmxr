# Bitmxr

Bitmxr is a cross-platform Digital Audio Workstation (DAW) prototype built with Tauri, React, and Rust.
This repository contains a monorepo layout with the frontend and backend in a single place.

## Packages

- `packages/frontend` – React + TypeScript frontend powered by Vite
- `src-tauri` – Rust backend using Tauri

## Development

Install dependencies using `pnpm` and Rust toolchain via `rustup`.

```bash
pnpm install
pnpm --filter frontend dev
pnpm --filter frontend storybook
```

To run the desktop application with hot reload:

```bash
pnpm tauri dev
```

## Testing

- Frontend unit tests: `pnpm --filter frontend test`
- End-to-end tests: `pnpm --filter frontend exec playwright test`
- Backend tests: `cargo test --manifest-path src-tauri/Cargo.toml`

## Building

```bash
pnpm tauri build
```

See individual package README files for more details.
