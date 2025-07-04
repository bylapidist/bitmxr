use bitmxr::audio_engine::devices::DeviceManager;

#[test]
fn create_device_manager() {
    let mgr = DeviceManager::new();
    assert_eq!(std::mem::size_of_val(&mgr), std::mem::size_of::<DeviceManager>());
}
