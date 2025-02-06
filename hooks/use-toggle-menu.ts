import { useCallback, useState } from 'react'

function useToggleMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return { isMenuOpen, toggleMenu, closeMenu }
}

export { useToggleMenu }
