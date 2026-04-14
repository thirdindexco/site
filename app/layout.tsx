import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "third index",
  description: "a small software studio. design and engineering for product interfaces.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink antialiased">{children}</body>
    </html>
  );
}
