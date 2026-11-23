import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    const orbit = page.locator('.project-orbit');
    assert.equal(await orbit.locator('.orbit-card').count(), 5);
    assert.equal(await orbit.getByRole('button').count(), 0);
    assert.equal(await orbit.evaluate(el => getComputedStyle(el).pointerEvents), 'none');
    assert.equal(await orbit.locator('.orbit-card').first().evaluate(el => getComputedStyle(el).animationName), 'none');
    assert.ok(await page.getByText(/chỉ mục không gian H3/).count());
    assert.ok(await page.getByText('Minh họa · Trợ lý học vụ').count());
    await page.locator('#project-choice-haui-advisor').click();
    assert.ok(await page.getByText('HaUI Advisor', { exact: true }).count());
    await page.locator('#project-choice-techviz').click();
    assert.ok(await page.getByText('Bubble Sort', { exact: true }).count());
    await page.locator('#project-choice-portfolio').click();
    assert.ok(await page.getByText('Frontend · AI Applications').count());
    await page.close();
    console.log(`${width}px: project navigation and system details work`);
  }
  const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'no-preference' });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const card = page.locator('.orbit-card').first();
  const start = await card.boundingBox();
  await page.waitForTimeout(1000);
  const end = await card.boundingBox();
  assert.ok(start && end && (Math.abs(start.x - end.x) > 2 || Math.abs(start.y - end.y) > 2));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.close();
} finally { await browser.close(); }
