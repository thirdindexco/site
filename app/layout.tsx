import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "./_components/SiteFooter";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const ld = localFont({
  src: [
    { path: "../public/fonts/LD-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/LD-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/LD-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/LD-RegularItalic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/LD-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/LD-MediumItalic.woff2", weight: "500", style: "italic" },
    { path: "../public/fonts/LD-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/LD-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-ld",
  display: "swap",
});

const sd = localFont({
  src: [
    { path: "../public/fonts/SD-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/SD-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../public/fonts/SD-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-sd",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thirdindex.co"),
  title: "third index — software studio",
  description:
    "a small software studio in las vegas. design and engineering for digital products.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    title: "third index",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} ${ld.variable} ${sd.variable}`}>
      <body className="bg-canvas text-ink antialiased font-ld min-h-screen flex flex-col">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
