import { currencyService } from '../services/currency/currency.service';
import { SUPPORTED_CURRENCIES } from '../config/currency/frankfurter';
import { getCountryByCode } from '../config/countries/index';
import { getCurrencyByCode } from '../config/currencies';
import type { CurrencyCode } from '../types/currency';
import type { CurrencyRateSource, CurrencyServiceSnapshot } from '../types/currency-service';
import type { CountryCode } from '../types/country';

/**
 * Currency Display Helpers (Phase 4B)
 * Thin client-side helpers that reuse the shared Phase 4A CurrencyService singleton.
 * Calculator panels use these to convert native-currency results into the user's
 * chosen display currency without touching the calculator formulas.
 */

const STORAGE_PREFIX = 'calcvantage.displayCurrency.';

export function getNativeCurrency(country: CountryCode): CurrencyCode {
  return getCountryByCode(country).currencyCode as CurrencyCode;
}

export function getCurrencySymbol(code: CurrencyCode): string {
  return getCurrencyByCode(code).symbol;
}

export function isSupportedCurrency(code: string): code is CurrencyCode {
  return SUPPORTED_CURRENCIES.includes(code as CurrencyCode);
}

export interface ConversionContext {
  native: CurrencyCode;
  display: CurrencyCode;
  /** Units of `display` per 1 unit of `native`. */
  rate: number;
  source: CurrencyRateSource;
  isSameCurrency: boolean;
}

/**
 * Resolve the conversion rate/source for `native -> display`.
 * When both are equal this returns immediately without touching the network.
 */
export async function getConversionContext(
  native: CurrencyCode,
  display: CurrencyCode
): Promise<ConversionContext> {
  if (native === display) {
    return { native, display, rate: 1, source: 'cache', isSameCurrency: true };
  }
  const result = await currencyService.convert(1, native, display);
  return {
    native,
    display,
    rate: result.rate,
    source: result.source,
    isSameCurrency: false,
  };
}

export function loadDisplayCurrency(key: string, fallback: CurrencyCode): CurrencyCode {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return stored && isSupportedCurrency(stored) ? (stored as CurrencyCode) : fallback;
  } catch {
    return fallback;
  }
}

export function saveDisplayCurrency(key: string, code: CurrencyCode): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, code);
  } catch {
    // Ignore storage failures.
  }
}

export function subscribeCurrencyStatus(
  listener: (snapshot: CurrencyServiceSnapshot) => void
): () => void {
  return currencyService.subscribe(listener);
}
