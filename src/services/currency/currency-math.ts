import type { CurrencyCode, CurrencyRates } from '../../types/currency-service';

/**
 * Currency Conversion Math
 * Pure helpers for deriving cross rates from a normalized snapshot.
 *
 * A snapshot stores `rates[code]` = units of `code` per 1 unit of `rate base`,
 * so 1 unit of `from` equals `rates[to] / rates[from]` units of `to`.
 */

export function getCrossRate(
  rates: CurrencyRates,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  return rates.rates[to] / rates.rates[from];
}

export function roundRate(rate: number): number {
  return Math.round(rate * 1_000_000) / 1_000_000;
}

export function roundCurrency(amount: number): number {
  return Math.round(amount * 100) / 100;
}