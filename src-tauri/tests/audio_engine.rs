use bitmxr::audio_engine::AudioEngine;

#[test]
fn create_engine() {
    let engine = AudioEngine::new();
    // placeholder assert
    // The engine is currently an empty struct so just ensure construction
    assert!(std::mem::size_of_val(&engine) >= 0);
}
