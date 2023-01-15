import { ValidationBuilder } from '@/validation/builders/validation-builder'
import { ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('name').required().min(5).build(),
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build(),
    ...ValidationBuilder.field('passwordConfirmation')
      .required()
      .min(5)
      .sameAs('password')
      .build(),
  ])
}
