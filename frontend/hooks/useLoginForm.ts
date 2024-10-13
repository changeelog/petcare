import { useState } from 'react'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Некорректный email адрес' }),
  password: z
    .string()
    .min(8, { message: 'Пароль должен содержать минимум 8 символов' }),
  rememberMe: z.boolean(),
})

export type LoginFormData = z.infer<typeof loginSchema>

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>

export function useLoginForm(onSuccess: () => void) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: LoginFormErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof LoginFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Ошибка при входе')
        }

        const data = await response.json()

        // Здесь вы можете сохранить токен, если он возвращается с сервера
        // Например:
        // localStorage.setItem('token', data.token)

        onSuccess()
      } catch (error) {
        console.error('Login error:', error)
        setErrors({
          email:
            (error as Error).message || 'Ошибка при входе. Попробуйте позже.',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit,
  }
}
