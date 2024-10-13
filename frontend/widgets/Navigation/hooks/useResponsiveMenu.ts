import { useEffect } from 'react'

export function useResponsiveMenu(isMenuOpen: boolean, closeMenu: () => void) {
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined' && window.innerWidth > 768) {
        closeMenu()
      }
    }

    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      document.addEventListener('keydown', handleEscape)

      return () => {
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [closeMenu])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMenuOpen ? 'hidden' : ''
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [isMenuOpen])
}
