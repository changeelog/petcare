import { useState, useMemo } from 'react'
import { Tip, tips, categories } from '../data/tips'

export function usePetCareTips() {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('Все')
  const [favorites, setFavorites] = useState<number[]>([])

  const filteredTips = useMemo(() => {
    return tips.filter(
      (tip) =>
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeCategory === 'Все' || tip.category === activeCategory),
    )
  }, [searchTerm, activeCategory])

  const toggleFavorite = (tipId: number) => {
    setFavorites((prev) =>
      prev.includes(tipId)
        ? prev.filter((id) => id !== tipId)
        : [...prev, tipId],
    )
  }

  return {
    selectedTip,
    setSelectedTip,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    favorites,
    toggleFavorite,
    filteredTips,
    categories,
  }
}
