"use client";

import type { ReactNode } from "react";
import { useSetAtom } from "jotai";
import { inquiryOpenAtom } from "../_lib/inquiry-state";

// Opens the inquiry drawer. A button styled as a link, so server pages can
// put the way in anywhere on the sheet.
export function InquireLink({
  className,
  children = "Inquire",
}: {
  className?: string;
  children?: ReactNode;
}) {
  const setOpen = useSetAtom(inquiryOpenAtom);
  return (
    <button type="button" onClick={() => setOpen(true)} className={className}>
      {children}
    </button>
  );
}
