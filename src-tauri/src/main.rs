#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use bitmxr::{audio_engine::AudioEngine, get_audio_stats as get_audio_stats_impl};

#[tauri::command]
fn get_audio_stats() -> String {
    get_audio_stats_impl()
}

fn main() {
    tauri::Builder::default()
        .manage(AudioEngine::default())
        .invoke_handler(tauri::generate_handler![get_audio_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
