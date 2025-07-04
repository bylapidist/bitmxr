#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use bitmxr::{
    audio_engine::AudioEngine, get_audio_stats as get_audio_stats_impl,
    scan_plugins as scan_plugins_impl,
};

#[tauri::command]
fn get_audio_stats() -> String {
    get_audio_stats_impl()
}

#[tauri::command]
fn scan_plugins(path: String) -> Vec<String> {
    scan_plugins_impl(&path)
}

fn main() {
    tauri::Builder::default()
        .manage(AudioEngine::default())
        .invoke_handler(tauri::generate_handler![get_audio_stats, scan_plugins])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
