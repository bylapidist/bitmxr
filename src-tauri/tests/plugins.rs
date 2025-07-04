use bitmxr::audio_engine::plugins::PluginHost;

#[test]
fn create_plugin_host() {
    let host = PluginHost::new();
    assert_eq!(std::mem::size_of_val(&host), std::mem::size_of::<PluginHost>());
}
