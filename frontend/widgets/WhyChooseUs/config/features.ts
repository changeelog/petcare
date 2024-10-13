import { Calendar, BookOpen, MessageCircle } from 'lucide-react';
import { Feature } from '../model/types';

export const features: Feature[] = [
  {
    icon: Calendar,
    title: 'Удобная запись',
    description: 'Легко записывайтесь на услуги онлайн в любое удобное для вас время.',
  },
  {
    icon: BookOpen,
    title: 'Экспертные советы',
    description: 'Получайте профессиональные рекомендации по уходу за вашими питомцами.',
  },
  {
    icon: MessageCircle,
    title: 'Сообщество',
    description: 'Общайтесь с другими владельцами животных, делитесь опытом и находите друзей.',
  },
]
