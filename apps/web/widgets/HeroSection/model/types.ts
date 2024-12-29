import { FC, SVGProps } from 'react'

export type SearchCategory = {
  id: string
  name: string
  icon: FC<SVGProps<SVGSVGElement>>
}

export type SearchResult = {
  id: number
  title: string
  category: string
}
