import type { Metadata } from "next";
// Removed Geist font imports to use system fonts for Apple-like theme
import "./globals.css";

export const metadata: Metadata = {
  title: "Article Site",
  description: "A minimalist article site built with Next.js and Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Added 'dark' class to html for default dark mode */}
      <body>
        {children}
      </body>
    </html>
  );
}
