'use client'

import React from 'react'
import { Logo } from './Logo'
import { MenuToggle } from './MenuToggle'
import { MobileMenu } from './MobileMenu'
import { useMenuToggle } from '../hooks/useMenuToggle'
import { useResponsiveMenu } from '../hooks/useResponsiveMenu'

export function Navigation() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuToggle()
  useResponsiveMenu(isMenuOpen, closeMenu)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <MenuToggle
            isOpen={isMenuOpen}
            toggle={toggleMenu}
          />
        </div>
      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        closeMenu={closeMenu}
      />
    </header>
  )
}
