import type { CurrencyCode } from '../types/currency';

export function formatCurrency(
  amount: number,
  currencyCode: CurrencyCode = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number, decimalPlaces: number = 2): string {
  return `${value.toFixed(decimalPlaces)}%`;
}

export function formatNumber(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(value);
}
