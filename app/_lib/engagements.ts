export type EngagementSlug = "audit" | "sprint" | "embedded";

export type Engagement = {
  slug: EngagementSlug;
  title: string;
  meta: string;
  description: string;
  href: string;
};

// Source of truth for the productized service tiers. Consumed by the
// homepage router section and the cross-link block on each service page.
export const ENGAGEMENTS: readonly Engagement[] = [
  {
    slug: "audit",
    title: "audit",
    meta: "$3,500 · one week",
    description:
      "a one-week diagnosis of where design intent dies in implementation — interface quality, design systems, frontend architecture.",
    href: "/audit",
  },
  {
    slug: "sprint",
    title: "sprint",
    meta: "$8–15k · 2–3 weeks",
    description:
      "a defined surface — product flow, brand site, or design system — designed, built, and shipped as production code.",
    href: "/sprint",
  },
  {
    slug: "embedded",
    title: "embedded",
    meta: "$10–14k/month · 3 month minimum",
    description:
      "fractional design engineering for product teams that need senior interface judgment in the room, week after week.",
    href: "/embedded",
  },
];
