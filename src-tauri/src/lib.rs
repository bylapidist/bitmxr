pub mod audio_engine;
pub mod project;

pub use audio_engine::plugins::Plugin;
pub use project::{load_project, save_project, Project, Track};

/// Return placeholder audio statistics used by the Tauri commands.
///
/// This helper currently returns a static string describing the sample rate and
/// buffer size. The values are not queried from the audio engine and should be
/// treated as placeholders.
///
/// # Returns
/// A [`String`] containing human readable statistics.
pub fn get_audio_stats() -> String {
    "Sample Rate: 44100, Buffer Size: 512".into()
}

/// List available audio device names using [`cpal`].
///
/// # Returns
/// A list of device identifiers for both input and output devices that were
/// discovered on the host system.
pub fn list_audio_devices() -> Vec<String> {
    audio_engine::devices::DeviceManager::list()
}

/// Set the application's active audio device by identifier.
///
/// The selected identifier is stored internally for the lifetime of the
/// application and will be returned from [`DeviceManager::current`].
///
/// # Arguments
/// * `id` - Identifier returned from [`list_audio_devices`].
pub fn set_audio_device(id: &str) {
    audio_engine::devices::DeviceManager::set_default(id);
}

/// Discover available plugins on the system.
///
/// # Returns
/// A collection of [`Plugin`] structures describing each plugin discovered on
/// disk.
pub fn list_plugins() -> Vec<Plugin> {
    audio_engine::plugins::PluginHost::scan()
}

/// Save a project definition to disk.
///
/// # Arguments
/// * `path` - Destination file path.
/// * `project` - Project data to persist.
pub fn save_project_file(path: &std::path::Path, project: &Project) -> std::io::Result<()> {
    project::save_project(path, project)
}

/// Load a project definition from disk.
///
/// # Arguments
/// * `path` - Source file path.
///
/// # Returns
/// Parsed [`Project`] structure on success.
pub fn load_project_file(path: &std::path::Path) -> std::io::Result<Project> {
    project::load_project(path)
}
