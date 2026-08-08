import type { BlogCategory, BlogPost } from '../types/blog';

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'mortgage',
    label: 'Mortgage',
    description: 'Home loans, payments, amortization, and home-buying essentials.',
    color: '#0070f3',
  },
  {
    slug: 'retirement',
    label: 'Retirement',
    description: 'Saving for retirement, withdrawal planning, and long-term goals.',
    color: '#7928ca',
  },
  {
    slug: 'net-worth',
    label: 'Net Worth',
    description: 'Tracking assets and liabilities to build a full-budget picture.',
    color: '#10b981',
  },
  {
    slug: 'investing',
    label: 'Investing',
    description: 'Markets, portfolios, risk, and growing money over time.',
    color: '#0d9488',
  },
  {
    slug: 'saving',
    label: 'Saving',
    description: 'Emergency funds, sinking funds, and habits that build balance.',
    color: '#0891b2',
  },
  {
    slug: 'budgeting',
    label: 'Budgeting',
    description: 'Practical approaches to planning spending and tracking progress.',
    color: '#f5a623',
  },
  {
    slug: 'taxes',
    label: 'Taxes',
    description: 'Understanding taxes on income, homeownership, and investments.',
    color: '#dc2626',
  },
  {
    slug: 'personal-finance',
    label: 'Personal Finance',
    description: 'Foundational money concepts and decisions that apply to everyone.',
    color: '#db2777',
  },
];

export const BLOG_CATEGORY_MAP: Record<string, BlogCategory> = Object.fromEntries(
  BLOG_CATEGORIES.map((category) => [category.slug, category])
);

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORY_MAP[slug];
}

export function getCategoryCount(posts: BlogPost[], slug: string): number {
  return posts.filter((post) => post.category === slug).length;
}