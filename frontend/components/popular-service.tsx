"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoIcon } from 'lucide-react'
import Image from 'next/image'

interface Service {
  id: number
  name: string
  description: string
  price: number
  info: string
}

const featuredServices: Service[] = [
  {
    id: 1,
    name: 'Ветеринарный осмотр',
    description: 'Комплексный осмотр вашего питомца',
    price: 1500,
    info: 'Включает проверку общего состояния здоровья, вакцинацию и консультацию.',
  },
  {
    id: 2,
    name: 'Стрижка собак',
    description: 'Профессиональный груминг для вашего друга',
    price: 2000,
    info: 'Стрижка, мытье, сушка и укладка шерсти вашего питомца.',
  },
  {
    id: 3,
    name: 'Вакцинация',
    description: 'Защитите вашего питомца от болезней',
    price: 1000,
    info: 'Вакцинация против распространенных заболеваний собак.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function PopularServices() {
  const [dogImages, setDogImages] = useState<string[]>([])

  useEffect(() => {
    const fetchDogImages = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching dog images:', error)
      }
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
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="relative w-full pt-[56.25%] overflow-hidden">
                    {dogImages[index] && (
                      <Image
                        width={256}
                        height={256}
                        src={dogImages[index]}
                        alt={service.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <CardTitle className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                      {service.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <div className="flex justify-between items-start mb-4">
                    <CardDescription>{service.description}</CardDescription>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <InfoIcon className="h-5 w-5 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{service.info}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="text-3xl font-bold text-primary">
                    {service.price} ₽
                  </p>
                </CardContent>
                <CardFooter className="p-4">
                  <Button
                    className="w-full"
                    variant="default"
                  >
                    Записаться
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
