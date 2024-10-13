import { Zap, PawPrint, ChevronDown } from 'lucide-react'
import { SearchCategory } from '../model/types'

export const searchCategories: SearchCategory[] = [
  { id: 'all', name: 'Все', icon: Zap },
  { id: 'services', name: 'Услуги', icon: PawPrint },
  { id: 'tips', name: 'Советы', icon: ChevronDown },
  { id: 'vets', name: 'Ветеринары', icon: PawPrint },
]
