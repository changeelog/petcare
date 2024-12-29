import { Variants } from 'framer-motion'

export const menuVariants: Variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
}

export const itemVariants: Variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 10 },
}
