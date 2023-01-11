import React, { useEffect, useState } from 'react'

import { Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-content'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
    })
  }, [state.name])

  return (
    <div className={Styles.signup}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar Conta</h2>
          <Input
            aria-label="name"
            type="text"
            name="name"
            placeholder="Digite seu nome"
          />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <button disabled className={Styles.submit} type="submit">
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
