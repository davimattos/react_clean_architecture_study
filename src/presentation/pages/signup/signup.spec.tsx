import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)

  return { sut }
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  regExp: RegExp,
  isDisabled: boolean,
): void => {
  const submitButton = sut.getByRole('button', {
    name: regExp,
  }) as HTMLButtonElement
  expect(submitButton.disabled).toBe(isDisabled)
}

const testStatusFormField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const field = sut.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || '')
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    testErrorWrapChildCount(sut, 0)
    testButtonIsDisabled(sut, /entrar/i, true)
    testStatusFormField(sut, 'name', validationError)
    testStatusFormField(sut, 'email', validationError)
    testStatusFormField(sut, 'password', validationError)
    testStatusFormField(sut, 'passwordConfirmation', validationError)
  })
})
