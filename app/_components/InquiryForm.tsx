"use client";

import { useState, type ReactNode } from "react";
import { CONTACT, LINK } from "../_lib/canvas";
import { Document } from "./Document";
import {
  initialInquiryForm,
  inquirySections,
  type InquiryField,
  type InquiryForm as Form,
} from "../_lib/inquiry-state";

// The inquiry as one form on the sheet: three sections under the line,
// bare underlined fields, the options as words, and a line to send it.
// The form wraps the document frame. Posts to /api/inquiry, as the drawer
// did.
export function InquiryForm({
  lead,
  support,
}: {
  lead: ReactNode;
  support?: ReactNode;
}) {
  const [form, setForm] = useState<Form>(initialInquiryForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const update = (key: keyof Form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const valid = inquirySections.every((s) =>
    s.fields.every((f) => !f.required || form[f.key].trim()),
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const { error: msg } = await res.json().catch(() => ({}));
        throw new Error(msg ?? "Send failed");
      }
      setSent(true);
      setForm(initialInquiryForm);
    } catch (err) {
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please email instead.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const section = (s: (typeof inquirySections)[number]) => (
    <section
      key={s.id}
      className="md:grid md:grid-cols-12 md:gap-x-5"
      aria-labelledby={`inquiry-${s.id}`}
    >
      <h2
        id={`inquiry-${s.id}`}
        className="pb-[13px] text-muted-foreground md:col-span-2 md:pb-0"
      >
        {s.title}
      </h2>
      <div className="flex flex-col gap-y-[26px] md:col-span-6 md:col-start-4">
        {s.fields.map((f) => (
          <Field
            key={f.key}
            field={f}
            value={form[f.key]}
            onChange={(v) => update(f.key, v)}
            disabled={submitting}
          />
        ))}
      </div>
    </section>
  );

  if (sent) {
    return (
      <Document lead={lead} support={support}>
        <section className="md:grid md:grid-cols-12 md:gap-x-5">
          <h2 className="pb-[13px] text-muted-foreground md:col-span-2 md:pb-0">Sent</h2>
          <p className="md:col-span-6 md:col-start-4">
            Thank you. Response within 48 hours.
          </p>
        </section>
      </Document>
    );
  }

  return (
    <form onSubmit={submit}>
      <Document lead={lead} support={support}>
        {inquirySections.map(section)}

        <section className="md:grid md:grid-cols-12 md:gap-x-5">
          <h2 className="pb-[13px] text-muted-foreground md:col-span-2 md:pb-0">Send</h2>
          <div className="md:col-span-6 md:col-start-4">
            <p className="flex gap-6">
              <button
                type="submit"
                disabled={!valid || submitting}
                className={`${LINK} disabled:cursor-default disabled:opacity-30 disabled:hover:text-foreground`}
              >
                {submitting ? "Sending…" : "Send inquiry"}
              </button>
              <a
                href={CONTACT.call}
                target="_blank"
                rel="noopener noreferrer"
                className={`${LINK} text-muted-foreground`}
              >
                Or book a call
              </a>
            </p>
            {error ? <p className="pt-[13px] text-accent">{error}</p> : null}
          </div>
        </section>
      </Document>
    </form>
  );
}

const FIELD =
  "w-full resize-none border-b border-foreground/25 bg-transparent pb-[3px] outline-none transition-colors duration-200 placeholder:text-foreground/40 focus:border-accent disabled:opacity-50";

function Field({
  field,
  value,
  onChange,
  disabled,
}: {
  field: InquiryField;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const id = `inquiry-field-${field.key}`;
  return (
    <div>
      <label htmlFor={id} className="block pb-[3px]">
        {field.label}
        {field.required ? null : <span className="text-muted-foreground"> optional</span>}
      </label>
      {field.type === "select" ? (
        <div role="radiogroup" aria-labelledby={id} className="flex flex-wrap gap-x-6 gap-y-[3px]">
          {field.options!.map((o) => {
            const selected = value === o;
            return (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange(o)}
                disabled={disabled}
                className={`cursor-pointer outline-none transition-colors duration-200 hover:text-accent focus-visible:text-accent disabled:cursor-default ${
                  selected ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          required={field.required}
          disabled={disabled}
          className={FIELD}
        />
      ) : (
        <input
          id={id}
          type={field.inputType ?? "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          disabled={disabled}
          className={FIELD}
        />
      )}
    </div>
  );
}
