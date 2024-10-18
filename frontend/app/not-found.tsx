'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/Button'
import { PawPrintIcon, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const router = useRouter()

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
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 10,
            }}
            className="relative mx-auto h-24 w-24"
          >
            <PawPrintIcon className="absolute inset-0 h-full w-full text-primary opacity-20" />
          </motion.div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            404 - Страница не найдена
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Упс! Похоже, вы забрели не туда. Страница, которую вы ищете, не
            существует или была перемещена.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться назад
            </Button>
            <Button onClick={() => router.push('/')}>
              <PawPrintIcon className="mr-2 h-4 w-4" />
              На главную
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
