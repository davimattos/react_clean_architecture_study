import React from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const SubmitButton: React.FC<Props> = (props: Props) => {
  return (
    <button disabled={props.disabled} type="submit">
      {props.children}
    </button>
  )
}

export default SubmitButton
