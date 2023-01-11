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

const populateFieldByAriaLabel = (
  sut: RenderResult,
  ariaLabel: string,
  value = faker.random.word(),
): void => {
  const field = sut.getByLabelText(ariaLabel)
  fireEvent.input(field, { target: { value } })
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    Helper.testErrorWrapChildCount(sut, 0)
    Helper.testButtonIsDisabled(sut, /entrar/i, true)
    Helper.testStatusFormField(sut, 'name', validationError)
    Helper.testStatusFormField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusFormField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusFormField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if validation fails', () => {
    const validationError = faker.random.word()
    const { sut } = makeSut({ validationError })
    populateFieldByAriaLabel(sut, 'name')
    Helper.testStatusFormField(sut, 'name', validationError)
  })
})
