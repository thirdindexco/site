import Link from "next/link";
import { Clock } from "./Clock";

export function SiteHeader({
  backLink = false,
}: {
  backLink?: boolean;
}) {
  return (
    <header className="reveal reveal-header flex items-center pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-[calc(8.33%+18px)] pt-5 font-mono font-light text-[9px] uppercase tracking-[-0.01em]">
      <div className="flex items-center gap-[10px]">
        <Clock />
        <span aria-hidden className="flex items-center gap-[6px] text-muted">
          <span>♠</span>
          <span>♥</span>
          <span>♦</span>
          <span>♣</span>
        </span>
      </div>
      {backLink && (
        <Link
          href="/"
          className="ml-auto text-ink transition-colors duration-200 hover:text-accent"
        >
          ← back to index
        </Link>
      )}
    </header>
  );
}
