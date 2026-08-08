import type { RetirementInputs } from '../types/retirement';
import { getRetirementDefaultsByCountry } from '../config/retirement/defaults';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  warnings: string[];
}

/**
 * Validates retirement planning inputs.
 * Errors block the calculation; warnings surface advisory edge cases only.
 */
export function validateRetirementInputs(
  inputs: Partial<RetirementInputs>
): ValidationResult {
  const errors: Record<string, string> = {};
  const warnings: string[] = [];

  const country = inputs.country || 'US';
  const defaults = getRetirementDefaultsByCountry(country);

  // 1. Country Validation
  if (!inputs.country) {
    errors.country = 'Country is required.';
  }

  // 2. Current Age Validation
  if (inputs.currentAge === undefined || inputs.currentAge === null || isNaN(inputs.currentAge)) {
    errors.currentAge = 'Current age is required.';
  } else if (inputs.currentAge < 18) {
    errors.currentAge = 'Current age must be at least 18.';
  } else if (inputs.currentAge > 100) {
    errors.currentAge = 'Current age cannot exceed 100.';
  }

  // 3. Retirement Age Validation
  if (inputs.retirementAge === undefined || inputs.retirementAge === null || isNaN(inputs.retirementAge)) {
    errors.retirementAge = 'Retirement age is required.';
  } else if (inputs.retirementAge <= (inputs.currentAge ?? 0)) {
    errors.retirementAge = 'Retirement age must be greater than current age.';
  } else if (inputs.retirementAge > 100) {
    errors.retirementAge = 'Retirement age cannot exceed 100.';
  } else if (inputs.retirementAge < defaults.statutoryMinimumRetirementAge) {
    warnings.push(
      `Retiring at ${inputs.retirementAge} is earlier than the typical ${country} access age of ${defaults.statutoryMinimumRetirementAge}. Early-withdrawal penalties may apply.`
    );
  }

  // 4. Current Savings Validation
  if (inputs.currentSavings === undefined || inputs.currentSavings === null || isNaN(inputs.currentSavings)) {
    errors.currentSavings = 'Current savings is required.';
  } else if (inputs.currentSavings < 0) {
    errors.currentSavings = 'Current savings cannot be negative.';
  }

  // 5. Monthly Contribution Validation
  if (inputs.monthlyContribution === undefined || inputs.monthlyContribution === null || isNaN(inputs.monthlyContribution)) {
    errors.monthlyContribution = 'Monthly contribution is required.';
  } else if (inputs.monthlyContribution < 0) {
    errors.monthlyContribution = 'Monthly contribution cannot be negative.';
  }

  // 6. Expected Annual Return Validation
  if (inputs.expectedReturnRate === undefined || inputs.expectedReturnRate === null || isNaN(inputs.expectedReturnRate)) {
    errors.expectedReturnRate = 'Expected annual return is required.';
  } else if (inputs.expectedReturnRate < 0) {
    errors.expectedReturnRate = 'Expected return cannot be negative.';
  } else if (inputs.expectedReturnRate > 30) {
    errors.expectedReturnRate = 'Expected return cannot exceed 30%.';
  }

  // 7. Inflation Rate Validation
  if (inputs.inflationRate === undefined || inputs.inflationRate === null || isNaN(inputs.inflationRate)) {
    errors.inflationRate = 'Inflation rate is required.';
  } else if (inputs.inflationRate < 0) {
    errors.inflationRate = 'Inflation rate cannot be negative.';
  } else if (inputs.inflationRate > 20) {
    errors.inflationRate = 'Inflation rate cannot exceed 20%.';
  }

  // 8. Retirement Income Goal Validation
  if (inputs.retirementIncomeGoal === undefined || inputs.retirementIncomeGoal === null || isNaN(inputs.retirementIncomeGoal)) {
    errors.retirementIncomeGoal = 'Retirement income goal is required.';
  } else if (inputs.retirementIncomeGoal < 0) {
    errors.retirementIncomeGoal = 'Retirement income goal cannot be negative.';
  }

  // 9. Edge-Case Warnings
  if (
    inputs.expectedReturnRate !== undefined && inputs.expectedReturnRate !== null &&
    inputs.inflationRate !== undefined && inputs.inflationRate !== null &&
    inputs.expectedReturnRate <= inputs.inflationRate
  ) {
    warnings.push(
      'Expected return does not exceed the inflation rate, so your savings may not grow in real terms.'
    );
  }

  if (
    inputs.currentSavings !== undefined && inputs.currentSavings !== null &&
    inputs.monthlyContribution !== undefined && inputs.monthlyContribution !== null &&
    inputs.currentSavings <= 0 && inputs.monthlyContribution <= 0
  ) {
    warnings.push('No savings or contributions entered, so the projected nest egg will be near zero.');
  }

  if (
    inputs.retirementIncomeGoal !== undefined && inputs.retirementIncomeGoal !== null &&
    inputs.retirementIncomeGoal <= 0
  ) {
    warnings.push('A monthly income goal of $0 means goal achievement cannot be rated.');
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
  };
}