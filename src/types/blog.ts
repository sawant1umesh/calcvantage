export type BlogCategorySlug =
  | 'mortgage'
  | 'retirement'
  | 'net-worth'
  | 'investing'
  | 'saving'
  | 'budgeting'
  | 'taxes'
  | 'personal-finance';

export interface BlogCategory {
  slug: string;
  label: string;
  description: string;
  color: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogSeo {
  title?: string;
  description?: string;
  canonical?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  subtitle?: string;
  category: string;
  readingTime: number;
  pubDate: string;
  author: string;
  featured?: boolean;
  popular?: boolean;
  content?: string;
  faqs?: BlogFaq[];
  seo?: BlogSeo;
}