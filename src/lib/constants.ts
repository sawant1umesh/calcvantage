import type { CountryCode } from '../types/country';

export const APP_NAME = 'CalcVantage';
export const APP_TAGLINE = 'Premium Financial Calculator Platform';

export const TARGET_COUNTRIES: Record<CountryCode, { code: CountryCode; name: string; currencySymbol: string }> = {
  US: {
    code: 'US',
    name: 'United States',
    currencySymbol: '$',
  },
  CA: {
    code: 'CA',
    name: 'Canada',
    currencySymbol: '$',
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    currencySymbol: '$',
  },
};

export const COMMON_LOAN_TERMS = [10, 15, 20, 25, 30];

export const PAYMENT_FREQUENCIES = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'bi-weekly', label: 'Bi-Weekly' },
  { value: 'weekly', label: 'Weekly' },
];
