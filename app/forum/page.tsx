'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select } from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Search,
  MessageSquare,
  ThumbsUp,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Plus,
} from 'lucide-react'

const initialTopics = [
  {
    id: 1,
    title: 'Как приучить котенка к лотку?',
    author: 'Анна',
    date: '2024-05-15',
    category: 'Кошки',
    content:
      'У меня недавно появился котенок, и я не могу приучить его к лотку. Есть ли какие-то проверенные методы?',
    replies: 3,
    views: 120,
    votes: 5,
    comments: [
      {
        id: 1,
        author: 'Иван',
        content:
          'Нужно терпение и постоянство. Попробуйте ставить котенка в лоток после еды и сна.',
        date: '2024-05-16',
        votes: 2,
      },
      {
        id: 2,
        author: 'Мария',
        content:
          'Попробуйте специальный наполнитель для приучения. У нас сработало!',
        date: '2024-05-17',
        votes: 3,
      },
    ],
  },
  {
    id: 2,
    title: 'Лучшие игрушки для собак',
    author: 'Петр',
    date: '2024-05-18',
    category: 'Собаки',
    content:
      'Какие игрушки вы рекомендуете для активной собаки? Нужно что-то прочное и интересное.',
    replies: 1,
    views: 85,
    votes: 3,
    comments: [
      {
        id: 3,
        author: 'Ольга',
        content:
          'Мой пес обожает игрушки-пищалки! Только убедитесь, что они достаточно прочные.',
        date: '2024-05-19',
        votes: 1,
      },
    ],
  },
]

export default function ForumComponent() {
  const [topics, setTopics] = useState(initialTopics)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [newTopic, setNewTopic] = useState({
    title: '',
    content: '',
    category: '',
  })
  const [newComment, setNewComment] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [sortCriteria, setSortCriteria] = useState('date')

  const categories = ['Все', 'Кошки', 'Собаки', 'Грызуны', 'Птицы', 'Рептилии']

  const filteredTopics = topics
    .filter(
      (topic) =>
        (topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (activeCategory === 'Все' || topic.category === activeCategory),
    )
    .sort((a, b) => {
      if (sortCriteria === 'date') return new Date(b.date) - new Date(a.date)
      if (sortCriteria === 'votes') return b.votes - a.votes
      if (sortCriteria === 'replies') return b.replies - a.replies
      return 0
    })

  const handleCreateTopic = () => {
    if (newTopic.title && newTopic.content && newTopic.category) {
      const topic = {
        id: topics.length + 1,
        ...newTopic,
        author: 'Текущий пользователь',
        date: new Date().toISOString().split('T')[0],
        replies: 0,
        views: 0,
        votes: 0,
        comments: [],
      }
      setTopics([topic, ...topics])
      setNewTopic({ title: '', content: '', category: '' })
    }
  }

  const handleAddComment = () => {
    if (newComment && selectedTopic) {
      const comment = {
        id: selectedTopic.comments.length + 1,
        author: 'Текущий пользователь',
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

  const handleVote = (id, direction, isComment = false) => {
    if (isComment) {
      const updatedTopic = {
        ...selectedTopic,
        comments: selectedTopic.comments.map((comment) =>
          comment.id === id
            ? {
                ...comment,
                votes: comment.votes + (direction === 'up' ? 1 : -1),
              }
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
            ? { ...topic, votes: topic.votes + (direction === 'up' ? 1 : -1) }
            : topic,
        ),
      )
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Форум владельцев животных</h1>
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
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTopic(null)}
                  className="mb-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад к темам
                </Button>
                <CardTitle>{selectedTopic.title}</CardTitle>
                <CardDescription>
                  Автор: {selectedTopic.author}, Дата: {selectedTopic.date}
                  <Badge className="ml-2">{selectedTopic.category}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{selectedTopic.content}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span>
                    <MessageSquare className="inline mr-1" />{' '}
                    {selectedTopic.replies} ответов
                  </span>
                  <span>
                    <ThumbsUp className="inline mr-1" /> {selectedTopic.votes}{' '}
                    голосов
                  </span>
                </div>
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <AnimatePresence>
                    {selectedTopic.comments.map((comment) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="mb-4 p-2 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar>
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">
                            {comment.author}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                        <p>{comment.content}</p>
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleVote(comment.id, 'up', true)
                                  }
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Голосовать за</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <span>{comment.votes}</span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleVote(comment.id, 'down', true)
                                  }
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Голосовать против</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </ScrollArea>
                <div className="mt-4">
                  <Textarea
                    placeholder="Добавить комментарий"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button
                    onClick={handleAddComment}
                    className="mt-2"
                  >
                    Отправить комментарий
                  </Button>
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
              <div>
                <Select
                  value={sortCriteria}
                  onValueChange={setSortCriteria}
                >
                  <option value="date">По дате</option>
                  <option value="votes">По голосам</option>
                  <option value="replies">По ответам</option>
                </Select>
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
                    <option value="">Выберите категорию</option>
                    {categories
                      .filter((c) => c !== 'Все')
                      .map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateTopic}>
                  <Plus className="mr-2 h-4 w-4" />
                  Создать тему
                </Button>
              </CardFooter>
            </Card>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      onClick={() => setSelectedTopic(topic)}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <CardTitle>{topic.title}</CardTitle>
                        <CardDescription>
                          Автор: {topic.author}, Дата: {topic.date}
                          <Badge className="ml-2">{topic.category}</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-2">{topic.content}</p>
                      </CardContent>
                      <CardFooter>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            <MessageSquare className="inline mr-1" />{' '}
                            {topic.replies} ответов
                          </span>
                          <span>
                            <ThumbsUp className="inline mr-1" /> {topic.votes}{' '}
                            голосов
                          </span>
                        </div>
                        <div className="ml-auto">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleVote(topic.id, 'up')
                                  }}
                                >
                                  <ArrowUp className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Голосовать за</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleVote(topic.id, 'down')
                                  }}
                                >
                                  <ArrowDown className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Голосовать против</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
