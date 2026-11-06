// Shared bits for the canvas: the sheet the home routes draw on, and the
// studio's copy, kept in one place so the shell, the pages and the
// metadata say the same thing.

// Links turn the signature blue on hover and focus; nothing else on the
// sheet uses the colour, so the one blue word is always the live one.
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

export const STUDIO_PERSON =
  "Third Index is one person. I scope the project, do the work, and walk you through it, with no handoff to a junior team and no account manager in between. The background is agencies and product teams; the index is the recent work, for labels, studios, and founders.";
export const STUDIO_BASE = "Based in Las Vegas, working with teams anywhere.";

// The studio's address everywhere; the principal's own only in the block
// about him.
export const CONTACT = {
  email: "info@thirdindex.co",
  principal: "mc@thirdindex.co",
  call: "https://cal.com/thirdindex/intro",
  elsewhere: "https://relli.cc",
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
      "Scoped work, one to three weeks: an audit, a prototype, a build, or a design system. Scope and price are fixed before work starts.",
  },
  {
    title: "Embedded",
    href: "/fractional",
    terms: "By the month, from $10k a month.",
    description:
      "Two days a week embedded with your product team, in your tools, your repo, your sprint cycles. Three-month minimum; three days a week from $14k a month.",
  },
];

// What a week-priced project usually turns out to be.
export const COMMON_PROJECTS = [
  {
    title: "Frontend audit",
    length: "1 week",
    description:
      "A senior read on an existing frontend: architecture, performance, accessibility, system health, ending in a written, ranked plan. No code ships; the output is judgment, written down.",
  },
  {
    title: "Prototype",
    length: "1–2 weeks",
    description:
      "A loose idea turned into a clickable, deployed prototype: real interface, core flows, and a URL you can put in front of users and investors.",
  },
  {
    title: "Frontend build",
    length: "1–3 weeks",
    description:
      "Finished designs built properly: a single surface, a brand site, a product area, or a new feature end to end, motion and interaction included.",
  },
  {
    title: "Design system",
    length: "2 weeks",
    description:
      "Your designs turned into a coded, documented component library: tokens, components, a playground, and one real flow built on it.",
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
