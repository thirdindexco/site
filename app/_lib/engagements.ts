export type EngagementSlug = "project" | "fractional";

export type Engagement = {
  slug: EngagementSlug;
  title: string;
  meta: string;
  description: string;
  href: string;
};

// Source of truth for the engagement shapes. Consumed by the landing page's
// engagement section and the cross-link block on each engagement page.
//
// Two shapes, split by how the work is bought: a scoped project priced by
// the week, or embedded time priced by the month. Audits, prototypes, builds,
// and design systems are all just projects of different lengths — listing
// them as separate tiers drew no inquiries and made the choice look harder
// than it is. The project page shows them as examples instead.
//
// Rates hold at current demand. Don't raise them speculatively; if
// inquiries are lost on price, cut the opening scope rather than the rate.
// Both shapes clear the ~$5k/week floor.
export const ENGAGEMENTS: readonly Engagement[] = [
  {
    slug: "project",
    title: "project",
    meta: "by the week, from $5k/week",
    description:
      "scoped work, one to three weeks — an audit, a prototype, a build, or a design system.",
    href: "/project",
  },
  {
    slug: "fractional",
    title: "embedded",
    meta: "by the month, from $10k/month",
    description:
      "embedded with your team — in your tools, your product, your sprint cycles. three month minimum.",
    href: "/fractional",
  },
];
