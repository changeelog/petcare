import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

export function ForgotPasswordPopover() {
  const [email, setEmail] = useState('')

  const handleResetPassword = () => {
    // Implement password reset logic here
    console.log('Reset password for:', email)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto text-sm"
        >
          Забыли пароль?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Восстановление пароля</h4>
          <p className="text-sm">
            Введите ваш email, и мы отправим вам инструкции по сбросу пароля.
          </p>
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={handleResetPassword}
          >
            Отправить инструкции
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
