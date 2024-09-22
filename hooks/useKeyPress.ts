import { useEffect, useCallback } from 'react'

export const useKeyPress = (
  targetKey: string,
  handler: (event: KeyboardEvent) => void,
  element: HTMLElement | Window = window,
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
    element.addEventListener('keydown', handleKeyPress)

    return () => {
      element.removeEventListener('keydown', handleKeyPress)
    }
  }, [element, handleKeyPress])
}
