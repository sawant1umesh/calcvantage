/**
 * Australian Stamp Duty Configuration & Calculation Engine
 * Implements state-by-state stamp duty rules for Australian properties.
 */

export interface AustralianState {
  code: string;
  name: string;
}

export const AU_STATES: AustralianState[] = [
  { code: 'NSW', name: 'New South Wales (NSW)' },
  { code: 'VIC', name: 'Victoria (VIC)' },
  { code: 'QLD', name: 'Queensland (QLD)' },
  { code: 'WA', name: 'Western Australia (WA)' },
  { code: 'SA', name: 'South Australia (SA)' },
  { code: 'TAS', name: 'Tasmania (TAS)' },
  { code: 'ACT', name: 'Australian Capital Territory (ACT)' },
  { code: 'NT', name: 'Northern Territory (NT)' },
];

/**
 * Calculates estimated Australian state stamp duty (transfer duty) as a one-time cost.
 */
export function calculateStampDuty(homeValue: number, stateCode: string = 'NSW'): number {
  if (homeValue <= 0) return 0;

  const state = stateCode.toUpperCase();
  let duty = 0;

  switch (state) {
    case 'NSW':
      if (homeValue <= 16000) duty = homeValue * 0.0125;
      else if (homeValue <= 35000) duty = 200 + (homeValue - 16000) * 0.015;
      else if (homeValue <= 93000) duty = 485 + (homeValue - 35000) * 0.0175;
      else if (homeValue <= 351000) duty = 1500 + (homeValue - 93000) * 0.035;
      else if (homeValue <= 1168000) duty = 10530 + (homeValue - 351000) * 0.045;
      else duty = 47295 + (homeValue - 1168000) * 0.055;
      break;

    case 'VIC':
      if (homeValue <= 25000) duty = homeValue * 0.014;
      else if (homeValue <= 130000) duty = 350 + (homeValue - 25000) * 0.024;
      else if (homeValue <= 960000) duty = 2870 + (homeValue - 130000) * 0.06;
      else duty = homeValue * 0.055;
      break;

    case 'QLD':
      if (homeValue <= 5000) duty = 0;
      else if (homeValue <= 75000) duty = (homeValue - 5000) * 0.015;
      else if (homeValue <= 540000) duty = 1050 + (homeValue - 75000) * 0.035;
      else if (homeValue <= 1000000) duty = 17325 + (homeValue - 540000) * 0.045;
      else duty = 38025 + (homeValue - 1000000) * 0.0575;
      break;

    case 'WA':
      if (homeValue <= 120000) duty = homeValue * 0.019;
      else if (homeValue <= 150000) duty = 2280 + (homeValue - 120000) * 0.0285;
      else if (homeValue <= 360000) duty = 3135 + (homeValue - 150000) * 0.038;
      else if (homeValue <= 725000) duty = 11115 + (homeValue - 360000) * 0.0475;
      else duty = 28453 + (homeValue - 725000) * 0.0515;
      break;

    case 'SA':
    case 'TAS':
    case 'ACT':
    case 'NT':
    default:
      // Standard average rate ~4.0%
      duty = homeValue * 0.04;
      break;
  }

  return Math.round(duty);
}

