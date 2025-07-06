use bitmxr::{load_project_file, save_project_file, Project, Track};

#[test]
fn save_and_load_roundtrip() {
    let dir = tempfile::tempdir().unwrap();
    let path = dir.path().join("test.bmxr");
    let project = Project {
        version: 1,
        tracks: vec![Track {
            id: "1".into(),
            name: "Track 1".into(),
        }],
    };
    save_project_file(&path, &project).unwrap();
    let loaded = load_project_file(&path).unwrap();
    assert_eq!(loaded, project);
}
