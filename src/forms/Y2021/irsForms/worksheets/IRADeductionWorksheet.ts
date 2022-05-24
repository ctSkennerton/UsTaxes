import { F1098e, FilingStatus, PlanType1099 } from 'ustaxes/core/data'
import F1040 from '../../irsForms/F1040'
import { sumFields } from 'ustaxes/core/irsForms/util'

interface IRADeductionDef {
  caps: { [k in FilingStatus]: number }
}

const IRADeduction: IRADeductionDef = {
  caps: {
    [FilingStatus.S]: 76000,
    [FilingStatus.W]: 125000,
    [FilingStatus.HOH]: 76000,
    [FilingStatus.MFS]: 10000,
    [FilingStatus.MFJ]: 125000
  }
}

export default class IRADeductionWorksheet {
  f1040: F1040

  constructor(f1040: F1040) {
    this.f1040 = f1040
  }

  fillingStatusLimits = (mfj_boost: boolean): number => {
    switch (this.f1040.info.taxPayer.filingStatus) {
      case FilingStatus.S:
        return 76000
      case FilingStatus.HOH:
        return 76000
      case FilingStatus.W:
        return 125000
      case FilingStatus.MFS:
        if (this.f1040.info.questions.LIVE_APART_FROM_SPOUSE) {
          return 76000
        } else {
          return 10000
        }
      case FilingStatus.MFJ:
        if (mfj_boost) {
          return 208000
        } else {
          return 125000
        }
      default:
        return 0
    }
  }

  // TODO: were you covered by a retirement plan
  // box 13 "retirement plan" should be checked
  l1a = (): boolean => false

  // TODO: If married filing jointly, was your spouse covered by a retirement plan?
  l1b = (): boolean => false

  // calculate the filing limit taking into account a boost for married filing jointly
  // filing status that gives the person that doesn't have a retirement plan an addition
  // to the normal limit.
  l2a = (): number =>
    this.fillingStatusLimits(
      this.f1040.info.taxPayer.filingStatus == FilingStatus.MFJ &&
        this.l1a() !== this.l1b() &&
        !this.l1a()
    )
  l2b = (): number | undefined => {
    if (this.f1040.info.taxPayer.filingStatus == FilingStatus.MFJ) {
      return this.fillingStatusLimits(this.l1a() !== this.l1b() && !this.l1b())
    }
    return undefined
  }

  l3 = (): number => this.f1040.l9()
  l4 = (): number =>
    sumFields([
      this.f1040.schedule1?.l11(),
      this.f1040.schedule1?.l12(),
      this.f1040.schedule1?.l13(),
      this.f1040.schedule1?.l14(),
      this.f1040.schedule1?.l15(),
      this.f1040.schedule1?.l16(),
      this.f1040.schedule1?.l17(),
      this.f1040.schedule1?.l18(),
      this.f1040.schedule1?.l19a(),
      this.f1040.schedule1?.l23(),
      this.f1040.schedule1?.l25()
    ])

  l5a = (): number => this.l3() - this.l4()
  l5b = (): number => this.l3() - this.l4()

  l6a = (): number => this.l2a() - this.l5a()
  l6b = (): number => this.l2b() ?? 0 - this.l5b()

  computeL7 = (l6Number: number, covered_by_plan: boolean): number => {
    let percent = 0.6
    let limit = 10000
    const ret = 6000
    // if (over_50) {
    //   ret = 7000
    //   precent = 0.7
    // }
    switch (this.f1040.info.taxPayer.filingStatus) {
      case FilingStatus.MFJ:
      case FilingStatus.W:
        limit = 20000
        if (covered_by_plan) {
          // if (over_50) {
          //   percent = 0.35
          // } else {
          percent = 0.3
          // }
        }
    }

    if (l6Number >= limit) {
      return ret
    }

    // round up to the nearest 10 dollars according to instructions
    // if the result is less than 200, enter 200
    return Math.max(200, Math.ceil(Math.round((l6Number * percent) / 10)) * 10)
  }

  l7a = (): number => this.computeL7(this.l6a(), this.l1a())
  l7b = (): number => this.computeL7(this.l6b(), this.l1b())

  l8 = (): number =>
    sumFields([
      this.f1040.info.w2s.reduce((res, w2) => res + w2.income, 0),
      this.f1040.schedule1?.l2a()
      // TODO: add in combat pay, box12 code Q
      // this.f1040.info.w2s.reduce((res, w2) => res + w2.box12.Q, 0)
    ])

  // TODO: Enter the earned income you (and your spouse if filing jointly)
  //  received as a self-employed individual or a partner.
  // Generally, this is your (and your spouse's if filing jointly) net earnings
  // from self-employment if your personal services were a material
  // income-producing factor, minus any deductions on Schedule 1, lines 15 and 16.
  //  If zero or less, enter -0-. For more details, see Pub. 590-A
  l9 = (): number => 0

  l10 = (): number => this.l8() + this.l9()

  // l11a = (): number => this.f1040.info.f1099rs().reduce((res, r) => r.form.planType === PlanType1099.IRA ? r.form.contributions)

  // l11b = (): number => this.f1040.info.f1099rs().reduce((res, r) => r.form.planType === PlanType1099.IRA ? r.form.contributions)

  // l12a = (): number => Math.min(this.l7a(), this.l10(), this.l11a())

  // l12b = (): number => Math.min(this.l7b(), this.l10(), this.l11b())

  deduction = (): number => 0 //this.l12a() + this.l12b()
}
