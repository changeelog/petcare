'use client'

import { useState } from 'react'
import { LoginForm, SuccessMessage } from '../../../widgets/Login'

export default function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false)

  if (loginSuccess) {
    return <SuccessMessage />
  }

  return <LoginForm onSuccess={() => setLoginSuccess(true)} />
}
