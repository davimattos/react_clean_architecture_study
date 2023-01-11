import React from 'react'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react'
import faker from 'faker'

import { Helper, ValidationStub } from '@/presentation/test'
import { AddAccountSpy } from '@/presentation/test/mock-add-account'

import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const addAccountSpy = new AddAccountSpy()
  const sut = render(
    <SignUp validation={validationStub} addAccount={addAccountSpy} />,
  )

  return { sut, addAccountSpy }
}

const simulateValidSubmit = async (
  sut: RenderResult,
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password(),
): Promise<void> => {
  Helper.populateFieldByAriaLabel(sut, 'name', name)
  Helper.populateFieldByAriaLabel(sut, 'email', email)
  Helper.populateFieldByAriaLabel(sut, 'password', password)
  Helper.populateFieldByAriaLabel(sut, 'passwordConfirmation', password)
  const form = sut.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
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

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password,
    })
  })
})
