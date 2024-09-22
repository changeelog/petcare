import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { BookmarkPlus, Share2 } from 'lucide-react'
import { Tip } from '@/data/tips'
import { shareTip } from '@/lib/share'

interface TipCardProps {
  tip: Tip
  onSelect: (tip: Tip) => void
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
}

export function TipCard({
  tip,
  onSelect,
  onToggleFavorite,
  isFavorite,
}: TipCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="flex flex-col h-full">
        <CardHeader>
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <CardTitle>{tip.title}</CardTitle>
          <span className="mt-1">
            {' '}
            {/* Changed from CardDescription to span */}
            <Badge>{tip.category}</Badge>
          </span>
        </CardHeader>
        <CardContent>
          <p>{tip.excerpt}</p>
        </CardContent>
        <CardFooter className="mt-auto flex justify-between">
          <Button
            variant="outline"
            onClick={() => onSelect(tip)}
          >
            Читать далее
          </Button>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => onToggleFavorite(tip.id)}
                  >
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {isFavorite
                      ? 'Удалить из избранного'
                      : 'Добавить в избранное'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={() => shareTip(tip)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Поделиться советом</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
