use bitmxr::audio_engine::tracks::Track;

#[test]
fn create_track() {
    let track = Track::new();
    assert_eq!(std::mem::size_of_val(&track), std::mem::size_of::<Track>());
}
