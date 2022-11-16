import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-content'

import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return Styles.badge
  }

  const getTitle = (): string => {
    return state[`${props.name}Error`]
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} onChange={handleChange}/>
      <span className={Styles.status}>
        <span data-testid={`${props.name}-status`} title={getTitle()} className={getStatus()}/>
      </span>
    </div>
  )
}

export default Input
