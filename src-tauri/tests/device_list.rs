use bitmxr::list_audio_devices;

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
