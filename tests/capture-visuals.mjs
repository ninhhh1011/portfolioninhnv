import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const SCREENSHOT_DIR = "E:/portfolio/tests/screenshots";
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function captureAllVisuals() {
  console.log("=== BẮT ĐẦU CHỤP ẢNH TẤT CẢ CÁC SECTION VÀ BREAKPOINTS ===");

  const browser = await chromium.launch({ channel: "msedge", headless: true });

  try {
    // ==========================================
    // 1. DESKTOP 1440px
    // ==========================================
    console.log("\n1. Đang kiểm tra & chụp Desktop (1440x900)...");
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "light",
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await desktopPage.waitForTimeout(1000); // Allow entrance choreography to settle

    // Hero Section
    const heroElem = await desktopPage.$("section:first-of-type");
    if (heroElem) {
      await heroElem.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-01-hero.png") });
      console.log("✓ Đã chụp desktop-01-hero.png");
    }

    // Projects Section
    const projElem = await desktopPage.$("#projects");
    if (projElem) {
      await projElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
      await projElem.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-02-projects.png") });
      console.log("✓ Đã chụp desktop-02-projects.png");
    }

    // Experience Section
    const expElem = await desktopPage.$("#experience");
    if (expElem) {
      await expElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
      await expElem.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-03-experience.png") });
      console.log("✓ Đã chụp desktop-03-experience.png");
    }

    // Skills Section
    const skillsElem = await desktopPage.$("#skills");
    if (skillsElem) {
      await skillsElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
      await skillsElem.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-04-skills-ai.png") });
      console.log("✓ Đã chụp desktop-04-skills-ai.png");
    }

    // About Section
    const aboutElem = await desktopPage.$("#about");
    if (aboutElem) {
      await aboutElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
      await aboutElem.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-05-about.png") });
      console.log("✓ Đã chụp desktop-05-about.png");
    }

    // Contact Section
    const contactElem = await desktopPage.$("#contact");
    if (contactElem) {
      await contactElem.scrollIntoViewIfNeeded();
      await desktopPage.waitForTimeout(600);
      await contactElem.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-06-contact.png") });
      console.log("✓ Đã chụp desktop-06-contact.png");
    }

    // Modal Interaction
    const modalTrigger = await desktopPage.$("button:has-text('Chi tiết')");
    if (modalTrigger) {
      await modalTrigger.click();
      await desktopPage.waitForTimeout(600);
      await desktopPage.screenshot({ path: path.join(SCREENSHOT_DIR, "desktop-07-modal.png") });
      console.log("✓ Đã chụp desktop-07-modal.png");
      await desktopPage.keyboard.press("Escape");
      await desktopPage.waitForTimeout(400);
    }

    // Full page after all sections are guaranteed revealed
    await desktopPage.evaluate(() => window.scrollTo(0, 0));
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({
      path: path.join(SCREENSHOT_DIR, "desktop-fullpage-1440px.png"),
      fullPage: true,
    });
    console.log("✓ Đã chụp desktop-fullpage-1440px.png");

    await desktopContext.close();

    // ==========================================
    // 2. MOBILE 390px (iPhone 14)
    // ==========================================
    console.log("\n2. Đang kiểm tra & chụp Mobile (390x844)...");
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await mobilePage.waitForTimeout(1000);

    // Smooth scroll through to reveal all sections on mobile
    // Mobile Hero
    const mHero = await mobilePage.$("section:first-of-type");
    if (mHero) {
      await mHero.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-01-hero.png") });
      console.log("✓ Đã chụp mobile-01-hero.png");
    }

    // Mobile Projects
    const mProj = await mobilePage.$("#projects");
    if (mProj) {
      await mProj.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(500);
      await mProj.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-02-projects.png") });
      console.log("✓ Đã chụp mobile-02-projects.png");
    }

    // Mobile Experience
    const mExp = await mobilePage.$("#experience");
    if (mExp) {
      await mExp.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(500);
      await mExp.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-03-experience.png") });
      console.log("✓ Đã chụp mobile-03-experience.png");
    }

    // Mobile Skills
    const mSkills = await mobilePage.$("#skills");
    if (mSkills) {
      await mSkills.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(500);
      await mSkills.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-04-skills-ai.png") });
      console.log("✓ Đã chụp mobile-04-skills-ai.png");
    }

    // Mobile Contact
    const mContact = await mobilePage.$("#contact");
    if (mContact) {
      await mContact.scrollIntoViewIfNeeded();
      await mobilePage.waitForTimeout(500);
      await mContact.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-05-contact.png") });
      console.log("✓ Đã chụp mobile-05-contact.png");
    }

    // Mobile full page after all sections revealed
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await mobilePage.waitForTimeout(400);
    await mobilePage.screenshot({
      path: path.join(SCREENSHOT_DIR, "mobile-fullpage-390px.png"),
      fullPage: true,
    });
    console.log("✓ Đã chụp mobile-fullpage-390px.png");

    // Mobile Drawer Menu
    const menuBtn = await mobilePage.$("button[aria-label='Mở menu'], button.drawer__trigger");
    if (menuBtn) {
      await menuBtn.click();
      await mobilePage.waitForTimeout(500);
      await mobilePage.screenshot({ path: path.join(SCREENSHOT_DIR, "mobile-06-drawer.png") });
      console.log("✓ Đã chụp mobile-06-drawer.png");
    }

    await mobileContext.close();

    // ==========================================
    // 3. TABLET 768px (iPad)
    // ==========================================
    console.log("\n3. Đang kiểm tra & chụp Tablet (768x1024)...");
    const tabletContext = await browser.newContext({
      viewport: { width: 768, height: 1024 },
      isMobile: true,
      hasTouch: true,
    });
    const tabletPage = await tabletContext.newPage();
    await tabletPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await tabletPage.waitForTimeout(1000);

    for (const id of ["#projects", "#experience", "#skills", "#about", "#contact"]) {
      const el = await tabletPage.$(id);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        await tabletPage.waitForTimeout(300);
      }
    }
    await tabletPage.evaluate(() => window.scrollTo(0, 0));
    await tabletPage.waitForTimeout(400);

    await tabletPage.screenshot({
      path: path.join(SCREENSHOT_DIR, "tablet-fullpage-768px.png"),
      fullPage: true,
    });
    console.log("✓ Đã chụp tablet-fullpage-768px.png");
    await tabletContext.close();

    console.log("\n★ HOÀN TẤT CHỤP TẤT CẢ ẢNH BẰNG CHỨNG THỰC TẾ!");
  } catch (err) {
    console.error("Lỗi khi chụp ảnh:", err);
  } finally {
    await browser.close();
  }
}

captureAllVisuals();
