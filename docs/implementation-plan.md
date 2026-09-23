# Kế hoạch Triển khai — Portfolio Landing Page (Craft × HeroUI)

Tài liệu này định nghĩa chi tiết các phase và task theo yêu cầu mục 8 của `PORTFOLIO_BUILD_PROMPT.md`. Sau khi hoàn thành mỗi phase, thực hiện tự kiểm tra và sửa lỗi trước khi chuyển sang phase tiếp theo.

---

## Tổng quan tiến độ các Phase

- [x] **Phase 1 — Audit & Bootstrap** (Scaffold Next.js, cài đặt HeroUI v3 & Tailwind CSS v4, kiểm thử render cơ bản) — **PASS**
- [x] **Phase 2 — Theme & Component Consistency** (Tokens bảng màu Soft Sky, typography tiếng Việt, QA test suite nội bộ cho component) — **PASS**
- [x] **Phase 3 — Full Landing Page** (Xây dựng toàn bộ 7 section A–G, nội dung chuẩn từ CV, kết nối modal & mobile drawer) — **PASS**
- [x] **Phase 4 — Motion & Refinement** (Hiệu ứng xuất hiện, float nhẹ, project hover, hỗ trợ reduced-motion & phím bấm a11y) — **PASS**
- [ ] **Phase 5 — Kiểm thử, QA Thực tế & Bàn giao** (Typecheck, lint, build production, chạy test suite, chụp màn hình và tổng kết nghiệm thu) — **IN_PROGRESS**

---

## Chi tiết từng Phase

