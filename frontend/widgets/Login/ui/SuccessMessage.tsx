import { motion } from 'framer-motion'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/shared/ui/Alert'
import { CheckCircle2 } from 'lucide-react'

export function SuccessMessage() {
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
          Добро пожаловать в PetCare Portal. Вы будете перенаправлены на главную
          страницу.
        </AlertDescription>
      </Alert>
    </motion.div>
  )
}
