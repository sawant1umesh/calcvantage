export type CountryCode = 'US' | 'CA' | 'AU';

export type CompoundingType = 'monthly' | 'semi-annual' | 'annual';

export interface CountryConfig {
  code: CountryCode;
  name: string;
  flag: string;
  currencyCode: string;
  locale: string;
  compoundingType: CompoundingType;
  compoundingNote: string;
}
