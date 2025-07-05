//! Audio device handling using cpal

use std::sync::{Mutex, OnceLock};

#[derive(Default)]
pub struct DeviceManager {}

static DEFAULT_DEVICE: OnceLock<Mutex<Option<String>>> = OnceLock::new();

impl DeviceManager {
    pub fn new() -> Self {
        Self::default()
    }

    /// Return the names of available input and output audio devices using `cpal`.
    pub fn list() -> Vec<String> {
        use cpal::traits::{DeviceTrait, HostTrait};

        let host = cpal::default_host();
        let mut devices = Vec::new();

        if let Ok(inputs) = host.input_devices() {
            for device in inputs {
                if let Ok(name) = device.name() {
                    devices.push(format!("Input: {name}"));
                }
            }
        }

        if let Ok(outputs) = host.output_devices() {
            for device in outputs {
                if let Ok(name) = device.name() {
                    devices.push(format!("Output: {name}"));
                }
            }
        }

        devices
    }

    /// Set the default audio device identifier used by the application.
    pub fn set_default(id: &str) {
        let lock = DEFAULT_DEVICE.get_or_init(|| Mutex::new(None));
        *lock.lock().unwrap() = Some(id.to_string());
    }

    /// Retrieve the currently selected audio device identifier, if any.
    pub fn current() -> Option<String> {
        DEFAULT_DEVICE
            .get_or_init(|| Mutex::new(None))
            .lock()
            .unwrap()
            .clone()
    }
}
