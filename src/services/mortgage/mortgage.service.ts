import type { MortgageInputs, MortgageResults } from '../../types/mortgage';
import { calculateEffectiveMonthlyRate, calculatePeriodicPayment } from '../../lib/financial/interest';
import { validateMortgageInputs } from '../../validators/mortgage.validator';
import { calculateCMHCInsurance } from '../../config/mortgage/cmhc';
import { calculateStampDuty } from '../../config/mortgage/stamp-duty';
import { generateAmortizationSchedule, calculateExtraPaymentSavings } from '../../lib/financial/amortization';

export interface IMortgageService {
  calculate(inputs: MortgageInputs): MortgageResults;
}

/**
 * MortgageService Implementation
 * Performs accurate mortgage calculations, cost breakdowns, amortization schedules, and extra payment projections.
 */
export class MortgageService implements IMortgageService {
  calculate(inputs: MortgageInputs): MortgageResults {
    const validation = validateMortgageInputs(inputs);

    const country = inputs.country || 'US';
    const homeValue = inputs.homeValue || 0;
    const downPaymentAmount = inputs.downPaymentAmount || 0;
    const downPaymentPercent = inputs.downPaymentPercent || (homeValue > 0 ? (downPaymentAmount / homeValue) * 100 : 0);
    const principalAmount = Math.max(0, homeValue - downPaymentAmount);

    if (!validation.isValid || principalAmount <= 0) {
      return {
        principalAmount: principalAmount,
        monthlyPayment: 0,
        monthlyBreakdown: {
          principalAndInterest: 0,
          propertyTax: 0,
          homeInsurance: 0,
          hoaFee: 0,
          totalMonthlyPayment: 0,
        },
        oneTimeCosts: {
          cmhcInsurance: country === 'CA' ? calculateCMHCInsurance(homeValue, downPaymentAmount, downPaymentPercent) : 0,
          stampDuty: country === 'AU' ? calculateStampDuty(homeValue, inputs.stateAU) : 0,
          totalOneTime: 0,
        },
        totalInterestPaid: 0,
        totalPaymentAmount: principalAmount,
        payoffDate: this.calculatePayoffDate(inputs.loanTermYears || 30, inputs.startDate),
        amortizationSchedule: [],
        extraPaymentResults: {
          hasExtraPayments: false,
          interestSaved: 0,
          monthsSaved: 0,
          yearsSaved: 0,
          newPayoffDate: this.calculatePayoffDate(inputs.loanTermYears || 30, inputs.startDate),
          originalTotalInterest: 0,
          newTotalInterest: 0,
        },
      };
    }

    const loanTermYears = inputs.loanTermYears || 30;
    const paymentsPerYear = this.getPaymentsPerYear(inputs.paymentFrequency);
    const totalPayments = Math.max(1, loanTermYears * paymentsPerYear);

    // Calculate effective periodic interest rate per country compounding rules
    const periodicRate = calculateEffectiveMonthlyRate(
      inputs.interestRate || 0,
      country,
      paymentsPerYear
    );

    // Periodic Payment (P&I)
    const periodicPayment = calculatePeriodicPayment(principalAmount, periodicRate, totalPayments);

    // Convert P&I to Monthly Equivalent for standard comparison
    const monthlyPI = paymentsPerYear === 12 
      ? periodicPayment 
      : (periodicPayment * paymentsPerYear) / 12;

    // Monthly Property Tax
    const taxRate = inputs.propertyTaxRate || 0;
    const monthlyTax = (homeValue * (taxRate / 100)) / 12;

    // Monthly Homeowners Insurance
    const annualInsurance = inputs.homeInsuranceAnnual || 0;
    const monthlyInsurance = annualInsurance / 12;

    // Monthly HOA Fees (US only)
    const monthlyHoa = country === 'US' ? (inputs.hoaFeeMonthly || 0) : 0;

    // Total Monthly Payment
    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + monthlyHoa;

    // One-Time Upfront Costs (Displayed separately, NOT included in monthly payment)
    let cmhcInsurance = 0;
    let stampDuty = 0;

    if (country === 'CA') {
      cmhcInsurance = calculateCMHCInsurance(homeValue, downPaymentAmount, downPaymentPercent);
    } else if (country === 'AU') {
      stampDuty = calculateStampDuty(homeValue, inputs.stateAU || 'NSW');
    }

    const totalOneTime = cmhcInsurance + stampDuty;

    // Generate Full Amortization Schedule & Extra Payment Analysis
    const scheduleOutput = generateAmortizationSchedule({
      principalAmount,
      periodicRate,
      periodicPayment,
      totalPayments,
      paymentFrequency: inputs.paymentFrequency || 'monthly',
      startDateStr: inputs.startDate || 'Sep 2026',
      extraMonthly: inputs.extraMonthly || 0,
      extraOneTime: inputs.extraOneTime || 0,
      extraOneTimeMonth: inputs.extraOneTimeMonth || 1,
      extraYearly: inputs.extraYearly || 0,
    });

    const extraSavings = calculateExtraPaymentSavings({
      principalAmount,
      periodicRate,
      periodicPayment,
      totalPayments,
      paymentFrequency: inputs.paymentFrequency || 'monthly',
      startDateStr: inputs.startDate || 'Sep 2026',
      extraMonthly: inputs.extraMonthly || 0,
      extraOneTime: inputs.extraOneTime || 0,
      extraOneTimeMonth: inputs.extraOneTimeMonth || 1,
      extraYearly: inputs.extraYearly || 0,
    });

    // Total Mortgage Payment & Total Interest
    const totalInterestPaid = scheduleOutput.totalInterestPaid;
    const totalPaymentAmount = principalAmount + totalInterestPaid;
    const finalPayoffDate = extraSavings.hasExtraPayments ? extraSavings.newPayoffDate : scheduleOutput.payoffDate;

    return {
      principalAmount: Math.round(principalAmount),
      monthlyPayment: Math.round(totalMonthlyPayment),
      monthlyBreakdown: {
        principalAndInterest: Math.round(monthlyPI),
        propertyTax: Math.round(monthlyTax),
        homeInsurance: Math.round(monthlyInsurance),
        hoaFee: Math.round(monthlyHoa),
        totalMonthlyPayment: Math.round(totalMonthlyPayment),
      },
      oneTimeCosts: {
        cmhcInsurance: Math.round(cmhcInsurance),
        stampDuty: Math.round(stampDuty),
        totalOneTime: Math.round(totalOneTime),
      },
      totalInterestPaid: Math.round(totalInterestPaid),
      totalPaymentAmount: Math.round(totalPaymentAmount),
      payoffDate: finalPayoffDate,
      amortizationSchedule: scheduleOutput.schedule,
      extraPaymentResults: extraSavings,
    };
  }

  private getPaymentsPerYear(frequency: string): number {
    switch (frequency) {
      case 'weekly':
        return 52;
      case 'bi-weekly':
        return 26;
      case 'monthly':
      default:
        return 12;
    }
  }

  private calculatePayoffDate(termYears: number, startDateStr?: string): string {
    let startYear = new Date().getFullYear();
    let startMonthStr = 'Jan';

    if (startDateStr) {
      const parts = startDateStr.trim().split(' ');
      if (parts.length === 2) {
        startMonthStr = parts[0];
        const parsedYear = parseInt(parts[1], 10);
        if (!isNaN(parsedYear)) startYear = parsedYear;
      }
    }

    const targetYear = startYear + termYears;
    return `${startMonthStr} ${targetYear}`;
  }
}

export const mortgageService = new MortgageService();


