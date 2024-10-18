'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button'
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full px-4"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
          >
            <AlertTriangle className="mx-auto h-16 w-16 text-yellow-400" />
          </motion.div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Упс! Что-то пошло не так
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Произошла непредвиденная ошибка. Наша команда уже работает над её
            устранением.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => reset()}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Попробовать снова
            </Button>
            <Button onClick={() => router.push('/')}>
              <Home className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
