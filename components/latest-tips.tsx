"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const latestTips = [
  {
    id: 1,
    title: 'Правильное питание для кошек',
    excerpt:
      'Узнайте, как составить идеальный рацион для вашего пушистого друга.',
    image: 'https://api.thecatapi.com/v1/images/search?size=medium',
    category: 'cats',
  },
  {
    id: 2,
    title: 'Уход за зубами собаки',
    excerpt: 'Советы по поддержанию здоровья зубов вашего питомца.',
    image: 'https://api.thecatapi.com/v1/images/search?size=medium',
    category: 'dogs',
  },
  {
    id: 3,
    title: 'Физическая активность для грызунов',
    excerpt: 'Как обеспечить достаточную активность вашему маленькому питомцу.',
    image:
      'https://api.unsplash.com/photos/random?query=hamster&orientation=landscape',
    category: 'other',
  },
]

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function LatestTips() {
  const [filter, setFilter] = useState('all')

  const filteredTips = useCallback(
    () =>
      filter === 'all'
        ? latestTips
        : latestTips.filter((tip) => tip.category === filter),
    [filter],
  )

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center text-gray-900">
          Последние советы
        </h2>
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setFilter}
        >
          <TabsList className="mb-8 flex justify-center size-fit mx-auto flex-wrap">
            {['all', 'cats', 'dogs', 'other'].map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                {category === 'all'
                  ? 'Все'
                  : category === 'cats'
                  ? 'Кошки'
                  : category === 'dogs'
                  ? 'Собаки'
                  : 'Другие питомцы'}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={filter}>
            <AnimatePresence>
              <motion.div
                className="grid gap-6 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {filteredTips().map((tip) => (
                  <motion.div
                    key={tip.id}
                    variants={variants}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                      <CardHeader className="p-0">
                        <div className="relative w-full pt-[56.25%] overflow-hidden">
                          <Image
                            src={tip.image}
                            alt={tip.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow p-4">
                        <CardTitle className="text-xl font-semibold mb-2 text-gray-800">
                          {tip.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600">{tip.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-4">
                        <Button
                          variant="outline"
                          className="w-full text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
                        >
                          Читать далее
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
