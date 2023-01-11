import React, { useEffect, useState } from 'react'

import { Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-content'
import { Validation } from '@/presentation/protocols/validation'
import { AddAccount } from '@/domain/usecases'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

type FormFieldType = 'name' | 'email' | 'password' | 'passwordConfirmation'

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: 'Campo obrigatório',
    email: '',
    emailError: 'Campo obrigatório',
    password: '',
    passwordError: 'Campo obrigatório',
    passwordConfirmation: '',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  })

  const validate = (field: FormFieldType): void => {
    setState((old: any) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, state[field]),
    }))
  }

  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(
    () => validate('passwordConfirmation'),
    [state.passwordConfirmation],
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState((old: any) => ({ ...old, isLoading: true }))
    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    })
  }

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input
            aria-label="name"
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />
          <Input
            aria-label="email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            aria-label="password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            aria-label="passwordConfirmation"
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <button
            disabled={
              !!state.nameError ||
              !!state.emailError ||
              !!state.passwordError ||
              !!state.passwordConfirmationError
            }
            className={Styles.submit}
            type="submit">
            Entrar
          </button>
          <span className={Styles.link}>Voltar Para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
