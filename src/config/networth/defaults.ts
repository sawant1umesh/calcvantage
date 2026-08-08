import type { CountryCode } from '../../types/country';
import type { CountryNetWorthDefaults } from '../../types/networth';

/**
 * Default personal balance sheet values per country.
 * Used to pre-fill inputs on country switch and on reset.
 */
export const NET_WORTH_DEFAULTS: Record<CountryCode, CountryNetWorthDefaults> = {
  US: {
    country: 'US',
    cash: 25000,
    investments: 32000,
    retirementAccounts: 180000,
    realEstate: 420000,
    vehicles: 22000,
    businessAssets: 15000,
    otherAssets: 5000,
    mortgageLiabilities: 336000,
    personalLoans: 0,
    autoLoans: 12000,
    creditCards: 4500,
    studentLoans: 28000,
    otherLiabilities: 0,
  },
  CA: {
    country: 'CA',
    cash: 20000,
    investments: 28000,
    retirementAccounts: 145000,
    realEstate: 540000,
    vehicles: 10000,
    businessAssets: 10000,
    otherAssets: 4000,
    mortgageLiabilities: 450000,
    personalLoans: 0,
    autoLoans: 15000,
    creditCards: 3500,
    studentLoans: 18000,
    otherLiabilities: 0,
  },
  AU: {
    country: 'AU',
    cash: 18000,
    investments: 30000,
    retirementAccounts: 90000,
    realEstate: 750000,
    vehicles: 25000,
    businessAssets: 12000,
    otherAssets: 6000,
    mortgageLiabilities: 600000,
    personalLoans: 0,
    autoLoans: 18000,
    creditCards: 5200,
    studentLoans: 15000,
    otherLiabilities: 0,
  },
};

export function getNetWorthDefaultsByCountry(
  countryCode: CountryCode
): CountryNetWorthDefaults {
  return NET_WORTH_DEFAULTS[countryCode] || NET_WORTH_DEFAULTS['US'];
}