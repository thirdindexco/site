// Shared bits for the canvas: the sheet the home routes draw on, and the
// studio's copy, kept in one place so the shell, the pages and the
// metadata say the same thing.

// Links turn the signature red on hover and focus; nothing else on the
// sheet uses the colour, so the one red word is always the live one.
export const LINK =
  "cursor-pointer text-left outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent";
export const LINK_MUTED =
  "cursor-pointer text-left opacity-50 outline-none transition-[opacity,color] duration-200 hover:text-accent hover:opacity-100 focus-visible:text-accent focus-visible:opacity-100";
export const FADE = "animate-[canvas-in_0.4s_ease]";
// The centre line: one text line, centred on the viewport.
export const LINE_TOP = "top-[calc(50%-7px)]";

// Index notation. The position in the index, three digits, the way the
// production index numbered its rows.
export const indexNumber = (i: number) => String(i + 1).padStart(3, "0");

export const STUDIO_LEAD = "A technology studio for product teams and brands.";
export const STUDIO_SUPPORT =
  "We design and build applications, storefronts, and product interfaces.";
export const STUDIO_PROOF =
  "Two decades working with independent founders and global names including Pentagram, Amazon, VICE, and Condé Nast.";
// Availability is a lead lever for a one-person practice. Keep it true.
export const STUDIO_AVAILABILITY = "Available for new projects from December 2026";

export const CONTACT = {
  email: "info@thirdindex.co",
  call: "https://cal.com/thirdindex/intro",
};

// The rates, as the sheet states them. Two shapes, split by how the work
// is bought. The terms live in _lib/engagements.ts; these are the lines.
export const RATES = [
  { label: "Project from $5k a week", href: "/project" },
  { label: "Embedded from $10k a month", href: "/fractional" },
];

export const ENGAGEMENT_SHAPES = [
  {
    title: "Project",
    href: "/project",
    terms: "By the week, from $5k a week.",
    description:
      "Scoped work, one to three weeks: a storefront, an editorial site, a payments flow, a dapp interface, or a product feature. Scope and price are fixed before work starts.",
  },
  {
    title: "Embedded",
    href: "/fractional",
    terms: "By the month, from $10k a month.",
    description:
      "Two days a week embedded with your product team, in your tools, your repo, your sprint cycles. Three-month minimum; three days a week from $14k a month.",
  },
];

// What a week-priced project usually is: the kinds of product the studio
// builds, same rate, different length.
export const COMMON_PROJECTS = [
  {
    title: "Storefronts",
    length: "2–3 weeks",
    description:
      "Headless commerce: a Shopify or custom catalogue, editorial curation through a CMS, and a checkout built to the brand rather than the theme.",
  },
  {
    title: "Editorial and portfolio sites",
    length: "1–3 weeks",
    description:
      "Publications, studios, and portfolios: a CMS the editors can run, pages built from components, and the reading and viewing experience tuned.",
  },
  {
    title: "Fintech and payments",
    length: "2–3 weeks",
    description:
      "Onboarding, ledgers, transfers, and statements: the interfaces of a financial product, built on Stripe or your own rails, with the states and edge cases handled.",
  },
  {
    title: "DeFi and dapp interfaces",
    length: "2–3 weeks",
    description:
      "The UI layer over a smart contract: wallet connection, signing flows, positions, and swaps, with on-chain state made legible.",
  },
  {
    title: "AI workflow dashboards",
    length: "2–3 weeks",
    description:
      "An internal dashboard that runs AI-enabled workflows across teams: shared context, prompts and runs, approvals, token usage and cost, on whichever models and stack you already use.",
  },
  {
    title: "Product interfaces",
    length: "1–3 weeks",
    description:
      "A product area or a new feature end to end: application UI with its architecture, states, accessibility, and motion, in your repo.",
  },
];

export const FOCUS_AREAS = [
  {
    title: "Product interfaces",
    description:
      "Application UI: architecture, states, accessibility, interaction.",
  },
  {
    title: "Design systems",
    description: "Tokens, primitives, and documentation, in Figma and in code.",
  },
  {
    title: "Websites & rebuilds",
    description:
      "Marketing, editorial, and commerce, new or rebuilt, with architecture and navigation reworked rather than restyled.",
  },
  {
    title: "CMS systemization",
    description:
      "Content modeling and platform choice, editing experience, and page-building components.",
  },
  {
    title: "Creative development",
    description: "WebGL, canvas, scroll choreography, and motion.",
  },
  {
    title: "Frontend architecture",
    description:
      "Audits, app structure, rendering strategy, performance, and migration plans.",
  },
];

export const CLIENTS = [
  "Pentagram",
  "Grey",
  "Amazon",
  "VICE",
  "Condé Nast",
  "Modern Treasury",
  "Legend",
  "One/Of",
  "Elara",
  "Revolve Law",
  "Kelvon Agee",
  "The Well",
  "El Dorado",
];

export const TECHNOLOGY = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "GSAP",
  "Motion",
  "Three.js",
  "WebGL",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Shopify",
  "Sanity",
  "Stripe",
  "Figma",
];
