import type { AmortizationScheduleItem, ExtraPaymentResults, PaymentFrequency } from '../../types/mortgage';

export interface ScheduleGeneratorOptions {
  principalAmount: number;
  periodicRate: number;
  periodicPayment: number;
  totalPayments: number;
  paymentFrequency?: PaymentFrequency;
  startDateStr?: string;
  extraMonthly?: number;
  extraOneTime?: number;
  extraOneTimeMonth?: number;
  extraYearly?: number;
}

export interface ScheduleCalculationOutput {
  schedule: AmortizationScheduleItem[];
  totalInterestPaid: number;
  totalPaymentsMade: number;
  payoffDate: string;
}

/**
 * Generates payment-by-payment amortization schedule including extra payments.
 */
export function generateAmortizationSchedule(
  options: ScheduleGeneratorOptions
): ScheduleCalculationOutput {
  const {
    principalAmount,
    periodicRate,
    periodicPayment,
    totalPayments: maxPayments,
    paymentFrequency = 'monthly',
    startDateStr = 'Sep 2026',
    extraMonthly = 0,
    extraOneTime = 0,
    extraOneTimeMonth = 1,
    extraYearly = 0,
  } = options;

  if (principalAmount <= 0 || maxPayments <= 0) {
    return {
      schedule: [],
      totalInterestPaid: 0,
      totalPaymentsMade: 0,
      payoffDate: startDateStr,
    };
  }

  const schedule: AmortizationScheduleItem[] = [];
  let remainingBalance = principalAmount;
  let accumulatedInterest = 0;
  const periodsPerYear = paymentFrequency === 'weekly' ? 52 : paymentFrequency === 'bi-weekly' ? 26 : 12;

  let startYear = new Date().getFullYear();
  let startMonthIdx = 8; // September default (0-indexed 8)

  if (startDateStr) {
    const parts = startDateStr.trim().split(' ');
    if (parts.length === 2) {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const idx = monthNames.indexOf(parts[0]);
      if (idx !== -1) startMonthIdx = idx;
      const parsedYr = parseInt(parts[1], 10);
      if (!isNaN(parsedYr)) startYear = parsedYr;
    }
  }

  const startDateObj = new Date(startYear, startMonthIdx, 1);

  for (let p = 1; p <= maxPayments; p++) {
    if (remainingBalance <= 0.01) break;

    const interestPaid = periodicRate > 0 ? remainingBalance * periodicRate : 0;
    let principalPaid = periodicPayment - interestPaid;

    if (principalPaid < 0) principalPaid = 0;

    // Calculate Extra Payment for this period
    let extraPaid = extraMonthly;
    if (p === extraOneTimeMonth) {
      extraPaid += extraOneTime;
    }
    if (extraYearly > 0 && p % periodsPerYear === 0) {
      extraPaid += extraYearly;
    }

    let totalPrincipalPaid = principalPaid + extraPaid;

    // Cap principal paid at remaining balance
    if (totalPrincipalPaid >= remainingBalance) {
      totalPrincipalPaid = remainingBalance;
      principalPaid = Math.min(principalPaid, remainingBalance);
      extraPaid = Math.max(0, totalPrincipalPaid - principalPaid);
      remainingBalance = 0;
    } else {
      remainingBalance -= totalPrincipalPaid;
    }

    accumulatedInterest += interestPaid;
    const actualPaymentAmount = principalPaid + interestPaid + extraPaid;

    // Calculate Payment Date
    const currentDate = new Date(startDateObj);
    if (paymentFrequency === 'weekly') {
      currentDate.setDate(currentDate.getDate() + (p - 1) * 7);
    } else if (paymentFrequency === 'bi-weekly') {
      currentDate.setDate(currentDate.getDate() + (p - 1) * 14);
    } else {
      currentDate.setMonth(currentDate.getMonth() + (p - 1));
    }

    const monthStr = currentDate.toLocaleString('default', { month: 'short' });
    const yearStr = currentDate.getFullYear();
    const dateFormatted = `${monthStr} ${yearStr}`;

    schedule.push({
      paymentNumber: p,
      paymentDate: dateFormatted,
      paymentAmount: Math.round(actualPaymentAmount * 100) / 100,
      principalPaid: Math.round(principalPaid * 100) / 100,
      interestPaid: Math.round(interestPaid * 100) / 100,
      extraPaid: Math.round(extraPaid * 100) / 100,
      remainingBalance: Math.max(0, Math.round(remainingBalance * 100) / 100),
      totalInterestToDate: Math.round(accumulatedInterest * 100) / 100,
    });
  }

  const finalItem = schedule[schedule.length - 1];
  const finalPayoffDate = finalItem ? finalItem.paymentDate : startDateStr;

  return {
    schedule,
    totalInterestPaid: Math.round(accumulatedInterest),
    totalPaymentsMade: schedule.length,
    payoffDate: finalPayoffDate,
  };
}

/**
 * Calculates extra payment savings comparisons.
 */
export function calculateExtraPaymentSavings(
  options: ScheduleGeneratorOptions
): ExtraPaymentResults {
  const hasExtra = !!(options.extraMonthly || options.extraOneTime || options.extraYearly);

  const baseResult = generateAmortizationSchedule({
    ...options,
    extraMonthly: 0,
    extraOneTime: 0,
    extraYearly: 0,
  });

  if (!hasExtra) {
    return {
      hasExtraPayments: false,
      interestSaved: 0,
      monthsSaved: 0,
      yearsSaved: 0,
      newPayoffDate: baseResult.payoffDate,
      originalTotalInterest: baseResult.totalInterestPaid,
      newTotalInterest: baseResult.totalInterestPaid,
    };
  }

  const newResult = generateAmortizationSchedule(options);

  const interestSaved = Math.max(0, baseResult.totalInterestPaid - newResult.totalInterestPaid);
  const periodsPerYear = options.paymentFrequency === 'weekly' ? 52 : options.paymentFrequency === 'bi-weekly' ? 26 : 12;
  const paymentsSaved = Math.max(0, baseResult.totalPaymentsMade - newResult.totalPaymentsMade);
  const monthsSaved = Math.round((paymentsSaved / periodsPerYear) * 12);
  const yearsSaved = parseFloat((monthsSaved / 12).toFixed(1));

  return {
    hasExtraPayments: true,
    interestSaved: Math.round(interestSaved),
    monthsSaved,
    yearsSaved,
    newPayoffDate: newResult.payoffDate,
    originalTotalInterest: baseResult.totalInterestPaid,
    newTotalInterest: newResult.totalInterestPaid,
  };
}

