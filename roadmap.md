# Bitmxr Roadmap

Bitmxr aims to become a fully-featured cross-platform Digital Audio Workstation (DAW). This roadmap outlines the major milestones over the next year.

## Guiding Principles
- Cross-platform (Windows, macOS, Linux) via Tauri.
- Smooth performance for real-time audio.
- Modular architecture to support plugins and future expansions.
- Open source, welcoming community.

## Month 1–3 – Foundation
- **Project Structure**
  - Establish monorepo conventions for frontend and backend packages.
  - Automate environment setup scripts for Tauri prerequisites.
  - Set up code formatting, linting, and pre-commit hooks.
- **Core UI**
  - Skeleton React interface with main window, menu bar, and resizable panes.
  - Routing and global state management groundwork.
  - Theme infrastructure with light/dark modes.
- **Audio Engine Setup**
  - Integrate cross-platform audio engine crate in Rust.
  - Implement basic transport controls (play/stop, timeline cursor).
  - Explore audio scheduling for low latency.
- **Persistence**
  - Initial project file format and save/load workflow.
  - Versioning strategy for project files.
- **Continuous Integration**
  - Ensure builds and tests run on all major OS targets.
  - Automated builds for nightly alpha releases.

## Month 4–6 – Basic Production Features
- **Track Management**
  - Add unlimited audio and MIDI tracks.
  - Implement track headers (mute, solo, volume, pan, color selection).
  - Basic clip containers on the timeline with drag and drop.
  - Latency compensation between tracks.
- **Recording & Playback**
  - Support recording from audio interfaces with monitor toggle.
  - Basic MIDI recording using external controllers.
  - Loop playback region and punch in/out recording.
- **Editing Tools**
  - Move, cut, copy, and stretch clips on the timeline.
  - Snap/grid settings and time signatures.
  - Undo/redo history for editing actions.
- **Plugin Support**
  - Load VST3/AU plugins with a minimal UI wrapper.
  - Per-track effect racks with bypass and preset management.
  - Plugin scanning and blacklist handling.
- **Metronome & Tempo**
  - Implement global tempo map and metronome click track.
  - Tap tempo and tempo automation lanes.

## Month 7–9 – Advanced Editing and Mixing
- **Automation**
  - Envelope lanes for volume, pan, plugin parameters.
  - Editing tools for drawing and smoothing automation curves.
  - Parameter automation recording from control surfaces.
- **Mixer View**
  - Separate mixer window with channel strips and bus routing.
  - Group tracks, submixes, and aux sends.
  - Real-time level meters, phase and clipping indicators.
  - Sidechain routing between tracks.
- **Instruments & Sampler**
  - Built-in sampler plugin with basic sample editing (trim, loop, normalize).
  - MIDI piano roll editor with velocity and expression editing.
  - Instrument preset browser and tagging system.
- **Audio Editing**
  - Destructive waveform editing (normalize, fade, reverse).
  - Time-stretch and pitch-shift algorithms.
  - Clip crossfades and slip editing.
  - Track freeze/bounce in place to free CPU.

## Month 10–12 – Polishing & Release Prep
- **Export & Import**
  - Render to WAV/FLAC/MP3 and stem export per track.
  - Import popular DAW formats (e.g. MIDI files, stems).
  - Project archive format with media consolidation.
- **Performance Optimization**
  - Real-time processing benchmarks and profiling.
  - Offline render path for heavy effects.
  - Multicore processing for plugins and mixer.
- **User Preferences & Presets**
  - Theme selection and layout customization.
  - Keyboard shortcut editor and preset migration.
  - Default template projects and user preset locations.
- **Collaboration Features**
  - Optional cloud project syncing and version history.
  - Shareable plugin preset packs.
  - Simple live session sharing over local network.
- **Documentation & Community**
  - Comprehensive user manual and context help tooltips.
  - Tutorial project demonstrating core features.
  - Onboarding guides for contributors and code walkthrough videos.
- **Packaging**
  - Signed installers for Windows, macOS, and Linux.
  - Auto-update infrastructure for stable releases.

## Beyond Month 12
- Mobile companion app for remote control (transport, mixer).
- Surround sound and advanced routing (5.1, 7.1).
- Video scoring tools (video track, markers, export to video).
- Third-party marketplace for plugins and themes.
- Accessibility features for visually impaired users.

This roadmap provides a high-level overview. Each milestone should be split into detailed tasks and issues as development progresses.
