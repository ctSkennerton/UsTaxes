import { Field } from 'ustaxes/core/pdfFiller'
import { TaxPayer } from 'ustaxes/core/data'
import Form, { FormTag } from 'ustaxes/core/irsForms/Form'
import { sumFields } from 'ustaxes/core/irsForms/util'

export default class F8606 extends Form {
  tp: TaxPayer
  tag: FormTag = 'f8606'
  sequenceIndex = 48

  constructor(tp: TaxPayer) {
    super()
    this.tp = tp
  }

  l1 = (): number | undefined => undefined

  l2 = (): number | undefined => undefined

  l3 = (): number => (this.l1() ?? 0) + (this.l2() ?? 0)

  l4 = (): number | undefined => undefined

  l5 = (): number => this.l3() - (this.l4() ?? 0)

  l6 = (): number | undefined => undefined

  l7 = (): number | undefined => undefined

  l8 = (): number | undefined => undefined

  l9 = (): number => sumFields([this.l6(), this.l7(), this.l8()])

  l10 = (): number => this.l5() / this.l9()

  l11 = (): number => (this.l8() ?? 0) * this.l10()

  l12 = (): number => (this.l7() ?? 0) * this.l10()

  l13 = (): number => this.l11() + this.l12()

  l14 = (): number => this.l3() - this.l13()

  l15a = (): number | undefined => undefined

  l15b = (): number | undefined => undefined

  l15c = (): number | undefined => undefined

  l16 = (): number | undefined => undefined

  l17 = (): number | undefined => undefined

  l18 = (): number | undefined => undefined

  l19 = (): number | undefined => undefined

  l20 = (): number | undefined => undefined

  l21 = (): number | undefined => undefined

  l22 = (): number | undefined => undefined

  l23 = (): number | undefined => undefined

  l24 = (): number | undefined => undefined

  l25a = (): number | undefined => undefined

  l25b = (): number | undefined => undefined

  l25c = (): number | undefined => undefined

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
