# Repository Guidelines

This project requires some system dependencies for Tauri to compile. On a fresh Ubuntu
container run the following before running tests or builds:

```bash
apt-get update
apt-get install -y libwebkit2gtk-4.1-dev libjavascriptcoregtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev
# Provide compatibility for crates expecting 4.0 library names
ln -sf /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.1.so /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.0.so
ln -sf /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.1.so /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.0.so
ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-4.0.pc
ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-web-extension-4.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/webkit2gtk-web-extension-4.0.pc
ln -sf /usr/lib/x86_64-linux-gnu/pkgconfig/javascriptcoregtk-4.1.pc /usr/lib/x86_64-linux-gnu/pkgconfig/javascriptcoregtk-4.0.pc
```

Install JS dependencies and browsers once:

```bash
pnpm install
pnpm --filter frontend exec playwright install
```

No icon file is stored in the repo. The build script will generate a minimal icon at
`src-tauri/icons/icon.png` automatically.

After setup the full check suite is:

```bash
pnpm lint
pnpm --filter frontend test -- --run
pnpm --filter frontend exec playwright test
pnpm --filter frontend build
cargo fmt --manifest-path src-tauri/Cargo.toml --all
cargo clippy --manifest-path src-tauri/Cargo.toml -- -D warnings
cargo test --manifest-path src-tauri/Cargo.toml
pnpm tauri build
```
