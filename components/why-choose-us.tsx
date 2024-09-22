import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Calendar, BookOpen, MessageCircle, LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Calendar,
    title: 'Удобная запись',
    description:
      'Легко записывайтесь на услуги онлайн в любое удобное для вас время.',
  },
  {
    icon: BookOpen,
    title: 'Экспертные советы',
    description:
      'Получайте профессиональные рекомендации по уходу за вашими питомцами.',
  },
  {
    icon: MessageCircle,
    title: 'Сообщество',
    description:
      'Общайтесь с другими владельцами животных, делитесь опытом и находите друзей.',
  },
]

const cardVariants: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    y: 0,
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}

const FeatureCard: React.FC<Feature> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-all"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
    >
      <Icon className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
          Почему выбирают нас
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
