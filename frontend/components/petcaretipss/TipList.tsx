import { motion, AnimatePresence } from 'framer-motion'
import { TipCard } from './TipCard'
import { Tip } from '@/data/tips'

interface TipListProps {
  tips: Tip[]
  onSelect: (tip: Tip) => void
  onToggleFavorite: (id: number) => void
  favorites: number[]
}

export function TipList({
  tips,
  onSelect,
  onToggleFavorite,
  favorites,
}: TipListProps) {
  return (
    <AnimatePresence>
      <motion.div
        layout
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {tips.map((tip) => (
          <TipCard
            key={tip.id}
            tip={tip}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favorites.includes(tip.id)}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}
