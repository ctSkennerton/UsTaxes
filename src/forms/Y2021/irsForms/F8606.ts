import { Field } from 'ustaxes/core/pdfFiller'
import { TaxPayer } from 'ustaxes/core/data'
import Form, { FormTag } from 'ustaxes/core/irsForms/Form'

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

  l3 = (): number | undefined => undefined

  l4 = (): number | undefined => undefined

  l5 = (): number | undefined => undefined

  l6 = (): number | undefined => undefined

  l7 = (): number | undefined => undefined

  l8 = (): number | undefined => undefined

  l9 = (): number | undefined => undefined

  l10 = (): number | undefined => undefined

  l11 = (): number | undefined => undefined

  l12 = (): number | undefined => undefined

  l13 = (): number | undefined => undefined

  l14 = (): number | undefined => undefined

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
