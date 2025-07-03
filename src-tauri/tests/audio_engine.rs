use bitmxr::audio_engine::AudioEngine;

#[test]
fn create_engine() {
    let engine = AudioEngine::new();
    // placeholder assert
    assert!(std::mem::size_of_val(&engine) > 0);
}
