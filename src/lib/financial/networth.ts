import type { NetWorthInputs, AllocationItem, HealthRating } from '../../types/networth';

/**
 * Net Worth Financial Library
 * Personal balance sheet aggregation, allocation, health score, and insights.
 * Scoring thresholds and weights are exported so they can be tuned centrally.
 */

// ─── Phase 1B: Tunable Scoring Configuration ────────────────────────────────

/** Component weights for the financial health score (0–100 total). */
export const HEALTH_WEIGHTS = {
  netWorth: 40,
  debtBurden: 30,
  diversification: 30,
} as const;

/** Health rating thresholds applied to the 0–100 score. */
export const HEALTH_RATING_THRESHOLDS = {
  excellent: 80,
  good: 65,
  fair: 50,
} as const;

/** Debt-to-asset ratios used by the debt burden component. */
export const DEBT_RATIO_THRESHOLDS = {
  good: 0.2,
  severe: 0.8,
} as const;

/** A category must reach this share of assets to count toward diversification. */
export const DIVERSIFICATION_GOOD_SHARE = 0.05;
/** Cap on the number of active categories that fully reward diversification. */
export const DIVERSIFICATION_MAX_CATEGORIES = 5;
/** Above this single-category share, a concentration penalty applies. */
export const CONCENTRATION_LIMIT = 0.7;
/** Above this single-category share an insight warns about concentration. */
export const CONCENTRATION_INSIGHT_LIMIT = 0.7;
/** Maximum insights shown per run. */
export const MAX_INSIGHTS = 5;

// ─── Summation Helpers ──────────────────────────────────────────────────────

export function sumValues(values: number[]): number {
  return values.reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0);
}

export function aggregateAssets(inputs: NetWorthInputs): number {
  return sumValues([
    inputs.cash,
    inputs.investments,
    inputs.retirementAccounts,
    inputs.realEstate,
    inputs.vehicles,
    inputs.businessAssets,
    inputs.otherAssets,
  ]);
}

export function aggregateLiabilities(inputs: NetWorthInputs): number {
  return sumValues([
    inputs.mortgageLiabilities,
    inputs.personalLoans,
    inputs.autoLoans,
    inputs.creditCards,
    inputs.studentLoans,
    inputs.otherLiabilities,
  ]);
}

export function calculateTotalAssets(inputs: NetWorthInputs): number {
  return Math.round(aggregateAssets(inputs));
}

export function calculateTotalLiabilities(inputs: NetWorthInputs): number {
  return Math.round(aggregateLiabilities(inputs));
}

export function calculateNetWorthAmount(inputs: NetWorthInputs): number {
  return Math.round(aggregateAssets(inputs) - aggregateLiabilities(inputs));
}

// ─── Asset Allocation & Debt Breakdown ──────────────────────────────────────

interface AllocationSource {
  key: string;
  label: string;
  value: number;
}

const ASSET_ALLOCATION_ITEMS: AllocationSource[] = [
  { key: 'cash', label: 'Cash & Savings', value: 0 },
  { key: 'investments', label: 'Investments', value: 0 },
  { key: 'retirementAccounts', label: 'Retirement Accounts', value: 0 },
  { key: 'realEstate', label: 'Real Estate', value: 0 },
  { key: 'vehicles', label: 'Vehicles', value: 0 },
  { key: 'businessAssets', label: 'Business Assets', value: 0 },
  { key: 'otherAssets', label: 'Other Assets', value: 0 },
];

const DEBT_BREAKDOWN_ITEMS: AllocationSource[] = [
  { key: 'mortgageLiabilities', label: 'Mortgage', value: 0 },
  { key: 'personalLoans', label: 'Personal Loans', value: 0 },
  { key: 'autoLoans', label: 'Auto Loans', value: 0 },
  { key: 'creditCards', label: 'Credit Cards', value: 0 },
  { key: 'studentLoans', label: 'Student Loans', value: 0 },
  { key: 'otherLiabilities', label: 'Other Liabilities', value: 0 },
];

function buildAllocation(
  sources: AllocationSource[],
  total: number
): AllocationItem[] {
  return sources.map(({ key, label, value }) => ({
    key,
    label,
    value: Math.round(value),
    percent: total > 0 ? roundPercent((value / total) * 100) : 0,
  }));
}

export function calculateAssetAllocation(inputs: NetWorthInputs): AllocationItem[] {
  const total = aggregateAssets(inputs);
  const values = ASSET_ALLOCATION_ITEMS.map((item) => ({
    ...item,
    value: inputs[item.key as keyof NetWorthInputs] as number,
  }));
  return buildAllocation(values, total);
}

export function calculateDebtBreakdown(inputs: NetWorthInputs): AllocationItem[] {
  const total = aggregateLiabilities(inputs);
  const values = DEBT_BREAKDOWN_ITEMS.map((item) => ({
    ...item,
    value: inputs[item.key as keyof NetWorthInputs] as number,
  }));
  return buildAllocation(values, total);
}

// ─── Financial Health Score (modular weighted components) ───────────────────

