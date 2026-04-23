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

// Global atoms so the form and current step survive the drawer closing.
// Kept in-memory only (no atomWithStorage) — a hard reload is the stronger
// "fresh start" signal. Cleared explicitly on successful submit or via the
// drawer's clear action.
export const inquiryFormAtom = atom<InquiryForm>(initialInquiryForm);
export const inquiryStepAtom = atom<number>(0);
