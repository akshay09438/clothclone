import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "AI Fashion Studio | Freepik Style",
  description: "Next-gen AI fashion photography tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-[#F9FAFB] text-[#111827]`}>
        {children}
      </body>
    </html>
  );
}
