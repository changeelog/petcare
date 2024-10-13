import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArrowLeft, ThumbsUp, BookmarkPlus, Share2 } from 'lucide-react'
import { Tip } from '@/data/tips'
import { shareTip } from '@/lib/share'

interface TipDetailProps {
  tip: Tip
  onBack: () => void
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
}

export function TipDetail({
  tip,
  onBack,
  onToggleFavorite,
  isFavorite,
}: TipDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к списку
          </Button>
          <CardTitle>{tip.title}</CardTitle>
          <CardDescription>
            <Badge>{tip.category}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <p>{tip.content}</p>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Нравится ({tip.likes})
          </Button>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
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
                    variant="outline"
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
