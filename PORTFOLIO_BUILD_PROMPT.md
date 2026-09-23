# Portfolio Landing Page — Craft × HeroUI

## Nhiệm vụ

Bạn là Senior Frontend Engineer + Creative Web Designer. Hãy lên kế hoạch theo phase, sau đó thực thi để tạo portfolio landing page hoàn chỉnh chạy local. Không chỉ viết plan hoặc tạo một hero rồi dừng.

Workspace người dùng: `E:\portfolio` trên Windows. Nếu làm trong WSL, xác minh đường dẫn tương ứng trước khi thao tác; không tạo một bản project thứ hai ở nơi khác.

Ảnh thư mục hiện chỉ hiển thị `craft.do-design.md`. Đây là thông tin khởi đầu, không phải kết quả kiểm tra filesystem. Hãy tự đọc thư mục, kể cả file ẩn và Git state. Không mặc định đã có ứng dụng Next.js, package.json, Git repository hoặc bản export từ Stitch.

## 1. Nguồn và phạm vi

- Đọc toàn bộ `craft.do-design.md` đang có tại root.
- Nội dung cá nhân được cung cấp trong mục 6 dưới đây, trích từ CV người dùng đã gửi. Không cần có PDF trong workspace để bắt đầu.
- Nếu có PDF `Nguyen_Van_Ninh_CV_Harvard_1_Trang (1).pdf`, đọc cả text và hyperlink để đối chiếu. Không tự tìm CV khác trên mạng.
- Nếu phát hiện bản export/screenshot Stitch thực sự có trong workspace, dùng nó để tham khảo bố cục; không coi ảnh File Explorer là mẫu thiết kế website.
- Repo thư viện phải sử dụng: https://github.com/heroui-inc/heroui

Thứ tự ưu tiên:
1. Yêu cầu người dùng và các ghi đè trong brief này.
2. CV được cung cấp cho dữ kiện cá nhân.
3. File Craft cho ngôn ngữ thị giác.
4. Tài liệu HeroUI đúng phiên bản cho cách triển khai component.

Mục tiêu: một website portfolio cá nhân dạng landing page cuộn dọc, sáng, có màu, typography editorial, chiều sâu và chuyển động mềm. Không phải dashboard, trang bán SaaS, agency, trang CV toàn chữ hoặc trò chơi 3D.

Chỉ triển khai frontend và dữ liệu nội dung tĩnh. Không thêm backend, auth, database, CMS, AI chatbot, analytics trả phí hoặc hệ thống gửi email. Không deploy, push Git hoặc thay đổi DNS trong task này.

## 2. Cách dùng HeroUI — bắt buộc

HeroUI là hệ component nền, không phải một mẫu website cần sao chép diện mạo.

- Cài thư viện qua package manager. KHÔNG clone toàn bộ monorepo HeroUI vào portfolio; KHÔNG biến project thành fork thư viện.
- Mốc tham khảo kiểm chứng ngày 22/09/2026: release stable của repo là v3.2.6. Trước khi cài, kiểm tra registry và peer dependencies thực tế. Chọn stable v3 tương thích, ghi lại phiên bản chính xác và giữ một lockfile.
- Kiểm tra `npm view @heroui/react version peerDependencies` và thông tin của `@heroui/styles`; dùng lệnh tương đương nếu workspace đã có package manager khác.
- Đọc quick start, theming, component API và framework guide của v3. Không dùng ví dụ NextUI/HeroUI v2 cho v3.
- Đặc biệt: không tự thêm HeroUIProvider, Tailwind plugin kiểu v2, props cũ hoặc import Navbar chỉ vì nhớ API cũ. Kiểm tra export/API hiện hành trước.
- Không dùng `--force` hoặc `--legacy-peer-deps` để che lỗi tương thích. Giải quyết nguyên nhân và chạy build xác nhận.

