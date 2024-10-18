import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { motion } from 'framer-motion'

interface EmailInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string[]
}

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
}

export function EmailInput({ value, onChange, error }: EmailInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <motion.div
        variants={inputVariants}
        whileFocus="focus"
      >
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
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
