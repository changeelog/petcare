import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { inputVariants } from '@/lib/animation'

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">Пароль</Label>
      <motion.div
        variants={inputVariants}
        whileFocus="focus"
      >
        <Input
          id="password"
          name="password"
          type="password"
          value={value}
          onChange={onChange}
          className={error ? 'border-red-500' : ''}
        />
      </motion.div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
