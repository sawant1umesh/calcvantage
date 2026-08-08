import type { CurrencyRates } from '../../types/currency-service';
import type { CurrencyCode } from '../../types/currency';
import {
  CURRENCY_FETCH_RETRIES,
  CURRENCY_FETCH_TIMEOUT_MS,
  FRANKFURTER_API_BASE_URL,
  FRANKFURTER_LATEST_PATH,
  SUPPORTED_CURRENCIES,
} from '../../config/currency/frankfurter';

/**
 * Frankfurter API Client
 * Thin network layer for fetching the latest exchange rates. No API key required.
 */

export interface FetchLatestRatesOptions {
  timeoutMs?: number;
  retries?: number;
}

interface FrankfurterLatestResponse {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

/**
 * Fetch the latest rates for `base` covering all supported currencies.
 * Retries idempotently and throws on the final network/HTTP failure.
 */
export async function fetchLatestRates(
  base: CurrencyCode,
  options: FetchLatestRatesOptions = {}
): Promise<CurrencyRates> {
  const timeoutMs = options.timeoutMs ?? CURRENCY_FETCH_TIMEOUT_MS;
  const retries = options.retries ?? CURRENCY_FETCH_RETRIES;

  const to = SUPPORTED_CURRENCIES.filter((code) => code !== base).join(',');
  const params = new URLSearchParams({ from: base, to });
  const url = `${FRANKFURTER_API_BASE_URL}${FRANKFURTER_LATEST_PATH}?${params.toString()}`;

  let lastError: unknown = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const payload = await fetchWithTimeout(url, timeoutMs);
      return normalizeRates(base, payload);
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('Unable to fetch exchange rates from Frankfurter.');
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<FrankfurterLatestResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Frankfurter API responded with HTTP ${response.status}`);
    }
    return (await response.json()) as FrankfurterLatestResponse;
  } finally {
    clearTimeout(timer);
  }
}

/** Validate the Frankfurter payload and normalize it into a full CurrencyRates snapshot. */
function normalizeRates(base: CurrencyCode, payload: FrankfurterLatestResponse): CurrencyRates {
  if (!payload || payload.base !== base || !payload.rates || typeof payload.rates !== 'object') {
    throw new Error('Frankfurter API returned an unexpected response shape.');
  }

  const rates = {} as Record<CurrencyCode, number>;
  rates[base] = 1;
  for (const code of SUPPORTED_CURRENCIES) {
    const candidate = code === base ? 1 : payload.rates[code];
    if (typeof candidate !== 'number' || !Number.isFinite(candidate) || candidate <= 0) {
      throw new Error(`Frankfurter API returned no usable rate for ${code}.`);
    }
    rates[code] = candidate;
  }

  return {
    base,
    date: String(payload.date),
    rates,
    fetchedAt: Date.now(),
    source: 'live',
  };
}