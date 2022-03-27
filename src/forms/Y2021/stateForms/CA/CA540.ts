import Form, { FormMethods } from 'ustaxes/core/stateForms/Form'
import F1040 from '../../irsForms/F1040'
import { Field, RadioSelect } from 'ustaxes/core/pdfFiller'
import { sumFields } from 'ustaxes/core/irsForms/util'
import {
  AccountType,
  FilingStatus,
  Information,
  State,
  Dependent
} from 'ustaxes/core/data'
import parameters from './Parameters'

export class CA540 extends Form {
  info: Information
  f1040: F1040
  formName: string
  state: State
  formOrder = 0
  methods: FormMethods

  constructor(info: Information, f1040: F1040) {
    super()
    this.info = info
    this.f1040 = f1040
    this.formName = '540'
    this.state = 'CA'
    this.methods = new FormMethods(this)
  }

  attachments = (): Form[] => {
    // const pmt = this.payment()
    const result: Form[] = []
    // if ((pmt ?? 0) > 0) {
    //   result.push(this.il1040V)
    // }
    // if (this.scheduleEIC.isRequired()) {
    //   result.push(this.scheduleEIC)
    // }
    // if (this.methods.stateWithholding() > 0) {
    //   const ilwit = new ILWIT(this.info, this.f1040)
    //   result.push(ilwit)
    //   ilwit.attachments().forEach((f) => result.push(f))
    // }

    return result
  }

  address = (): string | undefined =>
    this.info.taxPayer.primaryPerson?.address.address

  apt = (): string | undefined =>
    this.info.taxPayer.primaryPerson?.address.aptNo

  city = (): string | undefined =>
    this.info.taxPayer.primaryPerson?.address.city

  st = (): string | undefined =>
    this.info.taxPayer.primaryPerson?.address.state ??
    this.info.taxPayer.primaryPerson?.address.province

  zip = (): string | undefined => this.info.taxPayer.primaryPerson?.address.zip

  country = (): string => 'United States'

  foreignCountry = (): string | undefined =>
    this.info.taxPayer.primaryPerson?.address.foreignCountry

  youOrSpouseDependant = (): boolean =>
    (this.info.taxPayer.primaryPerson?.isTaxpayerDependent ?? false) ||
    (this.info.taxPayer.spouse?.isTaxpayerDependent ?? false)

  _depField = (idx: number): string => {
    const deps: Dependent[] = this.info.taxPayer.dependents

    // Based on the PDF row we are on, select correct dependent
    const depIdx = Math.floor(idx / 3)
    const depFieldIdx = idx % 3

    let fieldArr = ['', '', '', '']

    if (depIdx < deps.length) {
      const dep = deps[depIdx]
      // Based on the PDF column, select the correct field
      fieldArr = [dep.firstName, dep.lastName, dep.ssid, dep.relationship]
    }

    return fieldArr[depFieldIdx]
  }

  // 540 allows 3 dependents listed without a supplemental schedule,
  // so create field mappings for 3x4 grid of fields
  _depFieldMappings = (): Array<string> =>
    Array.from(Array(12)).map((u, n: number) => this._depField(n))

  l1 = (): boolean => this.info.taxPayer.filingStatus === FilingStatus.S

  l2 = (): boolean => this.info.taxPayer.filingStatus === FilingStatus.MFJ

  l3 = (): boolean => this.info.taxPayer.filingStatus === FilingStatus.MFS

  l4 = (): boolean => this.info.taxPayer.filingStatus === FilingStatus.HOH

  l5 = (): boolean => this.info.taxPayer.filingStatus === FilingStatus.W

  l6 = (): boolean => this.youOrSpouseDependant()

  l7count = (): number => {
    if (this.l6()) {
      // TODO: need to look at instructions for what to do here
      return 0
    } else {
      if (this.l1() || this.l3() || this.l4()) {
        return 1
      } else if (this.l2() || this.l5()) {
        return 2
      } else {
        throw Error('Must check one of the filing status boxes')
      }
    }
  }

  l7total = (): number => 129 * this.l7count()

  // TODO: need a check for blindness
  l8count = (): number => 0

  l8total = (): number => 129 * this.l8count()

  //TODO: need to check for DOB. Older than 65
  l9count = (): number => 0

  l9total = (): number => 129 * this.l9count()

  // TODO: figure out the exemptions
  totalDependantExemptions = (): number => 0

  l11 = (): number =>
    sumFields([
      this.l7total(),
      this.l8total(),
      this.l9total(),
      this.totalDependantExemptions()
    ])

  l12 = (): number => this.methods.stateWithholding()

  l13 = (): number => this.f1040.l11()

  l14 = (): number | undefined => undefined

  l15 = (): number => this.l13() - (this.l14() ?? 0)

  l16 = (): number | undefined => undefined

  l17 = (): number => sumFields([this.l15(), this.l16()])

  l18 = (): number | undefined => undefined

  l19 = (): number => {
    const tmp = this.l17() - this.l18()
    if (tmp < 0) {
      return 0
    }
    return tmp
  }

