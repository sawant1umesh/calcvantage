import type { AmortizationScheduleItem } from '../types/mortgage';

/**
 * Formats amortization schedule array into CSV string and triggers browser file download.
 */
export function exportAmortizationToCSV(
  schedule: AmortizationScheduleItem[],
  filename: string = 'mortgage-amortization-schedule.csv'
): void {
  if (!schedule || schedule.length === 0) return;

  const headers = [
    'Payment #',
    'Payment Date',
    'Monthly Payment ($)',
    'Principal ($)',
    'Interest ($)',
    'Extra Payment ($)',
    'Remaining Balance ($)',
    'Total Interest Paid ($)',
  ];

  const rows = schedule.map((item) => [
    item.paymentNumber,
    `"${item.paymentDate}"`,
    item.paymentAmount.toFixed(2),
    item.principalPaid.toFixed(2),
    item.interestPaid.toFixed(2),
    item.extraPaid.toFixed(2),
    item.remainingBalance.toFixed(2),
    item.totalInterestToDate.toFixed(2),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
