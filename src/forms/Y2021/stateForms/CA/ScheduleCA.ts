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

export class ScheduleCA extends Form {
  info: Information
  f1040: F1040
  formName: string
  state: State
  formOrder = 1
  attachments: () => Form[] = () => []

  constructor(info: Information, f1040: F1040) {
    super()
    this.info = info
    this.f1040 = f1040
    this.formName = '540-ca'
    this.state = 'CA'
  }

  /*
   *
   * Part 1 Section A
   *
   */
  part1sectionAline1colA = (): number => this.f1040.l1()
  part1sectionAline1colB = (): number | undefined => undefined
  part1sectionAline1colC = (): number | undefined => {
    let additions = 0
    // TODO: Employer-provided dependent care assistance exclusion

    // TODO: Employees and independent contractors

    // TODO: Active duty military pay

    // TODO: Combat zone foreign earned income exclusion

    // TODO: Combat zone extended to Egypt’s Sinai Peninsula

    // TODO: Sick pay received under the Federal Insurance Contributions Act and Railroad Retirement Act

    // TODO: Ridesharing fringe benefit differences

    // TODO: Foreign income

    // TODO: Exclusion for compensation from exercising a California Qualified Stock Option (CQSO)

    // Employer health savings account (HSA) contribution

    additions += this.f1040
      .validW2s()
      .map((w2) => w2.box12?.W ?? 0)
      .reduce((res, w2) => w2 + res, 0)

    // TODO: Income exclusion for In-Home Supportive Services (IHSS) supplementary payments

    // TODO: Native American earned income exemption

    return additions
  }

  part1section1lin2a = (): number | undefined => this.f1040.l2a()
  part1sectionAline2bcolA = (): number | undefined => this.f1040.l2b()
  part1sectionAline2bcolB = (): number | undefined => undefined
  part1sectionAline2bcolC = (): number | undefined => undefined

  part1section1lin3a = (): number | undefined => this.f1040.l3a()
  part1sectionAline3bcolA = (): number | undefined => this.f1040.l3b()
  part1sectionAline3bcolB = (): number | undefined => undefined
  part1sectionAline3bcolC = (): number | undefined => undefined

  part1section1lin4a = (): number | undefined => this.f1040.l4a()
  part1sectionAline4bcolA = (): number | undefined => this.f1040.l4b()
  part1sectionAline4bcolB = (): number | undefined => undefined
  part1sectionAline4bcolC = (): number | undefined => undefined

  part1section1lin5a = (): number | undefined => this.f1040.l5a()
  part1sectionAline5bcolA = (): number | undefined => this.f1040.l5b()
  part1sectionAline5bcolB = (): number | undefined => undefined
  part1sectionAline5bcolC = (): number | undefined => undefined

  part1section1lin6a = (): number | undefined => this.f1040.l6a()
  part1sectionAline6bcolA = (): number | undefined => this.f1040.l6b()
  part1sectionAline6bcolB = (): number | undefined =>
    this.part1sectionAline6bcolA()

  part1sectionAline7colA = (): number | undefined => undefined
  part1sectionAline7colB = (): number | undefined => undefined
  part1sectionAline7colC = (): number | undefined => undefined

  /*
   *
   * Part 1 Section B
   *
   */

  part1sectionBline1colA = (): number | undefined => this.f1040.schedule1?.l1()
  part1sectionBline1colB = (): number | undefined =>
    this.part1sectionBline1colA()

  part1sectionBline2acolA = (): number | undefined =>
    this.f1040.schedule1?.l2a()
  part1sectionBline2acolC = (): number | undefined => undefined

  part1sectionBline3colA = (): number | undefined => this.f1040.schedule1?.l3()
  part1sectionBline3colB = (): number | undefined => undefined
  part1sectionBline3colC = (): number | undefined => undefined

  part1sectionBline4colA = (): number | undefined => this.f1040.schedule1?.l4()
  part1sectionBline4colB = (): number | undefined => undefined
  part1sectionBline4colC = (): number | undefined => undefined

  part1sectionBline5colA = (): number | undefined => this.f1040.schedule1?.l5()
  part1sectionBline5colB = (): number | undefined => undefined
  part1sectionBline5colC = (): number | undefined => undefined

