import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { searchCategories } from '../config/searchCategories'

interface SearchCategoriesProps {
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export const SearchCategories: React.FC<SearchCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div
      className="flex space-x-2 overflow-x-auto pb-2 mt-4"
      role="tablist"
    >
      {searchCategories.map((category) => (
        <motion.div
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex-shrink-0"
            role="tab"
            aria-selected={selectedCategory === category.id}
            aria-controls={`search-results-${category.id}`}
          >
            <category.icon
              className="w-4 h-4 mr-2"
              aria-hidden="true"
            />
            {category.name}
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
