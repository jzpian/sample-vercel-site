import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Article Site",
  description: "A personal article site with a clean, modern design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* Removed 'dark' class from html for fixed theme */}
      <body>
        {children}
      </body>
    </html>
  );
}