  l31 = (): number | undefined => undefined

  l32 = (): number => this.l11()

  l33 = (): number => {
    const tmp = this.l31() - this.l32()
    if (tmp < 0) {
      return 0
    }
    return tmp
  }

  l34 = (): number | undefined => undefined

  l35 = (): number => sumFields([this.l33(), this.l34()])

  l40 = (): number | undefined => undefined

  l43creditName = (): string | undefined => undefined
  l43creditCode = (): string | undefined => undefined
  l43 = (): number | undefined => undefined

  l44creditName = (): string | undefined => undefined
  l44creditCode = (): string | undefined => undefined
  l44 = (): number | undefined => undefined

  l45 = (): number | undefined => undefined

  l46 = (): number | undefined => undefined

  l47 = (): number =>
    sumFields([this.l40(), this.l43(), this.l44(), this.l45(), this.l46()])

  l48 = (): number => {
    const tmp = this.l35() - this.l47()
    if (tmp < 0) {
      return 0
    }
    return tmp
  }

  l61 = (): number | undefined => undefined
  l62 = (): number | undefined => undefined
  l63 = (): number | undefined => undefined
  l64 = (): number | undefined => undefined
  l65 = (): number | undefined =>
    sumFields([this.l48(), this.l61(), this.l62(), this.l63(), this.l64()])

  l71 = (): number | undefined => undefined
  l72 = (): number | undefined => undefined
  l73 = (): number | undefined => undefined
  l74 = (): number | undefined => undefined
  l75 = (): number | undefined => undefined
  l76 = (): number | undefined => undefined
  l77 = (): number | undefined => undefined
  l78 = (): number | undefined =>
    sumFields([
      this.l71(),
      this.l72(),
      this.l73(),
      this.l74(),
      this.l75(),
      this.l76(),
      this.l77()
    ])

  l91 = (): number | undefined => undefined

  l92checkbox = (): boolean | undefined => undefined
  l92 = (): number | undefined => undefined

  l93 = (): number | undefined =>
    this.l78() > this.l91() ? this.l78() - this.l91() : undefined
  l94 = (): number | undefined =>
    this.l78() < this.l91() ? this.l91() - this.l78() : undefined
  l95 = (): number | undefined =>
    this.l93() > this.l92() ? this.l93() - this.l92() : undefined
  l96 = (): number | undefined =>
    this.l93() < this.l92() ? this.l92() - this.l93() : undefined
  l97 = (): number | undefined =>
    this.l95() > this.l65() ? this.l95() - this.l65() : undefined
  l98 = (): number => 0
  l99 = (): number => (this.l97() ?? 0) - this.l98()
  l100 = (): number | undefined =>
    this.l95() < this.l65() ? this.l65() - this.l95() : undefined

  l400 = (): number | undefined => undefined
  l401 = (): number | undefined => undefined
  l403 = (): number | undefined => undefined
  l405 = (): number | undefined => undefined
  l406 = (): number | undefined => undefined
  l407 = (): number | undefined => undefined
  l408 = (): number | undefined => undefined
  l410 = (): number | undefined => undefined
  l413 = (): number | undefined => undefined
  l422 = (): number | undefined => undefined
  l423 = (): number | undefined => undefined
  l424 = (): number | undefined => undefined
  l425 = (): number | undefined => undefined
  l431 = (): number | undefined => undefined
  l438 = (): number | undefined => undefined
  l439 = (): number | undefined => undefined
  l440 = (): number | undefined => undefined
  l443 = (): number | undefined => undefined
  l444 = (): number | undefined => undefined
  l445 = (): number | undefined => undefined
  l446 = (): number | undefined => undefined

  l110 = (): number =>
    sumFields([
      this.l400(),
      this.l401(),
      this.l403(),
      this.l405(),
      this.l406(),
      this.l407(),
      this.l408(),
      this.l410(),
      this.l413(),
      this.l422(),
      this.l423(),
      this.l424(),
      this.l425(),
      this.l431(),
      this.l438(),
      this.l439(),
      this.l440(),
      this.l443(),
      this.l444(),
      this.l445(),
      this.l446()
    ])

  l111 = (): number | undefined =>
    this.l99() <= 0
      ? sumFields([this.l94(), this.l96(), this.l100(), this.l110()])
      : undefined

  l112 = (): number | undefined => undefined
  l113 = (): number | undefined => undefined
  l114 = (): number | undefined => undefined

  l115 = (): number =>
    this.l99() - sumFields([this.l110(), this.l112(), this.l113()])

  l116 = (): number => this.l115()

  l117 = (): number => 0

