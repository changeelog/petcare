import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'

interface ConfirmPasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string[]
}

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
}

export function ConfirmPasswordInput({
  value,
  onChange,
  error,
}: ConfirmPasswordInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
      <motion.div
        variants={inputVariants}
        whileFocus="focus"
      >
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={value}
          onChange={onChange}
          className={error ? 'border-red-500' : ''}
        />
      </motion.div>
      {error &&
        error.map((err, index) => (
          <p
            key={index}
            className="text-red-500 text-sm"
          >
            {err}
          </p>
        ))}
    </div>
  )
}
