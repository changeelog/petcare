import React from 'react'
import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'

export const HeroContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center space-y-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.2,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <PawPrint
          className="h-16 w-16 text-primary"
          aria-hidden="true"
        />
      </motion.div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
          Добро пожаловать в{' '}
          <span className="text-primary">PetCare Portal</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Ваш надежный помощник в заботе о питомцах. Найдите лучшие услуги,
          получите советы экспертов и общайтесь с другими владельцами животных.
        </p>
      </div>
    </motion.div>
  )
}
