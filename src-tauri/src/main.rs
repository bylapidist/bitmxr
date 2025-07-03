#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

use bitmxr::{audio_engine::AudioEngine, get_audio_stats};

fn main() {
    tauri::Builder::default()
        .manage(AudioEngine::default())
        .invoke_handler(tauri::generate_handler![get_audio_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
