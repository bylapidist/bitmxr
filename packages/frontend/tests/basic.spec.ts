import { expect, test } from '@playwright/test';

test('home page loads and selects device', async ({ page }) => {
  await page.addInitScript(() => {
    window.__TAURI_IPC__ = ({ cmd, callback }) => {
      if (cmd === 'list_audio_devices') {
        window[`_${callback}`](['Test Device']);
      } else {
        window[`_${callback}`](null);
      }
    };
  });

  await page.goto('/#/');
  await expect(page).toHaveTitle(/Bitmxr/);

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Test Device' }).click();
  await page.getByRole('button', { name: /set device/i }).click();

  await expect(
    page.getByText('Current Device: Test Device')
  ).toBeVisible();
});
