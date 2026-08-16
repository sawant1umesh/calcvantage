/**
 * Retirement Projection Utility Library
 * Core helper functions for retirement savings forecasting.
 */

import type { RetirementReadiness } from '../../types/retirement';

export interface RetirementProjectionOptions {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturnRate: number; // Annual expected return (percent)
  inflationRate: number; // Annual inflation rate (percent)
}

export interface RetirementProjection {
  yearsUntilRetirement: number;
  monthsUntilRetirement: number;
  futureRetirementValue: number;
  totalContributions: number;
  investmentGrowth: number;
  inflationAdjustedMonthlyGoal: number;
}

/**
 * Calculates effective monthly growth rate from an annual return rate.
 * Uses true monthly compounding: (1 + r)^(1/12) - 1.
 */
export function calculateEffectiveMonthlyReturn(annualReturnPercent: number): number {
  if (annualReturnPercent <= 0) return 0;
  const annualRate = annualReturnPercent / 100;
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

/**
 * Years remaining until the retirement target age.
 */
export function getYearsUntilRetirement(currentAge: number, retirementAge: number): number {
  return Math.max(0, retirementAge - currentAge);
}

/**
 * Calculates the full retirement projection:
 * - Future value of existing savings compounded monthly
 * - Future value of monthly contributions (ordinary annuity, end-of-month)
 * - Total money contributed
 * - Investment growth (earnings minus contributions)
 * - Inflation-adjusted monthly income goal
 */
export function calculateRetirementProjection(
  options: RetirementProjectionOptions
): RetirementProjection {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    expectedReturnRate,
    inflationRate,
  } = options;

  const yearsUntilRetirement = getYearsUntilRetirement(currentAge, retirementAge);
  const monthsUntilRetirement = yearsUntilRetirement * 12;
  const monthlyRate = calculateEffectiveMonthlyReturn(expectedReturnRate);

  // Future value of current savings
  const fvSavings =
    monthlyRate > 0
      ? currentSavings * Math.pow(1 + monthlyRate, monthsUntilRetirement)
      : currentSavings;

  // Future value of monthly contributions (ordinary annuity)
  const fvContributions =
    monthlyRate > 0
      ? (monthlyContribution * (Math.pow(1 + monthlyRate, monthsUntilRetirement) - 1)) / monthlyRate
      : monthlyContribution * monthsUntilRetirement;

  const totalContributions = currentSavings + monthlyContribution * monthsUntilRetirement;
  const futureRetirementValue = fvSavings + fvContributions;
  const investmentGrowth = futureRetirementValue - totalContributions;

  // Inflation-adjusted monthly income goal
  const monthlyInflation = calculateEffectiveMonthlyReturn(inflationRate);
  const inflationAdjustedMonthlyGoal =
    monthlyInflation > 0
      ? options.retirementIncomeGoal * Math.pow(1 + monthlyInflation, monthsUntilRetirement)
      : options.retirementIncomeGoal;

  return {
    yearsUntilRetirement: Math.round(yearsUntilRetirement * 10) / 10,
    monthsUntilRetirement,
    futureRetirementValue,
    totalContributions,
    investmentGrowth,
    inflationAdjustedMonthlyGoal,
  };
}

/**
 * Deflates a nominal future value back to today's purchasing power.
 * Equivalent to dividing by the cumulative inflation factor over the horizon.
 */
export function calculateInflationAdjustedRetirementValue(
  futureRetirementValue: number,
  inflationRate: number,
  yearsUntilRetirement: number
): number {
  if (inflationRate <= 0 || yearsUntilRetirement <= 0) return futureRetirementValue;
  const annualInflation = inflationRate / 100;
  return futureRetirementValue / Math.pow(1 + annualInflation, yearsUntilRetirement);
}

/**
 * Estimates sustainable monthly retirement income using a safe withdrawal rate
 * applied to the inflation-adjusted nest egg (in today's dollars).
 */
export function calculateEstimatedMonthlyIncome(
  inflationAdjustedValue: number,
  safeWithdrawalRate: number
): number {
  if (safeWithdrawalRate <= 0) return 0;
  return (inflationAdjustedValue * (safeWithdrawalRate / 100)) / 12;
}

/**
 * Retirement readiness thresholds based on goal achievement percent.
 * - Score >= 70%: "On Track"
 * - Score >= 40% and < 70%: "Improving"
 * - Score < 40%: "Needs Focus"
 */
export function getRetirementReadiness(achievementPercent: number | null): RetirementReadiness {
  if (achievementPercent === null || achievementPercent < 40) return 'Needs Focus';
  if (achievementPercent >= 70) return 'On Track';
  return 'Improving';
}