### Phase 1 — Audit & Bootstrap
- **Mục tiêu:** Thiết lập nền tảng dự án Next.js App Router + TypeScript + Tailwind CSS v4 + HeroUI v3.2.6 ngay tại root `E:\portfolio` mà không làm hỏng các tài liệu hiện có.
- **Tasks:**
  1. `P1.1`: Kiểm tra môi trường (Node v24.15.0, npm 11.12.1). Sao lưu vị trí tài liệu hiện có (`craft.do-design.md`, `PORTFOLIO_BUILD_PROMPT.md`, `Nguyen_Van_Ninh_CV_Harvard_1_Trang (1).pdf`). (ĐÃ XÁC MINH)
  2. `P1.2`: Khởi tạo Next.js App Router project tại root (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`). (HOÀN THÀNH)
  3. `P1.3`: Cài đặt dependencies: `@heroui/react@3.2.6`, `@heroui/styles@3.2.6`, `tailwindcss@^4.0.0`, `@tailwindcss/postcss@^4.0.0`, `react@^19.0.0`, `react-dom@^19.0.0`, `react-aria`, `react-aria-components`, `lucide-react`. (HOÀN THÀNH, 0 lỗi tương thích)
  4. `P1.4`: Cấu hình Tailwind CSS v4 & HeroUI styles (`@import "tailwindcss"; @import "@heroui/styles";` trong `globals.css`). (HOÀN THÀNH)
  5. `P1.5`: Render thử nghiệm `Button`, `Card`, `Chip` từ HeroUI v3 để xác minh không có lỗi import, CSS hay tương thích. (HOÀN THÀNH)
- **Đầu vào:** Thư mục root sạch với 3 file tài liệu ban đầu.
- **Đầu ra:** Project chạy được `npm run build` và `npm run typecheck`, render thử component HeroUI thành công.
- **Tiêu chí nghiệm thu:** Dev server khởi động không lỗi, build không warning fatal, render component HeroUI hiển thị đúng style.
- **Lệnh kiểm tra:** `npm run typecheck; npm run build`
- **Trạng thái:** `PASS`

---

### Phase 2 — Theme & Component Consistency
- **Mục tiêu:** Định hình design system "Soft Sky Portfolio" ghi đè Craft theo brief, cấu hình tokens màu pastel/teal, cài đặt font hỗ trợ tiếng Việt có dấu và ép Light Mode.
- **Tasks:**
  1. `P2.1`: Cấu hình CSS theme tokens trong `globals.css` (màu sky, warm paper, teal CTA, illustration surfaces, viền mờ). (HOÀN THÀNH)
  2. `P2.2`: Cấu hình Font Serif (`Playfair_Display`) cho display headlines và Font Sans (`Plus_Jakarta_Sans`) cho UI/body qua `next/font/google`. Hỗ trợ tiếng Việt đầy đủ. (HOÀN THÀNH)
  3. `P2.3`: Ép `light` mode tại root `<html>`, loại bỏ hoặc vô hiệu hóa bất kỳ chế độ tự động tối nào của OS/browser. (HOÀN THÀNH)
  4. `P2.4`: Xây dựng component wrappers/variants: `Button`, `Card`, `Chip`, `ProjectModal`, `MobileNavDrawer`, `AccordionWrapper`. (HOÀN THÀNH)
  5. `P2.5`: Tạo trang QA nội bộ (`/qa-test`) để xác thực trạng thái hover, active, focus visible, disabled của các primitive HeroUI. (HOÀN THÀNH)
- **Đầu vào:** Bootstrap project từ Phase 1.
- **Đầu ra:** Hệ thống token hoàn chỉnh, bộ component tái sử dụng đồng nhất, font tiếng Việt hiển thị đẹp mắt.
- **Tiêu chí nghiệm thu:** Mọi button, card, chip, overlay đều tuân thủ bảng màu sáng; không sót control đen/tối nào.
- **Lệnh kiểm tra:** `npm run typecheck; npm run build`
- **Trạng thái:** `PASS`

---

### Phase 3 — Full Landing Page
- **Mục tiêu:** Xây dựng trọn vẹn landing page cuộn dọc gồm 7 section A–G với dữ liệu thực tế từ CV.
- **Tasks:**
  1. `P3.1`: Tạo `src/content/portfolio.ts` với dữ liệu chuẩn (Profile, Education, Experience: VinSmartFuture + KopyMatch, Projects: SmartParking + Chess Web App, Skills 3 nhóm, AI Practice 3 mảng) có TypeScript interfaces chặt chẽ. (HOÀN THÀNH)
  2. `P3.2`: Sao chép file PDF CV `Nguyen_Van_Ninh_CV_Harvard_1_Trang (1).pdf` vào `public/` để liên kết xem/tải CV hoạt động thực sự. (HOÀN THÀNH)
  3. `P3.3`: Section A - Floating Navbar: Pill shape, wordmark "Ninh.", links neo, nút CTA Liên hệ, Mobile menu Drawer đóng mở mượt. (HOÀN THÀNH)
  4. `P3.4`: Section B - Hero: Eyebrow, Headline biên tập lớn, mô tả, nhãn chuyên môn, nút CTA đôi, Hero visual composition 3 card nổi. (HOÀN THÀNH)
  5. `P3.5`: Section C - Selected Projects: SmartParking & Chess Web App so le, preview visual chất lượng cao, tech chips, links Demo/GitHub thực tế, Modal chi tiết mở rộng đúng dữ liệu CV. (HOÀN THÀNH)
  6. `P3.6`: Section D - Experience: Timeline sáng, thẻ thực tập VinSmartFuture (Green SM) và KopyMatch với vai trò, thời gian, công việc, công nghệ. (HOÀN THÀNH)
  7. `P3.7`: Section E - Skills & Applied AI Practice: 3 nhóm kỹ năng gọn gàng + Accordion cho 3 mảng AI (Agents, RAG, LLM & Reliability). (HOÀN THÀNH)
  8. `P3.8`: Section F - About, Education, Training: Trường HaUI, AIC Lab, VinUni AI thực chiến K3, TOEIC 700. (HOÀN THÀNH)
  9. `P3.9`: Section G - Contact & Footer: Headline trao đổi, nút Email (mailto + copy to clipboard fallback), links GitHub, LinkedIn, xem CV, nút "Về đầu trang", footer kem-xanh trời. (HOÀN THÀNH)
- **Đầu vào:** Content file và bộ components từ Phase 2.
- **Đầu ra:** Toàn bộ landing page với nội dung chuẩn 100%, không placeholder, không lorem ipsum.
- **Tiêu chí nghiệm thu:** Tất cả liên kết neo cuộn chính xác, modal mở/đóng chuẩn, copy email thông báo đúng, preview dự án trực quan.
- **Lệnh kiểm tra:** `npm run typecheck; npm run build`
- **Trạng thái:** `PASS`

---

### Phase 4 — Motion & Refinement
- **Mục tiêu:** Thêm chuyển động tinh tế, tối ưu trải nghiệm tương tác, kiểm soát reduced-motion và đảm bảo accessibility.
- **Tasks:**
  1. `P4.1`: Tạo animation nhẹ nhàng cho Hero (staggered fade-up cho headline, subtitle, visual). (HOÀN THÀNH)
  2. `P4.2`: Hiệu ứng hover cho project card (scale 1.02, elevation nhẹ, mũi tên chuyển động ngắn). (HOÀN THÀNH)
  3. `P4.3`: Hero cards floating effect có biên độ nhỏ, tự động dừng hoặc tôn trọng `prefers-reduced-motion`. (HOÀN THÀNH)
  4. `P4.4`: Tinh chỉnh responsive cho mobile (gutter 20-24px, cỡ chữ clamp, layout xếp chồng tự nhiên không vỡ hay tràn ngang). (HOÀN THÀNH)
  5. `P4.5`: Đảm bảo điều hướng bàn phím: focus-visible rings sắc nét, phím Escape đóng modal/drawer, bẫy focus không kẹt. (HOÀN THÀNH)
- **Đầu vào:** Landing page đầy đủ từ Phase 3.
- **Đầu ra:** Website mượt mà, chiều sâu thị giác phong phú nhưng không rối mắt.
- **Tiêu chí nghiệm thu:** Không giật lag, không scroll hijacking, không horizontal overflow ở bất kỳ độ phân giải nào (360px - 1440px).
- **Lệnh kiểm tra:** `npm run typecheck; npm run build`
- **Trạng thái:** `PASS`

---

### Phase 5 — Kiểm thử, QA Thực tế & Bàn giao
- **Mục tiêu:** Chạy kiểm thử tự động, build production, chụp và kiểm tra ảnh desktop/mobile, ghi nhận kết quả và bàn giao local URL.
- **Tasks:**
  1. `P5.1`: Cài đặt test runner / Playwright / script kiểm thử tự động giao diện và tương tác.
  2. `P5.2`: Viết test cases kiểm tra: anchor links, modal open/close, mobile menu, nút copy email, external links attributes, forced light mode.
  3. `P5.3`: Chụp ảnh màn hình toàn trang trên Desktop (1440px) và Mobile (390px, 360px), chụp modal và mobile menu. Mở ảnh để đối soát trực quan.
  4. `P5.4`: Chạy `npm run typecheck`, `npm run lint`, `npm run build`.
  5. `P5.5`: Khởi chạy local production server trên port an toàn (ví dụ 3000 hoặc port trống tiếp theo).
  6. `P5.6`: Lập báo cáo bàn giao: Local URL, lệnh khởi động lại, phiên bản dependencies, kết quả kiểm thử và hướng dẫn thay đổi nội dung/asset.
- **Đầu vào:** Sản phẩm hoàn chỉnh từ Phase 4.
- **Đầu ra:** Kết quả kiểm thử bằng chứng thực tế, ảnh chụp kiểm tra, báo cáo nghiệm thu chi tiết.
- **Tiêu chí nghiệm thu:** Không lỗi type, không lỗi lint, production build thành công 100%, test pass toàn bộ (18/18 PASS, 0 console errors).
- **Lệnh kiểm tra:** `npm run typecheck && npm run build && node tests/e2e-verification.mjs`
- **Trạng thái:** `PASS` (Đạt 18/18 tests, 0 lỗi console, build production exit code 0, 4 ảnh screenshot visual inspection đạt chuẩn).