Tài liệu:
- https://heroui.com/en/docs/react/getting-started/quick-start
- https://heroui.com/en/docs/react/getting-started/frameworks
- https://heroui.com/en/docs/react/getting-started/theming
- https://heroui.com/en/docs/react/components
- https://heroui.com/llms.txt

Đọc tài liệu bằng công cụ sẵn có. Không yêu cầu người dùng cài thêm MCP mới chỉ để tiếp tục; truy cập docs trực tiếp là đủ. Không sửa cấu hình agent toàn cục.

Stack mặc định cho workspace chưa có app:
- Next.js App Router và React phiên bản stable tương thích.
- TypeScript strict.
- Tailwind CSS v4.
- HeroUI v3: `@heroui/react` và `@heroui/styles`, cùng peer dependencies thực sự cần.
- CSS cho chuyển động đơn giản; chỉ thêm Motion for React nếu cần cho choreography và interaction của trang.
- Một bộ icon duy nhất, chẳng hạn Lucide.

Không thêm đồng thời Motion, GSAP, Lenis và nhiều bộ animation. Không cài Three.js, React Three Fiber, engine vật lý chỉ để có tên công nghệ. Bản đầu phải đạt chiều sâu bằng phối cảnh, ánh sáng và layer có chủ đích; nếu dùng WebGL thật phải có lý do thị giác cụ thể, lazy load và fallback.

Các control dùng HeroUI khi thư viện có primitive phù hợp:
- CTA và hành động: Button; liên kết dùng Link hoặc cơ chế render anchor được hỗ trợ đúng API.
- Khối project có cấu trúc card: Card; nhãn công nghệ: Chip.
- Chi tiết dự án: Modal.
- Menu mobile: Drawer hoặc primitive phù hợp của phiên bản đã cài.
- Thực hành AI: Accordion.
- Tooltip/Toast chỉ khi có nhu cầu thật, không thêm để trưng bày thư viện.

Header, nav, section, layout grid, timeline và hero visual vẫn có thể là HTML semantic + CSS. Không ép mọi đoạn văn vào Card. Không thêm shadcn/ui, MUI, Ant Design hoặc một bộ primitive khác làm hệ UI song song.

Tạo wrapper mỏng khi giúp thống nhất thiết kế; giữ ref, accessibility props, focus và composition của HeroUI. Không tự viết lại modal/menu/focus trap.

## 3. Design system — “Soft Sky Portfolio”

Giữ từ Craft:
- Nền giấy kem và xanh trời, khoảng trắng rộng.
- Headline serif lớn, UI/body sans dễ đọc.
- Navbar nổi dạng pill.
- Card như những tấm giấy/giao diện nổi, shadow khuếch tán.
- Bo tròn mềm, đường viền nhẹ, chuyển tiếp không gắt.

Ghi đè bắt buộc:
- KHÔNG có nền đen, charcoal, navy tối, gradient chuyển sang đen hoặc footer tối.
- KHÔNG làm tổng thể đen–trắng chỉ có một nút xanh.
- KHÔNG dark mode, theme switch hoặc tự theo giao diện tối của hệ điều hành.
- Bỏ primary button đen trong file Craft. Đổi chữ đen thuần sang xanh mực.
- Menu mobile, modal, tooltip và backdrop cũng phải theo hệ sáng; tránh backdrop đen phủ màn hình.
- Không sửa mất file Craft gốc. Ghi quyết định ghi đè vào `docs/design-decisions.md`.

Bảng màu:
- Page / warm paper: #FCF9F7
- Card surface: #FFFFFF
- Sky surface: #D7EAF0
- Decorative sky: #A9D8F2
- Primary CTA: #176B87, chữ #FFFFFF
- Secondary teal: #427E8A
- Main text: #183B4E
- Muted text: #526779
- Lavender surface: #EEE7FA
- Peach surface: #FFE6D6
- Mint surface: #DDF3E8
- Soft border: rgba(66,126,138,0.14)

