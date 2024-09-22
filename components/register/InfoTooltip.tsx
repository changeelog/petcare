import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

export function InfoTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-full"
        >
          <Info className="h-4 w-4" />
          <span className="sr-only">Информация о регистрации</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          Регистрация позволит вам получить доступ ко всем функциям PetCare
          Portal
        </p>
      </TooltipContent>
    </Tooltip>
  )
}
