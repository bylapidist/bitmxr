//! Plugin management placeholder (e.g., VST3 hosting)

#[derive(Default)]
pub struct PluginHost {}

impl PluginHost {
    pub fn new() -> Self {
        Self::default()
    }
}

use std::path::Path;

/// Scan `path` for files with a `.vst3` extension and return the file names.
pub fn scan_plugins(path: &Path) -> Vec<String> {
    std::fs::read_dir(path)
        .into_iter()
        .flatten()
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                let p = e.path();
                if p.extension().and_then(|ext| ext.to_str()) == Some("vst3") {
                    p.file_name()
                        .and_then(|n| n.to_str())
                        .map(|s| s.to_string())
                } else {
                    None
                }
            })
        })
        .collect()
}
