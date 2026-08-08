import type { NetWorthInputs, NetWorthResults } from '../../types/networth';
import {
  calculateTotalAssets,
  calculateTotalLiabilities,
  calculateNetWorthAmount,
  calculateAssetAllocation,
  calculateDebtBreakdown,
  calculateHealthScore,
  getHealthRating,
  getHealthNote,
  generateInsights,
} from '../../lib/financial/networth';
import { validateNetWorthInputs } from '../../validators/networth.validator';

export interface INetWorthService {
  calculate(inputs: NetWorthInputs): NetWorthResults;
}

/**
 * NetWorthService Implementation
 * Aggregates asset and liability totals, allocation, debt breakdown,
 * financial health score, and dynamic insights for a personal balance sheet.
 */
export class NetWorthService implements INetWorthService {
  calculate(inputs: NetWorthInputs): NetWorthResults {
    const validation = validateNetWorthInputs(inputs);

    const safeInputs: NetWorthInputs = {
      country: inputs.country || 'US',
      cash: inputs.cash || 0,
      investments: inputs.investments || 0,
      retirementAccounts: inputs.retirementAccounts || 0,
      realEstate: inputs.realEstate || 0,
      vehicles: inputs.vehicles || 0,
      businessAssets: inputs.businessAssets || 0,
      otherAssets: inputs.otherAssets || 0,
      mortgageLiabilities: inputs.mortgageLiabilities || 0,
      personalLoans: inputs.personalLoans || 0,
      autoLoans: inputs.autoLoans || 0,
      creditCards: inputs.creditCards || 0,
      studentLoans: inputs.studentLoans || 0,
      otherLiabilities: inputs.otherLiabilities || 0,
    };

    const totalAssets = calculateTotalAssets(safeInputs);
    const totalLiabilities = calculateTotalLiabilities(safeInputs);
    const netWorth = totalAssets - totalLiabilities;
    const totals = { totalAssets, totalLiabilities, netWorth };

    const assetAllocation = calculateAssetAllocation(safeInputs);
    const debtBreakdown = calculateDebtBreakdown(safeInputs);

    const healthScore = calculateHealthScore(safeInputs, totals);
    const healthRating = getHealthRating(healthScore);
    const healthNote = getHealthNote(healthRating);

    const insights = generateInsights(safeInputs, totals);

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      assetAllocation,
      debtBreakdown,
      healthScore,
      healthRating,
      healthNote,
      insights,
      warnings: validation.warnings,
    };
  }
}

export const netWorthService = new NetWorthService();