  part1sectionBline6colA = (): number | undefined => this.f1040.schedule1?.l6()
  part1sectionBline6colB = (): number | undefined => undefined
  part1sectionBline6colC = (): number | undefined => undefined

  part1sectionBline7colA = (): number | undefined => this.f1040.schedule1?.l7()
  part1sectionBline7colB = (): number | undefined => undefined

  part1sectionBline8acolA = (): number | undefined =>
    this.f1040.schedule1?.l8a()
  part1sectionBline8acolC = (): number | undefined => undefined

  part1sectionBline8bcolA = (): number | undefined =>
    this.f1040.schedule1?.l8b()
  part1sectionBline8bcolB = (): number | undefined => undefined

  part1sectionBline8ccolA = (): number | undefined =>
    this.f1040.schedule1?.l8c()
  part1sectionBline8ccolC = (): number | undefined => undefined

  part1sectionBline8dcolA = (): number | undefined =>
    this.f1040.schedule1?.l8d()
  part1sectionBline8dcolC = (): number | undefined => undefined

  part1sectionBline8ecolA = (): number | undefined =>
    this.f1040.schedule1?.l8e()
  part1sectionBline8ecolB = (): number | undefined => undefined

  part1sectionBline8fcolA = (): number | undefined =>
    this.f1040.schedule1?.l8f()

  part1sectionBline8gcolA = (): number | undefined =>
    this.f1040.schedule1?.l8g()

  part1sectionBline8hcolA = (): number | undefined =>
    this.f1040.schedule1?.l8h()

  part1sectionBline8icolA = (): number | undefined =>
    this.f1040.schedule1?.l8i()

  part1sectionBline8jcolA = (): number | undefined =>
    this.f1040.schedule1?.l8j()

  part1sectionBline8kcolA = (): number | undefined =>
    this.f1040.schedule1?.l8k()

  part1sectionBline8lcolA = (): number | undefined =>
    this.f1040.schedule1?.l8l()

  part1sectionBline8mcolA = (): number | undefined =>
    this.f1040.schedule1?.l8m()
  part1sectionBline8mcolB = (): number | undefined => undefined

  part1sectionBline8ncolA = (): number | undefined =>
    this.f1040.schedule1?.l8n()
  part1sectionBline8ncolB = (): number | undefined => undefined

  part1sectionBline8ocolA = (): number | undefined =>
    this.f1040.schedule1?.l8o()
  part1sectionBline8ocolC = (): number | undefined => undefined

  part1sectionBline8pcolA = (): number | undefined =>
    this.f1040.schedule1?.l8p()

  part1sectionBline8zcolA = (): number | undefined =>
    this.f1040.schedule1?.l8z()
  part1sectionBline8zcolB = (): number | undefined => undefined
  part1sectionBline8zcolC = (): number | undefined => undefined

  part1sectionBline9acolA = (): number =>
    sumFields([
      this.part1sectionBline8acolA(),
      this.part1sectionBline8bcolA(),
      this.part1sectionBline8ccolA(),
      this.part1sectionBline8dcolA(),
      this.part1sectionBline8ecolA(),
      this.part1sectionBline8fcolA(),
      this.part1sectionBline8gcolA(),
      this.part1sectionBline8hcolA(),
      this.part1sectionBline8icolA(),
      this.part1sectionBline8jcolA(),
      this.part1sectionBline8kcolA(),
      this.part1sectionBline8lcolA(),
      this.part1sectionBline8mcolA(),
      this.part1sectionBline8ncolA(),
      this.part1sectionBline8ocolA(),
      this.part1sectionBline8pcolA(),
      this.part1sectionBline8zcolA()
    ])
  part1sectionBline9acolB = (): number =>
    sumFields([
      this.part1sectionBline8bcolB(),
      this.part1sectionBline8ecolB(),
      this.part1sectionBline8mcolB(),
      this.part1sectionBline8ncolB(),
      this.part1sectionBline8zcolB()
    ])
  part1sectionBline9acolC = (): number =>
    sumFields([
      this.part1sectionBline8acolC(),
      this.part1sectionBline8ccolC(),
      this.part1sectionBline8dcolC(),
      this.part1sectionBline8ocolC(),
      this.part1sectionBline8zcolC()
    ])

  part1sectionBline9b1colB = (): number | undefined => undefined

  part1sectionBline9b2colB = (): number | undefined => undefined

  part1sectionBline9b3colB = (): number | undefined => undefined

