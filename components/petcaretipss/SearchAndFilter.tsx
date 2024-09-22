import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react'

interface SearchAndFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  activeCategory: string
  setActiveCategory: (category: string) => void
  categories: string[]
}

export function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
}: SearchAndFilterProps) {
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск советов"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="Все"
        className="mb-6"
      >
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  )
}
