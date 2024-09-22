'use client'

import { useState } from 'react'
import { LoginForm } from '@/components/login/LoginForm'
import { SuccessMessage } from '@/components/login/SuccessMessage'

export default function LoginPage() {
  const [loginSuccess, setLoginSuccess] = useState(false)

  if (loginSuccess) {
    return <SuccessMessage />
  }

  return <LoginForm onSuccess={() => setLoginSuccess(true)} />
}
