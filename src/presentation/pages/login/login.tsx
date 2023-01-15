import React, { useEffect, useMemo, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Authentication, SaveAccessToken } from '@/domain/usecases'
import {
  Header,
  Footer,
  Input,
  FormStatus,
  SubmitButton,
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-content'
import { Validation } from '@/presentation/protocols/validation'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

type FormFieldType = 'email' | 'password'

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: '',
  })

  const validate = (field: FormFieldType): void => {
    setState((old: any) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, { [field]: state[field] }),
    }))
  }

  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const isFormInvalid = useMemo(() => {
    return !!state.emailError || !!state.passwordError
  }, [state.emailError, !!state.passwordError])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || isFormInvalid) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState((old: any) => ({
        ...old,
        isLoading: false,
        mainError: error.message,
      }))
    }
  }

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <SubmitButton disabled={isFormInvalid}>Entrar</SubmitButton>
          <Link data-testid="signup" to="/signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
