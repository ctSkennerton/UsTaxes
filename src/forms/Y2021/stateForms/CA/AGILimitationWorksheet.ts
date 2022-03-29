import { FilingStatus } from 'ustaxes/core/data'
import { CA540 } from './CA540'
import parameters from './Parameters'

export default class AgiLimitationWorsheet {
  ca540: CA540
  filingStatus: FilingStatus

  constructor(ca540: CA540, filingStatus: FilingStatus | undefined) {
    this.ca540 = ca540
    this.filingStatus = filingStatus
  }

  la = (): number => this.ca540.l13()

  lb = (): number => {
    if (this.filingStatus === undefined) {
      throw Error('The filing status of the tax payer is undefined')
    }
    switch (this.filingStatus) {
      case FilingStatus.S:
        return parameters.S.agiLimitExepmtionCredit
      case FilingStatus.MFJ:
        return parameters.MFJ.agiLimitExepmtionCredit
      case FilingStatus.MFS:
        return parameters.MFS.agiLimitExepmtionCredit
      case FilingStatus.HOH:
        return parameters.HOH.agiLimitExepmtionCredit
      case FilingStatus.W:
        return parameters.W.agiLimitExepmtionCredit
    }
  }

  lc = (): number => this.la() - this.lb()

  ld = (): number => {
    const denominator = this.filingStatus == FilingStatus.MFS ? 1250 : 2500
    return Math.ceil(this.lc() / denominator)
  }

  le = (): number => this.ld() * 6

  lf = (): number =>
    this.ca540.l7count() + this.ca540.l8count() + this.ca540.l9count()

  lg = (): number => this.le() * this.lf()

  lh = (): number =>
    this.ca540.l7total() + this.ca540.l8total() + this.ca540.l9total()

  li = (): number => Math.max(0, this.lh() - this.lg())

  lj = (): number => this.ca540.totalDependantExemptionsCount()

  lk = (): number => this.le() * this.lj()

  ll = (): number => this.ca540.totalDependantExemptionsAmount()

  lm = (): number => Math.max(0, this.ll() - this.lk())

  ln = (): number => this.li() + this.lm()

  agiLimitation = (): number => this.ln()
}
