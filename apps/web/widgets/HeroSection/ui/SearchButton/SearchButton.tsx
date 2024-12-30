import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@pc/ui/components/ui/Button'
import { Search } from 'lucide-react'

interface SearchButtonProps {
  onClick: () => void
}

export const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex justify-center mt-2"
    >
      <Button
        onClick={onClick}
        className="w-full max-w-md justify-between text-left font-normal"
        variant="outline"
        aria-haspopup="dialog"
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
      </Button>
    </motion.div>
  )
}
