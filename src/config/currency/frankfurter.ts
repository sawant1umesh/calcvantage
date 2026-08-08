import type { CurrencyCode } from '../../types/currency';

/**
 * Frankfurter API configuration
 * Free exchange-rate API backed by the European Central Bank. No API key required.
 * Documented at https://github.com/frankfurter/frankfurter
 */

export const FRANKFURTER_API_BASE_URL = 'https://api.frankfurter.app';
export const FRANKFURTER_LATEST_PATH = '/latest';

/** Currencies supported across the CalcVantage platform. */
export const SUPPORTED_CURRENCIES: CurrencyCode[] = ['USD', 'CAD', 'AUD'];

/** Default snapshot base used for cross-rate derivation. */
export const DEFAULT_BASE_CURRENCY: CurrencyCode = 'USD';

/** Rates refresh at most every 12 hours to avoid unnecessary API calls. */
export const CURRENCY_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export const CURRENCY_FETCH_TIMEOUT_MS = 8000;
export const CURRENCY_FETCH_RETRIES = 1;

export const CURRENCY_CACHE_STORAGE_KEY = 'calcvantage.currency.rates.v1';

/**
 * Static fallback rates, indexed to 1 unit of `FALLBACK_BASE_CURRENCY`.
 * Used only when the Frankfurter API is unreachable and no cached copy exists.
 */
export const FALLBACK_BASE_CURRENCY: CurrencyCode = 'USD';

export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  CAD: 1.4,
  AUD: 1.55,
};