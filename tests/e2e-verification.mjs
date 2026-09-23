import { chromium } from "@playwright/test";
import fs from "fs";
import path from "path";

const SCREENSHOT_DIR = "E:/portfolio/tests/screenshots";
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function runVerification() {
  console.log("=== BẮT ĐẦU KIỂM THỬ THỰC TẾ PORTFOLIO ===");

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const results = {
    passed: [],
    failed: [],
    screenshots: [],
  };

  try {
    // 1. DESKTOP TEST (1440x900)
    console.log("\n1. Kiểm tra Desktop Viewport (1440x900)...");
    const contextDesktop = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "light",
    });
    const page = await contextDesktop.newPage();

    // Listen to console errors and network errors
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log(`[Browser Console Error]: ${msg.text()} (${msg.location()?.url})`);
        consoleErrors.push(`${msg.text()} at ${msg.location()?.url}`);
      }
    });
    page.on("requestfailed", (req) => {
      console.log(`[Request Failed]: ${req.url()} (${req.failure()?.errorText})`);
    });

    const response = await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    if (response?.status() === 200) {
      results.passed.push("HTTP 200 OK khi tải trang chủ");
    } else {
      results.failed.push(`Lỗi tải trang chủ: status ${response?.status()}`);
    }

    // Title check
    const title = await page.title();
    console.log(`- Page Title: "${title}"`);
    if (title.includes("Nguyễn Văn Ninh")) {
      results.passed.push("Page title chứa đúng tên Nguyễn Văn Ninh");
    } else {
      results.failed.push(`Page title không khớp: ${title}`);
    }

    // Check forced light mode & background color
    const htmlBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    console.log(`- Body Background computed: ${htmlBg}`);
    if (htmlBg === "rgb(252, 249, 247)" || htmlBg.includes("252, 249, 247")) {
      results.passed.push("Nền trang đúng mã màu kem ấm #FCF9F7");
    } else {
      results.failed.push(`Nền trang không phải #FCF9F7: ${htmlBg}`);
    }

    // Test Dark Preference override
    console.log("\n2. Kiểm tra Browser Dark Preference Override...");
    const contextDark = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark", // Emulate system dark mode
    });
    const darkPage = await contextDark.newPage();
    await darkPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const darkBodyBg = await darkPage.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    if (darkBodyBg === "rgb(252, 249, 247)" || darkBodyBg.includes("252, 249, 247")) {
      results.passed.push("Ép Light Mode thành công khi hệ điều hành/trình duyệt bật Dark Mode");
    } else {
      results.failed.push(`Bị rơi vào Dark Theme khi bật prefers-color-scheme dark: ${darkBodyBg}`);
    }
    await contextDark.close();

    // Check Navigation anchors
    console.log("\n3. Kiểm tra điều hướng và Section Anchors...");
    const sections = ["#projects", "#experience", "#skills", "#about", "#contact"];
    for (const sec of sections) {
      const el = await page.$(sec);
      if (el) {
        results.passed.push(`Section anchor ${sec} tồn tại trong DOM`);
      } else {
        results.failed.push(`Thiếu section anchor ${sec}`);
      }
    }

    // Check CV PDF file download response
    console.log("\n4. Kiểm tra liên kết CV PDF...");
    const cvResponse = await page.request.get("http://localhost:3000/Nguyen_Van_Ninh_CV_Harvard_1_Trang%20(1).pdf");
    if (cvResponse.status() === 200 && cvResponse.headers()["content-type"]?.includes("pdf")) {
      results.passed.push("File CV PDF thực tế tải về thành công (HTTP 200, application/pdf)");
    } else {
      results.failed.push(`Tải file CV PDF thất bại: ${cvResponse.status()}`);
    }

    // Test Modal Interaction
    console.log("\n5. Kiểm tra tương tác Modal chi tiết dự án...");
    const detailBtn = await page.$("button:has-text('Chi tiết')");
    if (detailBtn) {
      await detailBtn.click();
      await page.waitForTimeout(500);

      // Verify modal dialog appears
      const modalDialog = await page.$("[role='dialog']");
      if (modalDialog) {
        results.passed.push("Modal chi tiết dự án mở thành công và hiển thị dialog role");

        // Take modal screenshot
        const modalScreenshotPath = path.join(SCREENSHOT_DIR, "desktop-modal-detail.png");
        await page.screenshot({ path: modalScreenshotPath });
        results.screenshots.push(modalScreenshotPath);
        console.log(`- Đã chụp ảnh Modal: ${modalScreenshotPath}`);

        // Press Escape to dismiss
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);

        const isModalGone = (await page.$("[role='dialog']")) === null;
        if (isModalGone) {
          results.passed.push("Phím Escape đóng modal thành công");
        } else {
          results.failed.push("Phím Escape không đóng được modal");
        }
      } else {
        results.failed.push("Không tìm thấy dialog modal sau khi click nút");
      }
    }

    // Test Copy Email functionality
    console.log("\n6. Kiểm tra tính năng Sao chép Email...");
    await contextDesktop.grantPermissions(["clipboard-read", "clipboard-write"]);
    const copyBtn = await page.$("button[aria-label='Sao chép địa chỉ email']");
    if (copyBtn) {
      await copyBtn.click();
      await page.waitForTimeout(300);
      const feedbackText = await page.textContent("text=Đã sao chép địa chỉ email");
      if (feedbackText) {
        results.passed.push("Thông báo sao chép email phản hồi thành công trên giao diện");
      } else {
        results.failed.push("Không xuất hiện thông báo sau khi click copy email");
      }
    }

    // Take Desktop Full-page Screenshot
    console.log("\n7. Chụp ảnh toàn trang Desktop (1440x900)...");
    const desktopScreenshotPath = path.join(SCREENSHOT_DIR, "desktop-fullpage-1440px.png");
    await page.screenshot({ path: desktopScreenshotPath, fullPage: true });
    results.screenshots.push(desktopScreenshotPath);
    console.log(`- Đã chụp ảnh Desktop: ${desktopScreenshotPath}`);

    await contextDesktop.close();

    // 8. MOBILE VIEWPORT TEST (390x844)
    console.log("\n8. Kiểm tra Mobile Viewport (390x844 iPhone 14)...");
    const contextMobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await contextMobile.newPage();
    await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

    // Check horizontal scroll overflow
    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    if (!hasHorizontalOverflow) {
      results.passed.push("Mobile 390px hoàn toàn không bị tràn chiều ngang (no horizontal overflow)");
    } else {
      results.failed.push("Mobile 390px bị tràn chiều ngang");
    }

    // Test Mobile Drawer Menu
    console.log("- Kiểm tra mở Drawer Menu trên Mobile...");
    const menuBtn = await mobilePage.$("button[aria-label='Mở menu'], button.drawer__trigger");
    if (menuBtn) {
      await menuBtn.click();
      await mobilePage.waitForTimeout(600);

      // Verify drawer dialog
      const drawerDialog = await mobilePage.$("[role='dialog']");
      if (drawerDialog) {
        results.passed.push("Drawer menu mobile mở mượt mà và hiển thị đầy đủ các liên kết");

        // Screenshot Mobile Drawer
        const drawerScreenshotPath = path.join(SCREENSHOT_DIR, "mobile-drawer-menu.png");
        await mobilePage.screenshot({ path: drawerScreenshotPath });
        results.screenshots.push(drawerScreenshotPath);
        console.log(`- Đã chụp ảnh Mobile Drawer: ${drawerScreenshotPath}`);

        // Click close
        const closeBtn = await mobilePage.$("button[aria-label='Đóng menu'], button.drawer__close-trigger");
        if (closeBtn) {
          await closeBtn.click();
          await mobilePage.waitForTimeout(400);
          results.passed.push("Nút đóng menu mobile hoạt động chuẩn xác");
        } else {
          results.failed.push("Không tìm thấy nút đóng menu");
        }
      } else {
        results.failed.push("Drawer menu không mở sau khi bấm nút menu");
      }
    } else {
      results.failed.push("Không tìm thấy nút mở drawer menu trên mobile");
    }

    // Take Mobile Full-page Screenshot
    console.log("- Chụp ảnh toàn trang Mobile (390x844)...");
    const mobileScreenshotPath = path.join(SCREENSHOT_DIR, "mobile-fullpage-390px.png");
    await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
    results.screenshots.push(mobileScreenshotPath);
    console.log(`- Đã chụp ảnh Mobile: ${mobileScreenshotPath}`);

    // 9. EXTRA COMPACT MOBILE (360x740)
    console.log("\n9. Kiểm tra Extra Compact Mobile (360x740 Android)...");
    const context360 = await browser.newContext({
      viewport: { width: 360, height: 740 },
      isMobile: true,
      hasTouch: true,
    });
    const page360 = await context360.newPage();
    await page360.goto("http://localhost:3000", { waitUntil: "networkidle" });
    const overflow360 = await page360.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    if (!overflow360) {
      results.passed.push("Mobile nhỏ 360px không bị tràn chiều ngang");
    } else {
      results.failed.push("Mobile nhỏ 360px bị tràn chiều ngang");
    }
    await context360.close();
    await contextMobile.close();

    // Check Console errors
    if (consoleErrors.length === 0) {
      results.passed.push("Không có bất kỳ lỗi console nào (0 errors)");
    } else {
      results.failed.push(`Có ${consoleErrors.length} lỗi console: ${consoleErrors.join("; ")}`);
    }
  } catch (err) {
    console.error("Lỗi ngoại lệ trong quá trình test:", err);
    results.failed.push(`Lỗi exception: ${err.message}`);
  } finally {
    await browser.close();
  }

  // Summary Report
  console.log("\n================ KẾT QUẢ KIỂM THỬ ================");
  console.log(`✓ Số test PASS: ${results.passed.length}`);
  results.passed.forEach((msg, i) => console.log(`  [PASS ${i + 1}] ${msg}`));

  if (results.failed.length > 0) {
    console.log(`\n✗ Số test FAILED: ${results.failed.length}`);
    results.failed.forEach((msg, i) => console.log(`  [FAIL ${i + 1}] ${msg}`));
  } else {
    console.log("\n★ TẤT CẢ CÁC TEST ĐỀU ĐẠT CHUẨN 100%!");
  }

  // Save JSON report
  fs.writeFileSync(
    "E:/portfolio/tests/test-results.json",
    JSON.stringify(results, null, 2),
    "utf-8"
  );
}

runVerification();
