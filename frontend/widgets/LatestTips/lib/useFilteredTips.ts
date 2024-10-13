import { useState, useCallback } from 'react'
import { latestTips } from '../config/latestTips'

export function useFilteredTips() {
  const [filter, setFilter] = useState('all')

  const filteredTips = useCallback(
    () =>
      filter === 'all'
        ? latestTips
        : latestTips.filter((tip) => tip.category === filter),
    [filter],
  )

  return { filter, setFilter, filteredTips: filteredTips() }
}
