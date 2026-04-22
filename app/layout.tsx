import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const ld = localFont({
  src: [
    { path: "../public/fonts/LD-Light.woff2", weight: "300", style: "normal" },
    {
      path: "../public/fonts/LD-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/LD-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LD-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    { path: "../public/fonts/LD-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "../public/fonts/LD-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    { path: "../public/fonts/LD-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "../public/fonts/LD-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-ld",
  display: "swap",
});

const sd = localFont({
  src: [
    { path: "../public/fonts/SD-Light.woff2", weight: "300", style: "normal" },
    {
      path: "../public/fonts/SD-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/SD-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sd",
  display: "swap",
});

const siteTitle = "third index — design and engineering studio";
const siteDescription =
  "A small design and engineering studio in Las Vegas, Nevada. Interfaces, applications, websites, and design systems for clients and for the studio's own products.";

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://thirdindex.co"
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
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
  openGraph: {
    type: "website",
    url: "/",
    siteName: "third index",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "third index — design and engineering studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.jpg"],
  },
};

// Runs before hydration; sets data-theme from localStorage, falling back to
// the system preference. Prevents a flash of the wrong theme on reload.
const themeInitScript = `
try {
  var stored = localStorage.getItem('theme');
  var theme = (stored === 'light' || stored === 'dark')
    ? stored
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mono.variable} ${ld.variable} ${sd.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-ld antialiased">{children}</body>
    </html>
  );
}
