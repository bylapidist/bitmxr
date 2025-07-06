//! Plugin management (e.g., VST3 hosting)

use std::env;
use std::fs;
use std::path::{Path, PathBuf};

use plist::Value;
use serde::Serialize;

/// Representation of a discovered plugin on disk.
#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
pub struct Plugin {
    pub name: String,
    pub vendor: String,
    pub version: String,
    pub path: PathBuf,
}

#[derive(Default)]
pub struct PluginHost {}

impl PluginHost {
    /// Create a new [`PluginHost`].
    ///
    /// # Returns
    /// A host instance with no plugins loaded.
    pub fn new() -> Self {
        Self::default()
    }

    /// Scan the system for available VST3 plugins.
    ///
    /// The directories searched are platform specific and may also be
    /// overridden using the `BITMXR_VST3_DIRS` environment variable.
    ///
    /// # Returns
    /// A collection of [`Plugin`] entries describing each discovered plugin.
    pub fn scan() -> Vec<Plugin> {
        let dirs = Self::plugin_dirs();
        let mut plugins = Vec::new();

        for dir in dirs {
            if let Ok(entries) = fs::read_dir(&dir) {
                for entry in entries.flatten() {
                    let path = entry.path();
                    if path.extension().and_then(|e| e.to_str()) == Some("vst3") {
                        let (name, vendor, version) =
                            Self::read_metadata(&path).unwrap_or_else(|| {
                                let n = path
                                    .file_stem()
                                    .and_then(|s| s.to_str())
                                    .unwrap_or_default()
                                    .to_string();
                                (n, String::new(), String::new())
                            });
                        plugins.push(Plugin {
                            name,
                            vendor,
                            version,
                            path,
                        });
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

    fn read_metadata(path: &Path) -> Option<(String, String, String)> {
        if path.is_dir() {
            let candidates = [path.join("Contents/Info.plist"), path.join("Info.plist")];
            for info in candidates.iter() {
                if info.exists() {
                    if let Ok(value) = Value::from_file(info) {
                        if let Some(dict) = value.as_dictionary() {
                            let name = dict
                                .get("CFBundleName")
                                .and_then(Value::as_string)
                                .unwrap_or_default()
                                .to_string();
                            let vendor = dict
                                .get("Manufacturer")
                                .or_else(|| dict.get("CFBundleIdentifier"))
                                .and_then(Value::as_string)
                                .unwrap_or_default()
                                .to_string();
                            let version = dict
                                .get("CFBundleShortVersionString")
                                .or_else(|| dict.get("CFBundleVersion"))
                                .and_then(Value::as_string)
                                .unwrap_or_default()
                                .to_string();
                            return Some((name, vendor, version));
                        }
                    }
                }
            }
        }
        None
    }
}
