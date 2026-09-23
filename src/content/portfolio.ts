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
  demoUrl: string;
  githubUrl: string;
  previewType: "smart-parking" | "chess";
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
    role: "Software Engineering Student | Backend · AI Applications · Frontend",
    eyebrow: "Nguyễn Văn Ninh · Hà Nội, Việt Nam",
    headline: "Từ ý tưởng đến sản phẩm có thể trải nghiệm.",
    description:
      "Tôi là sinh viên Kỹ thuật Phần mềm, xây dựng backend, ứng dụng AI và giao diện web — với sự chú trọng vào luồng sử dụng, tích hợp và kiểm thử.",
    specializations: ["Backend", "AI Applications", "Frontend"],
    location: "Hà Nội, Việt Nam",
    email: "nguyenninh10112006@gmail.com",
    github: "https://github.com/ninhhh1011",
    linkedin: "https://www.linkedin.com/in/ninh-nguy%E1%BB%85n-704574412",
    cvPath: "/Nguyen_Van_Ninh_CV_Harvard_1_Trang (1).pdf",
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
      role: "Backend / AI Systems Intern",
      period: "2026",
      bullets: [
        "Triển khai độc lập backend gợi ý trạm sạc/tủ đổi pin: GPS realtime, map matching, xác định nhu cầu, lọc trạm và REST API với Python, FastAPI, PostGIS và OSRM.",
        "Định tuyến tài xế → trạm → điểm đến, tính ETA/detour và xếp hạng trạm hợp lệ; xây test/replay và công cụ debug trên dữ liệu mô phỏng.",
      ],
      technologies: ["Python", "FastAPI", "PostGIS", "OSRM", "GPS Realtime", "REST API"],
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
      demoUrl: "https://smart-parking-coral.vercel.app/",
      githubUrl: "https://github.com/ninhhh1011/P-062",
      previewType: "smart-parking",
    },
    {
      id: "chess-web-app",
      title: "Chess Web App",
      subtitle: "Frontend & AI Coach | Dự án cá nhân",
      type: "Dự án cá nhân",
      year: "2026",
      description:
        "Ứng dụng chơi cờ vua tương tác với bot, lưu ván đấu, phân tích nước đi và tích hợp trợ lý huấn luyện cờ RAG.",
      bullets: [
        "Xây ứng dụng chơi cờ với bot, lịch sử và phân tích ván; tích hợp trợ lý RAG.",
        "TypeScript strict toàn diện, quản lý request Stockfish và kiểm thử tự động.",
      ],
      technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Stockfish"],
      demoUrl: "https://chess-brown-two.vercel.app/",
      githubUrl: "https://github.com/ninhhh1011/chess",
      previewType: "chess",
    },
  ],
  skillCategories: [
    {
      title: "Backend & Dữ liệu",
      description: "Xây dựng hệ thống dịch vụ, xử lý định tuyến và cơ sở dữ liệu không gian.",
      skills: ["FastAPI", "Python", "REST API", "PostgreSQL / PostGIS", "Supabase", "OpenStreetMap", "OSRM"],
    },
    {
      title: "Frontend & Trải nghiệm",
      description: "Giao diện hiện đại, responsive, đa ngôn ngữ và chuẩn hóa accessibility.",
      skills: ["React", "Next.js", "Vite", "Tailwind CSS", "i18n (VI/EN)", "Design Tokens", "Accessibility"],
    },
    {
      title: "Công cụ & Chất lượng",
      description: "Đảm bảo chất lượng mã nguồn, kiểm thử tự động và quy trình triển khai.",
      skills: ["Git / GitHub", "Docker", "Vercel", "Kiểm thử tự động", "Typecheck / Lint", "Visual QA", "Data Validation"],
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