  part1sectionBline9b4colA = (): number | undefined => undefined
  part1sectionBline9b4colB = (): number | undefined => undefined

  part1sectionBline10colA = (): number =>
    sumFields([
      this.part1sectionAline1colA(),
      this.part1sectionAline2bcolA(),
      this.part1sectionAline3bcolA(),
      this.part1sectionAline4bcolA(),
      this.part1sectionAline5bcolA(),
      this.part1sectionAline6bcolA(),
      this.part1sectionAline7colA(),
      this.part1sectionBline1colA(),
      this.part1sectionBline2acolA(),
      this.part1sectionBline3colA(),
      this.part1sectionBline4colA(),
      this.part1sectionBline5colA(),
      this.part1sectionBline6colA(),
      this.part1sectionBline7colA(),
      this.part1sectionBline9acolA(),
      this.part1sectionBline9b4colA()
    ])
  part1sectionBline10colB = (): number =>
    sumFields([
      this.part1sectionAline1colB(),
      this.part1sectionAline2bcolB(),
      this.part1sectionAline3bcolB(),
      this.part1sectionAline4bcolB(),
      this.part1sectionAline5bcolB(),
      this.part1sectionAline6bcolB(),
      this.part1sectionAline7colB(),
      this.part1sectionBline1colB(),
      this.part1sectionBline3colB(),
      this.part1sectionBline4colB(),
      this.part1sectionBline5colB(),
      this.part1sectionBline6colB(),
      this.part1sectionBline7colB(),
      this.part1sectionBline9acolB(),
      this.part1sectionBline9b1colB(),
      this.part1sectionBline9b2colB(),
      this.part1sectionBline9b3colB(),
      this.part1sectionBline9b4colB()
    ])
  part1sectionBline10colC = (): number =>
    sumFields([
      this.part1sectionAline1colC(),
      this.part1sectionAline2bcolC(),
      this.part1sectionAline3bcolC(),
      this.part1sectionAline4bcolC(),
      this.part1sectionAline5bcolC(),
      this.part1sectionAline7colC(),
      this.part1sectionBline2acolC(),
      this.part1sectionBline3colC(),
      this.part1sectionBline4colC(),
      this.part1sectionBline5colC(),
      this.part1sectionBline6colC(),
      this.part1sectionBline9acolC()
    ])

  /*
   *
   * Part 1 Section C
   *
   */

  part1sectionCline11colA = (): number | undefined =>
    this.f1040.schedule1?.l11()
  part1sectionCline11colB = (): number | undefined => undefined

  part1sectionCline12colA = (): number | undefined =>
    this.f1040.schedule1?.l12()
  part1sectionCline12colB = (): number | undefined => undefined
  part1sectionCline12colC = (): number | undefined => undefined

  part1sectionCline13colA = (): number | undefined =>
    this.f1040.schedule1?.l13()
  part1sectionCline13colB = (): number | undefined => undefined

  part1sectionCline14colA = (): number | undefined =>
    this.f1040.schedule1?.l14()
  part1sectionCline14colC = (): number | undefined => undefined

  part1sectionCline15colA = (): number | undefined =>
    this.f1040.schedule1?.l15()
  part1sectionCline15colB = (): number | undefined => undefined

  part1sectionCline16colA = (): number | undefined =>
    this.f1040.schedule1?.l16()

  part1sectionCline17colA = (): number | undefined =>
    this.f1040.schedule1?.l17()
  part1sectionCline17colB = (): number | undefined => undefined

  part1sectionCline18colA = (): number | undefined =>
    this.f1040.schedule1?.l18()

  part1sectionCline19acolA = (): number | undefined =>
    this.f1040.schedule1?.l19a()
  part1sectionCline19acolC = (): number | undefined => undefined

  part1sectionCline20colA = (): number | undefined =>
    this.f1040.schedule1?.l20()
  part1sectionCline20colB = (): number | undefined => undefined
  part1sectionCline20colC = (): number | undefined => undefined

  part1sectionCline21colA = (): number | undefined =>
    this.f1040.schedule1?.l21()
  part1sectionCline21colC = (): number | undefined => undefined

  part1sectionCline23colA = (): number | undefined =>
    this.f1040.schedule1?.l23()

  part1sectionCline24acolA = (): number | undefined =>
    this.f1040.schedule1?.l24a()

