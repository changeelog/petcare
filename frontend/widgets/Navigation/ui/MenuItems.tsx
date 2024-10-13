import { motion } from 'framer-motion'
import Link from 'next/link'
import { itemVariants } from '../lib/animations'

interface MenuItemProps {
  item: { text: string; href: string }
  index: number
  closeMenu: () => void
}

export function MenuItem({ item, index, closeMenu }: MenuItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Link
        className="block py-3 text-xl font-medium transition-colors hover:text-primary"
        href={item.href}
        onClick={closeMenu}
      >
        {item.text}
      </Link>
    </motion.div>
  )
}