  fields = (): Field[] => [
    undefined, // amended return checkbox
    undefined, // fiscal filer end month
    this.info.taxPayer.primaryPerson?.firstName,
    undefined, // TODO: Middle Initial
    this.info.taxPayer.primaryPerson?.lastName,
    undefined, // TODO: suffix
    this.info.taxPayer.primaryPerson?.ssid,
    this.info.taxPayer.spouse?.firstName,
    undefined, // TODO: Middle Initial
    this.info.taxPayer.spouse?.lastName,
    undefined, // TODO: suffix
    this.info.taxPayer.spouse?.ssid,
    undefined, // Additional Information
    undefined, // PBA Code
    this.address(),
    this.apt(),
    undefined, // PMB/private mailbox
    this.city(),
    this.st(),
    this.zip(),
    this.foreignCountry(),
    undefined, // TODO: foreign state
    undefined, // TODO: foreign postal code
    undefined, // TODO: date of birth
    undefined, // TODO: spouse date of birth
    undefined, // TODO: prior name
    undefined, // TODO: spouse prior name
    this.country(),
    true, // TODO: address the same as your principal address
    undefined, // TODO: principal address at time of filing
    undefined, // TODO: apt/suite
    undefined, // TODO: city
    undefined, // TODO: state
    undefined, // TODO: zip
    false, // TODO: filing status different from federal status?
    // Due to the layout of the form, this ordering of the lines to fields
    // is required. They may appear out of order here but they are not.
    this.l1(),
    this.l4(),
    this.l2(),
    this.l5(),
    undefined, // TODO: Year spouse died
    undefined, // TODO: Extra based on instructions
    this.l3(),
    undefined, // TODO: Spouse SSN and full name
    this.l6(),
    this.l7count(),
    this.l7total(),
    this.l8count(),
    this.l8total(),
    this.l9count(),
    this.l9total(),
    `${this.info.taxPayer.primaryPerson?.firstName} ${this.info.taxPayer.primaryPerson?.lastName}`,
    this.info.taxPayer.primaryPerson?.ssid,
    ...this._depFieldMappings(),
    this.totalDependantExemptions(),
    this.l11(),
    this.l12(),
    this.l13(),
    this.l14(),
    this.l15(),
    this.l16(),
    this.l17(),
    this.l18(),
    this.l19(),
    undefined, // tax table checkbox
    undefined, // tax rate checkbox
    undefined, // FTB 3800 checkbox
    undefined, // FTB 3803 checkbox
    this.l31(),
    this.l32(),
    this.l33(),
    undefined, // shedule G checkbox
    undefined, // FTB 5870A checkbox
    this.l34(),
    this.l35(),
    this.l40(),
    this.l43creditName(),
    this.l43creditCode(),
    this.l43(),
    this.l44creditName(),
    this.l44creditCode(),
    this.l44(),
    `${this.info.taxPayer.primaryPerson?.firstName} ${this.info.taxPayer.primaryPerson?.lastName}`,
    this.info.taxPayer.primaryPerson?.ssid,
    this.l45(),
    this.l46(),
    this.l47(),
    this.l48(),
    this.l61(),
    this.l62(),
    this.l63(),
    this.l64(),
    this.l65(),
    this.l71(),
    this.l72(),
    this.l73(),
    this.l74(),
    this.l75(),
    this.l76(),
    this.l77(),
    this.l78(),
    this.l91(),
    undefined, //no use tax owed checkbox
    undefined, // paid use tax already checkbox
    this.l92checkbox(),
    this.l92(),
    this.l93(),
    this.l94(),
    this.l95(),
    this.l96(),
    `${this.info.taxPayer.primaryPerson?.firstName} ${this.info.taxPayer.primaryPerson?.lastName}`,
    this.info.taxPayer.primaryPerson?.ssid,
    this.l97(),
    this.l98(),
    this.l99(),
    this.l100(),
    this.l400(),
    this.l401(),
    this.l403(),
    this.l405(),
    this.l406(),
    this.l407(),
    this.l408(),
    this.l410(),
    this.l413(),
    this.l422(),
    this.l423(),
    this.l424(),
    this.l425(),
    this.l431(),
    this.l438(),
    this.l439(),
    this.l440(),
    this.l443(),
    this.l444(),
    this.l445(),
    this.l446(),
    this.l110(),
    `${this.info.taxPayer.primaryPerson?.firstName} ${this.info.taxPayer.primaryPerson?.lastName}`,
    this.info.taxPayer.primaryPerson?.ssid,
    this.l111(),
    this.l112(),
    undefined, // FTB 5805 checkbox
    undefined, // FTB 5805F checkbox
    this.l113(),
    this.l114(),
    this.l115(),
    undefined, // routing number
    undefined, // checking
    undefined, // savings
    undefined, // account number
    this.l116(),
    undefined, // routing number 2
    undefined, // checking
    undefined, // savings
    undefined, // account number 2
    this.l117(),
    undefined, // date of signature
    undefined, // email
    undefined, // phone number
    undefined, // payed preparer name
    undefined, // PTIN
    undefined, // firm address
    undefined, // firm FEIN
    false,
    false,
    undefined,
    undefined
  ]
}

const makeCA540 = (info: Information, f1040: F1040): CA540 =>
  new CA540(info, f1040)

export default makeCA540
