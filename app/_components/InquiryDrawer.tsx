"use client";

import { useState } from "react";
import { Dialog } from "@base-ui-components/react/dialog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import data from "../../public/data.json";

type Service = {
  title: string;
  description: string;
  deliverables: string[];
  timeline?: string;
};

const services = data.services as Service[];
const process = data.process as string[];

type FormState = {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  description: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  projectType: "",
  timeline: "",
  description: "",
};

type Step = {
  key: keyof FormState;
  label: string;
  type: "input" | "textarea" | "select";
  inputType?: string;
  options?: string[];
  placeholder?: string;
};

const steps: Step[] = [
  { key: "name", label: "your name", type: "input", inputType: "text" },
  { key: "email", label: "email address", type: "input", inputType: "email" },
  {
    key: "projectType",
    label: "project type",
    type: "select",
    options: ["interface or app", "marketing site", "design system", "other"],
  },
  {
    key: "timeline",
    label: "timeline",
    type: "select",
    options: ["a few weeks", "1–3 months", "3+ months", "not sure yet"],
  },
  {
    key: "description",
    label: "tell us about the project",
    type: "textarea",
    placeholder: "what you're building, who it's for, where you are.",
  },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InquiryDrawer({ open, onOpenChange }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const value = form[current.key];

  const reset = () => {
    setStep(0);
    setForm(initialState);
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
      onOpenChange(false);
      // small delay so the form doesn't flash through steps while the
      // drawer is animating out
      setTimeout(reset, 400);
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
    if (isLast) {
      submit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    if (step === 0) onOpenChange(false);
    else setStep((s) => s - 1);
  };

  const selectOption = (o: string) => {
    setForm((f) => ({ ...f, [current.key]: o }));
    // Give the tap a beat of visual feedback before advancing.
    window.setTimeout(() => {
      if (isLast) submit();
      else setStep((s) => s + 1);
    }, 140);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || submitting) return;
    advance();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm transition-opacity duration-300 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
        <Dialog.Popup className="fixed inset-y-0 right-0 z-50 flex w-full md:w-1/2 lg:w-[560px] flex-col bg-background text-foreground shadow-[-12px_0_32px_-16px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-10 pt-5 pb-10">
            <Dialog.Title className="font-mono font-medium text-3xs uppercase tracking-tight">
              inquiry · {step + 1} / {steps.length}
            </Dialog.Title>
            <Dialog.Close className="font-mono font-medium text-3xs uppercase tracking-tight transition-colors hover:text-accent outline-none cursor-pointer">
              close
            </Dialog.Close>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 md:px-10">
              <label className="block font-mono font-medium text-3xs uppercase tracking-tight pb-6">
                {current.label}
              </label>
              {current.type === "select" ? (
                <div className="flex flex-col gap-3">
                  {current.options!.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => selectOption(o)}
                      disabled={submitting}
                      className={`text-left font-ld font-light text-2xl leading-tight tracking-tight transition-opacity cursor-pointer disabled:cursor-not-allowed ${
                        value === o
                          ? "opacity-100"
                          : "opacity-40 hover:opacity-70"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              ) : current.type === "textarea" ? (
                <textarea
                  key={step}
                  value={value}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [current.key]: e.target.value }))
                  }
                  placeholder={current.placeholder}
                  rows={6}
                  autoFocus
                  disabled={submitting}
                  className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground outline-none font-ld font-light text-2xl leading-tight tracking-tight pb-2 resize-none placeholder:opacity-40 disabled:opacity-50"
                />
              ) : (
                <input
                  key={step}
                  type={current.inputType ?? "text"}
                  value={value}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [current.key]: e.target.value }))
                  }
                  placeholder={current.placeholder}
                  autoFocus
                  disabled={submitting}
                  className="w-full bg-transparent border-b border-foreground/20 focus:border-foreground outline-none font-ld font-light text-2xl leading-tight tracking-tight pb-2 placeholder:opacity-40 disabled:opacity-50"
                />
              )}

              {error && (
                <p className="pt-4 font-mono font-light text-3xs uppercase tracking-tight text-accent">
                  {error}
                </p>
              )}

              {/* Reference FAQ — typical engagements and how I work.
                  Subdued so the form stays the primary focus. */}
              <div className="pt-16 space-y-6 opacity-50">
                <div>
                  <p className="font-mono font-medium text-3xs uppercase tracking-tight pb-2">
                    typical engagements
                  </p>
                  <ul className="font-ld font-light text-sm leading-snug space-y-0.5">
                    {services.map((s) => (
                      <li key={s.title}>
                        {s.title}
                        {s.timeline ? (
                          <span className="opacity-70"> — {s.timeline}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono font-medium text-3xs uppercase tracking-tight pb-2">
                    how i work
                  </p>
                  <p className="font-ld font-light text-sm leading-snug">
                    {process.join(" · ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-10 pb-5">
              <button
                type="button"
                onClick={back}
                disabled={submitting}
                className="inline-flex items-center gap-1.5 font-mono font-medium text-3xs uppercase tracking-tight transition-colors hover:text-accent outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft aria-hidden className="h-3 w-3" />
                {step === 0 ? "cancel" : "back"}
              </button>
              <button
                type="submit"
                disabled={!value || submitting}
                className="group/next inline-flex items-center gap-1.5 font-mono font-medium text-3xs uppercase tracking-tight text-accent transition-opacity hover:opacity-70 outline-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {submitting ? "sending…" : isLast ? "submit" : "next"}
                {!submitting && (
                  <ArrowRight
                    aria-hidden
                    className="h-3 w-3 transition-transform duration-200 group-hover/next:translate-x-0.5"
                  />
                )}
              </button>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
