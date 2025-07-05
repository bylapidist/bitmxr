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

#[test]
fn reads_vst3_metadata() {
    let dir = tempfile::tempdir().unwrap();
    let bundle = dir.path().join("Test.vst3").join("Contents");
    std::fs::create_dir_all(&bundle).unwrap();
    std::fs::write(
        bundle.join("Info.plist"),
        r#"<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleName</key>
    <string>TestPlugin</string>
    <key>Manufacturer</key>
    <string>TestVendor</string>
    <key>CFBundleShortVersionString</key>
    <string>0.1.0</string>
</dict>
</plist>
"#,
    )
    .unwrap();

    env::set_var("BITMXR_VST3_DIRS", dir.path());
    let plugins = list_plugins();
    env::remove_var("BITMXR_VST3_DIRS");

    assert_eq!(plugins.len(), 1);
    let p = &plugins[0];
    assert_eq!(p.name, "TestPlugin");
    assert_eq!(p.vendor, "TestVendor");
    assert_eq!(p.version, "0.1.0");
}
