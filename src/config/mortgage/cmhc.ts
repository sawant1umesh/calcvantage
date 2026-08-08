/**
 * Canadian Mortgage and Housing Corporation (CMHC) Insurance Rate Tables
 * CMHC insurance is required for Canadian mortgages with down payment between 5% and 19.99%.
 */
export const CMHC_TIERS = [
  { minDownPercent: 5, maxDownPercent: 9.99, premiumRatePercent: 4.0 },
  { minDownPercent: 10, maxDownPercent: 14.99, premiumRatePercent: 3.1 },
  { minDownPercent: 15, maxDownPercent: 19.99, premiumRatePercent: 2.8 },
  { minDownPercent: 20, maxDownPercent: 100, premiumRatePercent: 0.0 },
];

/**
 * Calculates CMHC insurance premium as a one-time cost.
 */
export function calculateCMHCInsurance(homeValue: number, downPaymentAmount: number, downPaymentPercent: number): number {
  if (homeValue <= 0) return 0;
  
  const effectiveDownPercent = downPaymentPercent > 0 
    ? downPaymentPercent 
    : (downPaymentAmount / homeValue) * 100;

  if (effectiveDownPercent < 5 || effectiveDownPercent >= 20) {
    return 0;
  }

  const tier = CMHC_TIERS.find(
    (t) => effectiveDownPercent >= t.minDownPercent && effectiveDownPercent <= t.maxDownPercent
  );

  const ratePercent = tier ? tier.premiumRatePercent : 4.0;
  const loanPrincipal = Math.max(0, homeValue - downPaymentAmount);

  return Math.round((loanPrincipal * ratePercent) / 100);
}

