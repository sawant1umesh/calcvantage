import type { CountryCode } from './country';

/**
 * Retirement Calculator Types
 * Phase 1B: Full savings projection contracts with readiness assessment.
 */
export type RetirementReadiness = 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement';

export interface RetirementInputs {
  country: CountryCode;
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnRate: number; // Annual expected return (percent)
  inflationRate: number; // Annual inflation rate (percent)
  retirementIncomeGoal: number; // Monthly retirement income goal (currency)
}

export interface CountryRetirementDefaults {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnRate: number;
  inflationRate: number;
  retirementIncomeGoal: number;
  // Annual safe withdrawal rate used to estimate sustainable monthly income
  safeWithdrawalRate: number;
  // Typical minimum age to access retirement funds in the country (soft warning threshold)
  statutoryMinimumRetirementAge: number;
}

export interface RetirementResults {
  yearsUntilRetirement: number;
  monthsUntilRetirement: number;
  futureRetirementValue: number;
  inflationAdjustedRetirementValue: number;
  totalContributions: number;
  investmentGrowth: number;
  estimatedMonthlyIncome: number;
  goalAchievementPercent: number | null;
  readiness: RetirementReadiness;
  readinessNote: string;
  inflationAdjustedMonthlyGoal: number;
  warnings: string[];
}