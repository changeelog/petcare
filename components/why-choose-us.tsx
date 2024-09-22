import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, BookOpen, MessageCircle } from 'lucide-react'

const features = [
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

const FeatureCard = ({ icon: Icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 ease-in-out"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Icon className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

export function WhyChooseUs() {
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
