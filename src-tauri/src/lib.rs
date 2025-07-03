pub mod audio_engine;

#[tauri::command]
pub fn get_audio_stats() -> String {
    "Sample Rate: 44100, Buffer Size: 512".into()
}
