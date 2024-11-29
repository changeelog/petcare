import { useEffect, useCallback } from 'react'

export const useKeyPress = (
  targetKey: string,
  handler: (event: KeyboardEvent) => void,
  element: HTMLElement | Window | null = null,
): void => {
  const handleKeyPress = useCallback(
    (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === targetKey) {
        handler(event)
      }
    },
    [targetKey, handler],
  )

  useEffect(() => {
    const targetElement =
      element || (typeof window !== 'undefined' ? window : null)

    if (targetElement) {
      targetElement.addEventListener('keydown', handleKeyPress)

      return () => {
        targetElement.removeEventListener('keydown', handleKeyPress)
      }
    }
  }, [element, handleKeyPress])
}
