import React from 'react'
import faker from 'faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={validationStub} />)

  return { sut, validationStub }
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const { sut, validationStub } = makeSut()
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByRole('button', { name: /entrar/i }) as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show email error if validation fails', () => {
    const { sut, validationStub } = makeSut()

    const emailInput = sut.getByRole('textbox', { name: /email/i })
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const { sut, validationStub } = makeSut()

    const passwordInput = sut.getByLabelText(/password/i)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show valid password state if validation succeeds', () => {
    const { sut, validationStub } = makeSut()
    validationStub.errorMessage = null

    const passwordInput = sut.getByLabelText(/password/i)
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('')
  })
})
