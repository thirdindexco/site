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

const siteTitle = "THIRD INDEX";
const siteDescription =
  "Design engineering studio in Las Vegas building web apps, product interfaces, and high-craft websites. Work for Modern Treasury, VICE, Amazon, and Condé Nast.";

const siteUrl = "https://thirdindex.co";

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
  alternates: { canonical: "/" },
  applicationName: siteTitle,
  keywords: [
    "design engineering studio",
    "design engineering agency",
    "frontend development studio",
    "custom web application development",
    "product interface development",
    "user interface engineering",
    "design system development",
    "frontend architecture",
    "creative web development",
    "web animation development",
    "headless commerce development",
    "fractional design engineer",
    "senior frontend consulting",
  ],
  authors: [{ name: "Michael Ciccarelli", url: "https://ciccarel.li" }],
  creator: "Michael Ciccarelli",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 600,
        alt: "THIRD INDEX — design engineering studio for web apps, product interfaces, and design systems",
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

// Structured data for search engines: ties the studio to its founder and
// Las Vegas locality. The geo lives here and in llms.txt, not the hero copy.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteTitle,
  url: siteUrl,
  description: siteDescription,
  email: "info@thirdindex.co",
  founder: {
    "@type": "Person",
    name: "Michael Ciccarelli",
    url: "https://ciccarel.li",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    addressCountry: "US",
  },
  areaServed: "Worldwide",
  sameAs: ["https://ciccarel.li"],
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
      className={`${mono.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
