import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const pipeline = page.locator('[data-vin-pipeline]');
    const before = await pipeline.getAttribute('data-step');
    if (reducedMotion === 'no-preference') {
      await page.waitForFunction((initial) => document.querySelector('[data-vin-pipeline]')?.getAttribute('data-step') !== initial, before, { timeout: 15000 });
    } else {
      await page.waitForTimeout(3000);
      assert.equal(await pipeline.getAttribute('data-step'), before);
    }
    assert.equal(await pipeline.locator('[data-pipeline-stage]').count(), 5);
    assert.ok(await page.getByText(/chỉ mục không gian H3/).count());
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    await page.close();
  }
} finally { await browser.close(); }
