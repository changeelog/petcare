'use client'

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, PawPrint, X, ChevronDown, Zap } from 'lucide-react'
import { useKeyPress } from '@/hooks/useKeyPress'
import { useDebounce } from '@/hooks/useDebounce'
import { useClickOutside } from '@/hooks/useClickOutside'

type SearchCategory = {
  id: string
  name: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

type SearchResult = {
  id: number
  title: string
  category: string
}

const searchCategories: SearchCategory[] = [
  { id: 'all', name: 'Все', icon: Zap },
  { id: 'services', name: 'Услуги', icon: PawPrint },
  { id: 'tips', name: 'Советы', icon: ChevronDown },
  { id: 'vets', name: 'Ветеринары', icon: PawPrint },
]

const MotionButton = motion(Button)

const searchVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
}

const resultVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
}

export function HeroSection(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const searchModalRef = useRef<HTMLDivElement>(null)

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 300)

  const closeSearch = useCallback((): void => {
    setIsOpen(false)
    setSearchQuery('')
    setSelectedCategory('all')
    setSearchResults([])
    setSelectedResultIndex(-1)
  }, [])

  const fetchSearchResults = useCallback(
    async (query: string, category: string): Promise<void> => {
      setIsLoading(true)
      try {
        // Здесь будет реальный запрос к API
        await new Promise((resolve) => setTimeout(resolve, 750)) // Имитация задержки сети
        const mockResults: SearchResult[] = [
          { id: 1, title: 'Груминг собак', category: 'services' },
          { id: 2, title: 'Как ухаживать за котенком', category: 'tips' },
          { id: 3, title: 'Др. Иванов - ветеринар', category: 'vets' },
        ]
        const filteredResults = mockResults.filter(
          (result) =>
            (category === 'all' || result.category === category) &&
            result.title.toLowerCase().includes(query.toLowerCase()),
        )
        setSearchResults(filteredResults)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  useEffect(() => {
    if (debouncedSearchQuery.length >= 2) {
      fetchSearchResults(debouncedSearchQuery, selectedCategory)
    } else {
      setSearchResults([])
    }
  }, [debouncedSearchQuery, selectedCategory, fetchSearchResults])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      inputRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useKeyPress('k', (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey) {
      event.preventDefault()
      setIsOpen((prev) => !prev)
    }
  })

  useKeyPress('Escape', () => isOpen && closeSearch())

  useKeyPress('ArrowDown', (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault()
      if (searchResults.length > 0) {
        setSelectedResultIndex((prev) => (prev + 1) % searchResults.length)
      }
    }
  })

  useKeyPress('ArrowUp', (event: KeyboardEvent) => {
    if (isOpen) {
      event.preventDefault()
      if (searchResults.length > 0) {
        setSelectedResultIndex((prev) =>
          prev <= 0 ? searchResults.length - 1 : prev - 1,
        )
      }
    }
  })

  useKeyPress('Enter', () => {
    if (isOpen && selectedResultIndex !== -1) {
      handleResultSelect(searchResults[selectedResultIndex])
    }
  })

  useClickOutside(searchModalRef, closeSearch)

  const handleResultSelect = useCallback(
    (result: SearchResult): void => {
      console.log('Выбран результат:', result)
      // Здесь будет логика обработки выбранного результата
      // Логика особой сложной быть не должна, фактически любой результат поисковой выдачи является кликабельной ссылкой при нажатии на которую мы просто переходим на другую страницу
      closeSearch()
    },
    [closeSearch],
  )

  const handleCategoryChange = useCallback((categoryId: string): void => {
    setSelectedCategory(categoryId)
    setSelectedResultIndex(-1)
  }, [])

  const renderSearchResults = useMemo(() => {
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
      return searchResults.map((result, index) => (
        <motion.div
          key={result.id}
          variants={resultVariants}
          className={`p-3 rounded-md cursor-pointer transition-colors ${
            index === selectedResultIndex
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted'
          }`}
          onClick={() => handleResultSelect(result)}
          onKeyDown={(e) => e.key === 'Enter' && handleResultSelect(result)}
          tabIndex={0}
          role="option"
          aria-selected={index === selectedResultIndex}
        >
          <p className="font-medium">{result.title}</p>
          <p className="text-sm text-muted-foreground">
            {searchCategories.find((cat) => cat.id === result.category)?.name}
          </p>
        </motion.div>
      ))
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
  }, [
    isLoading,
    searchResults,
    selectedResultIndex,
    searchQuery,
    handleResultSelect,
  ])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center space-y-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <PawPrint
              className="h-16 w-16 text-primary"
              aria-hidden="true"
            />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Добро пожаловать в{' '}
              <span className="text-primary">PetCare Portal</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Ваш надежный помощник в заботе о питомцах. Найдите лучшие услуги,
              получите советы экспертов и общайтесь с другими владельцами
              животных.
            </p>
          </div>
          <MotionButton
            onClick={() => setIsOpen(true)}
            className="w-full max-w-md justify-between text-left font-normal"
            variant="outline"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
          >
            <span className="inline-flex items-center">
              <Search
                className="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              Поиск услуг, советов...
            </span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </MotionButton>
        </motion.div>

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
                ref={searchModalRef}
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
                <div className="space-y-4">
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
                    <MotionButton
                      variant="ghost"
                      size="icon"
                      onClick={closeSearch}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Закрыть поиск"
                    >
                      <X
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </MotionButton>
                  </div>
                  <div
                    className="flex space-x-2 overflow-x-auto pb-2"
                    role="tablist"
                  >
                    {searchCategories.map((category) => (
                      <MotionButton
                        key={category.id}
                        variant={
                          selectedCategory === category.id
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => handleCategoryChange(category.id)}
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="tab"
                        aria-selected={selectedCategory === category.id}
                        aria-controls={`search-results-${category.id}`}
                      >
                        <category.icon
                          className="w-4 h-4 mr-2"
                          aria-hidden="true"
                        />
                        {category.name}
                      </MotionButton>
                    ))}
                  </div>
                  <motion.div
                    ref={resultsRef}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } },
                    }}
                    className="mt-4 space-y-2 max-h-[300px] overflow-y-auto"
                    role="listbox"
                    id={`search-results-${selectedCategory}`}
                    aria-label="Результаты поиска"
                  >
                    {renderSearchResults}
                  </motion.div>
                  <div className="mt-4 text-xs text-muted-foreground flex justify-between items-center">
                    <span>
                      <kbd className="px-1 py-0.5 text-xs border rounded">
                        ↑↓
                      </kbd>{' '}
                      для навигации,{' '}
                      <kbd className="px-1 py-0.5 text-xs border rounded">
                        Enter
                      </kbd>{' '}
                      для выбора
                    </span>
                    <kbd className="px-1 py-0.5 text-xs border rounded">
                      Esc
                    </kbd>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
