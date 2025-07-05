#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use bitmxr::{
    audio_engine::AudioEngine, get_audio_stats as get_audio_stats_impl,
    list_audio_devices as list_audio_devices_impl, set_audio_device as set_audio_device_impl,
};

#[tauri::command]
fn get_audio_stats() -> String {
    get_audio_stats_impl()
}

#[tauri::command]
fn list_audio_devices() -> Vec<String> {
    list_audio_devices_impl()
}

#[tauri::command]
fn set_audio_device(id: String) {
    set_audio_device_impl(&id);
}

fn main() {
    tracing_subscriber::fmt::init();
    tauri::Builder::default()
        .manage(AudioEngine::default())
        .invoke_handler(tauri::generate_handler![
            get_audio_stats,
            list_audio_devices,
            set_audio_device
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
