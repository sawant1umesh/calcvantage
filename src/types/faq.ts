/**
 * FAQ types.
 * Answers are authored in the repository and may contain minimal inline
 * markup (links / emphasis) rendered with `set:html`.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  label: string;
  description?: string;
  items: FaqItem[];
}