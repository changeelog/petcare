'use client'

import { useState } from 'react'

import { RegisterForm, SuccessMessage } from '../../../widgets/Register'

export default function RegisterPage() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  if (registrationSuccess) {
    return <SuccessMessage />
  }

  return <RegisterForm onSuccess={() => setRegistrationSuccess(true)} />
}
