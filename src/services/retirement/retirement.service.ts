import type { RetirementInputs, RetirementResults } from '../../types/retirement';
import {
  calculateRetirementProjection,
  calculateInflationAdjustedRetirementValue,
  calculateEstimatedMonthlyIncome,
  getRetirementReadiness,
} from '../../lib/financial/retirement';
import { validateRetirementInputs } from '../../validators/retirement.validator';
import { getRetirementDefaultsByCountry } from '../../config/retirement/defaults';

export interface IRetirementService {
  calculate(inputs: RetirementInputs): RetirementResults;
}

/**
 * RetirementService Implementation
 * Performs retirement savings projections: future value, contributions, growth,
 * inflation-adjusted value, estimated income, and readiness assessment.
 */
export class RetirementService implements IRetirementService {
  calculate(inputs: RetirementInputs): RetirementResults {
    const validation = validateRetirementInputs(inputs);

    const country = inputs.country || 'US';
    const defaults = getRetirementDefaultsByCountry(country);
    const currentAge = inputs.currentAge || 0;
    const retirementAge = inputs.retirementAge || 0;
    const yearsUntilRetirement = Math.max(0, retirementAge - currentAge);

    if (!validation.isValid || yearsUntilRetirement <= 0) {
      return {
        yearsUntilRetirement,
        monthsUntilRetirement: yearsUntilRetirement * 12,
        futureRetirementValue: 0,
        inflationAdjustedRetirementValue: 0,
        totalContributions: 0,
        investmentGrowth: 0,
        estimatedMonthlyIncome: 0,
        goalAchievementPercent: null,
        readiness: 'Needs Improvement',
        readinessNote: 'Enter valid parameters to assess retirement readiness.',
        inflationAdjustedMonthlyGoal: 0,
        warnings: validation.warnings,
      };
    }

    const inflationRate = inputs.inflationRate || 0;
    const retirementIncomeGoal = inputs.retirementIncomeGoal || 0;

    const projection = calculateRetirementProjection({
      currentAge,
      retirementAge,
      currentSavings: inputs.currentSavings || 0,
      monthlyContribution: inputs.monthlyContribution || 0,
      expectedReturnRate: inputs.expectedReturnRate || 0,
      inflationRate,
      retirementIncomeGoal,
    });

    const inflationAdjustedRetirementValue = calculateInflationAdjustedRetirementValue(
      projection.futureRetirementValue,
      inflationRate,
      projection.yearsUntilRetirement
    );

    const estimatedMonthlyIncome = calculateEstimatedMonthlyIncome(
      inflationAdjustedRetirementValue,
      defaults.safeWithdrawalRate
    );

    const goalAchievementPercent =
      retirementIncomeGoal > 0
        ? Math.min(999, Math.round((estimatedMonthlyIncome / retirementIncomeGoal) * 100))
        : null;

    const readiness = getRetirementReadiness(goalAchievementPercent);
    const readinessNote = this.buildReadinessNote(readiness, goalAchievementPercent, retirementIncomeGoal);

    return {
      yearsUntilRetirement: projection.yearsUntilRetirement,
      monthsUntilRetirement: projection.monthsUntilRetirement,
      futureRetirementValue: Math.round(projection.futureRetirementValue),
      inflationAdjustedRetirementValue: Math.round(inflationAdjustedRetirementValue),
      totalContributions: Math.round(projection.totalContributions),
      investmentGrowth: Math.round(projection.investmentGrowth),
      estimatedMonthlyIncome: Math.round(estimatedMonthlyIncome),
      goalAchievementPercent,
      readiness,
      readinessNote,
      inflationAdjustedMonthlyGoal: Math.round(projection.inflationAdjustedMonthlyGoal),
      warnings: validation.warnings,
    };
  }

  private buildReadinessNote(
    readiness: string,
    achievementPercent: number | null,
    goal: number
  ): string {
    if (goal <= 0) {
      return 'Set a monthly income goal above $0 to rate your progress.';
    }
    if (achievementPercent === null) {
      return 'Goal achievement could not be calculated.';
    }
    return `You are projected to cover ${achievementPercent}% of your ${goal} monthly goal.`;
  }
}

export const retirementService = new RetirementService();