Xanh trời và kem là màu chính; lavender/mint/peach dành cho các vùng minh họa dự án. Không tự đổi hướng sang tím neon hoặc màu tối.

Khai báo token tại một nguồn CSS chung và ánh xạ sang semantic tokens của HeroUI theo đúng phiên bản. Phân biệt màu sky trang trí với accent dùng cho CTA; không dùng nền xanh quá nhạt cho nút chữ trắng. Kiểm tra các token surface/overlay/foreground/accent/border/focus để không còn control mặc định lệch palette.

Import CSS theo quick start của phiên bản đã chọn, hiện tại theo thứ tự:

    @import "tailwindcss";
    @import "@heroui/styles";

Đặt overrides đúng layer/thứ tự theo tài liệu và kiểm tra computed styles. Không rải hex color trong từng component, không sửa CSS trong node_modules, không dùng !important tràn lan.

Ép light theme từ lần render đầu, ở root document. Thử cả browser emulating dark preference và portal modal/drawer để chắc chắn không rơi về theme tối. Không cài theme-switching package cho task chỉ có light theme.

Typography và layout:
- Chọn một cặp serif/sans có quyền sử dụng rõ và hỗ trợ tiếng Việt; không lấy font thương mại Craft từ website của họ.
- Dùng font có dấu tiếng Việt đầy đủ, kiểm tra tên “Nguyễn Văn Ninh”.
- Hero desktop 64–80px, mobile 38–46px; section heading khoảng 40–52px desktop; body 16–18px.
- Dùng clamp và line-height phù hợp thay vì cố định mọi viewport.
- Container khoảng 1200px; khoảng cách section 96–120px desktop, 56–72px mobile.
- Card radius 24–32px; CTA pill cao khoảng 52–56px; gutter mobile 20–24px.
- Chữ body và CTA phải đủ tương phản; không hy sinh khả năng đọc để có pastel.

## 4. Bố cục landing page

Nội dung chính bằng tiếng Việt; giữ tên công nghệ và chức danh chuyên môn khi cần. Không có nút VI/EN giả.

### A. Floating navigation
Wordmark “Ninh.”; các mục Dự án / Kinh nghiệm / Năng lực / Giới thiệu; CTA Liên hệ.

Navbar sáng hơi trong, không che nội dung khi cuộn. Dùng anchor thật, scroll-margin-top và trạng thái active nếu triển khai được gọn. Mobile có menu mở/đóng, không tràn ngang.

### B. Hero
Eyebrow: “Nguyễn Văn Ninh · Hà Nội, Việt Nam”.

Headline đề xuất: “Từ ý tưởng đến sản phẩm có thể trải nghiệm.”

Mô tả: “Tôi là sinh viên Kỹ thuật Phần mềm, xây dựng backend, ứng dụng AI và giao diện web — với sự chú trọng vào luồng sử dụng, tích hợp và kiểm thử.”

Dòng chuyên môn: Backend · AI Applications · Frontend.

CTA chính: Khám phá dự án.
CTA phụ: Xem CV khi có file thật; nếu chưa có, dùng Xem hồ sơ và cuộn tới phần giới thiệu. Không hiển thị nút tải PDF hỏng.

Hero chính giữa, chữ lớn, phía dưới là một composition nổi chiếm khoảng 40–55% khu vực hero trên desktop. Không dùng bố cục mặc định chữ bên trái + ảnh stock bên phải.

Visual chủ đạo: ba tấm giao diện như giấy/kính pastel, phối cảnh nhẹ và ánh sáng mềm:
- SmartParking: sơ đồ bãi đỗ sáng.
- Chess: bàn cờ kem/lavender.
- Green SM: sơ đồ driver → station → destination trên nền mint, minh họa cho kinh nghiệm thực tập, không giả làm sản phẩm public thứ ba.

