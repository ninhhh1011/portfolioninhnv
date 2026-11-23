import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const page = await browser.newPage({ reducedMotion });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle');
    for (const id of ['haui-advisor', 'techviz', 'portfolio']) {
      const preview = page.locator(`[data-preview="${id}"]`).first();
      const before = await preview.getAttribute('data-step');
      const values = id === 'techviz' ? await preview.locator('[data-sort-values]').getAttribute('data-sort-values') : null;
      if (reducedMotion === 'no-preference') {
        await page.waitForFunction(({ id, before }) => document.querySelector(`[data-preview="${id}"]`)?.getAttribute('data-step') !== before, { id, before }, { timeout: 15000 });
      } else {
        await page.waitForTimeout(3200);
      }
      const after = await preview.getAttribute('data-step');
      assert.ok(before !== null && after !== null);
      assert.equal(after === before, reducedMotion === 'reduce', `${id}: ${reducedMotion}`);
      assert.equal(await preview.locator('button').count(), 0);
      if (id === 'techviz') {
        assert.match(values, /^(3,1,2|1,3,2|1,2,3)$/);
        assert.ok(await preview.getByText('Bubble Sort', { exact: true }).count());
      }
    }
    await page.close();
  }
} finally { await browser.close(); }
