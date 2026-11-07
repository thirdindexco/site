export type InquiryForm = {
  description: string;
  scope: string;
  timeline: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  notes: string;
};

export const initialInquiryForm: InquiryForm = {
  description: "",
  scope: "",
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

export type InquirySection = {
  id: string;
  title: string;
  fields: InquiryField[];
};

// The inquiry, as three sections of one form on /inquire. The API route
// in app/api/inquiry reads the same keys.
export const inquirySections: InquirySection[] = [
  {
    id: "project",
    title: "The project",
    fields: [
      {
        key: "description",
        label: "What are you looking to build?",
        type: "textarea",
        placeholder: "What you are building, and what you need help with",
        required: true,
      },
      {
        key: "scope",
        label: "What do you need?",
        type: "select",
        options: ["Design and development", "Development only"],
        required: true,
      },
      {
        key: "timeline",
        label: "Timeline",
        type: "select",
        options: ["As soon as possible", "Next month", "Next quarter", "Exploring"],
        required: true,
      },
      {
        key: "budget",
        label: "Budget",
        type: "select",
        options: ["Under $10k", "$10–25k", "$25–50k", "$50k+", "Not sure"],
        required: true,
      },
    ],
  },
  {
    id: "you",
    title: "You",
    fields: [
      { key: "name", label: "Name", type: "input", inputType: "text", required: true },
      { key: "email", label: "Email", type: "input", inputType: "email", required: true },
      {
        key: "company",
        label: "Company",
        type: "input",
        inputType: "text",
        placeholder: "Company or organization, optional",
      },
    ],
  },
  {
    id: "notes",
    title: "Anything else",
    fields: [
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        placeholder: "Anything else we should know, optional",
      },
    ],
  },
];
