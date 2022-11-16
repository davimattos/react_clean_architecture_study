import React, { useState } from 'react'

import { Header, Footer, Input, FormStatus } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-content'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''
  })

  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input aria-label='email' type="email" name="email" placeholder="Digite seu e-mail" />
          <Input aria-label='password' type="password" name="password" placeholder="Digite sua senha" />
          <button className={Styles.submit} disabled type="submit">Entrar</button>
          <a href="" className={Styles.link}>Criar conta</a>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
