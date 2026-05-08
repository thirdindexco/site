"use client";

import { atom } from "jotai";

export type InquiryForm = {
  description: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  notes: string;
};

export const initialInquiryForm: InquiryForm = {
  description: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  company: "",
  notes: "",
};

export type InquiryField = {
  key: keyof InquiryForm;
  label: string;
  type: "input" | "textarea" | "select";
  inputType?: string;
  options?: string[];
  placeholder?: string;
  required?: boolean;
};

export type InquiryStep = {
  title: string;
  fields: InquiryField[];
};

export const inquirySteps: InquiryStep[] = [
  {
    title: "the project",
    fields: [
      {
        key: "description",
        label: "what are you looking to build?",
        type: "textarea",
        placeholder: "what are you building, and what do you need help with?",
        required: true,
      },
      {
        key: "timeline",
        label: "timeline",
        type: "select",
        options: ["asap", "next month", "next quarter", "exploring"],
        required: true,
      },
      {
        key: "budget",
        label: "budget",
        type: "select",
        options: ["<$10k", "$10–25k", "$25–50k", "$50k+", "not sure"],
        required: true,
      },
    ],
  },
  {
    title: "you",
    fields: [
      {
        key: "name",
        label: "name",
        type: "input",
        inputType: "text",
        required: true,
      },
      {
        key: "email",
        label: "email",
        type: "input",
        inputType: "email",
        required: true,
      },
      {
        key: "company",
        label: "company",
        type: "input",
        inputType: "text",
        placeholder: "company or organization (optional)",
      },
    ],
  },
  {
    title: "anything else",
    fields: [
      {
        key: "notes",
        label: "notes (optional)",
        type: "textarea",
        placeholder: "anything else we should know? (optional)",
      },
    ],
  },
];

// Global atoms so the form and current step survive the drawer closing.
// Kept in-memory only (no atomWithStorage) — a hard reload is the stronger
// "fresh start" signal. Cleared explicitly on successful submit or via the
// drawer's clear action.
export const inquiryFormAtom = atom<InquiryForm>(initialInquiryForm);
export const inquiryStepAtom = atom<number>(0);

// Global open state — single drawer instance is mounted once at the page
// root, any CTA on the page flips this atom to open it.
export const inquiryOpenAtom = atom<boolean>(false);
