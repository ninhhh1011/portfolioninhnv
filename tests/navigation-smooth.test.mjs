import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    const Original = window.IntersectionObserver;
    window.__sectionObservations = 0;
    window.__contactDraws = 0;
    const clear = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (...args) {
      if (this.canvas.closest('#contact')) window.__contactDraws++;
      return clear.apply(this, args);
    };
    window.IntersectionObserver = class extends Original {
      observe(target) {
        if (['hero', 'projects', 'experience', 'skills', 'about', 'contact'].includes(target.id)) window.__sectionObservations++;
        return super.observe(target);
      }
    };
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(() => window.__contactDraws), 0, 'offscreen canvas should not render');
  const link = page.locator('header a[href="#about"]');
  const before = await page.evaluate(() => window.__sectionObservations);
  await link.click();
  await page.waitForTimeout(500);
  assert.equal(await link.getAttribute('aria-current'), 'page', 'destination should remain selected during a long scroll');
  await page.waitForTimeout(2000);
  const observed = await page.evaluate(() => window.__sectionObservations) - before;
  assert.ok(observed < 6, `section observers restarted during scrolling: ${observed} observations`);
  const top = await page.locator('#about').evaluate(el => el.getBoundingClientRect().top);
  assert.ok(top > 0 && top < 180, `destination top: ${top}`);
  await page.locator('header a[href="#contact"]').click();
  await page.waitForTimeout(2000);
  assert.ok(await page.evaluate(() => window.__contactDraws) > 0, 'visible canvas should render');
  await page.locator('header a[href="#projects"]').click();
  await page.waitForTimeout(150);
  await link.click();
  await page.waitForTimeout(500);
  assert.equal(await link.getAttribute('aria-current'), 'page', 'latest navigation should win');
} finally { await browser.close(); }
