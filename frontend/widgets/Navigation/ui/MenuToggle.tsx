import { motion } from 'framer-motion'
import { X, Menu } from 'lucide-react'

interface MenuToggleProps {
  isOpen: boolean
  toggle: () => void
}

export function MenuToggle({ isOpen, toggle }: MenuToggleProps) {
  return (
    <motion.button
      className="z-50"
      onClick={toggle}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
      whileTap={{ scale: 0.95 }}
    >
      {isOpen ? <X /> : <Menu />}
    </motion.button>
  )
}
