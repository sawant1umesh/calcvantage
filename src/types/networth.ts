import type { CountryCode } from './country';

/**
 * Net Worth Calculator Types
 * Phase 1A: Personal balance sheet aggregation (assets minus liabilities).
 */

export interface NetWorthInputs {
  country: CountryCode;

  // Assets
  cash: number;
  investments: number;
  retirementAccounts: number;
  realEstate: number;
  vehicles: number;
  businessAssets: number;
  otherAssets: number;

  // Liabilities
  mortgageLiabilities: number;
  personalLoans: number;
  autoLoans: number;
  creditCards: number;
  studentLoans: number;
  otherLiabilities: number;
}

export interface CountryNetWorthDefaults extends NetWorthInputs {}

export type HealthRating = 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement';

export interface AllocationItem {
  key: string;
  label: string;
  value: number;
  percent: number;
}

export interface NetWorthResults {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  // Phase 1B: allocation, health, and insights
  assetAllocation: AllocationItem[];
  debtBreakdown: AllocationItem[];
  healthScore: number;
  healthRating: HealthRating;
  healthNote: string;
  insights: string[];
  warnings: string[];
}

export interface AssetItem {
  id: string;
  name: string;
  category: 'cash' | 'investments' | 'real_estate' | 'vehicles' | 'other';
  value: number;
}

export interface LiabilityItem {
  id: string;
  name: string;
  category: 'mortgage' | 'student_loan' | 'auto_loan' | 'credit_card' | 'other';
  amount: number;
}

export interface NetWorthData {
  assets: AssetItem[];
  liabilities: LiabilityItem[];
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}