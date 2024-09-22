export interface Tip {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  likes: number
  image: string
}

export const tips: Tip[] = [
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

export const categories = [
  'Все',
  'Питание',
  'Уход',
  'Активность',
  'Здоровье',
  'Игры',
]
