import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./_components/Providers";
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
  ],
  variable: "--font-ld",
  display: "swap",
});

const siteTitle = "third index — creative technology studio";
const siteDescription =
  "Creative technology studio led by Michael Ciccarelli. Prototypes, platforms, and production systems — engineered and shipped end-to-end. Based in Las Vegas, working worldwide.";

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
        alt: "third index — creative technology studio",
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
      className={`${mono.variable} ${ld.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-ld antialiased">
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
