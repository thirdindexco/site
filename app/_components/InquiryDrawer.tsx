"use client";

import { useState } from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAtom } from "jotai";
import {
  inquiryFormAtom,
  inquiryOpenAtom,
  inquiryStepAtom,
  initialInquiryForm,
  inquirySteps,
  type InquiryForm,
} from "../_lib/inquiry-state";
import { InquiryField } from "./InquiryField";

export function InquiryDrawer() {
  // Form + step live in jotai so closing the drawer doesn't throw away
  // what the user has entered. Transient UI (submitting, error, sent)
  // stays local — it should always reset with the component.
  const [open, setOpen] = useAtom(inquiryOpenAtom);
  const [form, setForm] = useAtom(inquiryFormAtom);
  const [step, setStep] = useAtom(inquiryStepAtom);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const current = inquirySteps[step];
  const isLast = step === inquirySteps.length - 1;

  const update = (key: keyof InquiryForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const stepValid = current.fields.every(
    (f) => !f.required || form[f.key]?.trim(),
  );

  const hasData =
    step > 0 || Object.values(form).some((v) => v.trim().length > 0);

  const clearAll = () => {
    setForm(initialInquiryForm);
    setStep(0);
    setError(null);
  };

  const submit = async () => {
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
        throw new Error(msg ?? "send failed");
      }
      setSent(true);
      // Inquiry is done — clear the persisted atoms so reopening the drawer
      // presents a fresh form.
      setForm(initialInquiryForm);
      setStep(0);
    } catch (e) {
      setError(
        e instanceof Error && e.message
          ? e.message
          : "something went wrong — please try email instead.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const advance = () => {
    if (!stepValid || submitting) return;
    if (isLast) {
      submit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step === 0) handleOpenChange(false);
    else setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    advance();
  };

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (!o) {
      // Transient UI only — form + step stay in the atoms until the user
      // submits or hits "clear".
      window.setTimeout(() => {
        setError(null);
        setSent(false);
      }, 500);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-foreground/15 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="fixed z-50 top-2 bottom-2 left-2 right-2 md:left-auto md:top-4 md:bottom-4 md:right-4 md:w-[520px] flex flex-col overflow-hidden rounded-2xl border border-[color:var(--panel-border)] bg-background text-foreground shadow-[-8px_0_24px_-16px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-10 pt-5 pb-8">
            <Dialog.Title className="font-mono font-medium text-3xs uppercase tracking-tight">
              inquiry · {sent ? "sent" : `${step + 1} / ${inquirySteps.length}`}
            </Dialog.Title>
            <Dialog.Close className="font-mono font-medium text-3xs uppercase tracking-tight transition-colors hover:text-accent outline-none cursor-pointer">
              close
            </Dialog.Close>
          </div>

          {sent ? (
            <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10">
              <h2 className="font-sans text-2xl font-semibold tracking-tight leading-tight pb-4 md:text-3xl">
                inquiry sent.
              </h2>
              <p className="font-sans text-sm leading-relaxed text-foreground/60">
                thanks — response within 48 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex min-h-0 flex-1 flex-col">
                {/* Form body */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-8">
                  <h2 className="font-mono font-medium text-3xs uppercase tracking-tight pb-5">
                    {current.title}
                  </h2>
                  <div key={step} className="flex flex-col gap-4">
                    {current.fields.map((field, i) => (
                      <InquiryField
                        key={field.key}
                        field={field}
                        value={form[field.key]}
                        onChange={(v) => update(field.key, v)}
                        disabled={submitting}
                        autoFocus={i === 0 && field.type !== "select"}
                      />
                    ))}
                  </div>

                  {isLast && (
                    <div className="mt-10 pt-6 border-t border-foreground/20 space-y-3">
                      <p className="font-mono font-medium text-3xs uppercase tracking-tight">
                        summary
                      </p>
                      <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1.5 font-sans text-sm leading-relaxed">
                        <dt className="font-mono text-3xs uppercase opacity-70">
                          project
                        </dt>
                        <dd>{form.description || "—"}</dd>
                        <dt className="font-mono text-3xs uppercase opacity-70">
                          timeline
                        </dt>
                        <dd>{form.timeline || "—"}</dd>
                        <dt className="font-mono text-3xs uppercase opacity-70">
                          budget
                        </dt>
                        <dd>{form.budget || "—"}</dd>
                        <dt className="font-mono text-3xs uppercase opacity-70">
                          name
                        </dt>
                        <dd>{form.name || "—"}</dd>
                        <dt className="font-mono text-3xs uppercase opacity-70">
                          email
                        </dt>
                        <dd>{form.email || "—"}</dd>
                        {form.company && (
                          <>
                            <dt className="font-mono text-3xs uppercase opacity-70">
                              company
                            </dt>
                            <dd>{form.company}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  )}

                  {error && (
                    <p className="pt-6 font-mono font-light text-3xs uppercase tracking-tight text-accent">
                      {error}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer — left button aligns with form content above,
                  right button aligns with the sidebar's right edge above.
                  Both via the shared md:px-10 gutter. */}
              <div className="flex items-center px-6 md:px-10 pt-5 pb-5 border-t border-[color:var(--panel-border)]">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={back}
                    disabled={submitting}
                    className="inline-flex items-center gap-1.5 font-mono font-medium text-3xs uppercase tracking-tight transition-colors hover:text-accent outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ArrowLeft aria-hidden className="h-3 w-3" />
                    back
                  </button>
                ) : hasData ? (
                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={submitting}
                    className="font-mono font-medium text-3xs uppercase tracking-tight opacity-60 transition-opacity hover:opacity-100 outline-none cursor-pointer disabled:cursor-not-allowed"
                  >
                    clear
                  </button>
                ) : null}
                <button
                  type="submit"
                  disabled={!stepValid || submitting}
                  className="group/next ml-auto inline-flex items-center gap-1.5 bg-accent px-3 py-2 font-mono font-medium text-3xs uppercase tracking-tight text-white transition-colors duration-200 hover:bg-accent-hover outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {submitting ? "sending…" : isLast ? "send inquiry" : "next"}
                  {!submitting && (
                    <ArrowRight
                      aria-hidden
                      className="h-3 w-3 transition-transform duration-200 group-hover/next:translate-x-0.5"
                    />
                  )}
                </button>
              </div>
            </form>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
