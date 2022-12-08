import React from 'react'

import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { ValidationBuilder } from '@/validation/builders/validation-builder'
import { ValidationComposite } from '@/validation/validators'

import Login from '@/presentation/pages/login/login.container'

export const makeLogin: React.FC = () => {
  const url = 'localhost:8080/api/login'
  const axiosHttpClient = new AxiosHttpClient()
  const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient)
  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return <Login authentication={remoteAuthentication} validation={validationComposite} />
}
