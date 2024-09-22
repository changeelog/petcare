import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, PawPrint } from 'lucide-react'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Здесь логика обработки поискового запроса
    console.log('Search query:', searchQuery)
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-primary/20 via-background to-background overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto relative">
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
            <PawPrint className="h-16 w-16 text-primary" />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Добро пожаловать в{' '}
              <span className="text-primary">PetCare Portal</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Ваш надежный помощник в заботе о питомцах. Найдите лучшие услуги,
              получите советы экспертов и общайтесь с другими владельцами
              животных.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full max-w-md space-y-4"
          >
            <form
              onSubmit={handleSubmit}
              className="flex space-x-2"
            >
              <Input
                className="flex-1"
                placeholder="Поиск услуг, советов..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary-dark transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Поиск
              </Button>
            </form>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute -z-10 inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {/* Здесь можно добавить декоративные элементы, например, силуэты животных */}
        </motion.div>
      </div>
    </section>
  )
}
