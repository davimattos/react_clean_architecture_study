import React from 'react'

import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/addAccount/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

import { SignUp } from '@/presentation/pages'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
