import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchInput } from './SearchInput'
import { SearchCategories } from './SearchCategories'
import { SearchResults } from './SearchResults'
import { useSearch } from '../lib/useSearch'
import { useSearchKeyboardNavigation } from '../lib/useSearchKeyboardNavigation'
import { SearchResult } from '../model/types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const searchVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchResults,
    isLoading,
  } = useSearch()

  const handleResultSelect = (result: SearchResult) => {
    console.log('Selected result:', result)
    onClose()
  }

  const { selectedResultIndex } = useSearchKeyboardNavigation(
    isOpen,
    searchResults,
    handleResultSelect,
    onClose,
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-label="Поиск"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={searchVariants}
            transition={{
              duration: 0.3,
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="w-full max-w-lg rounded-lg bg-background shadow-lg border p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onClose={onClose}
            />
            <SearchCategories
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <SearchResults
              searchResults={searchResults}
              isLoading={isLoading}
              selectedResultIndex={selectedResultIndex}
              onResultSelect={handleResultSelect}
              searchQuery={searchQuery}
            />
            <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
              <span>
                <kbd className="px-1 py-0.5 text-xs border rounded">↑↓</kbd> для
                навигации,{' '}
                <kbd className="px-1 py-0.5 text-xs border rounded">Enter</kbd>{' '}
                для выбора
              </span>
              <kbd className="px-1 py-0.5 text-xs border rounded">Esc</kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
