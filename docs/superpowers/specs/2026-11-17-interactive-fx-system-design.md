# Đặc tả Thiết kế Kỹ thuật (Technical Design Spec)
## Hệ thống Hiệu ứng & Tương tác Chuyên sâu Toàn trang (High-Intensity Interactive FX System)

- **Ngày tạo:** 2026-11-17
- **Tác giả:** Antigravity & User
- **Mục tiêu:** Nâng cấp toàn diện hiệu ứng tương tác trực quan cho toàn bộ website portfolio cá nhân, khẳng định năng lực kỹ thuật Frontend Dev chuyên nghiệp đỉnh cao ("FE căng") mà vẫn bảo toàn 100% nội dung, cấu trúc và đạt chuẩn hiệu năng 60–120 FPS.

---

## 1. Mục tiêu & Nguyên tắc Cốt lõi (Core Principles)

1. **Bảo toàn nguyên trạng nội dung (Content Preservation):** Giữ nguyên toàn bộ text, hình ảnh minh họa, các dự án, kinh nghiệm làm việc, học vấn và thông tin liên hệ. Không xóa bỏ hoặc thay đổi nội dung hiện có.
2. **"FE Căng" – Đậm chất công nghệ & Sáng tạo (Showcase Excellence):** Tích hợp kỹ thuật từ DOM manipulation, SVG animations, CSS 3D transforms, Spring physics, đến Canvas 2D và WebGL 3D.
3. **Mọi phần đều có điểm nhấn tương tác (Pervasive Interactivity):** Mỗi section đều có hiệu ứng riêng biệt, liên kết chặt chẽ với ngữ cảnh (contextual interactions).
4. **Hiệu năng & Khả năng tiếp cận (60 FPS & Accessibility):**
   - Đảm bảo animation chạy mượt mà trên màn hình tần số quét cao (60Hz – 120Hz).
   - Tự động phát hiện và tôn trọng cài đặt `prefers-reduced-motion` của người dùng.
   - Tự động nhận diện thiết bị cảm ứng (Mobile / Tablet) để tối ưu hoặc ẩn con trỏ chuột custom, kích hoạt cử chỉ vuốt chạm native.

---

## 2. Kiến trúc Kỹ thuật (Architecture & Technical Stack)

### 2.1. Công nghệ & Thư viện
- **Framework:** Next.js 16 (App Router), React 19, TypeScript.
- **Styling & 3D CSS:** Tailwind CSS v4, CSS Custom Properties (`--mouse-x`, `--mouse-y`), CSS 3D perspective (`transform-style: preserve-3d`).
- **3D WebGL:** Three.js + `@react-three/fiber` (đã có sẵn trong dự án).
- **Vật lý & Canvas:** Custom React Hooks chạy trên `requestAnimationFrame` và thuật toán nội suy Lerp (`x += (target - x) * factor`), kết hợp `canvas-confetti` cho hiệu ứng nổ pháo hoa hạt năng lượng.
- **Client Hydration Safety:** Toàn bộ các module Canvas/Cursor sử dụng `use client` và render sau mount để đảm bảo zero SSR mismatch.

### 2.2. Kiến trúc Tầng Hiệu ứng (Layered FX Architecture)

```
+-------------------------------------------------------------+
| Layer 4: Global Fluid Magnetic Cursor & Particle Trail      | (Z-Index: 9999, Pointer-events: none)
+-------------------------------------------------------------+
| Layer 3: Interactive UI (Master 3D Slider, Cards, Navbar)   | (Z-Index: 20-50, Full Interactivity)
+-------------------------------------------------------------+
| Layer 2: Cloud Veil Transitions & Physics Dust Repulsion   | (Z-Index: 10, Canvas/SVG Interaction)
+-------------------------------------------------------------+
| Layer 1: Three.js Ambient 3D Space & Desk Workspace Scene   | (Z-Index: 0-5, WebGL Background)
+-------------------------------------------------------------+
```

---

## 3. Đặc tả Chi tiết từng Module (Module Specifications)

### Module 1: Con trỏ chuột Nam châm & Vệt hạt năng lượng (Fluid Magnetic Cursor)
- **Tập tin:** `src/components/visuals/FluidMagneticCursor.tsx`, `src/hooks/useMagnetic.ts`.
- **Cơ chế hoạt động:**
  - Lắng nghe sự kiện `pointermove` trên `window`.
  - Hai tầng con trỏ:
    - *Inner Dot (Chấm tâm):* Tọa độ x, y tức thời, bán kính 6px, màu `#176B87`.
    - *Outer Ring (Vòng ngoài):* Tọa độ x, y trễ theo quán tính Lerp (`0.15`), bán kính 36px, viền mờ pha trộn chế độ `mix-blend-mode: difference`.
  - **Magnetic Attraction:** Tự động quét các phần tử có thuộc tính `data-magnetic="true"` hoặc thẻ `button`, `a`. Khi khoảng cách từ chuột tới tâm phần tử `< 45px`, vòng ngoài sẽ hít chặt vào tâm phần tử và phần tử bị kéo nghiêng nhẹ theo chuột (`translate(dx * 0.25, dy * 0.25)`).
  - **Particle Spark Trail:** Canvas 2D vẽ các hạt spark nhỏ rơi ra sau mỗi 15px di chuyển chuột, giảm dần opacity và tan biến sau 400ms.
  - **Mobile Safe:** Ẩn hoàn toàn trên màn hình `(hover: none) and (pointer: coarse)`.

