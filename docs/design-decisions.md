# Quyết định Thiết kế — “Soft Sky Portfolio” (Craft × HeroUI)

Tài liệu này ghi lại các quyết định thiết kế và các ghi đè có chủ đích so với file đặc tả gốc `craft.do-design.md`, tuân thủ nghiêm ngặt yêu cầu trong `PORTFOLIO_BUILD_PROMPT.md`.

---

## 1. Triết lý chung

Giữ trọn vẹn tinh thần cốt lõi của phong cách **Craft Soft Editorial**:
- Bố cục thoáng đãng, nhiều khoảng thở (breathable whitespace), nhịp điệu biên tập (editorial rhythm).
- Typography kết hợp giữa **Serif** biểu cảm cho các tiêu đề lớn và **Sans** hiện đại, rõ nét cho nhãn, nút bấm, thông tin chi tiết.
- Các bề mặt nổi (floating cards / panels) mềm mại như giấy hoặc kính mờ với shadow khuếch tán nhẹ, bo góc lớn (`rounded-3xl` / pill).
- Tránh cảm giác nặng nề, góc cạnh sắc nhọn hoặc phân cấp quá cứng.

---

## 2. Các ghi đè bắt buộc (Overrides)

| Thành phần | Đặc tả gốc trong Craft | Ghi đè trong Soft Sky Portfolio | Lý do ghi đè |
| :--- | :--- | :--- | :--- |
| **Primary Color / Ink** | `#030302` (đen tuyền) | `#183B4E` (Deep Ink Blue / Xanh mực thẫm) | Loại bỏ hoàn toàn màu đen sắc lạnh; tạo sự hòa hợp hữu cơ với gam màu trời và giấy kem. |
| **Primary CTA Button** | Nền `#030302` chữ `#FFFFFF` | Nền `#176B87` (Ocean Teal) chữ `#FFFFFF` | Brief cấm nút đen; CTA teal tạo điểm nhấn hành động tương phản cao nhưng ấm áp, thân thiện. |
| **Page Background** | `#FCF9F7` (kem ấm) | `#FCF9F7` với các dải gradient khuếch tán pastel (`#D7EAF0` và `#A9D8F2`) | Tăng chiều sâu khí hậu (sky-like atmosphere) mà vẫn giữ nền giấy tự nhiên. |
| **Bảng màu bề mặt phụ** | Muted gray `#F3F1EE` | Hệ màu minh họa: Lavender (`#EEE7FA`), Peach (`#FFE6D6`), Mint (`#DDF3E8`) | Dành riêng cho 3 mảng minh họa dự án (Chess: Lavender, Green SM: Mint, SmartParking: Sky/Peach). |
| **Viền & Ngăn cách** | `#03030217` | `rgba(66, 126, 138, 0.14)` (Teal tint) | Viền trong suốt mang ánh xanh nhẹ, không bao giờ để lại vệt xám/đen. |
| **Chế độ hiển thị (Theme)** | Hỗ trợ hoặc không quy định | **Ép Light Theme 100%** từ root document. Cấm Dark Mode, theme toggle hay auto dark của OS. | Yêu cầu nghiêm ngặt của brief: không có nền đen, không có section tối, kể cả menu, modal, backdrop hay footer. |
| **Overlay / Backdrop** | Đen mờ tiêu chuẩn | `rgba(24, 59, 78, 0.25)` kết hợp `backdrop-blur-md` sáng | Giữ ánh sáng thông suốt khi mở Modal hoặc Mobile Drawer. |

---

## 3. Bảng mã màu chuẩn (Design Tokens)

```css
:root {
  --color-page: #FCF9F7;            /* Warm paper */
  --color-card: #FFFFFF;            /* Clean surface */
  --color-sky-surface: #D7EAF0;     /* Soft sky panel */
  --color-sky-accent: #A9D8F2;      /* Cloud / sky highlight */
  --color-primary-cta: #176B87;     /* High-contrast Teal CTA */
  --color-primary-cta-hover: #13556c;
  --color-secondary-teal: #427E8A;  /* Accent icons, badges, borders */
  --color-text-main: #183B4E;       /* Deep ink navy */
  --color-text-muted: #526779;      /* Slate blue for subtitles/body */
  --color-border-soft: rgba(66, 126, 138, 0.14);

  /* Project Illustration Accents */
  --color-lavender: #EEE7FA;
  --color-peach: #FFE6D6;
  --color-mint: #DDF3E8;
}
```

---

## 4. Typography & Hỗ trợ Tiếng Việt

- **Serif Font (Headlines):** Lựa chọn font hỗ trợ tiếng Việt đầy đủ với dấu thanh chuẩn (như `Newsreader` hoặc `Playfair Display` qua Google Fonts), kiểm tra kỹ với từ ngữ như *"Nguyễn Văn Ninh", "Kỹ thuật Phần mềm", "Thực hành AI"*.
- **Sans Font (UI, Controls, Body):** `Plus Jakarta Sans` hoặc `Inter` với độ hiển thị rõ nét ở mọi cỡ chữ từ 12px đến 18px.
- **Tỉ lệ cỡ chữ:**
  - Hero Desktop: `clamp(2.5rem, 5vw, 4.5rem)`
  - Section Headings: `clamp(1.8rem, 3.5vw, 2.75rem)`
  - Body copy: `1rem` (16px) – `1.125rem` (18px)
  - CTA / Labels: `0.9375rem` (15px) – `1rem` (16px), medium/semibold.

---

## 5. Tích hợp HeroUI v3

- Sử dụng phiên bản HeroUI v3.2.6 với Tailwind CSS v4.
- Không dùng API cũ từ NextUI v2 (như `HeroUIProvider` bọc toàn cục kiểu v2, không import `Navbar` bị bãi bỏ trong v3).
- Sử dụng các primitive chính thống:
  - `Button`, `Link` cho tương tác điều hướng và CTA.
  - `Card`, `Card.Header`, `Card.Body`, `Card.Footer` cho khối dự án và hồ sơ.
  - `Chip` cho nhãn công nghệ.
  - `Modal`, `Modal.Backdrop`, `Modal.Content` cho xem chi tiết dự án.
  - `Accordion` cho nhóm thực hành AI ứng dụng.
  - `Drawer` (hoặc Dialog sheet) cho Mobile Navigation.
- Navigation bar được dựng bằng semantic HTML + CSS floating pill, tích hợp các nút bấm HeroUI v3.
