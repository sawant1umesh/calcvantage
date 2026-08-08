import { US_CONFIG } from './us';
import { CANADA_CONFIG } from './canada';
import { AUSTRALIA_CONFIG } from './australia';
import type { CountryConfig, CountryCode } from '../../types/country';

export * from './us';
export * from './canada';
export * from './australia';

export const COUNTRIES: CountryConfig[] = [US_CONFIG, CANADA_CONFIG, AUSTRALIA_CONFIG];

export const DEFAULT_COUNTRY_CODE: CountryCode = 'US';

export function getCountryByCode(code: CountryCode): CountryConfig {
  return COUNTRIES.find((c) => c.code === code) || US_CONFIG;
}
