// Common types and default English exports for i18n support.

export type Domain = {
  id: number;
  slug: string;
  title: string;
  weight: number;
  blurb: string;
  tasks: {
    code: string;
    title: string;
    knowledge: string[];
    skills: string[];
  }[];
};

export type Scenario = {
  id: number;
  title: string;
  body: string;
  domains: string[];
};

export type Question = {
  id: number;
  scenario: string;
  prompt: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  answer: "A" | "B" | "C" | "D";
  explanation: string;
};

export type Exercise = {
  id: number;
  title: string;
  objective: string;
  steps: string[];
  domains: string[];
};

// Re-export English as the default content for backwards compatibility and static tracking
export * from "./content_en";
