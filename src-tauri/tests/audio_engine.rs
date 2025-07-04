use bitmxr::audio_engine::AudioEngine;

#[test]
fn create_engine() {
    let engine = AudioEngine::new();
    assert_eq!(std::mem::size_of_val(&engine), std::mem::size_of::<AudioEngine>());
}
