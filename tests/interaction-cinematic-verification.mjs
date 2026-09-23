import { chromium } from "@playwright/test";

async function verifyCinematicInteractions() {
  console.log("=== BẮT ĐẦU KIỂM THỬ TƯƠNG TÁC CINEMATIC & EASTER EGG ===");

  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
  });
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function report(name, isPass, detail = "") {
    if (isPass) {
      console.log(`  [PASS ${++passed}] ${name} ${detail}`);
    } else {
      console.error(`  [FAIL ${++failed}] ${name} ${detail}`);
    }
  }

  try {
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // 1. Kiểm tra Video nền Ambient Video Backdrop
    const ambientVideo = await page.$("video source[src*='hero-ambient-video']");
    report("Video nền Ambient Video Backdrop (MP4/WebM) tồn tại trong DOM", !!ambientVideo);

    // 2. Kiểm tra Terminal Code Backdrop & Cursor Lens
    const terminalLines = await page.$$("span:has-text('GET /api/v1/stations/recommend')");
    report("Terminal Code Backdrop tồn tại và render shell/API logs", terminalLines.length > 0);

    // 3. Kiểm tra Tự động hiện Hộp thoại Chat đầu tiên khi cuộn xuống Desk Scene
    await page.evaluate(() => window.scrollBy(0, 450));
    await page.waitForTimeout(1000);

    const autoBubble = await page.$("div[role='alert']:has-text('Chào bạn, mình là Ninh.')");
    report("Hộp thoại chat đầu tiên tự động trượt lên khi kéo xuống (không cần click)", !!autoBubble);

    // 4. Kiểm tra Chibi Hover đổi màu Focus Mode
    const charBtn = await page.$("button[aria-label*='Nhân vật Ninh']");
    report("Nút tương tác Nhân vật Chibi tồn tại", !!charBtn);

    if (charBtn) {
      // Hover vào nhân vật
      await charBtn.hover({ force: true });
      await page.waitForTimeout(400);

      const focusStatus = await page.$("text=Focus Mode · Đang chiếu sáng ấm");
      report("Rê chuột (hover) vào nhân vật đổi màu và kích hoạt Focus Mode", !!focusStatus);

      // Rời chuột
      await page.mouse.move(10, 10);
      await page.waitForTimeout(400);

      const unfocusStatus = await page.$("text=Rê chuột vào nhân vật hoặc đèn");
      report("Rời chuột đưa Focus Mode trở lại trạng thái ban đầu", !!unfocusStatus);

      // 5. Kiểm tra Click nhân vật thì khung chat tiếp theo TRƯỢT LÊN (anim-chat-slide-up)
      await charBtn.click({ force: true });
      await page.waitForTimeout(400);

      const nextBubble = await page.$(".anim-chat-slide-up:has-text('Rê chuột vào bàn làm việc')");
      report("Click nhân vật lần 2: khung chat tiếp theo trượt lên với animation anim-chat-slide-up", !!nextBubble);
    }

    // 6. Kiểm tra Đèn Bàn hover & click
    const lampBtn = await page.$("button[aria-label*='Chiếc đèn bàn']");
    report("Nút tương tác Đèn bàn (Lamp Trigger) tồn tại", !!lampBtn);

    if (lampBtn) {
      await lampBtn.hover({ force: true });
      await page.waitForTimeout(400);
      const lampFocus = await page.$("text=Focus Mode · Đang chiếu sáng ấm");
      report("Rê chuột (hover) vào đèn bàn cũng đổi màu và kích hoạt Focus Mode", !!lampFocus);
      await page.mouse.move(10, 10);
      await page.waitForTimeout(300);
    }

    // 7. Kiểm tra TechOrbit & Project Hover Context
    const smartParkingCard = await page.$("h4:has-text('SmartParking · Sơ đồ bãi đỗ')");
    report("Card mô phỏng SmartParking trong Hero tồn tại", !!smartParkingCard);

    if (smartParkingCard) {
      await smartParkingCard.hover({ force: true });
      await page.waitForTimeout(400);

      const reactOrbitChip = await page.$("span:has-text('React')");
      report("TechOrbit cập nhật chip công nghệ khi hover project card", !!reactOrbitChip);
    }

    // 8. Kiểm tra Mô phỏng Trực quan Xác định (Deterministic Simulations)
    const slotA02 = await page.$("div:has-text('A-02')");
    report("Sơ đồ bãi đỗ có ô đỗ A-02 hiển thị trạng thái tương tác", !!slotA02);

    const chessMove = await page.$("text=14. Nf3 → d4");
    report("Mô phỏng Chess Coach hiển thị nước đi đề xuất '14. Nf3 → d4'", !!chessMove);

    const engineEval = await page.$("text=Engine Eval");
    report("Đánh giá cờ hiển thị 'Engine Eval' (không gây nhầm lẫn với Elo)", !!engineEval);

    const greenSmDetour = await page.$("text=+2.4km detour");
    report("Mô phỏng Green SM hiển thị thông số tuyến đường '+2.4km detour'", !!greenSmDetour);

    // 9. Kiểm tra Reduced Motion Safe Mode
    await context.close();

    const reducedMotionContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    const rmPage = await reducedMotionContext.newPage();
    await rmPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
    await rmPage.waitForTimeout(600);

    const heroTitleRM = await rmPage.$("h1:has-text('Từ ý tưởng đến')");
    report("Giao diện hoạt động trơn tru khi bật 'prefers-reduced-motion: reduce'", !!heroTitleRM);

    await reducedMotionContext.close();

    console.log("\n================ KẾT QUẢ KIỂM THỬ CINEMATIC ================");
    console.log(`✓ Đạt (PASS): ${passed} | ✗ Thất bại (FAIL): ${failed}`);

    if (failed === 0) {
      console.log("★ TẤT CẢ TÍNH NĂNG CINEMATIC ĐẠT CHUẨN HOÀN TOÀN!\n");
    } else {
      process.exitCode = 1;
    }
  } catch (err) {
    console.error("Lỗi trong quá trình kiểm thử:", err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verifyCinematicInteractions();
