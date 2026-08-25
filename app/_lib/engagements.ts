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
    meta: "from $5k/week · 1–3 weeks",
    description:
      "a finished design turned into responsive, production-ready frontend code. one week covers a focused piece — a landing page, a product flow, a checkout; three is a full sprint.",
    href: "/sprint",
  },
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
    title: "design-system foundation",
    meta: "from $10k · two weeks",
    description:
      "your designs turned into a coded, documented component system — tokens, reusable components, and a browsable playground.",
    href: "/systems",
  },
  {
    slug: "fractional",
    title: "fractional design engineering",
    meta: "from $10k/month · two days a week",
    description:
      "senior design engineering embedded in your team — two days a week at the base rate, three when you need them. three month minimum.",
    href: "/fractional",
  },
];
