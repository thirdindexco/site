import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "work — third index",
  description: "selected work from the studio and before.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
