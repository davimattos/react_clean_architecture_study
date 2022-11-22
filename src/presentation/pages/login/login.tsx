import React from 'react'
import { Link } from 'react-router-dom'

import { Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-content'

import Styles from './login-styles.scss'

type State = {
  isLoading: boolean
  email: string
  password: string
  emailError: string
  passwordError: string
  mainError: string
}

type Props = {
  state: State
  setState: React.Dispatch<React.SetStateAction<State>>
  handleSubmit: React.FormEventHandler<HTMLFormElement>
}

const Login: React.FC<Props> = ({ state, setState, handleSubmit }: Props) => {
  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form data-testid='form' className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input aria-label='email' type="email" name="email" placeholder="Digite seu e-mail" />
          <Input aria-label='password' type="password" name="password" placeholder="Digite sua senha" />
          <button className={Styles.submit} disabled={!!state.emailError || !!state.passwordError} type="submit">Entrar</button>
          <Link data-testid="signup" to="/signup" className={Styles.link}>Criar conta</Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
