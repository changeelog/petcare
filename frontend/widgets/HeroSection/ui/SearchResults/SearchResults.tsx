import React from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { SearchResult } from '../../model/types'
import { searchCategories } from '../../config/searchCategories'

interface SearchResultsProps {
  searchResults: SearchResult[]
  isLoading: boolean
  selectedResultIndex: number
  onResultSelect: (result: SearchResult) => void
  searchQuery: string
}

const resultVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  searchResults,
  isLoading,
  selectedResultIndex,
  onResultSelect,
  searchQuery,
}) => {
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-4"
        aria-live="polite"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Search className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    )
  }

  if (searchResults.length > 0) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="mt-4 space-y-2 max-h-[300px] overflow-y-auto"
        role="listbox"
        aria-label="Результаты поиска"
      >
        {searchResults.map((result, index) => (
          <motion.div
            key={result.id}
            variants={resultVariants}
            className={`p-3 rounded-md cursor-pointer transition-colors ${
              index === selectedResultIndex
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            onClick={() => onResultSelect(result)}
            onKeyDown={(e) => e.key === 'Enter' && onResultSelect(result)}
            tabIndex={0}
            role="option"
            aria-selected={index === selectedResultIndex}
          >
            <p className="font-medium">{result.title}</p>
            <p className="text-sm text-muted-foreground">
              {searchCategories.find((cat) => cat.id === result.category)?.name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  if (searchQuery.length >= 2) {
    return (
      <motion.div
        variants={resultVariants}
        className="text-sm text-muted-foreground p-3"
        role="status"
        aria-live="polite"
      >
        Ничего не найдено
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={resultVariants}
      className="text-sm text-muted-foreground p-3"
      role="status"
      aria-live="polite"
    >
      Начните вводить для поиска...
    </motion.div>
  )
}
