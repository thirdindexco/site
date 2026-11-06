import { CanvasShell } from "../_components/CanvasShell";
import { InquiryDrawerMount } from "../_components/InquiryDrawerMount";
import { ThemeShortcuts } from "../_components/ThemeShortcuts";
import { projects } from "../_lib/projects";

// The home routes share one sheet (see _components/CanvasShell.tsx): the
// centre line, the numbered work, the rates. Each route draws its view on
// it, so the index, the studio and every project have URLs of their own
// and arrive in the server HTML. The engagement subroutes stay as their
// own documents outside this group.
export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeShortcuts />
      <InquiryDrawerMount />
      <CanvasShell projects={projects}>{children}</CanvasShell>
    </>
  );
}
