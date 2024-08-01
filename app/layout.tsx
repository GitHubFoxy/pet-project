import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pet-project",
  description: "nextjs pet-project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
