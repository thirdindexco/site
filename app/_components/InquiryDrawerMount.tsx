"use client";

import dynamic from "next/dynamic";

// Client-side mount point for the inquiry drawer so server-component pages
// can include it. Drawer bundle stays out of the initial payload; CTAs on
// the page flip the shared inquiryOpenAtom.
const InquiryDrawer = dynamic(
  () => import("./InquiryDrawer").then((m) => m.InquiryDrawer),
  { ssr: false },
);

export function InquiryDrawerMount() {
  return <InquiryDrawer />;
}
