"use client";

import type { MouseEvent } from "react";
import { GRID } from "../_lib/layout";
import { FooterWeather } from "./FooterWeather";
import { MonogramMark } from "./MonogramMark";
import { ThemeSwatch } from "./ThemeSwatch";

export function SiteFooter({
  onClickCapture,
}: {
  onClickCapture?: (event: MouseEvent<HTMLElement>) => void;
}) {
  return (
    <footer
      onClickCapture={onClickCapture}
      className={`mt-16 pb-16 md:mt-24 md:pb-24 lg:mt-32 lg:pb-32 ${GRID}`}
    >
      <div
        data-anim="footer"
        className="col-span-12 border-t border-[color:var(--panel-border)] pt-6 md:pt-8"
      />

      <div
        data-anim="footer"
        className="col-span-12 flex justify-start md:col-span-2 md:col-start-1"
      >
        <ThemeSwatch className="flex" />
      </div>

      <div
        data-anim="footer"
        className="col-span-12 pt-12 font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-3 md:col-start-5 md:pt-0"
      >
        <p>based in the mojave desert</p>
        <p>working worldwide</p>
      </div>

      <div
        data-anim="footer"
        className="col-span-6 pt-12 opacity-60 md:col-span-2 md:col-start-9 md:pt-0"
      >
        <FooterWeather />
      </div>

      <p
        data-anim="footer"
        className="col-span-6 pt-12 text-right font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-2 md:col-start-11 md:pt-0"
      >
        <a
          href="/llms.txt"
          className="transition-opacity hover:opacity-100"
        >
          llms.txt
        </a>
        <br />
        © 2026 third index llc
      </p>

      <div
        data-anim="footer"
        className="col-span-12 flex justify-center pt-24 pb-6 md:col-span-2 md:col-start-6 md:pt-32 md:pb-10"
      >
        <MonogramMark
          title="third index monogram"
          className="h-20 w-20 text-foreground md:h-24 md:w-24"
        />
      </div>
    </footer>
  );
}
