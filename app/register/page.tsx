'use client'

import { RegisterForm } from '@/components/register/RegisterForm'
import { SuccessMessage } from '@/components/register/SuccessMessage'
import { useState } from 'react'

export default function RegisterPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  if (registrationSuccess) {
    return <SuccessMessage />
  }

  return <RegisterForm onSuccess={() => setRegistrationSuccess(true)} />
}
