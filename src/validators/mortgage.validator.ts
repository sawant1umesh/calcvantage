import type { MortgageInputs } from '../types/mortgage';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates mortgage parameter inputs.
 */
export function validateMortgageInputs(inputs: Partial<MortgageInputs>): ValidationResult {
  const errors: Record<string, string> = {};

  // 1. Home Value Validation
  if (inputs.homeValue === undefined || inputs.homeValue === null || isNaN(inputs.homeValue)) {
    errors.homeValue = 'Home value is required.';
  } else if (inputs.homeValue <= 0) {
    errors.homeValue = 'Home value must be greater than $0.';
  }

  // 2. Down Payment Validation
  const homeValue = inputs.homeValue ?? 0;
  const downPaymentAmount = inputs.downPaymentAmount ?? 0;
  if (inputs.downPaymentAmount === undefined || inputs.downPaymentAmount === null || isNaN(inputs.downPaymentAmount)) {
    errors.downPaymentAmount = 'Down payment amount is required.';
  } else if (inputs.downPaymentAmount < 0) {
    errors.downPaymentAmount = 'Down payment cannot be negative.';
  } else if (inputs.downPaymentAmount > homeValue && homeValue > 0) {
    errors.downPaymentAmount = 'Down payment cannot exceed home value.';
  }

  // Statutory Canadian Down Payment Minimum Validation (5%)
  if (inputs.country === 'CA' && homeValue > 0) {
    const downPercent = inputs.downPaymentPercent ?? ((downPaymentAmount / homeValue) * 100);
    if (downPercent < 5) {
      errors.downPaymentAmount = 'Minimum down payment in Canada is 5%.';
    }
  }

  // 3. Interest Rate Validation
  if (inputs.interestRate === undefined || inputs.interestRate === null || isNaN(inputs.interestRate)) {
    errors.interestRate = 'Interest rate is required.';
  } else if (inputs.interestRate < 0) {
    errors.interestRate = 'Interest rate cannot be negative.';
  } else if (inputs.interestRate > 30) {
    errors.interestRate = 'Interest rate cannot exceed 30%.';
  }

  // 4. Loan Term Validation
  if (inputs.loanTermYears === undefined || inputs.loanTermYears === null || isNaN(inputs.loanTermYears)) {
    errors.loanTermYears = 'Loan term is required.';
  } else if (inputs.loanTermYears <= 0) {
    errors.loanTermYears = 'Loan term must be at least 1 year.';
  }

  // 5. Property Tax Validation
  if (inputs.propertyTaxRate !== undefined && inputs.propertyTaxRate !== null && !isNaN(inputs.propertyTaxRate)) {
    if (inputs.propertyTaxRate < 0) {
      errors.propertyTaxRate = 'Property tax rate cannot be negative.';
    } else if (inputs.propertyTaxRate > 15) {
      errors.propertyTaxRate = 'Property tax rate cannot exceed 15%.';
    }
  }

  // 6. Home Insurance Validation
  if (inputs.homeInsuranceAnnual !== undefined && inputs.homeInsuranceAnnual !== null && !isNaN(inputs.homeInsuranceAnnual)) {
    if (inputs.homeInsuranceAnnual < 0) {
      errors.homeInsuranceAnnual = 'Home insurance cannot be negative.';
    }
  }

  // 7. HOA Fee Validation (US)
  if (inputs.hoaFeeMonthly !== undefined && inputs.hoaFeeMonthly !== null && !isNaN(inputs.hoaFeeMonthly)) {
    if (inputs.hoaFeeMonthly < 0) {
      errors.hoaFeeMonthly = 'HOA fee cannot be negative.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

