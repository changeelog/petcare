import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from '$/hooks/useDebounce'
import { SearchResult } from '../model/types'

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 300)

  const fetchSearchResults = useCallback(
    async (query: string, category: string): Promise<void> => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 750))
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

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    searchResults,
    isLoading,
  }
}
