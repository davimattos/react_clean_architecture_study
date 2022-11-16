import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-content'

import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getTitle = (): string => {
    return errorState[props.name]
  }

  const getStatus = (): string => {
    return Styles.badge
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput}/>
      <span className={Styles.status}>
        <span data-testid={`${props.name}-status`} title={getTitle()} className={getStatus()}/>
      </span>
    </div>
  )
}

export default Input
