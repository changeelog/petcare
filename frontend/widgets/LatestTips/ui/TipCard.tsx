import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/ui/Card'
import { Button } from '@/shared/ui/Button'
import { Tip } from '../model/types'

interface TipCardProps {
  tip: Tip
}

export function TipCard({ tip }: TipCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative w-full pt-[56.25%] overflow-hidden">
          <Image
            src={tip.image}
            alt={tip.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-xl font-semibold mb-2 text-gray-800">
          {tip.title}
        </CardTitle>
        <p className="text-sm text-gray-600">{tip.excerpt}</p>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          variant="outline"
          className="w-full text-sm font-medium transition-colors duration-200 hover:bg-gray-100"
        >
          Читать далее
        </Button>
      </CardFooter>
    </Card>
  )
}
