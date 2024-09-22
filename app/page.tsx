'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, MessageCircle, BookOpen, Calendar } from 'lucide-react'
import { Navigation } from '../components/navigation'
import { Footer } from '../components/footer'
import { Testimonials } from '../components/testimonials'
import { WhyChooseUs } from '../components/why-choose-us'
import { LatestTips } from '../components/latest-tips'
import { PopularServices } from '../components/popular-service'
import { HeroSection } from '../components/hero'

const testimonials = [
  {
    id: 1,
    text: 'PetCare Portal изменил жизнь моего питомца к лучшему!',
    author: 'Анна С.',
  },
  {
    id: 2,
    text: 'Лучший ресурс для владельцев животных, который я когда-либо использовал.',
    author: 'Иван П.',
  },
  {
    id: 3,
    text: 'Благодаря советам экспертов, мой щенок стал намного послушнее.',
    author: 'Мария Д.',
  },
]

const featuredServices = [
  {
    id: 1,
    name: 'Ветеринарный осмотр',
    description: 'Комплексный осмотр вашего питомца',
    price: 1500,
    image: '/placeholder-vet.jpg',
  },
  {
    id: 2,
    name: 'Стрижка собак',
    description: 'Профессиональный груминг для вашего друга',
    price: 2000,
    image: '/placeholder-grooming.jpg',
  },
  {
    id: 3,
    name: 'Вакцинация',
    description: 'Защитите вашего питомца от болезней',
    price: 1000,
    image: '/placeholder-vaccine.jpg',
  },
]

const latestTips = [
  {
    id: 1,
    title: 'Правильное питание для кошек',
    excerpt:
      'Узнайте, как составить идеальный рацион для вашего пушистого друга.',
    image: '/placeholder-cat-food.jpg',
  },
  {
    id: 2,
    title: 'Уход за зубами собаки',
    excerpt: 'Советы по поддержанию здоровья зубов вашего питомца.',
    image: '/placeholder-dog-teeth.jpg',
  },
  {
    id: 3,
    title: 'Физическая активность для грызунов',
    excerpt: 'Как обеспечить достаточную активность вашему маленькому питомцу.',
    image: '/placeholder-hamster.jpg',
  },
]

export default function HomePageComponent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <PopularServices />
        <LatestTips />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
