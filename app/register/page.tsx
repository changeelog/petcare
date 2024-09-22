'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle2, Info } from 'lucide-react'
import Link from 'next/link'

const passwordStrengthLevels = [
  { label: 'Слабый', color: 'bg-red-500' },
  { label: 'Средний', color: 'bg-yellow-500' },
  { label: 'Хороший', color: 'bg-green-500' },
  { label: 'Сильный', color: 'bg-blue-500' },
]

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'password') {
      calculatePasswordStrength(value)
    }

    // Clear errors when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    setPasswordStrength(strength)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email обязателен'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Некорректный email'
    if (!formData.password) newErrors.password = 'Пароль обязателен'
    else if (formData.password.length < 8)
      newErrors.password = 'Пароль должен быть не менее 8 символов'
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Пароли не совпадают'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Имитация отправки данных на сервер
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitting(false)
      setRegistrationSuccess(true)
    }
  }

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
    blur: { scale: 1 },
  }

  if (registrationSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100"
      >
        <Alert className="w-full max-w-md">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Регистрация успешна!</AlertTitle>
          <AlertDescription>
            Ваш аккаунт был успешно создан. Теперь вы можете войти в систему.
          </AlertDescription>
          <Button
            asChild
            className="mt-4"
          >
            <Link href="/login">Перейти к входу</Link>
          </Button>
        </Alert>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Регистрация</CardTitle>
            <CardDescription>
              Создайте аккаунт для доступа к PetCare Portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                  </motion.div>
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  >
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                  </motion.div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  <div className="mt-2">
                    <Label>Сложность пароля</Label>
                    <Progress
                      value={(passwordStrength / 4) * 100}
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {passwordStrengthLevels[passwordStrength]?.label ||
                        'Введите пароль'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                  <motion.div
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  >
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                  </motion.div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Уже есть аккаунт?{' '}
              <Link
                href="/login"
                className="text-primary hover:underline"
              >
                Войти
              </Link>
            </p>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-full"
                  >
                    <Info className="h-4 w-4" />
                    <span className="sr-only">Информация о регистрации</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Регистрация позволит вам получить доступ ко всем функциям
                    PetCare Portal
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