Dùng asset local, SVG hoặc CSS do mình dựng. Nếu chưa có screenshot thật, ghi nhãn “Minh họa dự án”. Không hiển thị số liệu vận hành giả, ảnh người giả hay screenshot bịa. Không thay visual bằng ba icon nhỏ hoặc một quả cầu gradient không liên quan.

Ở viewport đầu phải thấy rõ tên, chuyên môn, CTA và một phần đáng kể của visual. Không chừa khoảng trống cực lớn khiến người xem tưởng trang chưa tải.

### C. Selected projects
Hai project lớn, bố cục so le; preview chiếm diện tích đáng kể, phần chữ gọn. Mỗi project có tên, vai trò, tóm tắt đóng góp, stack, Demo, GitHub và Chi tiết.

Không dùng lưới sáu card giống nhau; không tự thêm dự án để làm đầy trang. Modal chi tiết chỉ mở rộng thông tin có trong mục 6, không bịa challenge/result/metrics.

### D. Experience
Timeline sáng: VinSmartFuture (Green SM), sau đó KopyMatch. Phân biệt vai trò, thời gian, công việc và công nghệ. Không biến internship thành khách hàng hay sản phẩm đã chạy production.

### E. Skills and applied AI practice
Ba nhóm gọn: Backend & dữ liệu / Frontend & trải nghiệm / Công cụ & chất lượng.

Bên dưới là “Thực hành AI ứng dụng”, dùng Accordion cho Agents, RAG, LLM & reliability. Không dùng phần trăm kỹ năng, skill bar hoặc wall of logos dài.

### F. About, education, training
Đoạn giới thiệu ngắn và các dòng học vấn/đào tạo theo mục 6. Có khoảng trắng và nhịp editorial, không tiếp tục nhốt tất cả vào card.

### G. Contact and footer
Headline: “Trao đổi về dự án tiếp theo.” CTA email, GitHub, LinkedIn, CV nếu có file thật. Footer xanh trời hòa vào kem, có Về đầu trang.

Không pricing, testimonial, client logos, số năm kinh nghiệm tự suy đoán, “Available for freelance”, form gửi thành công giả hoặc cam kết phản hồi trong X giờ.

## 5. Interaction, motion và nội dung media

- Hero xuất hiện theo thứ tự eyebrow/headline → mô tả/CTA → visual, chuyển động ngắn và mềm.
- Visual có float/parallax biên độ thấp; không xoay liên tục hoặc làm người đọc khó tập trung.
- Project hover nâng nhẹ, preview scale khoảng 1.02, mũi tên chuyển động ngắn.
- Section reveal nhẹ; nội dung không bị giữ ẩn nếu JS hoặc animation thất bại.
- Ưu tiên opacity/transform; tránh cập nhật state React liên tục theo từng pixel của con trỏ.
- Không scroll hijacking, preloader dài, âm thanh tự phát hoặc custom cursor che UI.
- Support prefers-reduced-motion: tắt chuyển động lặp/parallax và giữ nội dung đọc được. Mọi chuyển động tự chạy liên tục phải có cách dừng; ưu tiên tự dừng hero float sau đoạn intro thay vì chạy vô hạn.
- Mobile bỏ hover-only interaction, giảm layer/blur/parallax; không chỉ thu nhỏ desktop.
- Không mặc định gọi CSS perspective là WebGL hoặc 3D runtime. Báo đúng kỹ thuật đã làm.

Các hành động phải hoạt động thật:
- Anchor dẫn đúng section.
- Modal có tên truy cập, đóng bằng nút/Escape, focus trả về trigger và không kẹt scroll.
- Menu mobile dùng được bằng bàn phím, đóng sau khi chọn mục.
- External links dùng URL mục 6; không mở iframe website ngoài để giả lập demo.
- Email dùng mailto. Nếu có Copy email thì chỉ báo thành công sau khi clipboard thành công; có fallback khi lỗi.
- PDF: chỉ tạo link sau khi file thực sự tồn tại. Không tải toàn bộ thư mục nguồn hoặc CV khác từ mạng.

