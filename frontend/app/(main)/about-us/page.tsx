'use client'

import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/Card'
import { Heart, PawPrint, Shield, Users } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/Avatar'

const teamMembers = [
  {
    name: 'Анна Петрова',
    role: 'Основатель и CEO',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Иван Сидоров',
    role: 'Главный ветеринар',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Мария Иванова',
    role: 'Менеджер по работе с клиентами',
    avatar: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Алексей Смирнов',
    role: 'Специалист по уходу за животными',
    avatar: '/placeholder.svg?height=100&width=100',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Забота',
    description: 'Мы относимся к каждому питомцу с любовью и вниманием.',
  },
  {
    icon: Shield,
    title: 'Безопасность',
    description: 'Безопасность животных - наш главный приоритет.',
  },
  {
    icon: Users,
    title: 'Сообщество',
    description: 'Мы создаем дружное сообщество любителей животных.',
  },
  {
    icon: PawPrint,
    title: 'Экспертиза',
    description: 'Наша команда состоит из опытных специалистов.',
  },
]

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0, y: 0 }}
        transition={{ duraiton: 0.5 }}
      >
        <h1 className="text-4l font-bold mb-6 text-center">О нас</h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          PetCare Portal - это платформа, созданная с любовью к животным и
          заботой об их владельцах. Мы стремимся сделать уход за питомцами
          проще, доступнее и радостнее.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">Наша миссия</h2>
        <Card className="mb-12">
          <CardContent className="pt-6">
            <p className="text-center text-lg">
              Наша миссия - улучшить жизнь животных и их владельцев,
              предоставляя качественные услуги по уходу, экспертные советы и
              создавая сообщество единомышленников.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Наши ценности
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <value.icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Наша команда
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card>
                <CardHeader>
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage
                      src={member.avatar}
                      alt={member.name}
                    />
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <CardDescription className="text-center">
                    {member.role}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center"
      >
        <h2 className="text-3xl font-semibold mb-6">Присоединяйтесь к нам</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Мы всегда рады новым членам нашего сообщества. Если вы разделяете нашу
          любовь к животным и хотите сделать мир лучше для наших пушистых
          друзей, присоединяйтесь к PetCare Portal!
        </p>
        <Button size="lg">Стать частью команды</Button>
      </motion.div>
    </div>
  )
}
