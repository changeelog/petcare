'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '../Logo/Logo'
import { MenuToggle } from '../MenuToggle/MenuToggle'
import { MobileMenu } from '../MobileMenu/MobileMenu'
import { useMenuToggle } from '../../hooks/useMenuToggle'
import { useResponsiveMenu } from '../../hooks/useResponsiveMenu'

export function Navigation() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuToggle()
  useResponsiveMenu(isMenuOpen, closeMenu)

  return (
    <motion.header
      className="fixed flex items-center top-0 left-0 right-0 z-50 bg-white/90 border-b backdrop-blur-sm w-full h-12"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex space-x-6">
            {/* Add desktop menu items here */}
          </nav>
          <MenuToggle
            isOpen={isMenuOpen}
            toggle={toggleMenu}
          />
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            isOpen={isMenuOpen}
            closeMenu={closeMenu}
          />
        )}
      </AnimatePresence>
    </motion.header>
  )
}