Không upload tài liệu cá nhân đến dịch vụ bên thứ ba. Chỉ dùng dữ kiện cần thiết trong trang; không tự đưa số điện thoại lên UI. Chưa được yêu cầu publish thì chỉ phục vụ local.

## 6. Nội dung chuẩn từ CV

Tạo `src/content/portfolio.ts` hoặc cấu trúc tương đương có TypeScript types để quản lý dữ liệu tập trung. Nội dung tĩnh của portfolio là hợp lệ; không tạo API giả. Không bịa số liệu, đánh giá, thành tích hoặc link.

### Profile
- Tên: Nguyễn Văn Ninh.
- Chuyên môn: Software Engineering Student | Backend · AI Applications · Frontend.
- Địa điểm: Hà Nội, Việt Nam.
- Email: nguyenninh10112006@gmail.com
- GitHub: https://github.com/ninhhh1011
- LinkedIn: https://www.linkedin.com/in/ninh-nguy%E1%BB%85n-704574412

### Học vấn và đào tạo
- Đại học Công nghiệp Hà Nội (HaUI) | Kỹ thuật Phần mềm | 2024–Hiện tại.
- AIC-Innovation Lab, HaUI | Thành viên | 2026–Hiện tại.
- VinUni | Chương trình AI thực chiến, Khóa 3 | 2026.
- Chương trình 12 tuần: 6 tuần Build Phase với SmartParking và 6 tuần thực tập tại VinSmartFuture.
- TOEIC Listening & Reading: 700.

Không đổi ngành sang Khoa học máy tính, không thêm GPA/năm tốt nghiệp hoặc biến chương trình VinUni thành bằng đại học.

### Kinh nghiệm
**VinSmartFuture (Green SM) | Backend / AI Systems Intern | 2026**
- Triển khai độc lập backend gợi ý trạm sạc/tủ đổi pin: GPS realtime, map matching, xác định nhu cầu, lọc trạm và REST API với Python, FastAPI, PostGIS và OSRM.
- Định tuyến tài xế → trạm → điểm đến, tính ETA/detour và xếp hạng trạm hợp lệ; xây test/replay và công cụ debug trên dữ liệu mô phỏng.

**KopyMatch | Technology Intern / AI-assisted Product Support | 05/2026–07/2026**
- Tham gia phát triển Advisor Marketplace: tìm cố vấn, hồ sơ, nộp hồ sơ, xét duyệt và báo cáo; cập nhật giao diện VI/EN và chuyển yêu cầu thành user flow, user story, task.
- Phát triển API hồ sơ/xét duyệt, matching theo quy tắc, metadata tài liệu và migration; kiểm thử controller trong môi trường local.

Không đổi chức danh thành Founder/Lead. Không suy đoán user count, hiệu quả kinh doanh hoặc tình trạng production.

### Dự án
**SmartParking | Frontend / UI Flow | Dự án nhóm tại VinUni | 2026**
- Xây luồng đặt chỗ, xác nhận đỗ và kết thúc phiên cho cư dân, bảo vệ, quản lý.
- Tích hợp API; chuẩn hóa component, responsive, VI/EN và các trạng thái loading/empty/error.
- Stack: Next.js, React, TypeScript, Tailwind CSS, next-intl, Vercel.
- Demo: https://smart-parking-coral.vercel.app/
- GitHub: https://github.com/ninhhh1011/P-062

Không tự bổ sung nhận diện biển số, thanh toán, IoT hoặc số ô đỗ đang vận hành.

**Chess Web App | Frontend & AI Coach | Dự án cá nhân | 2026**
- Xây ứng dụng chơi cờ với bot, lịch sử và phân tích ván; tích hợp trợ lý RAG.
- TypeScript strict, quản lý request Stockfish và kiểm thử tự động.
- Stack: React, Vite, TypeScript, Tailwind CSS, Supabase, Stockfish.
- Demo: https://chess-brown-two.vercel.app/
- GitHub: https://github.com/ninhhh1011/chess

