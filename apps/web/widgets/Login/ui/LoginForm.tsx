'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import Link from 'next/link'
import { useLoginForm } from '@/hooks/useLoginForm'
import { EmailInput } from './EmailInput'
import { PasswordInput } from './PasswordInput'
import { RememberMeCheckbox } from './RememberMeCheckbox'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } =
    useLoginForm(onSuccess)

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
                <EmailInput
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <PasswordInput
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                />
                <div className="flex items-center justify-between">
                  <RememberMeCheckbox
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      handleInputChange({
                        target: {
                          name: 'rememberMe',
                          type: 'checkbox',
                          checked,
                        },
                      } as any)
                    }
                  />
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
