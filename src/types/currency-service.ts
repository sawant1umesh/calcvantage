import type { CurrencyCode } from './currency';

/**
 * Currency Service Types
 * Shared types for the Frankfurter-backed currency conversion service.
 * Reused by Mortgage, Retirement, and Net Worth calculators.
 */

export type CurrencyServiceStatus = 'idle' | 'loading' | 'ready' | 'error';

export type CurrencyRateSource = 'live' | 'cache' | 'fallback';

export interface CurrencyRates {
  /** Currency the snapshot is expressed against (1 unit of `base`). */
  base: CurrencyCode;
  /** Source date of the rates (Frankfurter publish date or local fallback date). */
  date: string;
  /** Units of each currency per 1 unit of `base`. Always includes the base itself. */
  rates: Record<CurrencyCode, number>;
  /** Epoch ms when the snapshot was retrieved. */
  fetchedAt: number;
  /** Where the snapshot came from. */
  source: CurrencyRateSource;
}

export interface CurrencyConversionResult {
  /** Original value in the source currency. */
  amount: number;
  from: CurrencyCode;
  to: CurrencyCode;
  /** Units of `to` per 1 unit of `from`. */
  rate: number;
  /** `amount * rate`, rounded to cents. */
  convertedAmount: number;
  source: CurrencyRateSource;
}

export interface CurrencyServiceSnapshot {
  status: CurrencyServiceStatus;
  rates: CurrencyRates | null;
  error: string | null;
  lastUpdatedAt: number | null;
}

export interface CurrencyServiceOptions {
  base: CurrencyCode;
  /** How long a cached snapshot is considered fresh. */
  ttlMs: number;
  /** Network timeout per request attempt in ms. */
  timeoutMs: number;
  /** Extra fetch attempts after the initial one on network failure. */
  retries: number;
  storageKey: string;
}

export type CurrencyServiceListener = (snapshot: CurrencyServiceSnapshot) => void;