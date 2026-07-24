"use client";

import { Switch } from "@base-ui-components/react/switch";
import { useAtom } from "jotai";
import { playClick } from "../_lib/click-sound";
import { setTheme, themeAtom, type Theme } from "../_lib/theme-state";

const MOODS: Theme[] = ["dark", "light"];

function RadioOption({
  label,
  checked,
  onSelect,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className="flex min-h-11 w-full cursor-pointer items-center gap-2 py-1 font-mono text-3xs font-medium uppercase tracking-tight opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)] aria-checked:opacity-100"
    >
      <span
        aria-hidden
        className="inline-flex h-2.5 w-2.5 items-center justify-center rounded-full border border-current"
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      </span>
      {label}
    </button>
  );
}

function ToggleSwitch({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 items-center justify-between gap-2 font-mono text-3xs font-medium uppercase tracking-tight opacity-60 transition-opacity hover:opacity-100 has-[[data-checked]]:opacity-100">
      <span>{label}</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={(next) => {
          // Same mech click as the theme toggle — pitched up for on, base
          // for off, mirroring the dark/light motif.
          playClick(next ? 1 : 0);
          onCheckedChange(next);
        }}
        className="relative inline-flex h-5 w-9 cursor-pointer items-center border border-[color:var(--panel-border)] outline-none transition-colors hover:border-[color:color-mix(in_srgb,var(--foreground)_35%,transparent)] data-[checked]:border-foreground data-[checked]:bg-foreground data-[checked]:text-background focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
      >
        <Switch.Thumb className="block h-3 w-3 translate-x-1 bg-current transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-[checked]:translate-x-[18px]" />
      </Switch.Root>
    </label>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="font-mono text-3xs font-medium uppercase tracking-tight opacity-40">
      {children}
    </div>
  );
}

// Settings drawer — floating card in the same family as the contact and
// inquiry overlays (inset, rounded, shared ease), but slimmer and with no
// backdrop: theme and debug toggles need the page visible while they're
// flipped. The closed transform overshoots by 2rem so the card and its
// shadow fully clear the inset gap.
export function SettingsPanel({
  gridDebug,
  setGridDebug,
  inspect,
  setInspect,
  settingsOpen,
  onClose,
}: {
  gridDebug: boolean;
  setGridDebug: (checked: boolean) => void;
  inspect: boolean;
  setInspect: (checked: boolean) => void;
  settingsOpen: boolean;
  onClose: () => void;
}) {
  const [theme] = useAtom(themeAtom);

  return (
    <aside
      inert={!settingsOpen}
      aria-hidden={!settingsOpen}
      aria-label="settings"
      className={`fixed top-2 bottom-2 left-2 right-2 z-50 overflow-hidden rounded-2xl border border-[color:var(--panel-border)] bg-[color:var(--background)] px-4 pt-4 text-foreground shadow-[-8px_0_24px_-16px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:left-auto sm:w-80 md:top-4 md:bottom-4 md:right-4 md:px-5 md:pt-5 ${
        settingsOpen ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-3xs font-medium uppercase tracking-tight">
        <span>settings</span>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end opacity-60 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-[color:var(--accent)]"
        >
          close
        </button>
      </div>

      <div className="pt-10">
        <SectionLabel>mood</SectionLabel>
        <div role="radiogroup" aria-label="mood" className="pt-3">
          {MOODS.map((mood) => (
            <RadioOption
              key={mood}
              label={mood}
              checked={theme === mood}
              onSelect={() => setTheme(mood)}
            />
          ))}
        </div>
      </div>

      <div className="pt-10">
        <SectionLabel>debug</SectionLabel>
        <div className="space-y-3 pt-3">
          <ToggleSwitch
            label="grid"
            checked={gridDebug}
            onCheckedChange={setGridDebug}
          />
          <ToggleSwitch
            label="inspect"
            checked={inspect}
            onCheckedChange={setInspect}
          />
        </div>
      </div>
    </aside>
  );
}