### Module 2: Bầu trời Mây vật lý Tương tác (Interactive Cloud Physics & Veil Transitions)
- **Tập tin:** `src/components/visuals/CloudVeilTransition.tsx`, `src/components/visuals/InteractiveCloudCanvas.tsx`.
- **Cơ chế hoạt động:**
  - Nâng cấp dải phân cách giữa các section: thay div tĩnh bằng một Canvas hạt mây lơ lửng.
  - **Mouse Repulsion (Xua mây):** Khi chuột di chuyển qua dải mây, các điểm hạt mây nằm trong bán kính 100px bị đẩy ra xa theo vector từ tâm chuột đến hạt với lực `F = (1 - dist / radius) * force`.
  - Khi chuột rời đi, các hạt trở về vị trí gốc bằng phương trình dao động điều hòa giảm chấn (Damped Harmonic Oscillator).
  - **Scroll Wind Velocity:** Tính toán vận tốc cuộn trang `dScroll / dt` để áp dụng vector trôi ngang cho toàn bộ mây.

### Module 3: Projects Section – Master 3D Coverflow Slider & Holographic Tilt Cards
- **Tập tin:** `src/components/sections/ProjectsSection.tsx`, `src/components/ui/Master3DSlider.tsx`, `src/components/ui/HolographicTiltCard.tsx`.
- **Cơ chế hoạt động:**
  - **3D Perspective Carousel:**
    - Vùng chứa được đặt `perspective: 1200px`.
    - Thẻ trung tâm (`active`): `translateZ(0)`, `scale(1)`, `opacity: 1`, sắc nét.
    - Thẻ bên trái: `translateX(-60%)`, `translateZ(-180px)`, `rotateY(25deg)`, `opacity: 0.65`.
    - Thẻ bên phải: `translateX(60%)`, `translateZ(-180px)`, `rotateY(-25deg)`, `opacity: 0.65`.
  - **Drag Physics with Momentum Inertia:**
    - Kéo chuột/ngón tay thay đổi biến `dragOffset`.
    - Khi thả tay (`pointerup`), tính vận tốc thả `velocity` và trượt theo quán tính đến thẻ gần nhất rồi snap vào giữa.
  - **View Mode Switcher:** Nút toggle giữa chế độ `[3D Master Slider]` và `[Danh sách mở rộng (Expanded Grid)]`.
  - **Holographic 3D Tilt Card:**
    - Đặt sự kiện `pointermove` trên từng thẻ card, tính góc nghiêng `rotateX = (mouseY / height - 0.5) * -16deg`, `rotateY = (mouseX / width - 0.5) * 20deg`.
    - Lớp ánh sáng `Holographic Glare`: Dải gradient tỏa tròn chuyển động theo tọa độ chuột với độ mờ động.

### Module 4: Hero Section – Kinetic Holographic Headline & 3D Workspace Parallax
- **Tập tin:** `src/components/sections/HeroSection.tsx`, `src/components/visuals/NinhDeskScene.tsx`.
- **Cơ chế hoạt động:**
  - **Kinetic Shimmer Headline:** Thêm một lớp chữ gradient phủ trên tiêu đề chính với vệt sáng lướt qua theo chu kỳ hoặc theo vị trí chuột.
  - **Border Beam Pills:** Các huy hiệu chuyên môn có tia sáng laser chạy vòng quanh viền.
  - **3D Camera Parallax:** Tinh chỉnh camera của `NinhDeskScene` để góc nhìn xoay nhẹ (`rotation.y = mouseX * 0.15`, `rotation.x = mouseY * 0.08`), tạo chiều sâu tương tác trực tiếp.

### Module 5: Experience Section – Cyber Circuit Neon Pipeline & Live Telemetry
- **Tập tin:** `src/components/sections/ExperienceSection.tsx`.
- **Cơ chế hoạt động:**
  - **SVG Glowing Circuit Path:** Vẽ đường kết nối dạng mạch vi điện tử giữa 4 trạm: `GPS Ping` -> `Map Match` -> `Detour & ETA` -> `Station Ranking`.
  - **Photon Pulse Animation:** Một gói xung photon phát sáng (laser dot với hiệu ứng drop-shadow phát quang) chạy dọc đường dẫn SVG theo chu kỳ hoặc theo vị trí cuộn trang.
  - **Telemetry Count-Up:** Các số liệu kỹ thuật (`+2.4km`, `6 phút ETA`, `99.4%`) đếm số động từ 0 đến giá trị đích khi thẻ trượt vào viewport.

