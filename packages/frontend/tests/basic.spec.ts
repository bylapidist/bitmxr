import { expect, test } from '@playwright/test';

test('home page loads and selects device', async ({ page }) => {
  await page.addInitScript(() => {
    window.__TAURI_INTERNALS__ = {
      invoke: (cmd) => {
        if (cmd === 'list_audio_devices') {
          return Promise.resolve(['Test Device']);
        }
        return Promise.resolve();
      },
    };
  });

  await page.goto('/#/');
  await expect(page).toHaveTitle(/Bitmxr/);

  const input = page.getByRole('textbox', { name: 'Select device' });
  await input.waitFor();
  await input.click();
  await page.getByRole('option', { name: 'Test Device' }).click();
  await page.getByRole('button', { name: /set device/i }).click();

  await expect(
    page.getByText('Current Device: Test Device')
  ).toBeVisible();
});
