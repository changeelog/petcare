'use client'

import { usePetCareTips } from '@/hooks/usePetCareTips'
import { SearchAndFilter } from '@/components/petcaretipss/SearchAndFilter'
import { TipList } from '@/components/petcaretipss/TipList'
import { TipDetail } from '@/components/petcaretipss/TipDetail'

export default function PetCareTips() {
  const {
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
  } = usePetCareTips()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Советы по уходу за питомцами</h1>
      {selectedTip ? (
        <TipDetail
          tip={selectedTip}
          onBack={() => setSelectedTip(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(selectedTip.id)}
        />
      ) : (
        <>
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
          <TipList
            tips={filteredTips}
            onSelect={setSelectedTip}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        </>
      )}
    </div>
  )
}
