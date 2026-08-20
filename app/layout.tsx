import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { BuildingProvider } from "@/lib/building-context";

export const metadata: Metadata = {
  title: "배추리 매니저 (BAECHURI Manager)",
  description:
    "집주인과 외국인 세입자가 언어장벽 없이 정보를 주고받는 다국어 분리배출·생활안내 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-neutral-50 text-neutral-900 min-h-screen">
        <LanguageProvider>
          <BuildingProvider>{children}</BuildingProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
