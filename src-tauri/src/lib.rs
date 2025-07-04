pub mod audio_engine;

/// Return placeholder audio statistics used by the Tauri commands.
pub fn get_audio_stats() -> String {
    "Sample Rate: 44100, Buffer Size: 512".into()
}
