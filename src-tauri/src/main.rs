#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use bitmxr::{
    audio_engine::AudioEngine, get_audio_stats as get_audio_stats_impl,
    list_audio_devices as list_audio_devices_impl, list_plugins as list_plugins_impl,
    load_project_file as load_project_file_impl, save_project_file as save_project_file_impl,
    set_audio_device as set_audio_device_impl, Plugin, Project,
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
fn list_plugins() -> Vec<Plugin> {
    list_plugins_impl()
}

#[tauri::command]
fn set_audio_device(id: String) {
    set_audio_device_impl(&id);
}

#[tauri::command]
fn save_project(path: String, project: Project) -> Result<(), String> {
    save_project_file_impl(std::path::Path::new(&path), &project).map_err(|e| e.to_string())
}

#[tauri::command]
fn load_project(path: String) -> Result<Project, String> {
    load_project_file_impl(std::path::Path::new(&path)).map_err(|e| e.to_string())
}

fn main() {
    tracing_subscriber::fmt::init();
    tauri::Builder::default()
        .manage(AudioEngine::default())
        .invoke_handler(tauri::generate_handler![
            get_audio_stats,
            list_audio_devices,
            set_audio_device,
            list_plugins,
            save_project,
            load_project
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
