//! Audio device handling using cpal

#[derive(Default)]
pub struct DeviceManager {}

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
}
