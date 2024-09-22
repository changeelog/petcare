import { useState } from 'react'
import { z } from 'zod'

const registerSchema = z
  .object({
    email: z.string().email({ message: 'Некорректный email адрес' }),
    password: z
      .string()
      .min(8, { message: 'Пароль должен быть не менее 8 символов' })
      .regex(/[a-z]/, { message: 'Пароль должен содержать строчные буквы' })
      .regex(/[A-Z]/, { message: 'Пароль должен содержать заглавные буквы' })
      .regex(/\d/, { message: 'Пароль должен содержать цифры' })
      .regex(/[^a-zA-Z\d]/, {
        message: 'Пароль должен содержать специальные символы',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export function useRegisterForm(onSuccess: () => void) {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<{
    [K in keyof RegisterFormData]?: string[]
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateForm = (): boolean => {
    const result = registerSchema.safeParse(formData)
    if (result.success) {
      setErrors({})
      return true
    } else {
      const newErrors: { [K in keyof RegisterFormData]?: string[] } = {}
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof RegisterFormData
        if (path in formData) {
          if (!newErrors[path]) {
            newErrors[path] = []
          }
          newErrors[path]!.push(issue.message)
        }
      })
      setErrors(newErrors)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        // Здесь должен быть запрос к бэкенду для регистрации
        // Пример:
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        // if (!response.ok) throw new Error('Registration failed');

        // Имитация задержки сервера
        await new Promise((resolve) => setTimeout(resolve, 1500))

        onSuccess()
      } catch (error) {
        console.error('Registration error:', error)
        setErrors({ email: ['Ошибка при регистрации. Попробуйте позже.'] })
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
