import React, { useState } from 'react'
import ForgotPasswordPage from '../components/ForgotPasswordPage'

const ForgotPassword = () => {
    const [page, setPage] = useState(0)
  return (
    <>
    <ForgotPasswordPage page={page} setPage={setPage} />
    </>
  )
}

export default ForgotPassword
