use serde::{Deserialize, Serialize};
use std::path::Path;

/// Simple project representation persisted to disk as JSON.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Project {
    /// Version number for future migration.
    pub version: u8,
    /// List of tracks in this project.
    pub tracks: Vec<Track>,
}

impl Default for Project {
    fn default() -> Self {
        Self {
            version: 1,
            tracks: Vec::new(),
        }
    }
}

/// Track entry saved inside a project file.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct Track {
    pub id: String,
    pub name: String,
}

/// Write the project data to the given path in JSON format.
pub fn save_project(path: &Path, project: &Project) -> std::io::Result<()> {
    let bytes = serde_json::to_vec_pretty(project)?;
    std::fs::write(path, bytes)
}

/// Load a project from the provided path.
pub fn load_project(path: &Path) -> std::io::Result<Project> {
    let bytes = std::fs::read_to_string(path)?;
    let project = serde_json::from_str(&bytes)?;
    Ok(project)
}
