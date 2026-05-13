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
      "interface, system, motion, and frontend review. prioritized fixes, written clearly.",
    href: "/audit",
  },
  {
    slug: "sprint",
    title: "sprint",
    meta: "$8–15k · 2–3 weeks",
    description:
      "fixed-scope build for a brand site, product flow, design system, or frontend cleanup.",
    href: "/sprint",
  },
  {
    slug: "embedded",
    title: "embedded",
    meta: "$10–14k/month · 3 month minimum",
    description:
      "fractional design engineering for teams that need senior frontend judgment in the room.",
    href: "/embedded",
  },
];
