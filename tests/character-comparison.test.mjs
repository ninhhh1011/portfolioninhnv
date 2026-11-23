import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    for (const reducedMotion of ['reduce', 'no-preference']) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion });
      await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
      assert.equal(await page.locator('img[src*="ninh-shirt-idle"]').count(), 1);
      assert.equal(await page.locator('[data-character-head], [data-character-hands]').count(), 0);
      await page.locator('img[src*="ninh-shirt-idle"]').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      const glow = page.locator('[data-character-glow]');
      assert.equal(await glow.count(), 1);
      await page.getByRole('button', { name: /Nhân vật Ninh/ }).focus();
      await page.waitForFunction(() => document.querySelector('[data-character-glow]')?.getAttribute('data-focus') === 'true');
      assert.equal(await glow.getAttribute('data-focus'), 'true');
      await page.locator('body').click({ position: { x: 2, y: 2 }, force: true });
      await page.waitForFunction(() => document.querySelector('[data-character-glow]')?.getAttribute('data-focus') === 'false');
      assert.equal(await glow.getAttribute('data-focus'), 'false');
      await page.getByRole('button', { name: /Nhân vật Ninh/ }).click({ force: true });
      assert.ok(await page.getByRole('alert').count());
      await page.waitForFunction(() => document.querySelector('[data-character-greeting]')?.getAttribute('data-visible') === 'true');
      await page.waitForFunction(() => document.querySelector('[data-character-greeting]')?.getAttribute('data-visible') === 'false', null, { timeout: 7000 });
      await page.close();
    }
  }
} finally { await browser.close(); }
