export type EngagementSlug = "prototype" | "systems" | "sprint" | "fractional";

export type Engagement = {
  slug: EngagementSlug;
  title: string;
  meta: string;
  description: string;
  href: string;
};

// Source of truth for the productized service tiers. Consumed by the
// information-page router section and the cross-link block on each service
// page. Ordered as the ladder reads: validate → systematize → build → stay
// close. Prototype is the founder door; systems is the designer/studio door.
export const ENGAGEMENTS: readonly Engagement[] = [
  {
    slug: "prototype",
    title: "prototype",
    meta: "$6–10k · 1–2 weeks",
    description:
      "a loose idea turned into a clickable, deployed prototype — real interface, core flows, a url you can put in front of people.",
    href: "/prototype",
  },
  {
    slug: "systems",
    title: "design systems",
    meta: "$10,000 · two weeks",
    description:
      "your designs turned into a coded, documented component system — tokens, reusable components, and a browsable playground.",
    href: "/systems",
  },
  {
    slug: "sprint",
    title: "sprint",
    meta: "$10–15k · 2–3 weeks",
    description:
      "a defined surface — product flow, brand site, or design handoff — designed, built, and shipped as production code.",
    href: "/sprint",
  },
  {
    slug: "fractional",
    title: "fractional",
    meta: "$10–14k/month · 3 month minimum",
    description:
      "senior design engineering, embedded in your team 2–3 days a week — interface judgment in the room, week after week.",
    href: "/fractional",
  },
];
