'use client'

import React, { useState } from 'react'
import { HeroContent } from './HeroContent'
import { SearchButton } from './SearchButton'
import { SearchModal } from './SearchModal'
import { useKeyPress } from '@/hooks/useKeyPress'

export const HeroSection: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)

  useKeyPress('k', (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey) {
      event.preventDefault()
      setIsSearchOpen((prev) => !prev)
    }
  })

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-background/80">
      <div className="container px-4 md:px-6 mx-auto relative">
        <HeroContent />
        <SearchButton onClick={openSearch} />
        <SearchModal
          isOpen={isSearchOpen}
          onClose={closeSearch}
        />
      </div>
    </section>
  )
}
