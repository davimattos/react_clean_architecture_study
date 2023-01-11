import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import faker from 'faker'

import { Helper, ValidationStub } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(<SignUp validation={validationStub} />)

  return { sut }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.testErrorWrapChildCount(sut, 0)
    Helper.testButtonIsDisabled(sut, /entrar/i, true)
    Helper.testStatusFormField(sut, 'name', validationError)
    Helper.testStatusFormField(sut, 'email', validationError)
    Helper.testStatusFormField(sut, 'password', validationError)
    Helper.testStatusFormField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.populateFieldByAriaLabel(sut, 'name')
    Helper.testStatusFormField(sut, 'name', validationError)
  })

  test('Should show email error if validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.populateFieldByAriaLabel(sut, 'email')
    Helper.testStatusFormField(sut, 'email', validationError)
  })

  test('Should show password error if validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.populateFieldByAriaLabel(sut, 'password')
    Helper.testStatusFormField(sut, 'password', validationError)
  })

  test('Should show passwordConfirmation error if validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.populateFieldByAriaLabel(sut, 'passwordConfirmation')
    Helper.testStatusFormField(sut, 'passwordConfirmation', validationError)
  })

  test('Should show valid name state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateFieldByAriaLabel(sut, 'name')
    Helper.testStatusFormField(sut, 'name')
  })

  test('Should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateFieldByAriaLabel(sut, 'email')
    Helper.testStatusFormField(sut, 'email')
  })

  test('Should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateFieldByAriaLabel(sut, 'password')
    Helper.testStatusFormField(sut, 'password')
  })

  test('Should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateFieldByAriaLabel(sut, 'passwordConfirmation')
    Helper.testStatusFormField(sut, 'passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateFieldByAriaLabel(sut, 'name')
    Helper.populateFieldByAriaLabel(sut, 'email')
    Helper.populateFieldByAriaLabel(sut, 'password')
    Helper.populateFieldByAriaLabel(sut, 'passwordConfirmation')
    Helper.testButtonIsDisabled(sut, /entrar/i, false)
  })
})
