# Backend

This folder contains the Rust backend for Bitmxr built with Tauri.

## Commands

- `cargo tauri dev` – run in development with frontend
- `cargo test` – run backend unit tests

### Tauri commands

- `get_audio_stats()` – returns placeholder audio stats
- `scan_plugins(path: String)` – returns a list of `.vst3` files in the given path

Audio engine modules are in `src/audio_engine`.
