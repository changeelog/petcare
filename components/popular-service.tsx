import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const featuredServices = [
  {
    id: 1,
    name: 'Ветеринарный осмотр',
    description: 'Комплексный осмотр вашего питомца',
    price: 1500,
  },
  {
    id: 2,
    name: 'Стрижка собак',
    description: 'Профессиональный груминг для вашего друга',
    price: 2000,
  },
  {
    id: 3,
    name: 'Вакцинация',
    description: 'Защитите вашего питомца от болезней',
    price: 1000,
  },
]

export function PopularServices() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [dogImages, setDogImages] = useState<string[]>([])

  useEffect(() => {
    const fetchDogImages = async () => {
      const images = await Promise.all(
        featuredServices.map(async () => {
          const response = await fetch(
            'https://dog.ceo/api/breeds/image/random',
          )
          const data = await response.json()
          return data.message
        }),
      )
      setDogImages(images)
    }

    fetchDogImages()
  }, [])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl font-bold tracking-tighter mb-8 text-center">
          Популярные услуги
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredId(service.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="relative w-full pt-[56.25%] overflow-hidden">
                    {dogImages[index] && (
                      <img
                        src={dogImages[index]}
                        alt={service.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <CardTitle className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                      {service.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardDescription className="mb-4">
                    {service.description}
                  </CardDescription>
                  <p className="text-3xl font-bold text-primary">
                    {service.price} ₽
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  <AnimatePresence>
                    {hoveredId === service.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="w-full"
                      >
                        <Button
                          className="w-full"
                          variant="default"
                        >
                          Записаться
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
