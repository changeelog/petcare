'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Textarea } from '@/shared/ui/Textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/Avatar'
import { Badge } from '@/shared/ui/Badge'
import { ScrollArea } from '@/shared/ui/ScrollArea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/Select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/Tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/ui/Command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  Search,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Plus,
  Tag,
  Eye,
  Bookmark,
  Share2,
  MoreHorizontal,
  Flag,
} from 'lucide-react'

const initialTopics = [
  {
    id: 1,
    title: 'Как приучить котенка к лотку?',
    author: { name: 'Анна', avatar: '/placeholder.svg?height=40&width=40' },
    date: '2023-05-15',
    category: 'Кошки',
    tags: ['Котята', 'Приучение', 'Лоток'],
    content:
      'У меня недавно появился котенок, и я не могу приучить его к лотку. Есть ли какие-то проверенные методы?',
    replies: 3,
    views: 120,
    votes: 5,
    comments: [
      {
        id: 1,
        author: { name: 'Иван', avatar: '/placeholder.svg?height=40&width=40' },
        content:
          'Нужно терпение и постоянство. Попробуйте ставить котенка в лоток после еды и сна.',
        date: '2023-05-16',
        votes: 2,
      },
      {
        id: 2,
        author: {
          name: 'Мария',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
          'Попробуйте специальный наполнитель для приучения. У нас сработало!',
        date: '2023-05-17',
        votes: 3,
      },
    ],
    isSolved: false,
    isBookmarked: false,
  },
  {
    id: 2,
    title: 'Лучшие игрушки для собак',
    author: { name: 'Петр', avatar: '/placeholder.svg?height=40&width=40' },
    date: '2023-05-18',
    category: 'Собаки',
    tags: ['Игрушки', 'Активность'],
    content:
      'Какие игрушки вы рекомендуете для активной собаки? Нужно что-то прочное и интересное.',
    replies: 1,
    views: 85,
    votes: 3,
    comments: [
      {
        id: 3,
        author: {
          name: 'Ольга',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
          'Мой пес обожает игрушки-пищалки! Только убедитесь, что они достаточно прочные.',
        date: '2023-05-19',
        votes: 1,
      },
    ],
    isSolved: true,
    isBookmarked: true,
  },
]

const categories = [
  { value: 'all', label: 'Все категории' },
  { value: 'cats', label: 'Кошки' },
  { value: 'dogs', label: 'Собаки' },
  { value: 'birds', label: 'Птицы' },
  { value: 'rodents', label: 'Грызуны' },
  { value: 'reptiles', label: 'Рептилии' },
  { value: 'fish', label: 'Рыбы' },
  { value: 'other', label: 'Другие животные' },
]

interface Author {
  name: string
  avatar: string
}

interface Comment {
  id: number
  author: Author
  content: string
  date: string
  votes: number
}

interface Topic {
  id: number
  title: string
  author: Author
  date: string
  category: string
  tags: string[]
  content: string
  replies: number
  views: number
  votes: number
  comments: Comment[]
  isSolved: boolean
  isBookmarked: boolean
}

interface NewTopic {
  title: string
  content: string
  category: string
  tags: string[]
}

export default function Forum() {
  const [topics, setTopics] = useState<Topic[]>(initialTopics)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [newTopic, setNewTopic] = useState<NewTopic>({
    title: '',
    content: '',
    category: '',
    tags: [],
  })
  const [newComment, setNewComment] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortCriteria, setSortCriteria] = useState('date')
  const [openCategory, setOpenCategory] = useState(false)

  const filteredTopics = topics
    .filter(
      (topic) =>
        (topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeCategory === 'all' ||
          topic.category.toLowerCase() === activeCategory),
    )
    .sort((a, b) => {
      switch (sortCriteria) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'votes':
          return b.votes - a.votes
        case 'replies':
          return b.replies - a.replies
        case 'views':
          return b.views - a.views
        default:
          return 0
      }
    })

  const handleCreateTopic = () => {
    if (newTopic.title && newTopic.content && newTopic.category) {
      const topic = {
        id: topics.length + 1,
        ...newTopic,
        author: {
          name: 'Текущий пользователь',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        date: new Date().toISOString().split('T')[0],
        replies: 0,
        views: 0,
        votes: 0,
        comments: [],
        isSolved: false,
        isBookmarked: false,
      }
      setTopics([topic, ...topics])
      setNewTopic({ title: '', content: '', category: '', tags: [] })
    }
  }

  const handleAddComment = () => {
    if (newComment && selectedTopic) {
      const comment = {
        id: selectedTopic.comments.length + 1,
        author: {
          name: 'Текущий пользователь',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        votes: 0,
      }
      const updatedTopic = {
        ...selectedTopic,
        comments: [...selectedTopic.comments, comment],
        replies: selectedTopic.replies + 1,
      }
      setTopics(
        topics.map((t) => (t.id === selectedTopic.id ? updatedTopic : t)),
      )
      setSelectedTopic(updatedTopic)
      setNewComment('')
    }
  }

  const handleVote = (id: number, type: 'up' | 'down', isComment = false) => {
    if (isComment && selectedTopic) {
      const updatedTopic: Topic = {
        ...selectedTopic,
        comments: selectedTopic.comments.map((comment) =>
          comment.id === id
            ? { ...comment, votes: comment.votes + (type === 'up' ? 1 : -1) }
            : comment,
        ),
      }
      setTopics(
        topics.map((t) => (t.id === selectedTopic.id ? updatedTopic : t)),
      )
      setSelectedTopic(updatedTopic)
    } else {
      setTopics(
        topics.map((topic) =>
          topic.id === id
            ? { ...topic, votes: topic.votes + (type === 'up' ? 1 : -1) }
            : topic,
        ),
      )
    }
  }

  const handleBookmark = (id: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id
          ? { ...topic, isBookmarked: !topic.isBookmarked }
          : topic,
      ),
    )
  }

  const handleSolveTopic = (id: number) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, isSolved: !topic.isSolved } : topic,
      ),
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Форум владельцев животных</h1>
        <Button onClick={() => setSelectedTopic(null)}>
          <Plus className="mr-2 h-4 w-4" /> Создать тему
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {selectedTopic ? (
          <motion.div
            key="topic-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedTopic(null)}
                    className="mb-2"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад к темам
                  </Button>
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleBookmark(selectedTopic.id)}
                          >
                            <Bookmark
                              className={cn(
                                'h-4 w-4',
                                selectedTopic.isBookmarked
                                  ? 'fill-current'
                                  : '',
                              )}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {selectedTopic.isBookmarked
                              ? 'Убрать из закладок'
                              : 'Добавить в закладки'}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Поделиться темой</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Дополнительные действия</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <CardTitle>{selectedTopic.title}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={selectedTopic.author.avatar}
                      alt={selectedTopic.author.name}
                    />
                    <AvatarFallback>
                      {selectedTopic.author.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span>{selectedTopic.author.name}</span>
                  <span>•</span>
                  <span>
                    {format(new Date(selectedTopic.date), 'dd MMM yyyy', {
                      locale: ru,
                    })}
                  </span>
                  <Badge variant="secondary">{selectedTopic.category}</Badge>
                  {selectedTopic.isSolved && (
                    <Badge variant="outline">Решено</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{selectedTopic.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedTopic.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>
                    <MessageSquare className="inline mr-1 h-4 w-4" />{' '}
                    {selectedTopic.replies} ответов
                  </span>
                  <span>
                    <Eye className="inline mr-1 h-4 w-4" />{' '}
                    {selectedTopic.views} просмотров
                  </span>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote(selectedTopic.id, 'up')}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <span>{selectedTopic.votes}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleVote(selectedTopic.id, 'down')}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <ScrollArea className="h-[400px] pr-4">
                  <AnimatePresence>
                    {selectedTopic.comments.map((comment, index) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="mb-4 p-4 bg-muted rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={comment.author.avatar}
                                alt={comment.author.name}
                              />
                              <AvatarFallback>
                                {comment.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-semibold">
                              {comment.author.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(comment.date), 'dd MMM yyyy', {
                                locale: ru,
                              })}
                            </span>
                          </div>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Действия с комментарием</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <p className="mb-2">{comment.content}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(comment.id, 'up', true)}
                          >
                            <ArrowUp className="mr-1 h-3 w-3" />
                            {comment.votes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(comment.id, 'down', true)}
                          >
                            <ArrowDown className="mr-1 h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            Ответить
                          </Button>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                >
                                  <Flag className="h-3 w-3" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Пожаловаться</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
                <div className="mt-4 space-y-2">
                  <Textarea
                    placeholder="Добавить комментарий"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <div className="flex justify-between items-center">
                    <Button onClick={handleAddComment}>
                      Отправить комментарий
                    </Button>
                    {!selectedTopic.isSolved && (
                      <Button
                        variant="outline"
                        onClick={() => handleSolveTopic(selectedTopic.id)}
                      >
                        Отметить как решенное
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="topic-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6 flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Поиск тем"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Popover
                open={openCategory}
                onOpenChange={setOpenCategory}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCategory}
                    className="w-[200px] justify-between"
                  >
                    {activeCategory
                      ? categories.find(
                          (category) => category.value === activeCategory,
                        )?.label
                      : 'Выберите категорию'}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Поиск категории..." />
                    <CommandEmpty>Категория не найдена.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.value}
                          onSelect={() => {
                            setActiveCategory(
                              category.value === activeCategory
                                ? ''
                                : category.value,
                            )
                            setOpenCategory(false)
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              activeCategory === category.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <Select
                value={sortCriteria}
                onValueChange={setSortCriteria}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">По дате</SelectItem>
                  <SelectItem value="votes">По голосам</SelectItem>
                  <SelectItem value="replies">По ответам</SelectItem>
                  <SelectItem value="views">По просмотрам</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Создать новую тему</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Input
                    placeholder="Заголовок темы"
                    value={newTopic.title}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, title: e.target.value })
                    }
                  />
                  <Textarea
                    placeholder="Содержание темы"
                    value={newTopic.content}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, content: e.target.value })
                    }
                  />
                  <Select
                    value={newTopic.category}
                    onValueChange={(value) =>
                      setNewTopic({ ...newTopic, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c.value !== 'all')
                        .map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Теги (через запятую)"
                    value={newTopic.tags.join(', ')}
                    onChange={(e) =>
                      setNewTopic({
                        ...newTopic,
                        tags: e.target.value
                          .split(',')
                          .map((tag) => tag.trim()),
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateTopic}>Создать тему</Button>
              </CardFooter>
            </Card>

            <AnimatePresence>
              <motion.div
                layout
                className="space-y-4"
              >
                {filteredTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      onClick={() => setSelectedTopic(topic)}
                      className={cn(
                        'cursor-pointer hover:shadow-md transition-shadow',
                        topic.isSolved && 'border-green-500',
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            {topic.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            {topic.isSolved && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline">Решено</Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Эта тема была отмечена как решенная</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleBookmark(topic.id)
                                    }}
                                  >
                                    <Bookmark
                                      className={cn(
                                        'h-4 w-4',
                                        topic.isBookmarked
                                          ? 'fill-current'
                                          : '',
                                      )}
                                    />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>
                                    {topic.isBookmarked
                                      ? 'Убрать из закладок'
                                      : 'Добавить в закладки'}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <CardDescription>
                          <div className="flex items-center space-x-2 text-sm">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={topic.author.avatar}
                                alt={topic.author.name}
                              />
                              <AvatarFallback>
                                {topic.author.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span>{topic.author.name}</span>
                            <span>•</span>
                            <span>
                              {format(new Date(topic.date), 'dd MMM yyyy', {
                                locale: ru,
                              })}
                            </span>
                            <Badge variant="secondary">{topic.category}</Badge>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2">{topic.content}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {topic.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                            >
                              <Tag className="mr-1 h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            <MessageSquare className="inline mr-1 h-4 w-4" />{' '}
                            {topic.replies} ответов
                          </span>
                          <span>
                            <Eye className="inline mr-1 h-4 w-4" />{' '}
                            {topic.views} просмотров
                          </span>
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(topic.id, 'up')
                              }}
                            >
                              <ArrowUp className="h-4 w-4" />
                            </Button>
                            <span>{topic.votes}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(topic.id, 'down')
                              }}
                            >
                              <ArrowDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