### Module 6: Skills Section – Zero-Gravity Interactive Physics Field
- **Tập tin:** `src/components/sections/SkillsSection.tsx`, `src/components/ui/InteractiveSkillPill.tsx`.
- **Cơ chế hoạt động:**
  - Mỗi badge kỹ năng được gắn tọa độ vật lý `(x, y, vx, vy)`.
  - Các badge dao động nhẹ nhàng (Zero-gravity floating).
  - Khi con trỏ chuột lướt vào khu vực kỹ năng, các badge trong vùng ảnh hưởng bị đẩy nhẹ ra xung quanh tạo hiệu ứng tương tác xúc giác tự nhiên.
  - Laser Scan: Một thanh quét radar phát sáng quét ngang qua các danh mục kỹ năng theo chu kỳ.

### Module 7: About & Education – 3D Gyroscope Avatar & Holographic Badges
- **Tập tin:** `src/components/sections/AboutSection.tsx`.
- **Cơ chế hoạt động:**
  - Avatar chữ "N" được bọc trong container 3D, khi rê chuột vào có thể lật xoay 360 độ (3D Coin Flip) để lộ mặt sau là icon code sáng tạo.
  - Các thẻ học vấn HaUI và VinUni phản chiếu ánh sáng đổi màu đa sắc (Iridescent pearlescent glow) khi thay đổi góc nghiêng chuột.

### Module 8: Contact Section – Cyber Confetti Burst & Starlight Finale
- **Tập tin:** `src/components/sections/ContactSection.tsx`, `src/components/visuals/StarlightCanvas.tsx`.
- **Cơ chế hoạt động:**
  - **Gamified Cyber Confetti Burst:** Khi click nút "Sao chép Email", kích hoạt hiệu ứng pháo hoa hạt sáng đa màu (sắc xanh teal, ngọc bích, vàng kim và trắng) nổ bung tỏa hình nón từ vị trí nút bấm.
  - **Magnetic Scroll-to-Top:** Nút cuộn lên đầu trang có từ tính mạnh, hút theo con trỏ chuột và kích hoạt cuộn gia tốc êm dịu (Smooth Acceleration Scroll).
  - **Starlight Finale Canvas:** Dưới đáy chân trang là một Canvas vẽ các đốm sao li ti lấp lánh và các chùm sao mờ phản ứng theo chuột.

### Module 9: Dynamic Morphing Navbar & Magnetic Indicators
- **Tập tin:** `src/components/sections/Navbar.tsx`.
- **Cơ chế hoạt động:**
  - Khi cuộn trang qua 100px: Navbar tự động co nhỏ padding, chuyển sang dạng thanh Dynamic Island nổi với bóng đổ sâu và viền gương phản chiếu.
  - Thêm vạch tiến độ cuộn trang (Scroll Progress Bar) neon mảnh 2px ở mép dưới navbar.
  - Sliding Magnetic Indicator: Đốm sáng trượt mượt mà theo sau từng menu link khi rê chuột qua.

---

## 4. Kế hoạch Kiểm thử & Đảm bảo Chất lượng (QA & Verification)

1. **Kiểm tra TypeScript & Build:** Chạy `npm run typecheck` và `npm run build` đảm bảo không có lỗi type hoặc lỗi biên dịch Next.js.
2. **Kiểm tra Tương thích Di động (Touch & Mobile QA):**
   - Không xuất hiện lỗi con trỏ chuột trên thiết bị không có chuột.
   - Master Slider hoạt động mượt mà với cảm ứng vuốt chạm `touchstart` / `touchmove` / `touchend`.
3. **Kiểm tra Khả năng Tiếp cận (Reduced Motion):**
   - Khi bật `prefers-reduced-motion: reduce`, toàn bộ hiệu ứng chuyển dịch lớn và hạt vật lý tự động dừng lại hoặc chuyển sang fade-in đơn giản.
4. **Kiểm tra Hiệu năng (Performance Check):**
   - Đảm bảo FPS duy trì ổn định >55 FPS trên trình duyệt Chrome/Edge.
   - Không rò rỉ bộ nhớ (Memory leaks) từ `requestAnimationFrame` hay `setInterval` (toàn bộ effect đều có hàm cleanup đầy đủ).

---

## 5. Danh sách Tập tin Ảnh hưởng (Files Affected)

- **Tạo mới:**
  - `src/components/visuals/FluidMagneticCursor.tsx`
  - `src/components/visuals/InteractiveCloudCanvas.tsx`
  - `src/components/visuals/StarlightCanvas.tsx`
  - `src/components/ui/Master3DSlider.tsx`
  - `src/components/ui/HolographicTiltCard.tsx`
  - `src/components/ui/InteractiveSkillPill.tsx`
  - `src/hooks/useMagnetic.ts`
  - `src/hooks/useMouseRepulsion.ts`
- **Chỉnh sửa nâng cấp:**
  - `src/app/page.tsx`
  - `src/app/globals.css`
  - `src/components/sections/Navbar.tsx`
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/ProjectsSection.tsx`
  - `src/components/sections/ExperienceSection.tsx`
  - `src/components/sections/SkillsSection.tsx`
  - `src/components/sections/AboutSection.tsx`
  - `src/components/sections/ContactSection.tsx`
  - `src/components/visuals/CloudVeilTransition.tsx`
  - `src/components/visuals/NinhDeskScene.tsx`
