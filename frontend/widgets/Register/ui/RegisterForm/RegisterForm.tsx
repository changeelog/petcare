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
import { TooltipProvider } from '@/shared/ui/Tooltip'
import Link from 'next/link'
import { useRegisterForm } from '@/hooks/useRegisterForm'
import { EmailInput } from '../EmailInput/EmailInput'
import { PasswordInput } from '../PasswordInput/PasswordInput'
import { ConfirmPasswordInput } from '../ConfirmPasswordInput/ConfirmPasswordInput'
import { InfoTooltip } from '../InfoTooltip/InfoTooltip'

interface RegisterFormProps {
  onSuccess: () => void
}

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { formData, errors, isSubmitting, handleInputChange, handleSubmit } =
    useRegisterForm(onSuccess)

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
            <motion.form
              onSubmit={handleSubmit}
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-4">
                <motion.div variants={itemVariants}>
                  <EmailInput
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <PasswordInput
                    value={formData.password}
                    onChange={handleInputChange}
                    error={errors.password}
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ConfirmPasswordInput
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                  />
                </motion.div>
              </div>
            </motion.form>
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
            </motion.button>
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
              <InfoTooltip />
            </TooltipProvider>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
