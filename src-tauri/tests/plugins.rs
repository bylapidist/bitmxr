use bitmxr::list_plugins;
use std::env;

#[test]
fn empty_dirs_yield_empty_vec() {
    let dir = tempfile::tempdir().unwrap();
    env::set_var("BITMXR_VST3_DIRS", dir.path());
    let plugins = list_plugins();
    env::remove_var("BITMXR_VST3_DIRS");
    assert!(plugins.is_empty());
}
