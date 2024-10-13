import { useState, useEffect } from 'react'
import { useKeyPress } from '@/hooks/useKeyPress'
import { SearchResult } from '../model/types'

export const useSearchKeyboardNavigation = (
  isOpen: boolean,
  searchResults: SearchResult[],
  onResultSelect: (result: SearchResult) => void,
  onClose: () => void,
) => {
  const [selectedResultIndex, setSelectedResultIndex] = useState<number>(-1)

  useEffect(() => {
    setSelectedResultIndex(-1)
  }, [searchResults])

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
      onResultSelect(searchResults[selectedResultIndex])
    }
  })

  useKeyPress('Escape', () => {
    if (isOpen) {
      onClose()
    }
  })

  return { selectedResultIndex }
}
