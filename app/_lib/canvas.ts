// Shared bits for the canvas: the sheet the home routes draw on, and the
// studio's copy, kept in one place so the shell, the pages and the
// metadata say the same thing.

// Links turn the signature orange on hover and focus; nothing else on the
// sheet uses the colour, so the one orange word is always the live one.
export const LINK =
  "cursor-pointer text-left outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent";
export const LINK_MUTED =
  "cursor-pointer text-left text-muted-foreground outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent";
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
// Availability is a lead lever for a one-person practice. It names the
// calendar's next month, so it is always a date that is still open.
export function availabilityFrom(now: Date = new Date()) {
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const month = next.toLocaleString("en-US", { month: "long" });
  return `Available for new projects from ${month} ${next.getFullYear()}`;
}

export const CONTACT = {
  email: "info@thirdindex.co",
  call: "https://cal.com/thirdindex/intro",
};

export const ENGAGEMENT_SHAPES = [
  {
    title: "Project",
    href: "/project",
    terms: "By the week, from $5k a week.",
    description:
      "Scope and price fixed before work starts.",
  },
  {
    title: "Embedded",
    href: "/fractional",
    terms: "By the month, from $10k a month.",
    description:
      "Senior engineering inside your team. Three-month minimum.",
  },
];

// What a week-priced project usually is: the kinds of product the studio
// builds, same rate, different length.
export const COMMON_PROJECTS = [
  {
    title: "Storefronts",
    length: "2–3 weeks",
    description:
      "Headless commerce: catalogue, CMS curation, and a checkout built to the brand.",
  },
  {
    title: "Editorial and portfolio sites",
    length: "1–3 weeks",
    description:
      "A CMS the editors can run, pages built from components.",
  },
  {
    title: "Fintech and payments",
    length: "2–3 weeks",
    description:
      "Onboarding, ledgers, transfers, and statements, with the edge cases handled.",
  },
  {
    title: "DeFi and dapp interfaces",
    length: "2–3 weeks",
    description:
      "The UI over a smart contract: wallets, signing, positions, swaps.",
  },
  {
    title: "AI workflow dashboards",
    length: "2–3 weeks",
    description:
      "AI-enabled workflows across teams: shared context, runs, approvals, token usage and cost, on your models.",
  },
  {
    title: "Product interfaces",
    length: "1–3 weeks",
    description:
      "A product area or a new feature, end to end, in your repo.",
  },
];

export const FOCUS_AREAS = [
  {
    title: "Product interfaces",
    description:
      "Application UI, states, accessibility, interaction.",
  },
  {
    title: "Design systems",
    description: "Tokens, components, documentation, in Figma and in code.",
  },
  {
    title: "Websites & rebuilds",
    description:
      "Marketing, editorial, and commerce, built or rebuilt properly.",
  },
  {
    title: "CMS systemization",
    description:
      "Content models, editing experience, page-building components.",
  },
  {
    title: "Creative development",
    description: "WebGL, canvas, scroll, and motion.",
  },
  {
    title: "Frontend architecture",
    description:
      "Audits, structure, performance, migrations.",
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
];
