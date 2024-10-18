import React, { useRef, useEffect } from 'react'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface SearchInputProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onClose: () => void
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  onClose,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex items-center space-x-2">
      <Search
        className="w-5 h-5 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        ref={inputRef}
        className="flex-1 border-none focus:ring-0 bg-transparent text-lg"
        placeholder="Поиск услуг, советов..."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Поисковый запрос"
      />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Закрыть поиск"
        >
          <X
            className="h-4 w-4"
            aria-hidden="true"
          />
        </Button>
      </motion.div>
    </div>
  )
}
