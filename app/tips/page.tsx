'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { BookmarkPlus, Search, ArrowLeft, ThumbsUp, Share2 } from 'lucide-react'

const tips = [
  {
    id: 1,
    title: 'Правильное питание для вашей собаки',
    excerpt:
      'Узнайте, как составить сбалансированный рацион для вашего четвероногого друга.',
    content: 'Полный текст статьи о правильном питании для собак...',
    category: 'Питание',
    likes: 45,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 2,
    title: 'Уход за шерстью кошки',
    excerpt:
      'Советы по уходу за шерстью вашей кошки для поддержания ее здоровья и красоты.',
    content: 'Полный текст статьи об уходе за шерстью кошки...',
    category: 'Уход',
    likes: 32,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 3,
    title: 'Физическая активность для собак',
    excerpt:
      'Важность регулярных упражнений для здоровья и счастья вашей собаки.',
    content: 'Полный текст статьи о физической активности для собак...',
    category: 'Активность',
    likes: 28,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 4,
    title: 'Признаки болезни у кошек',
    excerpt:
      'Как распознать первые симптомы заболевания у вашего пушистого друга.',
    content: 'Полный текст статьи о признаках болезни у кошек...',
    category: 'Здоровье',
    likes: 56,
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 5,
    title: 'Выбор правильных игрушек для питомца',
    excerpt:
      'Руководство по выбору безопасных и развивающих игрушек для вашего животного.',
    content: 'Полный текст статьи о выборе игрушек для питомцев...',
    category: 'Игры',
    likes: 39,
    image: '/placeholder.svg?height=200&width=400',
  },
]

export function PetCareTipsComponent() {
  const [selectedTip, setSelectedTip] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [favorites, setFavorites] = useState([])

  const categories = [
    'Все',
    'Питание',
    'Уход',
    'Активность',
    'Здоровье',
    'Игры',
  ]

  const filteredTips = tips.filter(
    (tip) =>
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === 'Все' || tip.category === activeCategory),
  )

  const toggleFavorite = (tipId) => {
    setFavorites(
      favorites.includes(tipId)
        ? favorites.filter((id) => id !== tipId)
        : [...favorites, tipId],
    )
  }

  const shareTip = (tip) => {
    // Здесь можно реализовать функцию для шаринга в соцсети
    console.log(`Делимся советом: ${tip.title}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Советы по уходу за питомцами</h1>
      {selectedTip ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <Button
                variant="ghost"
                onClick={() => setSelectedTip(null)}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Назад к списку
              </Button>
              <CardTitle>{selectedTip.title}</CardTitle>
              <CardDescription>
                <Badge>{selectedTip.category}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={selectedTip.image}
                alt={selectedTip.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                <p>{selectedTip.content}</p>
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <ThumbsUp className="mr-2 h-4 w-4" />
                Нравится ({selectedTip.likes})
              </Button>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => toggleFavorite(selectedTip.id)}
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {favorites.includes(selectedTip.id)
                          ? 'Удалить из избранного'
                          : 'Добавить в избранное'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => shareTip(selectedTip)}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Поделиться советом</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск советов"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>
          <Tabs
            defaultValue="Все"
            className="mb-6"
          >
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <AnimatePresence>
            <motion.div
              layout
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="flex flex-col h-full">
                    <CardHeader>
                      <img
                        src={tip.image}
                        alt={tip.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <CardTitle>{tip.title}</CardTitle>
                      <CardDescription>
                        <Badge>{tip.category}</Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{tip.excerpt}</p>
                    </CardContent>
                    <CardFooter className="mt-auto flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTip(tip)}
                      >
                        Читать далее
                      </Button>
                      <div className="flex gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => toggleFavorite(tip.id)}
                              >
                                <BookmarkPlus className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                {favorites.includes(tip.id)
                                  ? 'Удалить из избранного'
                                  : 'Добавить в избранное'}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                onClick={() => shareTip(tip)}
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Поделиться советом</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