  part1sectionCline24bcolA = (): number | undefined =>
    this.f1040.schedule1?.l24b()
  part1sectionCline24bcolB = (): number | undefined => undefined
  part1sectionCline24bcolC = (): number | undefined => undefined

  part1sectionCline24ccolA = (): number | undefined =>
    this.f1040.schedule1?.l24c()
  part1sectionCline24ccolB = (): number | undefined => undefined

  part1sectionCline24dcolA = (): number | undefined =>
    this.f1040.schedule1?.l24d()
  part1sectionCline24dcolB = (): number | undefined => undefined

  part1sectionCline24ecolA = (): number | undefined =>
    this.f1040.schedule1?.l24e()

  part1sectionCline24fcolA = (): number | undefined =>
    this.f1040.schedule1?.l24f()
  part1sectionCline24fcolB = (): number | undefined => undefined
  part1sectionCline24fcolC = (): number | undefined => undefined

  part1sectionCline24gcolA = (): number | undefined =>
    this.f1040.schedule1?.l24g()
  part1sectionCline24gcolB = (): number | undefined => undefined
  part1sectionCline24gcolC = (): number | undefined => undefined

  part1sectionCline24hcolA = (): number | undefined =>
    this.f1040.schedule1?.l24h()

  part1sectionCline24icolA = (): number | undefined =>
    this.f1040.schedule1?.l24i()
  part1sectionCline24icolB = (): number | undefined => undefined

  part1sectionCline24jcolA = (): number | undefined =>
    this.f1040.schedule1?.l24j()
  part1sectionCline24jcolB = (): number | undefined => undefined

  part1sectionCline24kcolA = (): number | undefined =>
    this.f1040.schedule1?.l24k()
  part1sectionCline24kcolB = (): number | undefined => undefined

  part1sectionCline24zcolA = (): number | undefined =>
    this.f1040.schedule1?.l24z()
  part1sectionCline24zcolB = (): number | undefined => undefined
  part1sectionCline24zcolC = (): number | undefined => undefined

  part1sectionCline25colA = (): number =>
    sumFields([
      this.part1sectionCline24acolA(),
      this.part1sectionCline24bcolA(),
      this.part1sectionCline24ccolA(),
      this.part1sectionCline24dcolA(),
      this.part1sectionCline24ecolA(),
      this.part1sectionCline24fcolA(),
      this.part1sectionCline24gcolA(),
      this.part1sectionCline24hcolA(),
      this.part1sectionCline24icolA(),
      this.part1sectionCline24jcolA(),
      this.part1sectionCline24kcolA(),
      this.part1sectionCline24zcolA()
    ])
  part1sectionCline25colB = (): number =>
    sumFields([
      this.part1sectionCline24bcolB(),
      this.part1sectionCline24ccolB(),
      this.part1sectionCline24dcolB(),
      this.part1sectionCline24fcolB(),
      this.part1sectionCline24gcolB(),
      this.part1sectionCline24icolB(),
      this.part1sectionCline24jcolB(),
      this.part1sectionCline24kcolB(),
      this.part1sectionCline24zcolB()
    ])
  part1sectionCline25colC = (): number =>
    sumFields([
      this.part1sectionCline24bcolC(),
      this.part1sectionCline24fcolC(),
      this.part1sectionCline24gcolC(),
      this.part1sectionCline24zcolC()
    ])

  part1sectionCline26colA = (): number =>
    sumFields([
      this.part1sectionCline11colA(),
      this.part1sectionCline12colA(),
      this.part1sectionCline13colA(),
      this.part1sectionCline14colA(),
      this.part1sectionCline15colA(),
      this.part1sectionCline16colA(),
      this.part1sectionCline17colA(),
      this.part1sectionCline18colA(),
      this.part1sectionCline19acolA(),
      this.part1sectionCline20colA(),
      this.part1sectionCline21colA(),
      this.part1sectionCline23colA(),
      this.part1sectionCline25colA()
    ])
  part1sectionCline26colB = (): number =>
    sumFields([
      this.part1sectionCline11colB(),
      this.part1sectionCline12colB(),
      this.part1sectionCline13colB(),
      this.part1sectionCline15colB(),
      this.part1sectionCline17colB(),
      this.part1sectionCline20colB(),
      this.part1sectionCline25colB()
    ])
  part1sectionCline26colC = (): number =>
    sumFields([
      this.part1sectionCline12colC(),
      this.part1sectionCline14colC(),
      this.part1sectionCline19acolC(),
      this.part1sectionCline20colC(),
      this.part1sectionCline21colC(),
      this.part1sectionCline25colC()
    ])

