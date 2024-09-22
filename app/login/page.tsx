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
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Github } from 'lucide-react'
import Link from 'next/link'

export default function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email обязателен'
    if (!formData.password) newErrors.password = 'Пароль обязателен'
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
      setLoginSuccess(true)
    }
  }

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: 'spring', stiffness: 300 } },
    blur: { scale: 1 },
  }

  if (loginSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100"
      >
        <Alert className="w-full max-w-md">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Вход выполнен успешно!</AlertTitle>
          <AlertDescription>
            Добро пожаловать в PetCare Portal. Вы будете перенаправлены на
            главную страницу.
          </AlertDescription>
        </Alert>
      </motion.div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>
              Войдите в свой аккаунт PetCare Portal
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
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          rememberMe: checked,
                        }))
                      }
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm"
                    >
                      Запомнить меня
                    </Label>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm"
                      >
                        Забыли пароль?
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-2">
                        <h4 className="font-medium">Восстановление пароля</h4>
                        <p className="text-sm">
                          Введите ваш email, и мы отправим вам инструкции по
                          сбросу пароля.
                        </p>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                        />
                        <Button className="w-full">Отправить инструкции</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </Button>
            <div className="relative w-full">
              <Separator className="my-4" />
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                Или войдите через
              </div>
            </div>
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="w-full"
              >
                <div className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button
                variant="outline"
                className="w-full"
              >
                <Github className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Нет аккаунта?{' '}
              <Link
                href="/register"
                className="text-primary hover:underline"
              >
                Зарегистрироваться
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
