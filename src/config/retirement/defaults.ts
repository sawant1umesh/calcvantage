import type { CountryRetirementDefaults } from '../../types/retirement';
import type { CountryCode } from '../../types/country';

/**
 * Default retirement planning parameters per country.
 * safeWithdrawalRate: standard sustainable withdrawal assumption (e.g. 4% rule).
 * statutoryMinimumRetirementAge: typical early-access age used for advisory warnings.
 */
export const RETIREMENT_DEFAULTS: Record<CountryCode, CountryRetirementDefaults> = {
  US: {
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 750,
    expectedReturnRate: 7,
    inflationRate: 3,
    retirementIncomeGoal: 5000,
    safeWithdrawalRate: 4,
    statutoryMinimumRetirementAge: 59.5,
  },
  CA: {
    currentAge: 35,
    retirementAge: 65,
    currentSavings: 45000,
    monthlyContribution: 700,
    expectedReturnRate: 6.5,
    inflationRate: 2.5,
    retirementIncomeGoal: 4500,
    safeWithdrawalRate: 4,
    statutoryMinimumRetirementAge: 60,
  },
  AU: {
    currentAge: 35,
    retirementAge: 67,
    currentSavings: 60000,
    monthlyContribution: 800,
    expectedReturnRate: 7,
    inflationRate: 2.75,
    retirementIncomeGoal: 4000,
    safeWithdrawalRate: 4,
    statutoryMinimumRetirementAge: 60,
  },
};

export function getRetirementDefaultsByCountry(
  countryCode: CountryCode
): CountryRetirementDefaults {
  return RETIREMENT_DEFAULTS[countryCode] || RETIREMENT_DEFAULTS['US'];
}