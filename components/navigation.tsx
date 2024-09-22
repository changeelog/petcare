"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PawPrint, X, Menu } from 'lucide-react'
import Link from 'next/link'

const menuVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
}

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 10 },
}

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = useMemo(
    () => [
      { text: 'Профиль', href: '#profile' },
      { text: 'Услуги', href: '#services' },
      { text: 'Советы', href: '#tips' },
      { text: 'Форум', href: '#forum' },
    ],
    [],
  )

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])

  useEffect(() => {
    const handleResize = () => window.innerWidth > 768 && setIsMenuOpen(false)
    const handleEscape = (e: { key: string }) =>
      e.key === 'Escape' && setIsMenuOpen(false)

    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            className="flex items-center justify-center transition-opacity hover:opacity-80"
            href="#"
            aria-label="PetCare Portal"
          >
            <PawPrint className="h-6 w-6 text-primary" />
            <span className="ml-2 text-lg font-semibold">PetCare Portal</span>
          </Link>
          <motion.button
            className="z-50"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </motion.button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
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
                <motion.div
                  key={item.href}
                  variants={itemVariants}
                  custom={index}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    className="block py-3 text-xl font-medium transition-colors hover:text-primary"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