Không bịa ELO, độ chính xác AI, benchmark hoặc hội thoại AI như thể đó là kết quả đã đo.

### Kỹ năng kỹ thuật
- Ngôn ngữ: Python, TypeScript, JavaScript, SQL.
- Backend và dữ liệu: FastAPI, REST API, PostgreSQL/PostGIS, Supabase, OpenStreetMap, OSRM.
- Frontend: React, Next.js, Vite, Tailwind CSS, i18n, responsive UI, accessibility, design tokens.
- Công cụ và chất lượng: Git/GitHub, Docker, Vercel, kiểm thử tự động, typecheck/lint, visual QA, data validation.

### Thực hành AI ứng dụng
- Agents: ReAct, Function Calling/MCP, LangGraph, Zep memory và Human-in-the-loop; thực hành kiểm soát tool, giới hạn vòng lặp và fallback.
- RAG: hybrid retrieval với BM25, Qdrant, RRF; embeddings, reranking và đánh giá bằng RAGAS.
- LLM và reliability: LoRA/QLoRA trên Colab/T4; DPO/ORPO giản lược trên CPU; circuit breaker, Redis cache và provider fallback được kiểm thử với provider mô phỏng.

Có thể biên tập câu ngắn hơn để phù hợp giao diện, nhưng không tăng cấp độ năng lực hoặc thay đổi điều kiện “mô phỏng”, “thực hành”, “local”.

## 7. Tổ chức code

Dùng cấu trúc gọn, ví dụ:

    src/app/                  routes, layout, metadata, globals.css
    src/components/ui/        wrapper/variant dùng lại của HeroUI
    src/components/sections/  hero, projects, experience, skills, about, contact
    src/components/visuals/   hero composition và project illustration
    src/content/              portfolio.ts
    public/                   asset local đã chọn lọc
    tests/                    kiểm thử giao diện/luồng
    docs/                     plan, design decisions, QA

Không tạo monorepo, storybook hoặc hệ theme engine riêng. Không dùng một file page.tsx khổng lồ chứa cả nội dung, logic, CSS và mọi section.

Giữ phần nội dung tĩnh có thể render sẵn; chỉ đánh dấu client component cho phần thật sự tương tác. Metadata có title/description theo nội dung. Không bịa domain production/canonical trước khi có cấu hình triển khai.

README giải thích chạy local, cấu trúc, sửa nội dung, thay asset và vị trí gắn PDF thật.

## 8. Quy trình thực thi và checkpoint

Trước khi code, tạo `docs/implementation-plan.md` với từng phase gồm: task, đầu vào, đầu ra, dependency, tiêu chí nghiệm thu, lệnh kiểm tra và trạng thái TODO/IN_PROGRESS/PASS/BLOCKED. Sau đó bắt đầu thực thi ngay.

Không yêu cầu xác nhận sau từng task nhỏ. Chỉ hỏi khi thiếu thông tin thật sự ngăn triển khai, cần credentials/chi phí/quyền ngoài workspace hoặc thao tác phá hủy dữ liệu. Thiếu screenshot và PDF không phải lý do dừng: đã có nội dung và phương án minh họa/fallback.

### Phase 1 — Audit & bootstrap
- Xác minh cwd, Git state, file hiện có, Node và package manager.
- Nếu chưa có app, khởi tạo ngay tại root workspace và giữ nguyên tài liệu gốc. Nếu initializer từ chối thư mục không trống, chọn cách scaffold an toàn, không xóa file để ép chạy.
- Chọn dependency stable tương thích, cài HeroUI đúng docs, thiết lập CSS.
- Render thử Button, Card và một overlay để xác minh UI chạy thật.
- PASS khi dev server chạy, không lỗi import/styles/dependency cơ bản và build khởi đầu thành công.

