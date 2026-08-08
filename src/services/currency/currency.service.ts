import type {
  CurrencyCode,
  CurrencyConversionResult,
  CurrencyRates,
  CurrencyServiceListener,
  CurrencyServiceOptions,
  CurrencyServiceSnapshot,
  CurrencyServiceStatus,
} from '../../types/currency-service';
import {
  CURRENCY_CACHE_STORAGE_KEY,
  CURRENCY_CACHE_TTL_MS,
  CURRENCY_FETCH_RETRIES,
  CURRENCY_FETCH_TIMEOUT_MS,
  DEFAULT_BASE_CURRENCY,
} from '../../config/currency/frankfurter';
import { fetchLatestRates } from './frankfurter.client';
import { CurrencyCache } from './currency-cache';
import { getCrossRate, roundCurrency, roundRate } from './currency-math';
import { buildFallbackRates } from './fallback-rates';

/**
 * CurrencyService
 * Single shared currency conversion service for the whole project, backed by the
 * free Frankfurter API (no API key). Built to be reused by the Mortgage, Retirement,
 * and Net Worth calculators.
 *
 * Behavior highlights
 * - Rates are fetched once per base and reused within the configurable TTL.
 * - The in-memory + localStorage cache avoids unnecessary API calls across sessions.
 * - Concurrent callers share a single in-flight request (no request storms).
 * - On network failure it degrades gracefully: stale cache first, then static fallback.
 * - `subscribe` lets any consumer react to loading / ready / error changes.
 */
export class CurrencyService {
  private readonly options: CurrencyServiceOptions;
  private readonly cache: CurrencyCache;
  private readonly listeners = new Set<CurrencyServiceListener>();

  private status: CurrencyServiceStatus = 'idle';
  private rates: CurrencyRates | null = null;
  private error: string | null = null;
  private lastUpdatedAt: number | null = null;
  private inflight: Promise<CurrencyRates> | null = null;

  constructor(options: Partial<CurrencyServiceOptions> = {}) {
    this.options = {
      base: DEFAULT_BASE_CURRENCY,
      ttlMs: CURRENCY_CACHE_TTL_MS,
      timeoutMs: CURRENCY_FETCH_TIMEOUT_MS,
      retries: CURRENCY_FETCH_RETRIES,
      storageKey: CURRENCY_CACHE_STORAGE_KEY,
      ...options,
    };
    this.cache = new CurrencyCache({
      storageKey: this.options.storageKey,
      ttlMs: this.options.ttlMs,
    });
  }

  getSnapshot(): CurrencyServiceSnapshot {
    return {
      status: this.status,
      rates: this.rates,
      error: this.error,
      lastUpdatedAt: this.lastUpdatedAt,
    };
  }

  getStatus(): CurrencyServiceStatus {
    return this.status;
  }

  subscribe(listener: CurrencyServiceListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  unsubscribe(listener: CurrencyServiceListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Get a rates snapshot for `base`, using the fresh cache when available.
   * Returns the same promise to every concurrent caller while a fetch is in flight.
   */
  getRates(base: CurrencyCode = this.options.base): Promise<CurrencyRates> {
    const cached = this.cache.get(base);
    if (cached) {
      this.setSnapshot(cached, 'ready', null);
      return Promise.resolve(cached);
    }
    return this.ensureRates(base);
  }

  /**
   * Convert an amount between any two supported currencies.
   * Returns immediately (no network) when `from === to`.
   */
  async convert(
    amount: number,
    from: CurrencyCode,
    to: CurrencyCode
  ): Promise<CurrencyConversionResult> {
    if (from === to) {
      return {
        amount,
        from,
        to,
        rate: 1,
        convertedAmount: roundCurrency(amount),
        source: this.rates ? this.rates.source : 'cache',
      };
    }

    const rates = await this.ensureAvailableRates();
    const rate = getCrossRate(rates, from, to);
    return {
      amount,
      from,
      to,
      rate: roundRate(rate),
      convertedAmount: roundCurrency(amount * rate),
      source: rates.source,
    };
  }

  /** Convenience: units of `to` per 1 unit of `from`. */
  async getRate(from: CurrencyCode, to: CurrencyCode): Promise<number> {
    if (from === to) return 1;
    const rates = await this.ensureAvailableRates();
    return roundRate(getCrossRate(rates, from, to));
  }

  /** Force a fresh fetch, ignoring the cached copy. */
  async refresh(base: CurrencyCode = this.options.base): Promise<CurrencyRates> {
    this.cache.clear();
    return this.ensureRates(base);
  }

  private async ensureRates(base: CurrencyCode): Promise<CurrencyRates> {
    if (this.inflight) return this.inflight;
    const promise = this.fetchOrFallback(base);
    this.inflight = promise;
    try {
      return await promise;
    } finally {
      this.inflight = null;
    }
  }

  private ensureAvailableRates(): Promise<CurrencyRates> {
    return this.rates ? Promise.resolve(this.rates) : this.getRates(this.options.base);
  }

  private async fetchOrFallback(base: CurrencyCode): Promise<CurrencyRates> {
    this.setSnapshot(this.rates, 'loading', null);
    try {
      const live = await fetchLatestRates(base, {
        timeoutMs: this.options.timeoutMs,
        retries: this.options.retries,
      });
      this.cache.set(live);
      this.setSnapshot(live, 'ready', null);
      return live;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to load exchange rates.';

      const stale = this.cache.getAny(base);
      if (stale) {
        this.setSnapshot(stale, 'error', message);
        return stale;
      }

      const fallback = buildFallbackRates(base);
      this.setSnapshot(fallback, 'error', message);
      return fallback;
    }
  }

  private setSnapshot(
    rates: CurrencyRates | null,
    status: CurrencyServiceStatus,
    error: string | null
  ): void {
    this.rates = rates;
    this.status = status;
    this.error = error;
    this.lastUpdatedAt = rates ? rates.fetchedAt : null;
    const snapshot = this.getSnapshot();
    this.listeners.forEach((listener) => listener(snapshot));
  }
}

export const currencyService = new CurrencyService();