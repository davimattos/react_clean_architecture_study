import { fireEvent, RenderResult } from '@testing-library/react'
import faker from 'faker'

export const testErrorWrapChildCount = (
  sut: RenderResult,
  count: number,
): void => {
  const errorWrap = sut.getByTestId('error-wrap')
  expect(errorWrap.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  regExp: RegExp,
  isDisabled: boolean,
): void => {
  const submitButton = sut.getByRole('button', {
    name: regExp,
  }) as HTMLButtonElement
  expect(submitButton.disabled).toBe(isDisabled)
}

export const testStatusFormField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string,
): void => {
  const field = sut.getByTestId(`${fieldName}-status`)
  expect(field.title).toBe(validationError || '')
}

export const populateFieldByAriaLabel = (
  sut: RenderResult,
  ariaLabel: string,
  value = faker.random.word(),
): void => {
  const field = sut.getByLabelText(ariaLabel)
  fireEvent.input(field, { target: { value } })
}
