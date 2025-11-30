import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Media MVP",
  description: "A simple social media application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-neutral-50">
        {children}
      </body>
    </html>
  );
}