export interface NetWorthTotals {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

/** Net worth component: rewards a positive net worth that covers more of assets. */
function calculateNetWorthScore(totals: NetWorthTotals): number {
  if (totals.totalAssets <= 0) return totals.netWorth > 0 ? 100 : 0;
  if (totals.netWorth < 0) return 0;
  return Math.round(Math.min(100, (totals.netWorth / totals.totalAssets) * 100));
}

/** Debt burden component: penalizes a rising liabilities-to-assets ratio. */
function calculateDebtBurdenScore(totals: NetWorthTotals): number {
  if (totals.totalAssets <= 0) return totals.totalLiabilities > 0 ? 0 : 100;
  const ratio = totals.totalLiabilities / totals.totalAssets;
  if (ratio <= DEBT_RATIO_THRESHOLDS.good) return 100;
  if (ratio >= DEBT_RATIO_THRESHOLDS.severe) return 0;
  const span = DEBT_RATIO_THRESHOLDS.severe - DEBT_RATIO_THRESHOLDS.good;
  const progress = ratio - DEBT_RATIO_THRESHOLDS.good;
  return Math.round(100 * (1 - progress / span));
}

/** Diversification component: rewards a balanced spread of asset categories. */
function calculateDiversificationScore(inputs: NetWorthInputs, totalAssets: number): number {
  if (totalAssets <= 0) return 0;
  const shares = ASSET_ALLOCATION_ITEMS.map((item) => (inputs[item.key as keyof NetWorthInputs] as number) / totalAssets);
  const active = shares.filter((share) => share >= DIVERSIFICATION_GOOD_SHARE).length;
  const score = Math.min(100, active * (100 / DIVERSIFICATION_MAX_CATEGORIES));
  const topShare = Math.max(0, ...shares);
  const withPenalty = topShare > CONCENTRATION_LIMIT ? Math.min(score, 40) : score;
  return Math.round(withPenalty);
}

/** Weighted composite financial health score (0–100). */
export function calculateHealthScore(
  inputs: NetWorthInputs,
  totals: NetWorthTotals
): number {
  const componentScores = {
    netWorth: calculateNetWorthScore(totals),
    debtBurden: calculateDebtBurdenScore(totals),
    diversification: calculateDiversificationScore(inputs, totals.totalAssets),
  };

  const totalWeight = HEALTH_WEIGHTS.netWorth + HEALTH_WEIGHTS.debtBurden + HEALTH_WEIGHTS.diversification;
  const weightedSum =
    componentScores.netWorth * HEALTH_WEIGHTS.netWorth +
    componentScores.debtBurden * HEALTH_WEIGHTS.debtBurden +
    componentScores.diversification * HEALTH_WEIGHTS.diversification;

  return Math.round(weightedSum / totalWeight);
}

export function getHealthRating(score: number): HealthRating {
  if (score >= HEALTH_RATING_THRESHOLDS.excellent) return 'Excellent';
  if (score >= HEALTH_RATING_THRESHOLDS.good) return 'Good';
  if (score >= HEALTH_RATING_THRESHOLDS.fair) return 'Fair';
  return 'Needs Improvement';
}

export function getHealthNote(rating: HealthRating): string {
  const notes: Record<HealthRating, string> = {
    Excellent: 'Your balance sheet is in excellent shape. Keep it up!',
    Good: 'Your finances look healthy with room to grow.',
    Fair: 'A few areas could be improved for a stronger financial position.',
    'Needs Improvement': 'Consider reducing liabilities and building more assets.',
  };
  return notes[rating];
}

// ─── Financial Insights ─────────────────────────────────────────────────────

export function generateInsights(
  inputs: NetWorthInputs,
  totals: NetWorthTotals
): string[] {
  const insights: string[] = [];
  const { totalAssets, totalLiabilities, netWorth } = totals;

  if (totalAssets <= 0 && totalLiabilities <= 0) {
    return ['Enter asset and liability values to see financial insights.'];
  }

  const fmt = (v: number) => `$${Math.round(v).toLocaleString('en-US')}`;
  const pct = (ratio: number) => `${Math.round(ratio * 100)}%`;
  const investmentShare = totalAssets > 0 ? (inputs.investments + inputs.retirementAccounts) / totalAssets : 0;
  const debtRatio = totalAssets > 0 ? totalLiabilities / totalAssets : 0;
  const cashShare = totalAssets > 0 ? inputs.cash / totalAssets : 0;

  if (netWorth < 0) {
    insights.push(
      `Your liabilities (${fmt(totalLiabilities)}) exceed your assets (${fmt(totalAssets)}).`
    );
  }

  if (investmentShare > 0) {
    insights.push(
      `Investments and retirement accounts represent ${pct(investmentShare)} of your total assets.`
    );
  }

  if (debtRatio > 0) {
    insights.push(
      `Liabilities represent ${pct(debtRatio)} of your total assets.`
    );
  }

  if (inputs.creditCards > 0) {
    insights.push(
      `Credit card debt represents ${fmt(inputs.creditCards)} of your total liabilities.`
    );
  }

  if (cashShare > 0) {
    insights.push(
      `Cash and savings represent ${pct(cashShare)} of your total assets.`
    );
  }

  const allocation = calculateAssetAllocation(inputs);
  const activeCount = allocation.filter((item) => item.percent >= 5).length;
  if (activeCount >= 4) {
    insights.push(
      `Assets are spread across ${activeCount} categories with at least 5% share each.`
    );
  }

  const top = allocation.reduce((max, item) => (item.percent > max.percent ? item : max));
  if (top && top.percent > CONCENTRATION_INSIGHT_LIMIT * 100) {
    insights.push(
      `${top.label} represents ${pct(top.percent / 100)} of your total assets.`
    );
  }

  return insights.slice(0, MAX_INSIGHTS);
}

// ─── Local Helpers ──────────────────────────────────────────────────────────

function roundPercent(value: number): number {
  return Math.round(value * 10) / 10;
}