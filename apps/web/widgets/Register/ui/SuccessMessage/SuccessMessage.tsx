import { motion } from 'framer-motion'
import { Alert, AlertDescription, AlertTitle } from '@pc/ui/components/ui/Alert'
import { Button } from '@pc/ui/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function SuccessMessage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <motion.div
        variants={successVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Alert>
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
    </div>
  )
}
