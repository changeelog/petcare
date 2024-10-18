import { motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'

interface MenuToggleProps {
  isOpen: boolean
  toggle: () => void
}

export function MenuToggle({ isOpen, toggle }: MenuToggleProps) {
  return (
    <motion.button
      className="z-50 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? (
        <X
          className="h-6 w-6"
          aria-hidden="true"
        />
      ) : (
        <Menu
          className="h-6 w-6"
          aria-hidden="true"
        />
      )}
    </motion.button>
  )
}
