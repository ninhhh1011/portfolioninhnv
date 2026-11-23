export interface Profile {
  name: string;
  shortName: string;
  role: string;
  eyebrow: string;
  headline: string;
  description: string;
  specializations: string[];
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
}

export interface EducationItem {
  institution: string;
  roleOrDegree: string;
  period: string;
  description?: string;
  badge?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  brand?: string;
  role: string;
  period: string;
  bullets: string[];
  technologies: string[];
  isInternship: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  year: string;
  description: string;
  bullets: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  previewType: "smart-parking" | "chess" | "project";
  isProprietary?: boolean;
  proprietaryNotice?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface AIPracticeItem {
  id: string;
  title: string;
  summary: string;
  details: string;
  tags: string[];
}

export const portfolioData: {
  profile: Profile;
  education: EducationItem[];
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  aiPractices: AIPracticeItem[];
} = {
  profile: {
    name: "Nguyễn Văn Ninh",
    shortName: "Ninh.",
    role: "Software Engineering Student | Fullstack · Backend · AI Applications",
    eyebrow: "Nguyễn Văn Ninh · Hà Nội, Việt Nam",
    headline: "Từ ý tưởng đến sản phẩm có thể trải nghiệm.",
    description:
      "Tôi là sinh viên Kỹ thuật Phần mềm, xây dựng ứng dụng web, API và hệ thống AI; đồng thời dẫn dắt kỹ thuật và sản phẩm cho dự án HaUI Advisor.",
    specializations: ["Fullstack", "Backend", "AI Applications"],
    location: "Hà Nội, Việt Nam",
    email: "nguyenninh10112006@gmail.com",
    github: "https://github.com/ninhhh1011",
    linkedin: "https://www.linkedin.com/in/ninh-nguy%E1%BB%85n-704574412",
    cvPath: "/cv-nguyen-van-ninh.pdf",
  },
  education: [
    {
      institution: "Đại học Công nghiệp Hà Nội (HaUI)",
      roleOrDegree: "Kỹ thuật Phần mềm",
      period: "2024 – Hiện tại",
      badge: "Đại học chính quy",
    },
    {
      institution: "AIC-Innovation Lab, HaUI",
      roleOrDegree: "Thành viên Lab Nghiên cứu & Sáng tạo",
      period: "2026 – Hiện tại",
      badge: "Lab Thành viên",
    },
    {
      institution: "VinUni",
      roleOrDegree: "Chương trình AI thực chiến, Khóa 3",
      period: "2026",
      description:
        "Chương trình 12 tuần: 6 tuần Build Phase với SmartParking và 6 tuần thực tập tại VinSmartFuture.",
      badge: "Đào tạo thực chiến",
    },
    {
      institution: "Chứng chỉ Ngoại ngữ",
      roleOrDegree: "TOEIC Listening & Reading",
      period: "2026",
      description: "Điểm đạt: 700.",
      badge: "TOEIC 700",
    },
  ],
  experience: [
    {
      id: "vinsmartfuture",
      company: "VinSmartFuture (Green SM)",
      brand: "Green SM",
      role: "Fullstack / AI Systems Intern",
      period: "2026",
      bullets: [
        "Phát triển hệ thống nội bộ gợi ý trạm sạc/đổi pin, kết hợp GPS, định tuyến nhiều chặng và xếp hạng theo thời gian, năng lượng và dữ liệu lịch sử.",
        "Phát hiện lệch tuyến với chỉ mục không gian H3; đồng bộ GPS giữa các API replica bằng Redis và xử lý dữ liệu thiếu, trạng thái trạm thay đổi.",
        "Xây dựng Driver HUD với Leaflet/Canvas và kiểm thử replay trên Docker Compose. Dự án nội bộ, không công khai website hoặc mã nguồn.",
      ],
      technologies: ["Python", "FastAPI", "GraphHopper", "PostgreSQL / PostGIS", "Redis", "Docker"],
      isInternship: true,
    },
    {
      id: "kopymatch",
      company: "KopyMatch",
      role: "Technology Intern / AI-assisted Product Support",
      period: "05/2026 – 07/2026",
      bullets: [
        "Tham gia phát triển Advisor Marketplace: tìm cố vấn, hồ sơ, nộp hồ sơ, xét duyệt và báo cáo; cập nhật giao diện VI/EN và chuyển yêu cầu thành user flow, user story, task.",
        "Phát triển API hồ sơ/xét duyệt, matching theo quy tắc, metadata tài liệu và migration; kiểm thử controller trong môi trường local.",
      ],
      technologies: ["FastAPI", "REST API", "User Flow", "Controller Testing", "Migration", "VI/EN i18n"],
      isInternship: true,
    },
  ],
  projects: [
    {
      id: "haui-advisor",
      title: "HaUI Advisor",
      subtitle: "Tech Lead · Product/Project Manager · AI Engineer",
      type: "Dự án nhóm",
      year: "2026",
      description: "Trợ lý học vụ hỗ trợ tra cứu quy định, tư vấn lộ trình và lập kế hoạch học tập theo hồ sơ sinh viên.",
      bullets: ["Điều phối kỹ thuật và sản phẩm trong kiến trúc modular gồm AI/RAG, Web, Planner, Academic Rules và Platform.", "Phối hợp giữa các module qua API contracts; kiểm tra ranh giới module và hợp đồng API."],
      technologies: ["Spring Boot", "Java", "React", "PostgreSQL / pgvector", "OpenAPI", "Docker"],
      githubUrl: "https://github.com/netrotion/QUAN-LY-HOC-TAP-TTCSN",
      previewType: "project",
    },
    {
      id: "techviz",
      title: "TechViz Sandbox",
      subtitle: "Nền tảng trực quan hóa tương tác | Dự án cá nhân",
      type: "Dự án cá nhân",
      year: "2026",
      description: "Nền tảng trực quan hóa thuật toán, cấu trúc dữ liệu và các khái niệm khoa học máy tính.",
      bullets: ["Xây dựng 11 kịch bản, playback từng bước và kiến trúc renderer DOM/SVG có thể mở rộng.", "Kiểm chứng kịch bản, nhận diện nội dung chưa được hỗ trợ hoặc xác minh và kiểm thử Playwright."],
      technologies: ["DOM / SVG", "Playwright"],
      demoUrl: "https://techvizbyninhnv.pages.dev/",
      githubUrl: "https://github.com/ninhhh1011/techvizbyninhnv",
      previewType: "project",
    },
    {
      id: "chess-web-app",
      title: "Chess Web App",
      subtitle: "Frontend & AI Coach | Dự án cá nhân",
      type: "Dự án cá nhân",
      year: "2026",
      description:
        "Ứng dụng chơi và học cờ với Stockfish, phân tích ván đấu và trợ lý AI Coach.",
      bullets: [
        "Chơi với Stockfish WASM, phân tích ván PGN và luyện tập với bộ bài tập Lichess CC0.",
        "AI Coach sử dụng ngữ cảnh FEN và trình độ người chơi, với hướng dẫn cơ bản khi LLM không khả dụng; kiểm thử unit, integration và E2E.",
      ],
      technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Stockfish"],
      demoUrl: "https://chess-brown-two.vercel.app/",
      githubUrl: "https://github.com/ninhhh1011/chess",
      previewType: "chess",
    },
    {
      id: "portfolio",
      title: "Portfolio cá nhân",
      subtitle: "Frontend Engineering · UI/UX | Dự án cá nhân",
      type: "Dự án cá nhân",
      year: "2026",
      description: "Website portfolio tương tác giới thiệu dự án, kinh nghiệm và năng lực kỹ thuật.",
      bullets: ["Thiết kế giao diện theo component với video nền, cursor-reveal, bàn làm việc tương tác và minh họa dự án.", "Kiểm thử điều hướng, modal và giao diện mobile bằng Playwright."],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Playwright"],
      demoUrl: "https://portfolioninhnv.vercel.app/",
      githubUrl: "https://github.com/ninhhh1011/portfolioninhnv",
      previewType: "project",
    },
    {
      id: "smart-parking",
      title: "SmartParking",
      subtitle: "Frontend / UI Flow | Dự án nhóm tại VinUni",
      type: "Dự án nhóm (VinUni)",
      year: "2026",
      description:
        "Hệ thống quản lý và luồng sử dụng đỗ xe dành cho cư dân, bảo vệ và ban quản trị tại VinUni.",
      bullets: [
        "Xây luồng đặt chỗ, xác nhận đỗ và kết thúc phiên cho cư dân, bảo vệ, quản lý.",
        "Tích hợp API backend; chuẩn hóa component, responsive, đa ngôn ngữ VI/EN và các trạng thái loading/empty/error.",
      ],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "next-intl", "Vercel"],
      previewType: "smart-parking",
      isProprietary: true,
      proprietaryNotice:
        "Dự án thuộc quyền sở hữu của Vin; website và mã nguồn không công khai.",
    },
  ],
  skillCategories: [
    {
      title: "Backend & Dữ liệu",
      description: "Xây dựng hệ thống dịch vụ, xử lý định tuyến và cơ sở dữ liệu không gian.",
      skills: ["FastAPI", "Python", "REST API", "PostgreSQL / PostGIS", "Supabase", "Redis", "GraphHopper"],
    },
    {
      title: "Frontend & Trải nghiệm",
      description: "Giao diện hiện đại, responsive, đa ngôn ngữ và chuẩn hóa accessibility.",
      skills: ["React", "Next.js", "Vite", "TypeScript", "Tailwind CSS", "i18n (VI/EN)", "Design Tokens", "Accessibility"],
    },
    {
      title: "Công cụ & Chất lượng",
      description: "Đảm bảo chất lượng mã nguồn, kiểm thử tự động và quy trình triển khai.",
      skills: ["Git / GitHub", "Docker", "Vercel", "Playwright", "Kiểm thử tự động", "Typecheck / Lint", "Visual QA", "Data Validation"],
    },
  ],
  aiPractices: [
    {
      id: "agents",
      title: "Agents & Orchestration",
      summary: "ReAct, Function Calling/MCP, LangGraph, Zep memory và Human-in-the-loop.",
      details:
        "Thực hành kiểm soát tool calling, giới hạn số vòng lặp (iteration boundary), cơ chế fallback khi tool gặp lỗi và duy trì trạng thái hội thoại với memory store.",
      tags: ["ReAct", "MCP", "LangGraph", "Zep Memory", "Human-in-the-loop"],
    },
    {
      id: "rag",
      title: "RAG & Retrieval Evaluation",
      summary: "Hybrid retrieval kết hợp BM25, Qdrant và Reciprocal Rank Fusion (RRF).",
      details:
        "Thực hành tính vector embeddings, reranking danh sách tài liệu tìm kiếm và đánh giá chất lượng hệ thống truy xuất bằng bộ chỉ số RAGAS (faithfulness, answer relevance).",
      tags: ["Hybrid Retrieval", "BM25", "Qdrant", "RRF", "RAGAS"],
    },
    {
      id: "reliability",
      title: "LLM & Reliability Systems",
      summary: "LoRA/QLoRA trên GPU T4, DPO giản lược và hạ tầng chống chịu lỗi.",
      details:
        "Thực hành fine-tuning LoRA/QLoRA trên Colab/T4; alignment DPO/ORPO giản lược trên CPU; xây dựng circuit breaker, Redis cache và provider fallback được kiểm thử nghiêm ngặt với provider mô phỏng.",
      tags: ["LoRA / QLoRA", "DPO / ORPO", "Circuit Breaker", "Redis Cache", "Fallback"],
    },
  ],
};
