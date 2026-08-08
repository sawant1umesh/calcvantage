import type { CountryCode } from './country';

export type PaymentFrequency = 'monthly' | 'bi-weekly' | 'weekly';

export interface MortgageInputs {
  country: CountryCode;
  homeValue: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTermYears: number;
  interestRate: number;
  paymentFrequency: PaymentFrequency;
  startDate?: string;
  propertyTaxRate?: number;
  homeInsuranceAnnual?: number;
  hoaFeeMonthly?: number;
  stateAU?: string;

  // Phase 2C Extra Payments
  extraMonthly?: number;
  extraOneTime?: number;
  extraOneTimeMonth?: number;
  extraYearly?: number;
}

export interface CountryMortgageDefaults {
  homeValue: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTermYears: number;
  interestRate: number;
  paymentFrequency: PaymentFrequency;
  propertyTaxRate: number;
  homeInsuranceAnnual: number;
  hoaFeeMonthly?: number;
  stateAU?: string;
  pmiRate?: number;
  cmhcRate?: number;
  lmiRate?: number;
}

export interface OneTimeCosts {
  cmhcInsurance?: number;
  stampDuty?: number;
  totalOneTime: number;
}

export interface MonthlyBreakdown {
  principalAndInterest: number;
  propertyTax: number;
  homeInsurance: number;
  hoaFee: number;
  totalMonthlyPayment: number;
}

export interface AmortizationScheduleItem {
  paymentNumber: number;
  paymentDate: string;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  remainingBalance: number;
  totalInterestToDate: number;
}

export interface ExtraPaymentResults {
  hasExtraPayments: boolean;
  interestSaved: number;
  monthsSaved: number;
  yearsSaved: number;
  newPayoffDate: string;
  originalTotalInterest: number;
  newTotalInterest: number;
}

export interface MortgageResults {
  principalAmount: number;
  monthlyPayment: number; // Total monthly payment (P&I + Tax + Insurance + HOA)
  monthlyBreakdown: MonthlyBreakdown;
  oneTimeCosts: OneTimeCosts;
  totalInterestPaid: number;
  totalPaymentAmount: number;
  payoffDate: string;
  amortizationSchedule?: AmortizationScheduleItem[];
  extraPaymentResults?: ExtraPaymentResults;
}


