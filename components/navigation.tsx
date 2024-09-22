import { useState, useEffect } from 'react'
import { PawPrint, X, Menu } from 'lucide-react'
import Link from 'next/link'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { text: 'Профиль', href: '#profile' },
    { text: 'Услуги', href: '#services' },
    { text: 'Советы', href: '#tips' },
    { text: 'Форум', href: '#forum' },
  ]

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 px-3 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto">
        <Link
          className="flex items-center justify-center"
          href="#"
          aria-label="PetCare Portal"
        >
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">PetCare Portal</span>
        </Link>
        <button
          className="md:hidden z-50"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Открыть меню"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row fixed md:relative inset-0 md:inset-auto bg-background md:bg-transparent p-4 md:p-0 gap-4 items-center justify-center`}
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              className="text-lg md:text-sm font-medium hover:text-primary transition-colors"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
