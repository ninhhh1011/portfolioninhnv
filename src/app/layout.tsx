import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nguyễn Văn Ninh — Software Engineering Student | Portfolio",
  description:
    "Portfolio cá nhân của Nguyễn Văn Ninh — sinh viên Kỹ thuật Phần mềm, xây dựng backend, ứng dụng AI và giao diện web.",
  keywords: [
    "Nguyễn Văn Ninh",
    "Portfolio",
    "Software Engineer",
    "Backend",
    "AI Applications",
    "Frontend",
    "Next.js",
    "FastAPI",
    "HeroUI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${playfair.variable} ${plusJakarta.variable} font-sans min-h-screen bg-[#FCF9F7] text-[#183B4E] antialiased selection:bg-[#D7EAF0] selection:text-[#183B4E]`}
      >
        {children}
      </body>
    </html>
  );
}
