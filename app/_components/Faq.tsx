"use client";

import { Collapsible } from "@base-ui-components/react/collapsible";

export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <ul className="border-y border-[color:var(--panel-border)]">
      {items.map((item, i) => (
        <li
          key={item.q}
          className={
            i > 0 ? "border-t border-[color:var(--panel-border)]" : ""
          }
        >
          <Collapsible.Root>
            <Collapsible.Trigger className="group/q flex w-full cursor-pointer items-baseline justify-between gap-5 py-4 text-left opacity-75 outline-none transition-opacity duration-200 hover:opacity-100 data-[panel-open]:opacity-100">
              <span className="font-sans text-sm font-medium leading-tight">
                {item.q}
              </span>
              <span
                aria-hidden
                className="shrink-0 select-none font-mono text-base leading-none opacity-60 transition-transform duration-200 group-data-[panel-open]/q:rotate-45"
              >
                +
              </span>
            </Collapsible.Trigger>
            <Collapsible.Panel className="collapsible-panel">
              <p className="max-w-[60ch] pb-5 pr-1 font-sans text-sm leading-relaxed text-foreground/70">
                {item.a}
              </p>
            </Collapsible.Panel>
          </Collapsible.Root>
        </li>
      ))}
    </ul>
  );
}
