pub mod audio_engine;

/// Return placeholder audio statistics used by the Tauri commands.
pub fn get_audio_stats() -> String {
    "Sample Rate: 44100, Buffer Size: 512".into()
}

/// List available audio device names using [`cpal`].
pub fn list_audio_devices() -> Vec<String> {
    audio_engine::devices::DeviceManager::list()
}

/// Set the application's active audio device by identifier.
pub fn set_audio_device(id: &str) {
    audio_engine::devices::DeviceManager::set_default(id);
}
