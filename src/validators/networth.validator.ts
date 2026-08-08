import type { NetWorthInputs } from '../types/networth';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
}

/** Fields that make up the asset side of the balance sheet. */
export const NET_WORTH_ASSET_FIELDS: (keyof NetWorthInputs)[] = [
  'cash',
  'investments',
  'retirementAccounts',
  'realEstate',
  'vehicles',
  'businessAssets',
  'otherAssets',
];

/** Fields that make up the liability side of the balance sheet. */
export const NET_WORTH_LIABILITY_FIELDS: (keyof NetWorthInputs)[] = [
  'mortgageLiabilities',
  'personalLoans',
  'autoLoans',
  'creditCards',
  'studentLoans',
  'otherLiabilities',
];

/** Negative values are invalid on both sides of the balance sheet. */
const NO_NEGATIVE_FIELDS: (keyof NetWorthInputs)[] = [
  ...NET_WORTH_ASSET_FIELDS,
  ...NET_WORTH_LIABILITY_FIELDS,
];

/** Sanity cap applied to every field to block unrealistic values. */
export const NET_WORTH_MAX_VALUE = 100000000;

/**
 * Validates personal balance sheet inputs.
 * Every numeric field must be present, finite, non-negative, and within a sane cap.
 */
export function validateNetWorthInputs(
  inputs: Partial<NetWorthInputs>
): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  // 1. Country Validation
  if (!inputs.country) {
    errors.country = 'Country is required.';
  }

  // 2. Numeric Field Validation (Assets & Liabilities)
  for (const key of NO_NEGATIVE_FIELDS) {
    const value = inputs[key];
    if (value === undefined || value === null || isNaN(value)) {
      errors[key] = 'This value is required.';
    } else if (value < 0) {
      errors[key] = 'Value cannot be negative.';
    } else if (value > NET_WORTH_MAX_VALUE) {
      errors[key] = `Value cannot exceed $${NET_WORTH_MAX_VALUE.toLocaleString('en-US')}.`;
    }
  }

  // 3. Edge-Case Warnings
  const anyPositiveValue = NO_NEGATIVE_FIELDS.some(
    (key) => (inputs[key] as number | undefined) ?? 0 > 0
  );
  if (!anyPositiveValue) {
    warnings.push(
      'No asset or liability values entered, so the balance sheet totals will all be $0.'
    );
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  };
}