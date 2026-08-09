import type { MortgageInputs } from '../types/mortgage';
import type { CountryCode } from '../types/country';

/**
 * Encodes MortgageInputs into a URL query parameter string or updates window location without reloading.
 */
export function encodeInputsToURL(inputs: MortgageInputs): string {
  const params = new URLSearchParams();

  if (inputs.country) params.set('country', inputs.country);
  if (inputs.homeValue) params.set('homeValue', String(inputs.homeValue));
  if (inputs.downPaymentAmount) params.set('downAmount', String(inputs.downPaymentAmount));
  if (inputs.downPaymentPercent) params.set('downPercent', String(inputs.downPaymentPercent));
  if (inputs.interestRate) params.set('rate', String(inputs.interestRate));
  if (inputs.loanTermYears) params.set('term', String(inputs.loanTermYears));
  if (inputs.paymentFrequency) params.set('freq', inputs.paymentFrequency);
  if (inputs.propertyTaxRate !== undefined) params.set('taxRate', String(inputs.propertyTaxRate));
  if (inputs.homeInsuranceAnnual !== undefined) params.set('ins', String(inputs.homeInsuranceAnnual));
  if (inputs.hoaFeeMonthly !== undefined) params.set('hoa', String(inputs.hoaFeeMonthly));
  if (inputs.stateAU) params.set('stateAU', inputs.stateAU);

  if (inputs.extraMonthly) params.set('exM', String(inputs.extraMonthly));
  if (inputs.extraOneTime) params.set('ex1T', String(inputs.extraOneTime));
  if (inputs.extraYearly) params.set('exYr', String(inputs.extraYearly));

  const queryStr = params.toString();
  if (typeof window !== 'undefined' && window.history && queryStr) {
    const newSearch = `?${queryStr}`;
    if (window.location.search !== newSearch) {
      const newUrl = `${window.location.pathname}${newSearch}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }
  }

  return typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}?${queryStr}` : queryStr;
}

/**
 * Decodes URL search parameters into Partial<MortgageInputs>.
 */
export function decodeInputsFromURL(): Partial<MortgageInputs> | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  if ([...params.keys()].length === 0) return null;

  const result: Partial<MortgageInputs> = {};

  if (params.has('country')) result.country = params.get('country') as CountryCode;
  if (params.has('homeValue')) result.homeValue = parseFloat(params.get('homeValue') || '0');
  if (params.has('downAmount')) result.downPaymentAmount = parseFloat(params.get('downAmount') || '0');
  if (params.has('downPercent')) result.downPaymentPercent = parseFloat(params.get('downPercent') || '0');
  if (params.has('rate')) result.interestRate = parseFloat(params.get('rate') || '0');
  if (params.has('term')) result.loanTermYears = parseInt(params.get('term') || '30', 10);
  if (params.has('freq')) result.paymentFrequency = params.get('freq') as any;
  if (params.has('taxRate')) result.propertyTaxRate = parseFloat(params.get('taxRate') || '0');
  if (params.has('ins')) result.homeInsuranceAnnual = parseFloat(params.get('ins') || '0');
  if (params.has('hoa')) result.hoaFeeMonthly = parseFloat(params.get('hoa') || '0');
  if (params.has('stateAU')) result.stateAU = params.get('stateAU') || 'NSW';

  if (params.has('exM')) result.extraMonthly = parseFloat(params.get('exM') || '0');
  if (params.has('ex1T')) result.extraOneTime = parseFloat(params.get('ex1T') || '0');
  if (params.has('exYr')) result.extraYearly = parseFloat(params.get('exYr') || '0');

  return result;
}
