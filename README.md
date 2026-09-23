# Nguyễn Văn Ninh — Portfolio

> **Software Engineering Student | Backend · AI Applications · Frontend**  
> *"Từ ý tưởng đến sản phẩm có thể trải nghiệm"*

Website cá nhân giới thiệu năng lực kỹ thuật, kinh nghiệm thực tập và các sản phẩm phần mềm tiêu biểu của Nguyễn Văn Ninh, được thiết kế theo triết lý **"Craft Soft Editorial × Cinematic Motion × Interactive Product Storytelling"**.

🌐 **Live Demo:** [portfolioninhnv](https://github.com/ninhhh1011/portfolioninhnv)

---

## 🎨 Điểm nhấn Kiến trúc & Trải nghiệm

### 1. Bản sắc Thiết kế (Craft Soft Editorial)
- **Light Mode Only:** Bảng màu kem ấm cao cấp (`#FCF9F7`), trắng ngọc, xanh trời nhạt (`#D7EAF0`), xanh teal dịu (`#176B87`), tím lavender thanh thoát (`#EEE7FA`) và mint dịu mát (`#DDF3E8`).
- **Typography Editorial:** Tiêu đề serif cổ điển trang nhã kết hợp sans-serif UI hiện đại, độ tương phản sắc nét và hệ số phân cấp thị giác chuẩn xác.
- **Atmospheric Depth:** Đổ bóng khuếch tán mềm (diffuse shadow), kính mờ frosted glass và viền bán trong suốt nhẹ nhàng.

### 2. Video nền Ambient & Thác nước Code Terminal
- **Cinematic Ambient Video:** Video nền lặp vô tận siêu nhẹ (MP4/WebM) với các luồng sóng màu chuyển động hữu cơ tuần hoàn.
- **Streaming Code Waterfall:** Thác nước dòng lệnh kỹ thuật (FastAPI, PostGIS, OSRM, Stockfish WASM eval, pytest, Docker) cuộn liên tục trên nền trang.
- **Cursor Reveal Lens:** Thấu kính quang học bán kính 240px bám theo con trỏ chuột, làm nổi bật mã nguồn và thông số kỹ thuật bên dưới.

### 3. Không gian Bàn làm việc Sống động (Living Desk Scene)
- **Tương tác Đèn Focus Mode:** Rê chuột (hover) vào nhân vật hoặc chiếc đèn bàn để chuyển đổi màu sắc, thắp sáng chiếc đèn sang tông vàng hổ phách ấm và chiếu rọi luồng sáng xuống mặt bàn.
- **Hộp thoại Chibi Easter Egg:**
  - Tự động trượt lên thông điệp chào đón đầu tiên khi người dùng cuộn tới bàn làm việc.
  - Mỗi lần click vào nhân vật, khung chat tiếp theo sẽ trượt êm từ dưới lên (`.anim-chat-slide-up`) kèm số đếm bước `(1/4, 2/4, 3/4, 4/4)`.
- **Context-aware TechOrbit:** Quỹ đạo vệ tinh công nghệ tự động đồng bộ huy hiệu stack tương ứng khi người dùng hover qua từng dự án.

### 4. Bộ ba Mô phỏng Trực quan Xác định (Deterministic Simulations)
1. **SmartParking — Sơ đồ bãi đỗ:** Mô phỏng luồng đặt chỗ cư dân VinUni theo 4 bước chu kỳ xác định (A-02 trống → đang vào → đã đỗ; B-03 đã giữ; đồng bộ số lượng ô trống).
2. **Chess AI Coach — Phân tích nước đi:** Bàn cờ trực quan với nước đi đề xuất `14. Nf3 → d4`, tích hợp chỉ số Stockfish Engine Eval `+1.4` / `+1.8` (gắn nhãn minh bạch, không gây nhầm lẫn với Elo).
3. **Green SM — Định tuyến trạm sạc:** GPS live tracking, hiển thị lộ trình `+2.4km detour`, tính toán ETA và phát xung sóng khi đến đích trạm sạc/đổi pin.

---

## 🛠 Công nghệ Sử dụng (Tech Stack)

- **Framework:** [Next.js 16.3.5](https://nextjs.org/) (Turbopack, App Router, React Server / Client Components)
- **UI Library:** [React 19](https://react.dev/), [HeroUI 3.2.6](https://heroui.com/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Playwright](https://playwright.dev/) E2E Test Suites
- **Video & Media:** FFmpeg 9.0 procedural ambient background loop

---

## 🚀 Cài đặt & Chạy trên Local

### Yêu cầu môi trường
- Node.js >= 18.18.0 (khuyến nghị Node 20+)
- npm hoặc yarn/pnpm

### Cài đặt dependencies
```bash
npm install
```

### Chạy môi trường phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt tại [http://localhost:3000](http://localhost:3000) để trải nghiệm.

### Kiểm tra kiểu dữ liệu (TypeScript Typecheck)
```bash
npm run typecheck
```

### Đóng gói sản xuất (Production Build)
```bash
npm run build
npm start
```

---

## 🧪 Kiểm thử Tự động (Automated Testing)

Kho lưu trữ đi kèm 2 bộ kiểm thử E2E tự động sử dụng Playwright:

```bash
# 1. Bộ kiểm thử chức năng toàn diện (18 test cases)
node tests/e2e-verification.mjs

# 2. Bộ kiểm thử tương tác Cinematic, Video nền & Easter Egg (16 test cases)
node tests/interaction-cinematic-verification.mjs
```

---

## 📁 Cấu trúc Thư mục

```
portfolio/
├── public/
│   ├── visuals/
│   │   ├── hero-ambient-video.mp4    # Video nền ambient siêu nhẹ (39KB)
│   │   ├── hero-ambient-video.webm   # Video nền định dạng WebM (21KB)
│   │   ├── hero-ambient-poster.jpg   # Poster fallback
│   │   └── ninh-desk.png             # Chibi desk illustration
│   └── cv-nguyen-van-ninh.pdf        # Hồ sơ CV PDF thực tế
├── src/
│   ├── app/                          # Next.js App Router (layout, globals.css, page)
│   ├── components/
│   │   ├── sections/                 # Navbar, Hero, Projects, Experience, Skills, About, Contact
│   │   ├── ui/                       # Button, Card, Chip, SectionReveal, SpotlightSurface, ProjectModal
│   │   └── visuals/                  # NinhDeskScene, TerminalCodeBackdrop, HeroComposition
│   ├── context/                      # PortfolioInteractionContext
│   ├── hooks/                        # usePointerParallax, usePointerSpotlight, useSectionInView,...
│   ├── lib/                          # motionTokens
│   └── content/                      # Dữ liệu portfolio cá nhân thực tế
├── tests/                            # Test scripts & visual verification screenshots
└── scripts/                          # Script sinh video ambient nền procedural
```

---

## 📄 Bản quyền & Tác giả

Thiết kế và phát triển bởi **Nguyễn Văn Ninh** — Sinh viên Kỹ thuật Phần mềm.  
Mọi thông tin trong CV và dự án đều phản ánh đúng năng lực và sản phẩm thực tế.