### Phase 2 — Theme & component consistency
- Ánh xạ token Craft đã ghi đè sang HeroUI.
- Làm mẫu local kiểm tra typography, CTA, Chip, Card, Modal, Drawer và focus/hover/disabled states.
- Mẫu kiểm tra là công cụ QA nội bộ; không làm thành một mục public navigation hoặc tính năng portfolio.
- Kiểm tra nền sáng khi hệ điều hành/browser preference là dark, kể cả overlay.
- PASS khi component thống nhất đúng palette, không còn default dark/black UI hoặc control của bộ thư viện khác.

### Phase 3 — Full landing page
- Dựng đầy đủ các section A–G, nội dung lấy từ mục 6.
- Hoàn thiện desktop lẫn mobile, có hero visual và hai project showcase.
- Kết nối anchor, external links, menu, project details và hành động email/CV phù hợp.
- PASS khi trang hoàn chỉnh không lorem ipsum, không placeholder ảnh hỏng, không chỉ có hero.

### Phase 4 — Motion & refinement
- Thêm choreography hero, float/parallax có kiểm soát và project hover/reveal.
- Hoàn thiện reduced motion, keyboard, focus, mobile layout và fallback.
- Tối ưu asset, kích thước ảnh và client boundary; không thêm hiệu ứng nếu nó làm đọc nội dung khó hơn.
- PASS khi hiệu ứng thực sự chạy và không gây chồng chữ, tràn ngang, mất focus hoặc lag do xử lý pointer quá mức.

### Phase 5 — Kiểm thử & bàn giao
- Chạy scripts tương ứng: lint, typecheck, production build và kiểm thử giao diện. Định nghĩa scripts thật trong package.json; không giả định framework có sẵn một lệnh lint cụ thể.
- Dùng Playwright/browser tool nếu có để test menu, anchor, modal, external-link attributes, CV fallback và theme sáng.
- Test viewport 360, 390, 768, 1280, 1440px; có test browser dark preference và reduced motion.
- Chụp full-page desktop/mobile và modal/menu; mở ảnh để kiểm tra, không chỉ tạo screenshot rồi bỏ qua.
- Kiểm tra browser console, asset 404, heading order, nội dung CV, keyboard và scroll sau khi đóng overlay.
- Kiểm tra hero thực sự có màu/chiều sâu, project preview đủ lớn, footer không tối, chữ không bị cắt và không có khoảng trống dư bất thường.
- Không khẳng định URL bên ngoài hoạt động chỉ vì đã gán href. Ghi rõ link lấy từ CV và trạng thái kiểm thử nếu đã kiểm tra được.
- Không công bố điểm Lighthouse, FPS hoặc trạng thái PASS nếu chưa chạy phép đo/test đó.

Sửa lỗi và chạy lại các test bị ảnh hưởng trước khi chuyển phase. Nếu môi trường thực sự chặn việc kiểm thử, ghi BLOCKED/NOT RUN cùng lỗi thực, phần đã xác minh và bước còn lại. Không báo “đã hoàn tất 100%” bằng suy đoán.

## 9. Bàn giao cuối

Báo cáo ngắn gồm:
- Đã tạo gì và phiên bản thực tế của stack/HeroUI.
- URL local và lệnh khởi động lại đã kiểm chứng; dùng port trống, không kill process không liên quan.
- Kết quả test theo lệnh thực thi, ảnh chụp và giới hạn còn lại.
- Nơi thay nội dung, visual và PDF.
- Những phần là minh họa concept; những motion/3D nào thực sự được triển khai.

Đích nghiệm thu: một portfolio landing page có thể mở và tương tác tại local, sáng và có cá tính theo Craft, với HeroUI là hệ component thống nhất — không phải một trang mặc định của thư viện hoặc một bản design chỉ nằm trong Markdown.
