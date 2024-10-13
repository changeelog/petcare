import { motion, AnimatePresence } from 'framer-motion'
import { menuItems } from '../config/menuItems'
import { MenuItem } from './MenuItems'
import { menuVariants } from '../lib/animations'

interface MobileMenuProps {
  isOpen: boolean
  closeMenu: () => void
}

export function MobileMenu({ isOpen, closeMenu }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm h-screen"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.href}
                item={item}
                index={index}
                closeMenu={closeMenu}
              />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
