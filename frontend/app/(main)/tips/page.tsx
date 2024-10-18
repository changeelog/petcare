'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/ui/Tabs'
import { ScrollArea } from '@/shared/ui/ScrollArea'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/Avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/Accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/Dialog'
import { Label } from '@/shared/ui/Label'
import { Textarea } from '@/shared/ui/Textarea'
import { Search, ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react'
// import { Metadata } from 'next'

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: 'Page Title',
//     description: 'Page description',
//     openGraph: {
//       title: 'Open Graph Title',
//       description: 'Open Graph Description',
//       url: 'https://www.example.com/page',
//       siteName: 'Site Name',
//       images: [
//         {
//           url: 'https://www.example.com/og-image.jpg',
//           width: 800,
//           height: 600,
//           alt: 'Og Image Alt',
//         },
//       ],
//       locale: 'en_US',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: 'Twitter Title',
//       description: 'Twitter Description',
//       creator: '@username',
//     },
//     robots: {
//       index: true,
//       follow: true,
//       googleBot: {
//         index: true,
//         follow: true,
//         'max-video-preview': -1,
//         'max-image-preview': 'large',
//         'max-snippet': -1,
//       },
//     },
//   }
// }

const categories = ['Все', 'Кошки', 'Собаки', 'Грызуны', 'Птицы', 'Рептилии']

const tips = [
  {
    id: 1,
    title: 'Как приучить щенка к поводку',
    category: 'Собаки',
    content:
      'Начните с коротких прогулок в тихом месте. Используйте лакомства для поощрения. Постепенно увеличивайте время прогулок.',
    author: { name: 'Анна К.', avatar: '/placeholder.svg?height=40&width=40' },
    likes: 45,
    comments: 12,
  },
  {
    id: 2,
    title: 'Правильное питание для кошек',
    category: 'Кошки',
    content:
      'Кошкам необходим сбалансированный рацион с высоким содержанием белка. Избегайте кормления человеческой пищей.',
    author: {
      name: 'Михаил С.',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    likes: 67,
    comments: 23,
  },
  {
    id: 3,
    title: 'Уход за шерстью длинношерстных собак',
    category: 'Собаки',
    content:
      'Регулярно расчесывайте шерсть, используйте специальные шампуни. При необходимости обратитесь к профессиональному грумеру.',
    author: { name: 'Елена В.', avatar: '/placeholder.svg?height=40&width=40' },
    likes: 38,
    comments: 9,
  },
  {
    id: 4,
    title: 'Как обустроить клетку для хомяка',
    category: 'Грызуны',
    content:
      'Выберите просторную клетку, добавьте колесо для бега, домик и игрушки. Регулярно меняйте наполнитель.',
    author: {
      name: 'Дмитрий Н.',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    likes: 29,
    comments: 7,
  },
  {
    id: 5,
    title: 'Правильный уход за аквариумом',
    category: 'Рыбы',
    content:
      'Регулярно проверяйте качество воды, чистите фильтр и подменивайте часть воды. Следите за температурой и освещением.',
    author: { name: 'Ольга М.', avatar: '/placeholder.svg?height=40&width=40' },
    likes: 52,
    comments: 18,
  },
]

const faqs = [
  {
    question: 'Как часто нужно посещать ветеринара?',
    answer:
      'Рекомендуется проводить ежегодный осмотр для здоровых животных. Для молодых питомцев, пожилых или с хроническими заболеваниями может потребоваться более частое посещение.',
  },
  {
    question: 'Какие прививки нужны моему питомцу?',
    answer:
      'Основные прививки включают вакцинацию против бешенства, чумки, гепатита и парвовируса для собак, и от панлейкопении, ринотрахеита и калицивироза для кошек. Конкретный график прививок лучше обсудить с вашим ветеринаром.',
  },
  {
    question: 'Как приучить кошку к когтеточке?',
    answer:
      'Разместите когтеточку в доступном месте, где кошка любит точить когти. Используйте кошачью мяту или игрушки, чтобы привлечь внимание к когтеточке. Хвалите кошку, когда она использует когтеточку.',
  },
  {
    question: 'Сколько раз в день нужно кормить собаку?',
    answer:
      'Взрослых собак обычно кормят 2 раза в день. Щенков следует кормить чаще, 3-4 раза в день. Точное количество и частота кормлений зависят от возраста, размера и активности собаки.',
  },
  {
    question: 'Как подготовить дом к появлению нового питомца?',
    answer:
      'Уберите опасные предметы, защитите провода, приобретите необходимые принадлежности (миски, лежанку, игрушки). Выделите безопасное место для питомца. Ознакомьтесь с основами ухода за выбранным видом животного.',
  },
]

export default function Tips() {
  const [activeCategory, setActiveCategory] = useState('Все')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTips = tips.filter(
    (tip) =>
      (activeCategory === 'Все' || tip.category === activeCategory) &&
      (tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.content.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 text-center">
          Советы по уходу за питомцами
        </h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Здесь вы найдете полезные советы по уходу за различными домашними
          животными. Наши эксперты делятся своим опытом, чтобы помочь вам
          обеспечить наилучший уход за вашими питомцами.
        </p>
      </motion.div>

      <div className="mb-8">
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

      <Tabs
        defaultValue="Все"
        className="mb-12"
      >
        <TabsList className="mb-4">
          {categories.map((category, index) => (
            <TabsTrigger
              key={index}
              value={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{tip.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={tip.author.avatar}
                            alt={tip.author.name}
                          />
                          <AvatarFallback>{tip.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{tip.author.name}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{tip.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        {tip.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {tip.comments}
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Часто задаваемые вопросы
        </h2>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-2xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-12 text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">У вас есть вопрос?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Если вы не нашли ответ на свой вопрос или хотите поделиться своим
          советом, не стесняйтесь обратиться к нам или предложить свою тему для
          обсуждения.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Задать вопрос или предложить тему</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Задать вопрос или предложить тему</DialogTitle>
              <DialogDescription>
                Заполните форму, и мы рассмотрим ваш запрос в ближайшее время.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div
                className="gri
d grid-cols-4 items-center gap-4"
              >
                <Label
                  htmlFor="name"
                  className="text-right"
                >
                  Имя
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-right"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="topic"
                  className="text-right"
                >
                  Тема
                </Label>
                <Input
                  id="topic"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="message"
                  className="text-right"
                >
                  Сообщение
                </Label>
                <Textarea
                  id="message"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Отправить</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  )
}
