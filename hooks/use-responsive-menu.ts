import { useEffect } from 'react'

function useResponsiveMenu(
  isMenuOpen: boolean,
  closeMenu: () => void,
) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        closeMenu()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen, closeMenu])
}

export { useResponsiveMenu }