  part1sectionCline27colA = (): number =>
    this.part1sectionBline10colA() - this.part1sectionCline26colA()
  part1sectionCline27colB = (): number =>
    this.part1sectionBline10colB() - this.part1sectionCline26colB()
  part1sectionCline27colC = (): number =>
    this.part1sectionBline10colC() - this.part1sectionCline26colC()

  part2line1 = (): number | undefined => undefined
  part2line2 = (): number | undefined => undefined
  part2line3 = (): number | undefined => undefined
  part2line4colA = (): number | undefined => undefined
  part2line4colC = (): number | undefined => undefined
  part2line5acolA = (): number | undefined => undefined
  part2line5acolB = (): number | undefined => undefined
  part2line5bcolA = (): number | undefined => undefined
  part2line5ccolA = (): number | undefined => undefined
  part2line5dcolA = (): number | undefined => undefined
  part2line5ecolA = (): number | undefined => undefined
  part2line5ecolB = (): number | undefined => undefined
  part2line5ecolC = (): number | undefined => undefined
  part2line6colA = (): number | undefined => undefined
  part2line6colB = (): number | undefined => undefined
  part2line6colC = (): number | undefined => undefined
  part2line7colA = (): number | undefined => undefined
  part2line7colB = (): number | undefined => undefined
  part2line7colC = (): number | undefined => undefined
  part2line8acolA = (): number | undefined => undefined
  part2line8acolC = (): number | undefined => undefined
  part2line8bcolA = (): number | undefined => undefined
  part2line8bcolC = (): number | undefined => undefined
  part2line8ccolA = (): number | undefined => undefined
  part2line8ccolC = (): number | undefined => undefined
  part2line8dcolA = (): number | undefined => undefined
  part2line8dcolB = (): number | undefined => undefined
  part2line8ecolA = (): number | undefined => undefined
  part2line8ecolB = (): number | undefined => undefined
  part2line8ecolC = (): number | undefined => undefined
  part2line9colA = (): number | undefined => undefined
  part2line9colB = (): number | undefined => undefined
  part2line9colC = (): number | undefined => undefined
  part2line10colA = (): number | undefined => undefined
  part2line10colB = (): number | undefined => undefined
  part2line10colC = (): number | undefined => undefined
  part2line11colA = (): number | undefined => undefined
  part2line11colB = (): number | undefined => undefined
  part2line11colC = (): number | undefined => undefined
  part2line12colA = (): number | undefined => undefined
  part2line12colB = (): number | undefined => undefined
  part2line12colC = (): number | undefined => undefined
  part2line13colA = (): number | undefined => undefined
  part2line13colB = (): number | undefined => undefined
  part2line13colC = (): number | undefined => undefined
  part2line14colA = (): number | undefined => undefined
  part2line14colB = (): number | undefined => undefined
  part2line14colC = (): number | undefined => undefined
  part2line15colA = (): number | undefined => undefined
  part2line15colB = (): number | undefined => undefined
  part2line15colC = (): number | undefined => undefined
  part2line16colA = (): number | undefined => undefined
  part2line16colB = (): number | undefined => undefined
  part2line16colC = (): number | undefined => undefined
  part2line17colA = (): number | undefined => undefined
  part2line17colB = (): number | undefined => undefined
  part2line17colC = (): number | undefined => undefined
  part2line18 = (): number =>
    sumFields([this.part2line17colA(), this.part2line17colC()]) -
    (this.part2line17colB() ?? 0)
  part2line19 = (): number | undefined => undefined
  part2line20 = (): number => 0 // tax preparation fees
  part2line21writeIn = (): string | undefined => undefined
  part2line21 = (): number | undefined => undefined
  part2line22 = (): number =>
    sumFields([this.part2line19(), this.part2line20(), this.part2line21()])
  part2line23 = (): number => this.f1040.l11()
  part2line24 = (): number => Math.max(0, this.part2line23() * 0.02)
  part2line25 = (): number =>
    Math.max(0, this.part2line22() - this.part2line24())
  part2line26 = (): number => this.part2line18() + this.part2line25()
  part2line27writeIn = (): string | undefined => undefined
  part2line27 = (): number | undefined => undefined
  part2line28 = (): number =>
    sumFields([this.part2line26(), this.part2line27()])
  part2line29 = (): number | undefined => undefined
  part2line30 = (): number | undefined => undefined

