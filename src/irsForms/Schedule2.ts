import { TaxPayer as TP } from '../redux/data'
import Form, { FormTag } from './Form'
import { sumFields } from './util'
import TaxPayer from '../redux/TaxPayer'
import F8889 from './F8889'
import F8959 from './F8959'
import F8960 from './F8960'

export default class Schedule2 extends Form {
  tag: FormTag = 'f1040s2'
  sequenceIndex = 2
  tp: TaxPayer
  f8959?: F8959
  f8960?: F8960
  f8889?: F8889
  f8889Spouse?: F8889
  otherIncomeStrings: Set<string>

  constructor(
    tp: TP,
    f8959?: F8959,
    f8960?: F8960,
    f8889?: F8889,
    f8889Spouse?: F8889
  ) {
    super()
    this.tp = new TaxPayer(tp)
    this.f8959 = f8959
    this.f8960 = f8960
    this.f8889 = f8889
    this.f8889Spouse = f8889Spouse
    this.otherIncomeStrings = new Set<string>()
  }

  // Part I: Tax
  l1 = (): number | undefined => undefined // TODO: Alternative Minimum Tax (form 6251)
  l2 = (): number | undefined => undefined // TODO: excess advance premium tax credit repayment (form 8962)
  l3 = (): number => sumFields([this.l1(), this.l2()])

  // Part II: Other Tax
  l4 = (): number | undefined => undefined // TODO: self-employment tax (schedule SE)
  l5 = (): number | undefined => undefined // TODO: unreported FICA tax
  l6 = (): number | undefined => undefined // TODO: additional tax on retirement accounts
  l7a = (): number | undefined => undefined // TODO: household employment taxes
  l7b = (): number | undefined => undefined // TODO: repayment of first-time homebuyer credit
  l8 = (): number | undefined => {
    if (
      this.f8889?.l17b() !== undefined ||
      this.f8889Spouse?.l17b() !== undefined
    ) {
      this.otherIncomeStrings.add('HSA')
    }
    if (this.f8889?.l21() !== undefined && this.f8889?.l21() > 0) {
      this.otherIncomeStrings.add('HDHP')
    }

    if (this.f8889Spouse?.l21() !== undefined && this.f8889Spouse?.l21() > 0) {
      this.otherIncomeStrings.add('HDHP')
    }

    return sumFields([
      this.f8959?.l18(),
      this.f8960?.l17(),
      this.f8889?.l17b(),
      this.f8889?.l21(),
      this.f8889Spouse?.l17b(),
      this.f8889Spouse?.l21()
    ])
  }
  l9 = (): number | undefined => undefined // TODO: section 965 net tax liability
  l10 = (): number | undefined =>
    sumFields([
      this.l4(),
      this.l5(),
      this.l6(),
      this.l7a(),
      this.l7b(),
      this.l8()
    ])

  fields = (): Array<string | number | boolean | undefined> => {
    return [
      this.tp.namesString(),
      this.tp.tp.primaryPerson?.ssid,

      this.l1(),
      this.l2(),
      this.l3(),

      this.l4(),
      undefined,
      undefined /* checkboxes */,
      this.l5(),
      this.l6(),
      this.l7a(),
      this.l7b(),
      this.f8959 !== undefined, // Form 8959 checkbox
      this.f8960 !== undefined, // Form 8960 checkbox
      undefined, //others checkbox
      Array.from(this.otherIncomeStrings).join(' '), // others textbox
      this.l8(),
      this.l9(),
      this.l10()
    ]
  }
}
