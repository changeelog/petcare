import { motion } from 'framer-motion'
import Link from 'next/link'
import { itemVariants } from '../../lib/animations'

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
      className="w-full"
    >
      <Link
        className="block w-full py-3 text-xl font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
        href={item.href}
        onClick={closeMenu}
      >
        {item.text}
      </Link>
    </motion.div>
  )
}
