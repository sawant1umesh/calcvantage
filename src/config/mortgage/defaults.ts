import mortgageDefaultsData from '../../data/mortgage-defaults.json';
import type { CountryMortgageDefaults } from '../../types/mortgage';
import type { CountryCode } from '../../types/country';

export const MORTGAGE_DEFAULTS: Record<CountryCode, CountryMortgageDefaults> =
  mortgageDefaultsData as Record<CountryCode, CountryMortgageDefaults>;

export function getMortgageDefaultsByCountry(
  countryCode: CountryCode
): CountryMortgageDefaults {
  return MORTGAGE_DEFAULTS[countryCode] || MORTGAGE_DEFAULTS['US'];
}
