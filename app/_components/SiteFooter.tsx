"use client";

import type { MouseEvent } from "react";
import { GRID } from "../_lib/layout";
import { FooterWeather } from "./FooterWeather";
import { ThemeSwatch } from "./ThemeSwatch";

export function SiteFooter({
  onClickCapture,
}: {
  onClickCapture?: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <footer
      onClickCapture={onClickCapture}
      className={`mt-16 pb-6 md:mt-24 md:pb-8 lg:mt-32 lg:pb-10 ${GRID}`}
    >
      <div className="col-span-12 border-t border-[color:var(--panel-border)] pt-6 md:pt-8" />

      <div className="col-span-12 flex justify-start md:col-span-2 md:col-start-1">
        <ThemeSwatch className="flex" />
      </div>

      <div className="col-span-12 pt-12 font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-3 md:col-start-5 md:pt-0">
        <p>based in the mojave desert</p>
        <p>working worldwide</p>
      </div>

      <div className="col-span-6 pt-12 opacity-60 md:col-span-2 md:col-start-9 md:pt-0">
        <FooterWeather />
      </div>

      <div className="col-span-6 pt-12 text-right font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-2 md:col-start-11 md:pt-0">
        <div className="flex items-center justify-end gap-3">
          <a
            href="https://x.com/thirdindexco"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-100"
          >
            x
          </a>
          <a
            href="/llms.txt"
            className="transition-opacity hover:opacity-100"
          >
            llms.txt
          </a>
          <a
            href="https://ciccarel.li"
            target="_blank"
            rel="noopener noreferrer"
            title="Michael Ciccarelli"
            className="transition-opacity hover:opacity-100"
          >
            ciccarel.li
          </a>
        </div>
        <p className="pt-1">© 2026 third index llc</p>
      </div>
    </footer>
  );
}
