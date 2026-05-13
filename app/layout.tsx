import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./_components/Providers";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const siteTitle = "third index";
const siteDescription =
  "Interfaces, systems, motion. Built end-to-end by Michael Ciccarelli.";

const siteUrl =
  process.env.NODE_ENV === "production"
    ? "https://thirdindex.co"
    : "http://localhost:3000";

// Tints browser chrome (Safari URL bar, Chrome Android tab bar) with the
// accent blue. Doesn't affect the page background — that stays canvas/ink
// via the CSS variables. Same value for light and dark so the chrome
// identity is consistent regardless of mode.
export const viewport: Viewport = {
  themeColor: "#0000ff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
        alt: "third index — interfaces, systems, motion",
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
  var theme = (stored === 'light' || stored === 'dark' || stored === 'accent')
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
      className={`${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
