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

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: number;
  pubDate: string;
  author: string;
  featured?: boolean;
  popular?: boolean;
}