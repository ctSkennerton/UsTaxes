import { Field } from 'ustaxes/core/pdfFiller'
import { IraPlanType, TaxPayer } from 'ustaxes/core/data'
import Form, { FormTag } from 'ustaxes/core/irsForms/Form'
import { sumFields } from 'ustaxes/core/irsForms/util'
import { Ira } from 'ustaxes/core/data'

export default class F8606 extends Form {
  tp: TaxPayer
  tag: FormTag = 'f8606'
  sequenceIndex = 48
  iras: Ira[]

  constructor(tp: TaxPayer, iras: Ira[]) {
    super()
    this.tp = tp
    this.iras = iras
  }

  taxableAmount = (): number =>
    sumFields([this.l15c(), this.l18(), this.l25c()])

  l1 = (): number | undefined => undefined

  l2 = (): number | undefined => undefined

  l3 = (): number => (this.l1() ?? 0) + (this.l2() ?? 0)

  l4 = (): number | undefined => undefined

  l5 = (): number => this.l3() - (this.l4() ?? 0)

  /*Enter the value of all Traditional, SIMPLE, SEP IRAs as of Dec 31st of the tax year */
  l6 = (): number =>
    this.iras.reduce((res, i) => {
      if (
        i.planType == IraPlanType.IRA ||
        i.planType == IraPlanType.SepIRA ||
        i.planType == IraPlanType.SimpleIRA
      ) {
        return res + (i.valueAtYearEnd ?? 0)
      } else {
        return 0
      }
    }, 0)

  /* Distributions from Traditional, SIMPLE, SEP IRAs*/
  l7 = (): number =>
    this.iras.reduce((res, i) => {
      if (
        i.planType == IraPlanType.IRA ||
        i.planType == IraPlanType.SepIRA ||
        i.planType == IraPlanType.SimpleIRA
      ) {
        // TODO: check if gross distribution box already removes things like rollovers
        // or whether we need to do that subtraction here
        return res + (i.grossDistribution ?? 0)
      } else {
        return 0
      }
    }, 0)

  /* Conversions to Roth IRA from traditional, SIMPPE, SEP IRAs */
  l8 = (): number =>
    this.iras.reduce((res, i) => {
      if (
        i.planType == IraPlanType.IRA ||
        i.planType == IraPlanType.SepIRA ||
        i.planType == IraPlanType.SimpleIRA
      ) {
        return res + (i.rothIraConversion ?? 0)
      } else {
        return 0
      }
    }, 0)

  l9 = (): number => sumFields([this.l6(), this.l7(), this.l8()])

  l10 = (): number => this.l5() / this.l9()

  l11 = (): number => (this.l8() ?? 0) * this.l10()

  l12 = (): number => (this.l7() ?? 0) * this.l10()

  l13 = (): number => this.l11() + this.l12()

  l14 = (): number => this.l3() - this.l13()

  l15a = (): number => (this.l7() ?? 0) - this.l12()

  // TODO: Need form 8915-D and 8915-F
  l15b = (): number | undefined => undefined

  l15c = (): number | undefined => this.l15a() - (this.l15b() ?? 0)

  l16 = (): number | undefined => this.l8()

  l17 = (): number | undefined => this.l11()

  l18 = (): number => (this.l16() ?? 0) - (this.l17() ?? 0)

  //TODO: There are a number of caveates and special cases where distributions
  // don't count like those made after age 59.5 or for qualtified disaster distributions
  l19 = (): number | undefined =>
    this.iras.reduce((res, i) => {
      if (i.planType == IraPlanType.RothIRA) {
        return res + (i.grossDistribution ?? 0)
      } else {
        return 0
      }
    }, 0)

  // TODO: qualified first-home buyer distributions
  l20 = (): number | undefined => undefined

  l21 = (): number => Math.max(0, (this.l19() ?? 0) - (this.l20() ?? 0))

  //TODO: This is a complicated line requiring contribution info from 1998-2021
  // no easy way to add this in now.
  l22 = (): number | undefined => undefined

  // TODO: Also need to fill lines 1-4 in 5329
  l23 = (): number => Math.max(0, (this.l21() ?? 0) - (this.l22() ?? 0))

  l24 = (): number | undefined => undefined

  l25a = (): number => Math.max(0, this.l23() - (this.l24() ?? 0))

  // TODO: form 8915-D and 8915-F
  l25b = (): number | undefined => undefined

  l25c = (): number | undefined => this.l25a() - (this.l25b() ?? 0)

  fields = (): Field[] => [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    this.l1(),
    this.l2(),
    this.l3(),
    this.l4(),
    this.l5(),
    this.l6(),
    this.l7(),
    this.l8(),
    this.l9(),
    undefined,
    this.l10(),
    this.l11(),
    this.l12(),
    this.l13(),
    this.l14(),
    this.l15a(),
    this.l15b(),
    this.l15c(),
    this.l16(),
    this.l17(),
    this.l18(),
    this.l19(),
    this.l20(),
    this.l21(),
    this.l22(),
    this.l23(),
    this.l24(),
    this.l25a(),
    this.l25b(),
    this.l25c(),
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ]
}
