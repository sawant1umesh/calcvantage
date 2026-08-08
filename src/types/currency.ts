export type CurrencyCode = 'USD' | 'CAD' | 'AUD';

export type SymbolPosition = 'prefix' | 'suffix';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  symbolPosition: SymbolPosition;
  decimalSeparator: string;
  thousandSeparator: string;
}
