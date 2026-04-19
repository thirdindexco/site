import Link from "next/link";
import { WeatherTime } from "./WeatherTime";

export function SiteHeader({
  backLink = false,
}: {
  backLink?: boolean;
}) {
  return (
    <header className="reveal reveal-header flex items-center pl-5 md:pl-[calc(8.33%+18px)] pr-5 md:pr-[calc(8.33%+18px)] pt-5 font-mono font-light text-[9px] uppercase tracking-[-0.01em]">
      <WeatherTime />
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