  fields = (): Field[] => [
    undefined, // name
    undefined, // ssn
    this.part1sectionAline1colA(),
    this.part1sectionAline1colB(),
    this.part1sectionAline1colC(),
    this.part1section1lin2a(),
    this.part1sectionAline2bcolA(),
    this.part1sectionAline2bcolB(),
    this.part1sectionAline2bcolC(),
    this.part1section1lin3a(),
    this.part1sectionAline3bcolA(),
    this.part1sectionAline3bcolB(),
    this.part1sectionAline3bcolC(),
    this.part1section1lin4a(),
    this.part1sectionAline4bcolA(),
    this.part1sectionAline4bcolB(),
    this.part1sectionAline4bcolC(),
    this.part1section1lin5a(),
    this.part1sectionAline5bcolA(),
    this.part1sectionAline5bcolB(),
    this.part1sectionAline5bcolC(),
    this.part1section1lin6a(),
    this.part1sectionAline6bcolA(),
    this.part1sectionAline6bcolB(),
    this.part1sectionAline7colA(),
    this.part1sectionAline7colB(),
    this.part1sectionAline7colC(),

    this.part1sectionBline1colA(),
    this.part1sectionBline1colB(),
    this.part1sectionBline2acolA(),
    this.part1sectionBline2acolC(),
    this.part1sectionBline3colA(),
    this.part1sectionBline3colB(),
    this.part1sectionBline3colC(),
    this.part1sectionBline4colA(),
    this.part1sectionBline4colB(),
    this.part1sectionBline4colC(),
    this.part1sectionBline5colA(),
    this.part1sectionBline5colB(),
    this.part1sectionBline5colC(),
    this.part1sectionBline6colA(),
    this.part1sectionBline6colB(),
    this.part1sectionBline6colC(),
    this.part1sectionBline7colA(),
    this.part1sectionBline7colB(),
    this.part1sectionBline8acolA(),
    this.part1sectionBline8acolC(),
    this.part1sectionBline8bcolA(),
    this.part1sectionBline8bcolB(),
    this.part1sectionBline8ccolA(),
    this.part1sectionBline8ccolC(),
    this.part1sectionBline8dcolA(),
    this.part1sectionBline8dcolC(),
    this.part1sectionBline8ecolA(),
    this.part1sectionBline8ecolB(),
    this.part1sectionBline8fcolA(),
    this.part1sectionBline8gcolA(),
    this.part1sectionBline8hcolA(),
    this.part1sectionBline8icolA(),
    this.part1sectionBline8jcolA(),
    this.part1sectionBline8kcolA(),
    this.part1sectionBline8lcolA(),
    this.part1sectionBline8mcolA(),
    this.part1sectionBline8ncolA(),
    this.part1sectionBline8ncolB(),
    this.part1sectionBline8ocolA(),
    this.part1sectionBline8ocolC(),
    this.part1sectionBline8pcolA(),
    this.part1sectionBline8zcolA(),
    this.part1sectionBline8zcolB(),
    this.part1sectionBline8zcolC(),
    this.part1sectionBline9acolA(),
    this.part1sectionBline9acolB(),
    this.part1sectionBline9acolC(),
    this.part1sectionBline9b1colB(),
    this.part1sectionBline9b2colB(),
    this.part1sectionBline9b3colB(),
    this.part1sectionBline9b4colA(),
    this.part1sectionBline9b4colB(),
    this.part1sectionBline10colA(),
    this.part1sectionBline10colB(),
    this.part1sectionBline10colC(),

    this.part1sectionCline11colA(),
    this.part1sectionCline11colB(),
    this.part1sectionCline12colA(),
    this.part1sectionCline12colB(),
    this.part1sectionCline12colC(),
    this.part1sectionCline13colA(),
    this.part1sectionCline13colB(),
    this.part1sectionCline14colA(),
    this.part1sectionCline14colC(),
    this.part1sectionCline15colA(),
    this.part1sectionCline15colB(),
    this.part1sectionCline16colA(),
    this.part1sectionCline17colA(),
    this.part1sectionCline17colB(),
    this.part1sectionCline18colA(),
    this.part1sectionCline19acolA(),
    this.part1sectionCline19acolC(),
    undefined, // alimony SSN
    undefined, // alimony last name
    this.part1sectionCline20colA(),
    this.part1sectionCline20colB(),
    this.part1sectionCline20colC(),
    this.part1sectionCline21colA(),
    this.part1sectionCline21colC(),

    this.part1sectionCline23colA(),
    this.part1sectionCline24acolA(),
    this.part1sectionCline24bcolA(),
    this.part1sectionCline24bcolB(),
    this.part1sectionCline24bcolC(),
    this.part1sectionCline24ccolA(),
    this.part1sectionCline24ccolB(),
    this.part1sectionCline24dcolA(),
    this.part1sectionCline24dcolB(),
    this.part1sectionCline24ecolA(),
    this.part1sectionCline24fcolA(),
    this.part1sectionCline24fcolB(),
    this.part1sectionCline24fcolC(),
    this.part1sectionCline24gcolA(),
    this.part1sectionCline24gcolB(),
    this.part1sectionCline24gcolC(),
    this.part1sectionCline24hcolA(),
    this.part1sectionCline24icolA(),
    this.part1sectionCline24icolB(),
    this.part1sectionCline24jcolA(),
    this.part1sectionCline24jcolB(),
    this.part1sectionCline24kcolA(),
    this.part1sectionCline24kcolB(),
    undefined, // 24z other write in
    this.part1sectionCline24zcolA(),
    this.part1sectionCline24zcolB(),
    this.part1sectionCline24zcolC(),
    this.part1sectionCline25colA(),
    this.part1sectionCline25colB(),
    this.part1sectionCline25colC(),
    this.part1sectionCline26colA(),
    this.part1sectionCline26colB(),
    this.part1sectionCline26colC(),
    this.part1sectionCline27colA(),
    this.part1sectionCline27colB(),
    this.part1sectionCline27colC(),
    undefined, // not itemize federal but itemizing california
    this.part2line1(),
    this.part2line2(),
    this.part2line3(),
    this.part2line4colA(),
    this.part2line4colC(),
    this.part2line5acolA(),
    this.part2line5acolB(),
    this.part2line5bcolA(),
    this.part2line5ccolA(),
    this.part2line5dcolA(),
    this.part2line5ecolA(),
    this.part2line5ecolB(),
    this.part2line5ecolC(),
    undefined, // other taxes write in
    this.part2line6colA(),
    this.part2line6colB(),
    this.part2line6colC(),
    this.part2line7colA(),
    this.part2line7colB(),
    this.part2line7colC(),
    this.part2line8acolA(),
    this.part2line8acolC(),
    this.part2line8bcolA(),
    this.part2line8bcolC(),
    this.part2line8ccolA(),
    this.part2line8ccolC(),
    this.part2line8dcolA(),
    this.part2line8dcolB(),
    this.part2line8ecolA(),
    this.part2line8ecolB(),
    this.part2line8ecolC(),
    this.part2line9colA(),
    this.part2line9colB(),
    this.part2line9colC(),
    this.part2line10colA(),
    this.part2line10colB(),
    this.part2line10colC(),
    this.part2line11colA(),
    this.part2line11colB(),
    this.part2line11colC(),
    this.part2line12colA(),
    this.part2line12colB(),
    this.part2line12colC(),
    this.part2line13colA(),
    this.part2line13colB(),
    this.part2line13colC(),
    this.part2line14colA(),
    this.part2line14colB(),
    this.part2line14colC(),
    this.part2line15colA(),
    this.part2line15colB(),
    this.part2line15colC(),
    this.part2line16colA(),
    this.part2line16colB(),
    this.part2line16colC(),
    this.part2line17colA(),
    this.part2line17colB(),
    this.part2line17colC(),
    this.part2line18(),
    this.part2line19(),
    this.part2line20(),
    this.part2line21writeIn(),
    this.part2line21(),
    this.part2line22(),
    this.part2line23(),
    this.part2line24(),
    this.part2line25(),
    this.part2line26(),
    this.part2line27writeIn(),
    this.part2line27(),
    this.part2line28(),
    this.part2line29(),
    this.part2line30()
  ]
}
