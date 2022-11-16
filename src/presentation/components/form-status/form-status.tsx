import React, { useContext } from 'react'

import Spinner from '@/presentation/components/spinner/spinner'
import Context from '@/presentation/contexts/form/form-content'

import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {state.mainError && <span className={Styles.error}>{state.mainError}</span>}
    </div>
  )
}

export default FormStatus
