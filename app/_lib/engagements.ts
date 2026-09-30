export type EngagementSlug =
  | "sprint"
  | "prototype"
  | "systems"
  | "fractional";

export type Engagement = {
  slug: EngagementSlug;
  title: string;
  meta: string;
  description: string;
  href: string;
};

// Source of truth for the productized service tiers. Consumed by the
// landing page's engagement section and the cross-link block on each
// service page.
//
// Ordered by commitment, cheapest first. The build is priced by the week so
// one offer covers the whole range: a single week is a low-risk way for a
// studio or founder to find out what working together is like, and the same
// engagement extends to three when the work warrants it — no second SKU for
// what is really one motion at two lengths.
//
// Ranges hold at current demand. Don't raise them speculatively; if
// inquiries are lost on price, cut the opening scope rather than the rate.
// Every tier clears the ~$5k/week floor.
export const ENGAGEMENTS: readonly Engagement[] = [
  {
    slug: "sprint",
    title: "frontend build",
    meta: "1–3 weeks, from $5k/week",
    description:
      "finished design in code. one week for a page or flow; three for a sprint.",
    href: "/sprint",
  },
  {
    slug: "prototype",
    title: "prototype",
    meta: "1–2 weeks, $6–10k",
    description: "a deployed prototype — interface, core flows, a url.",
    href: "/prototype",
  },
  {
    slug: "systems",
    title: "design system",
    meta: "2 weeks, from $10k",
    description:
      "a coded component system — tokens, documentation, a playground.",
    href: "/systems",
  },
  {
    slug: "fractional",
    title: "fractional",
    meta: "embedded in your team, from $10k/month",
    description:
      "embedded with your team — in your tools, your product, your sprint cycles. three month minimum.",
    href: "/fractional",
  },
];
