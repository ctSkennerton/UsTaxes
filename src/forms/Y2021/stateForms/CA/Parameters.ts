import { FilingStatus } from 'ustaxes/core/data'

export interface TaxBracket {
  lower: number
  upper: number
  baseAmount: number
  rate: number
  overAmount: number
}
const scheduleX: Array<TaxBracket> = [
  { lower: 0, upper: 9325, baseAmount: 0.0, rate: 0.01, overAmount: 0 },
  {
    lower: 9325,
    upper: 22107,
    baseAmount: 93.25,
    rate: 0.02,
    overAmount: 9325
  },
  {
    lower: 22107,
    upper: 34892,
    baseAmount: 348.89,
    rate: 0.04,
    overAmount: 22107
  },
  {
    lower: 34892,
    upper: 48435,
    baseAmount: 860.29,
    rate: 0.06,
    overAmount: 34892
  },
  {
    lower: 48435,
    upper: 61214,
    baseAmount: 1672.87,
    rate: 0.08,
    overAmount: 48435
  },
  {
    lower: 61214,
    upper: 312686,
    baseAmount: 2695.19,
    rate: 0.093,
    overAmount: 61214
  },
  {
    lower: 312686,
    upper: 375221,
    baseAmount: 26082.09,
    rate: 0.103,
    overAmount: 312686
  },
  {
    lower: 375221,
    upper: 625369,
    baseAmount: 32523.2,
    rate: 0.113,
    overAmount: 375221
  },
  {
    lower: 625369,
    upper: Infinity,
    baseAmount: 60789.92,
    rate: 0.123,
    overAmount: 625369
  }
]
const scheduleY: Array<TaxBracket> = [
  {
    lower: 0,
    upper: 18650,
    baseAmount: 0,
    rate: 0.01,
    overAmount: 0
  },
  {
    lower: 18650,
    upper: 44214,
    baseAmount: 186.5,
    rate: 0.02,
    overAmount: 18650
  },
  {
    lower: 44214,
    upper: 69784,
    baseAmount: 697.78,
    rate: 0.04,
    overAmount: 44214
  },
  {
    lower: 69784,
    upper: 96870,
    baseAmount: 1720.58,
    rate: 0.06,
    overAmount: 69784
  },
  {
    lower: 96870,
    upper: 122428,
    baseAmount: 3345.74,
    rate: 0.08,
    overAmount: 96870
  },
  {
    lower: 122428,
    upper: 625372,
    baseAmount: 5390.38,
    rate: 0.093,
    overAmount: 122428
  },
  {
    lower: 625372,
    upper: 750442,
    baseAmount: 52164.17,
    rate: 0.103,
    overAmount: 625372
  },
  {
    lower: 750442,
    upper: 1250738,
    baseAmount: 65046.38,
    rate: 0.113,
    overAmount: 750442
  },
  {
    lower: 1250738,
    upper: Infinity,
    baseAmount: 121579.83,
    rate: 0.123,
    overAmount: 1250738
  }
]
const scheduleZ: Array<TaxBracket> = [
  { lower: 0, upper: 18663, baseAmount: 0.0, rate: 0.01, overAmount: 0 },
  {
    lower: 18663,
    upper: 44217,
    baseAmount: 186.63,
    rate: 0.02,
    overAmount: 18663
  },
  {
    lower: 44217,
    upper: 56999,
    baseAmount: 697.71,
    rate: 0.04,
    overAmount: 44217
  },
  {
    lower: 56999,
    upper: 70542,
    baseAmount: 1208.99,
    rate: 0.06,
    overAmount: 56999
  },
  {
    lower: 70542,
    upper: 83324,
    baseAmount: 2021.57,
    rate: 0.08,
    overAmount: 70542
  },
  {
    lower: 83324,
    upper: 425251,
    baseAmount: 3044.13,
    rate: 0.093,
    overAmount: 83324
  },
  {
    lower: 425251,
    upper: 510303,
    baseAmount: 34843.34,
    rate: 0.103,
    overAmount: 425251
  },
  {
    lower: 510303,
    upper: 850503,
    baseAmount: 43606.7,
    rate: 0.113,
    overAmount: 510303
  },
  {
    lower: 850503,
    upper: Infinity,
    baseAmount: 82046.3,
    rate: 0.123,
    overAmount: 850503
  }
]

interface CaliforniaParameters {
  [key in FilingStatus]: {
    standardDeduction: number
    taxSchedule: Array<TaxBracket>
    agiLimitExepmtionCredit: number // used in 540 line 32
  }
}

const parameters = {
  [FilingStatus.S]: {
    standardDeduction: 4803,
    taxSchedule: scheduleX,
    agiLimitExepmtionCredit: 212228
  },
  [FilingStatus.MFJ]: {
    standardDeduction: 9606,
    taxSchedule: scheduleY,
    agiLimitExepmtionCredit: 424581
  },
  [FilingStatus.MFS]: {
    standardDeduction: 4803,
    taxSchedule: scheduleX,
    agiLimitExepmtionCredit: 212228
  },
  [FilingStatus.HOH]: {
    standardDeduction: 9606,
    taxSchedule: scheduleZ,
    agiLimitExepmtionCredit: 424581
  },
  [FilingStatus.W]: {
    standardDeduction: 9606,
    taxSchedule: scheduleY,
    agiLimitExepmtionCredit: 318437
  }
}

export default parameters
