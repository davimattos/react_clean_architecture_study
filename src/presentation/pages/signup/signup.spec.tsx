import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { Helper } from '@/presentation/test'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)

  return { sut }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()
    Helper.testErrorWrapChildCount(sut, 0)
    Helper.testButtonIsDisabled(sut, /entrar/i, true)
    Helper.testStatusFormField(sut, 'name', validationError)
    Helper.testStatusFormField(sut, 'email', validationError)
    Helper.testStatusFormField(sut, 'password', validationError)
    Helper.testStatusFormField(sut, 'passwordConfirmation', validationError)
  })
})
