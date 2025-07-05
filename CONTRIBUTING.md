# Contributing

Thank you for considering a contribution to Bitmxr!

Before opening a pull request please ensure that the codebase builds and all checks pass locally. After installing the prerequisites described in [AGENTS.md](AGENTS.md), you can run the full suite with:

```bash
pnpm run check
```

This script runs linting, unit tests, end‑to‑end tests, the frontend build, and all Rust formatting and test commands. It mirrors the CI workflow and should complete without errors before you submit your changes.
