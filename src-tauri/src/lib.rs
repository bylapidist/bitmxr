pub mod audio_engine;

/// Return placeholder audio statistics used by the Tauri commands.
pub fn get_audio_stats() -> String {
    "Sample Rate: 44100, Buffer Size: 512".into()
}

/// Wrapper around [`audio_engine::plugins::scan_plugins`] accepting a string path.
pub fn scan_plugins(path: &str) -> Vec<String> {
    audio_engine::plugins::scan_plugins(std::path::Path::new(path))
}
