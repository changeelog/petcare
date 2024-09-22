import { useState } from 'react'
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
    image: '/placeholder-cat-food.jpg',
    category: 'cats',
  },
  {
    id: 2,
    title: 'Уход за зубами собаки',
    excerpt: 'Советы по поддержанию здоровья зубов вашего питомца.',
    image: '/placeholder-dog-teeth.jpg',
    category: 'dogs',
  },
  {
    id: 3,
    title: 'Физическая активность для грызунов',
    excerpt: 'Как обеспечить достаточную активность вашему маленькому питомцу.',
    image: '/placeholder-hamster.jpg',
    category: 'other',
  },
  // Добавьте больше советов здесь...
]

export function LatestTips() {
  const [filter, setFilter] = useState('all')

  const filteredTips =
    filter === 'all'
      ? latestTips
      : latestTips.filter((tip) => tip.category === filter)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
          Последние советы
        </h2>
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setFilter}
        >
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="cats">Кошки</TabsTrigger>
            <TabsTrigger value="dogs">Собаки</TabsTrigger>
            <TabsTrigger value="other">Другие питомцы</TabsTrigger>
          </TabsList>
          <TabsContent value={filter}>
            <AnimatePresence>
              <motion.div
                className="grid gap-6 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                {filteredTips.map((tip) => (
                  <motion.div
                    key={tip.id}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: { y: 0, opacity: 1 },
                    }}
                  >
                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="p-0">
                        <div className="relative w-full pt-[56.25%] overflow-hidden rounded-t-lg">
                          <img
                            src={tip.image}
                            alt={tip.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                        <CardTitle className="p-4">{tip.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow p-4">
                        <p className="text-muted-foreground">{tip.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-4">
                        <Button
                          variant="outline"
                          className="w-full"
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
