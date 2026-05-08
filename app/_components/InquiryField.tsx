"use client";

import type { InquiryField as Field } from "../_lib/inquiry-state";

type Props = {
  field: Field;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
};

export function InquiryField({
  field,
  value,
  onChange,
  disabled,
  autoFocus,
}: Props) {
  return (
    <div>
      <label className="block font-mono font-medium text-3xs uppercase tracking-tight pb-2">
        {field.label}
      </label>
      {field.type === "select" ? (
        <div className="flex flex-wrap gap-2">
          {field.options!.map((o) => {
            const selected = value === o;
            return (
              <button
                key={o}
                type="button"
                onClick={() => onChange(o)}
                disabled={disabled}
                className={`font-mono font-medium text-3xs uppercase tracking-tight px-3 py-1.5 border transition-colors cursor-pointer disabled:cursor-not-allowed whitespace-nowrap outline-none ${
                  selected
                    ? "bg-foreground text-background border-foreground"
                    : "text-foreground border-foreground/30 hover:border-foreground/60"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={4}
          disabled={disabled}
          autoFocus={autoFocus}
          className="w-full bg-transparent border-b border-foreground/25 focus:border-foreground outline-none font-sans text-base leading-relaxed pb-2 resize-none placeholder:opacity-60 disabled:opacity-50 transition-colors"
        />
      ) : (
        <input
          type={field.inputType ?? "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className="w-full bg-transparent border-b border-foreground/25 focus:border-foreground outline-none font-sans text-base leading-relaxed pb-2 placeholder:opacity-60 disabled:opacity-50 transition-colors"
        />
      )}
    </div>
  );
}
