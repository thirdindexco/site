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

      <div
        data-anim="footer"
        className="col-span-6 pt-12 text-right font-mono text-2xs font-light uppercase tracking-wide opacity-60 md:col-span-2 md:col-start-11 md:pt-0"
      >
        <div className="flex items-center justify-end gap-3">
          <a
            href="https://www.linkedin.com/company/thirdindex/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-opacity hover:opacity-100"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href="https://x.com/thirdindex_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="transition-opacity hover:opacity-100"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
            </svg>
          </a>
          <a
            href="mailto:info@thirdindex.co"
            aria-label="Email"
            className="transition-opacity hover:opacity-100"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
          </a>
          <a
            href="/llms.txt"
            className="transition-opacity hover:opacity-100"
          >
            llms.txt
          </a>
        </div>
        <p className="pt-1">© 2026 third index llc</p>
      </div>
    </footer>
  );
}
