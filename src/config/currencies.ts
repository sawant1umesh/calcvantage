import currenciesData from '../data/currencies.json';
import type { CurrencyConfig, CurrencyCode } from '../types/currency';

export const CURRENCIES: CurrencyConfig[] = currenciesData as CurrencyConfig[];

export function getCurrencyByCode(code: CurrencyCode): CurrencyConfig {
  return CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
}
