//! Plugin management (e.g., VST3 hosting)

use std::env;
use std::fs;
use std::path::PathBuf;

use serde::Serialize;

/// Representation of a discovered plugin on disk.
#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
pub struct Plugin {
    pub name: String,
    pub path: PathBuf,
}

#[derive(Default)]
pub struct PluginHost {}

impl PluginHost {
    pub fn new() -> Self {
        Self::default()
    }

    /// Scan the system for available VST3 plugins.
    pub fn scan() -> Vec<Plugin> {
        let dirs = Self::plugin_dirs();
        let mut plugins = Vec::new();

        for dir in dirs {
            if let Ok(entries) = fs::read_dir(&dir) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.extension().and_then(|e| e.to_str()) == Some("vst3") {
                        let name = path
                            .file_stem()
                            .and_then(|s| s.to_str())
                            .unwrap_or_default()
                            .to_string();
                        plugins.push(Plugin { name, path });
                    }
                }
            }
        }

        plugins
    }

    fn plugin_dirs() -> Vec<PathBuf> {
        if let Ok(custom) = env::var("BITMXR_VST3_DIRS") {
            let delim = if cfg!(windows) { ';' } else { ':' };
            return custom
                .split(delim)
                .filter(|p| !p.is_empty())
                .map(PathBuf::from)
                .collect();
        }

        let mut dirs = Vec::new();
        #[cfg(target_os = "windows")]
        {
            dirs.push(PathBuf::from("C:\\Program Files\\Common Files\\VST3"));
            if let Ok(appdata) = env::var("APPDATA") {
                dirs.push(PathBuf::from(appdata).join("VST3"));
            }
        }

        #[cfg(target_os = "macos")]
        {
            dirs.push(PathBuf::from("/Library/Audio/Plug-Ins/VST3"));
            if let Ok(home) = env::var("HOME") {
                dirs.push(PathBuf::from(home).join("Library/Audio/Plug-Ins/VST3"));
            }
        }

        #[cfg(all(unix, not(target_os = "macos")))]
        {
            if let Ok(home) = env::var("HOME") {
                dirs.push(PathBuf::from(home).join(".vst3"));
            }
            dirs.push(PathBuf::from("/usr/lib/vst3"));
            dirs.push(PathBuf::from("/usr/local/lib/vst3"));
        }

        dirs
    }
}
