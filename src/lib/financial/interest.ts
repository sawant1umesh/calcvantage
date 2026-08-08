import type { CountryCode } from '../../types/country';

/**
 * Interest Utility Library
 * Core helper functions for interest rates, compounding conversions, and payment calculations.
 */

/**
 * Calculates effective periodic interest rate based on annual rate, country compounding rules, and payment frequency.
 * - US & Australia: Standard monthly compounding (Annual Rate / 12)
 * - Canada: Semi-annual compounding per Canadian Banking Regulation (Interest Act)
 *   r_monthly = (1 + annualRate / 2)^(2/12) - 1 = (1 + annualRate / 2)^(1/6) - 1
 */
export function calculateEffectiveMonthlyRate(
  annualRatePercent: number,
  country: CountryCode = 'US',
  paymentsPerYear: number = 12
): number {
  if (annualRatePercent <= 0) return 0;
  const annualRate = annualRatePercent / 100;

  if (country === 'CA') {
    // Semi-annual compounding converted to effective monthly rate
    const semiAnnualRate = annualRate / 2;
    const effectiveAnnualFactor = Math.pow(1 + semiAnnualRate, 2);
    // Effective periodic rate for paymentsPerYear
    return Math.pow(effectiveAnnualFactor, 1 / paymentsPerYear) - 1;
  }

  // Standard compounding (US, AU, Default)
  return annualRate / paymentsPerYear;
}

/**
 * Calculates periodic mortgage payment (Principal & Interest).
 * Formula: M = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]
 * Special case: If interest rate r == 0, M = P / n.
 */
export function calculatePeriodicPayment(
  principalAmount: number,
  periodicRate: number,
  totalPayments: number
): number {
  if (principalAmount <= 0 || totalPayments <= 0) return 0;
  if (periodicRate <= 0) return principalAmount / totalPayments;

  const rateFactor = Math.pow(1 + periodicRate, totalPayments);
  const payment = (principalAmount * periodicRate * rateFactor) / (rateFactor - 1);
  
  return isFinite(payment) ? payment : 0;
}
