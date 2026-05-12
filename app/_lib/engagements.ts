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
      "a deep review of your product's interaction, implementation, and frontend system. you get a prioritized doc of what's slowing the product down and exactly how to fix it. low commitment, high signal.",
    href: "/audit",
  },
  {
    slug: "sprint",
    title: "sprint",
    meta: "from $8,000 · 2–3 weeks",
    description:
      "typically the highest-priority fixes from an audit, a marketing site rebuild, or a focused product area redesign. fixed scope, fixed price, shipped to production.",
    href: "/sprint",
  },
  {
    slug: "embedded",
    title: "embedded",
    meta: "from $10,000/month · 3 month minimum",
    description:
      "2–3 days a week as your fractional design engineer. for teams that need senior frontend + design judgment in the room consistently — without the cost or commitment of a full-time hire.",
    href: "/embedded",
  },
];
