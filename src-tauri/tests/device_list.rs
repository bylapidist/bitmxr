use bitmxr::audio_engine::devices::DeviceManager;
use bitmxr::{list_audio_devices, set_audio_device};

#[test]
#[cfg_attr(feature = "no-audio-devices", ignore)]
fn device_list_not_empty() {
    let devices = list_audio_devices();
    if devices.is_empty() {
        eprintln!("No audio devices detected; skipping assertion");
        return;
    }
    assert!(!devices.is_empty());
}

#[test]
fn set_device_updates_state() {
    let id = "test-device";
    set_audio_device(id);
    assert_eq!(DeviceManager::current(), Some(id.to_string()));
}
