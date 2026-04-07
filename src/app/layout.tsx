import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "جامعة أشور | قسم هندسة الأمن السيبراني",
  description: "الموقع الرسمي لقسم هندسة الأمن السيبراني في جامعة أشور - بوابتك نحو الاحتراف الرقمي والأمان الفضائي.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-background text-foreground font-arabic">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
