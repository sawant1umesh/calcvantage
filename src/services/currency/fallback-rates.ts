import type { CurrencyCode, CurrencyRates } from '../../types/currency-service';
import {
  FALLBACK_BASE_CURRENCY,
  FALLBACK_RATES,
  SUPPORTED_CURRENCIES,
} from '../../config/currency/frankfurter';

/**
 * Static Fallback Rates
 * Builds a normalized snapshot from static rates so the calculators keep working
 * when the Frankfurter API is unreachable and no cached copy is available.
 * Values are stored indexed against `FALLBACK_BASE_CURRENCY` (USD) and re-based
 * at runtime to whichever base the caller requests.
 */

export function buildFallbackRates(base: CurrencyCode, now = Date.now()): CurrencyRates {
  const refUnit = FALLBACK_RATES[base];

  const rates = {} as Record<CurrencyCode, number>;
  for (const code of SUPPORTED_CURRENCIES) {
    rates[code] = FALLBACK_RATES[code] / refUnit;
  }

  return {
    base,
    date: new Date(now).toISOString().slice(0, 10),
    rates,
    fetchedAt: now,
    source: 'fallback',
  };
}

export { FALLBACK_BASE_CURRENCY, FALLBACK_RATES };