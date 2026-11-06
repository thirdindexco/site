import type { Metadata } from "next";
import { Document } from "../../_components/Document";
import { InquiryForm } from "../../_components/InquiryForm";
import { CONTACT, LINK } from "../../_lib/canvas";

const pageTitle = "Inquire — THIRD INDEX";
const pageDescription =
  "Start a project with THIRD INDEX: tell us what you are building, your timeline and budget, and hear back within 48 hours.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/inquire" },
  robots: { index: false },
  openGraph: {
    type: "website",
    url: "/inquire",
    title: pageTitle,
    description: pageDescription,
    images: [{ url: "/og.jpg", width: 1200, height: 600, alt: pageTitle }],
  },
};

export default function InquirePage() {
  return (
    <Document
      lead="Tell us about the project."
      support={
        <>
          A few lines is enough. Response within 48 hours. If you would
          rather talk first,{" "}
          <a
            href={CONTACT.call}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK}
          >
            book a call
          </a>{" "}
          or write to{" "}
          <a href={`mailto:${CONTACT.email}`} className={LINK}>
            {CONTACT.email}
          </a>
          .
        </>
      }
    >
      <InquiryForm />
    </Document>
  );
}
