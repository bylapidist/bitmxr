#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(not(test))]
use tauri::Manager;

#[cfg(not(test))]
use bitmxr::{audio_engine::AudioEngine, get_audio_stats};
#[cfg(not(test))]
fn main() {
    tauri::Builder::default()
        .manage(AudioEngine::default())
        .invoke_handler(tauri::generate_handler![get_audio_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
