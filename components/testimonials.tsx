import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import avatar from '@/public/avatar.jpg'

const testimonials = [
  {
    id: 1,
    text: 'PetCare Portal изменил жизнь моего питомца к лучшему!',
    author: 'Анна С.',
    avatar: avatar,
  },
  {
    id: 2,
    text: 'Лучший ресурс для владельцев животных, который я когда-либо использовал.',
    author: 'Иван П.',
    avatar: avatar,
  },
  {
    id: 3,
    text: 'Благодаря советам экспертов, мой щенок стал намного послушнее.',
    author: 'Мария Д.',
    avatar: avatar,
  },
]

export function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
          Отзывы наших пользователей
        </h2>
        <div className="relative mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                <Image
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].author}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base mb-4 italic">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <p className="font-semibold">
                {testimonials[currentTestimonial].author}
              </p>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Предыдущий отзыв"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            aria-label="Следующий отзыв"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="hidden md:flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentTestimonial ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Перейти к отзыву ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
