use bitmxr::get_audio_stats;

#[test]
fn command_returns_stats() {
    let stats = get_audio_stats();
    assert!(stats.contains("Sample Rate"));
}
