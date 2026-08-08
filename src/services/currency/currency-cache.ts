import type { CurrencyCode, CurrencyRates } from '../../types/currency-service';
import { CURRENCY_CACHE_STORAGE_KEY, CURRENCY_CACHE_TTL_MS } from '../../config/currency/frankfurter';

/**
 * Currency Rate Cache
 * Tiered, TTL-based cache: in-memory Map for the session plus localStorage so a
 * returning visitor avoids a network round-trip within the TTL window. Safe to use
 * in SSR (build time) environments where localStorage does not exist.
 */

export interface CurrencyCacheOptions {
  storageKey?: string;
  ttlMs?: number;
}

interface PersistedCache {
  version: number;
  entries: Record<string, CurrencyRates>;
}

const CACHE_VERSION = 1;

export class CurrencyCache {
  private readonly storageKey: string;
  private readonly ttlMs: number;
  private readonly memory = new Map<string, CurrencyRates>();
  private hydrated = false;

  constructor(options: CurrencyCacheOptions = {}) {
    this.storageKey = options.storageKey ?? CURRENCY_CACHE_STORAGE_KEY;
    this.ttlMs = options.ttlMs ?? CURRENCY_CACHE_TTL_MS;
  }

  /**
   * Returns a fresh snapshot for `base`. Stale entries are left in place so they
   * remain available to `getAny` as an offline fallback.
   */
  get(base: CurrencyCode): CurrencyRates | null {
    this.hydrate();
    const entry = this.memory.get(base);
    return entry && this.isFresh(entry) ? entry : null;
  }

  /** Returns any snapshot for `base`, even a stale one (fallback after network failure). */
  getAny(base: CurrencyCode): CurrencyRates | null {
    this.hydrate();
    return this.memory.get(base) ?? null;
  }

  set(rates: CurrencyRates): void {
    this.hydrate();
    this.memory.set(rates.base, rates);
    this.persist();
  }

  isFresh(entry: CurrencyRates): boolean {
    return Date.now() - entry.fetchedAt <= this.ttlMs;
  }

  clear(): void {
    this.memory.clear();
    this.removePersisted();
  }

  private hydrate(): void {
    if (this.hydrated) return;
    this.hydrated = true;
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PersistedCache;
      if (!parsed || parsed.version !== CACHE_VERSION || !parsed.entries) return;
      for (const [base, entry] of Object.entries(parsed.entries)) {
        if (entry && entry.base && entry.rates) {
          this.memory.set(base, entry);
        }
      }
    } catch {
      // Corrupted or unavailable storage — fall back to in-memory fetch.
    }
  }

  private persist(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const entries: Record<string, CurrencyRates> = {};
      this.memory.forEach((entry, base) => {
        entries[base] = entry;
      });
      const payload: PersistedCache = { version: CACHE_VERSION, entries };
      if (Object.keys(entries).length === 0) {
        localStorage.removeItem(this.storageKey);
      } else {
        localStorage.setItem(this.storageKey, JSON.stringify(payload));
      }
    } catch {
      // Quota exceeded or storage disabled — keep in-memory cache only.
    }
  }

  private removePersisted(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // Ignore storage failures.
    }
  }
}