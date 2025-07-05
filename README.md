# Bitmxr

Bitmxr is a cross-platform Digital Audio Workstation (DAW) prototype built with Tauri, React, and Rust.
This repository contains a monorepo layout with the frontend and backend in a single place.

## Packages

- `packages/frontend` – React + TypeScript frontend powered by Vite
- `src-tauri` – Rust backend using Tauri

## Prerequisites

This project uses Node.js **22**, the [pnpm](https://pnpm.io/) package manager and the Rust toolchain.
The repository includes an `.nvmrc` file specifying the required Node version.
If you have [nvm](https://github.com/nvm-sh/nvm) installed, run `nvm use` in the
project root to automatically select Node 22.
If you do not already have Rust installed, use `rustup` to install the stable
toolchain:

```bash
curl https://sh.rustup.rs -sSf | sh
rustup install stable
```

With Rust available, install the JavaScript dependencies with pnpm:

```bash
pnpm install
```

Before building or running the project on Ubuntu, install the system
dependencies required by Tauri:

```bash
sudo apt-get update
sudo apt-get install -y \
  libwebkit2gtk-4.1-dev \
  libjavascriptcoregtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  libsoup2.4-dev \
  libasound2-dev
sudo ln -sf /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.1.so /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.0.so
sudo ln -sf /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.1.so /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.0.so
sudo ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.0.pc
sudo ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-web-extension-4.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-web-extension-4.0.pc
sudo ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/javascriptcoregtk-4.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/javascriptcoregtk-4.0.pc
```

### macOS

Install the Tauri prerequisites using Homebrew:

```bash
brew install webkit2gtk gtk+3
```

### Windows

Install the **Visual Studio Build Tools** with the C++ workload and the
WebView2 runtime. You can install the runtime with:

```powershell
winget install Microsoft.EdgeWebView2Runtime
```

The installer is also available from
<https://developer.microsoft.com/en-us/microsoft-edge/webview2/>.

## Development

Start the app in development mode using a single command:

```bash
pnpm dev      # runs tauri dev, which starts the frontend automatically
```

Use the Tauri window rather than a regular browser to access backend commands.

### Storybook

Run Storybook to browse UI components in isolation:

```bash
pnpm --filter frontend storybook
```

## Testing

- Frontend unit tests: `pnpm --filter frontend test`
- End-to-end tests: `pnpm --filter frontend exec playwright test`
- Backend tests: `cargo test --manifest-path src-tauri/Cargo.toml`

## Building

To create a production ready desktop build run:

```bash
pnpm --filter frontend build
pnpm tauri build
```

### Listing audio devices

From the application home page you can click **List Audio Devices** to invoke the
`list_audio_devices` Tauri command. This will show the names of available input
and output devices detected on your system.

See individual package README files for more details.

## Contributing

We welcome pull requests! Please follow these steps when contributing:

1. Fork the repository and create a feature branch.
2. Make your changes and ensure all checks pass:
   - `pnpm lint`
   - `pnpm --filter frontend test -- --run`
   - `pnpm --filter frontend exec playwright test`
   - `pnpm --filter frontend build`
   - `cargo fmt --manifest-path src-tauri/Cargo.toml --all`
   - `cargo clippy --manifest-path src-tauri/Cargo.toml -- -D warnings`
   - `cargo test --manifest-path src-tauri/Cargo.toml`
3. Open a pull request against the `main` branch with a clear description of your changes.

### Coding style

TypeScript and JavaScript code is formatted with Prettier and checked with ESLint.
Rust code is formatted with `rustfmt` and linted using `clippy`.
