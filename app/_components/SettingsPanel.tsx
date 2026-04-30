"use client";

import { Switch } from "@base-ui-components/react/switch";
import { useAtom } from "jotai";
import { GRID } from "../_lib/layout";
import { setTheme, themeAtom, type Theme } from "../_lib/theme-state";

const themes: Theme[] = ["light", "dark", "accent"];

function ThemeControls() {
  const [theme] = useAtom(themeAtom);

  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      {themes.map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => setTheme(mode)}
          aria-pressed={theme === mode}
          className="group inline-flex h-6 items-center gap-1.5 border border-white/20 px-2 font-mono text-3xs uppercase tracking-tight text-zinc-400 transition-colors hover:border-white/45 hover:bg-zinc-800 hover:text-zinc-100 aria-pressed:border-zinc-100 aria-pressed:bg-zinc-100 aria-pressed:text-zinc-950"
        >
          <span
            aria-hidden
            className="h-2.5 w-2.5 border border-current"
            style={{
              background:
                mode === "light"
                  ? "#fafafa"
                  : mode === "dark"
                    ? "#0b0b0b"
                    : "#0000ff",
            }}
          />
          {mode}
        </button>
      ))}
    </div>
  );
}

function GridDebugSwitch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 font-mono text-3xs uppercase tracking-tight text-zinc-400">
      <span>grid</span>
      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="relative inline-flex h-6 w-10 items-center border border-white/20 text-zinc-400 outline-none transition-colors hover:border-white/45 data-[checked]:border-zinc-100 data-[checked]:bg-zinc-100 data-[checked]:text-zinc-950 focus-visible:outline focus-visible:outline-[1.5px] focus-visible:outline-offset-[3px] focus-visible:outline-zinc-100"
      >
        <Switch.Thumb className="block h-4 w-4 translate-x-1 bg-current transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] data-[checked]:translate-x-5" />
      </Switch.Root>
    </label>
  );
}

export function SettingsPanel({
  gridDebug,
  setGridDebug,
  settingsOpen,
}: {
  gridDebug: boolean;
  setGridDebug: (checked: boolean) => void;
  settingsOpen: boolean;
}) {
  return (
    <div
      inert={!settingsOpen}
      aria-hidden={!settingsOpen}
      className={`relative left-1/2 grid w-screen -translate-x-1/2 overflow-hidden bg-[color:var(--settings-surface)] px-4 text-zinc-400 transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none md:px-6 ${
        settingsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="min-h-0">
        <div className={`${GRID} items-center py-3 md:py-3.5`}>
          <div className="col-span-12 flex flex-wrap items-center justify-end gap-3 md:col-span-6 md:col-start-7">
            <GridDebugSwitch
              checked={gridDebug}
              onCheckedChange={setGridDebug}
            />
            <ThemeControls />
          </div>
        </div>
      </div>
    </div>
  );
}
