use bitmxr::scan_plugins;
use std::fs::File;
use tempfile::tempdir;

#[test]
fn finds_vst3_files() {
    let dir = tempdir().expect("create tempdir");
    let path = dir.path();
    File::create(path.join("a.vst3")).unwrap();
    File::create(path.join("b.vst3")).unwrap();
    File::create(path.join("not_a_plugin.txt")).unwrap();

    let mut plugins = scan_plugins(path.to_str().unwrap());
    plugins.sort();
    assert_eq!(plugins, vec!["a.vst3".to_string(), "b.vst3".to_string()]);
}
