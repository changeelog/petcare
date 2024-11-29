import { useEffect, useCallback } from 'react'

const MOBILE_BREAKPOINT = 768

export function useResponsiveMenu(isMenuOpen: boolean, closeMenu: () => void) {
  const handleResize = useCallback(() => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      closeMenu()
    }
  }, [closeMenu])

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    },
    [closeMenu],
  )

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [handleResize, handleEscape])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])
}
