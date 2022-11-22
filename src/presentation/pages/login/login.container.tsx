import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import Login from './login'

type Props = {
  validation: Validation
  authentication: Authentication
}

const LoginContainer: React.FC<Props> = ({ validation, authentication }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return
      }
      setState({ ...state, isLoading: true })
      const account = await authentication.auth({ email: state.email, password: state.password })
      localStorage.setItem('accessToken', account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message })
    }
  }

  return (
    <Login state={state} setState={setState} handleSubmit={handleSubmit} />
  )
}

export default LoginContainer
