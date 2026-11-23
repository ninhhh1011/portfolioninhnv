import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const carousel = page.getByRole('region', { name: 'Dự án tiêu biểu' });
  await carousel.scrollIntoViewIfNeeded();
  assert.equal(await page.getByRole('button', { name: 'Dự án trước' }).count(), 0);
  assert.equal(await page.getByRole('button', { name: 'Dự án tiếp theo' }).count(), 0);
  assert.equal(await page.getByText('Tự trượt Parabol').count(), 0);
  const active = () => carousel.locator('[aria-current="true"]').getAttribute('id');
  assert.equal(await active(), 'project-choice-haui-advisor');
  await carousel.focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await active(), 'project-choice-techviz');
  const scene = carousel.locator('[data-carousel-scene]');
  const box = await scene.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 100, box.y + box.height / 2, { steps: 5 });
  await page.mouse.up();
  assert.equal(await active(), 'project-choice-chess-web-app');
  await page.waitForTimeout(5500);
  assert.equal(await active(), 'project-choice-chess-web-app');
  await page.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'no-preference', hasTouch: true });
  await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const mobileCarousel = mobile.getByRole('region', { name: 'Dự án tiêu biểu' });
  await mobileCarousel.scrollIntoViewIfNeeded();
  const current = mobileCarousel.locator('[aria-current="true"]');
  const initial = await current.getAttribute('id');
  await mobile.waitForFunction((id) => document.querySelector('[aria-current="true"][id^="project-choice-"]')?.id !== id, initial, { timeout: 12000 });
  const mobileScene = mobileCarousel.locator('[data-carousel-scene]');
  assert.equal(await mobileScene.evaluate(el => getComputedStyle(el).touchAction), 'pan-y');
  await mobile.close();
} finally { await browser.close(); }
