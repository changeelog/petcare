import { Input } from '@pc/ui/components/ui/Input'
import { Label } from '@pc/ui/components/ui/Label'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string[]
}

const inputVariants = {
  focus: { scale: 1.02, transition: { duration: 0.2 } },
}

const strengthColors = ['#ff4d4f', '#faad14', '#52c41a', '#1890ff']
const strengthLabels = ['Слабый', 'Средний', 'Хороший', 'Сильный']

export function PasswordInput({ value, onChange, error }: PasswordInputProps) {
  const [passwordStrength, setPasswordStrength] = useState(0)

  useEffect(() => {
    calculatePasswordStrength(value)
  }, [value])

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++
    if (password.match(/\d/)) strength++
    if (password.match(/[^a-zA-Z\d]/)) strength++
    setPasswordStrength(strength)
  }

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
      {error &&
        error.map((err, index) => (
          <p
            key={index}
            className="text-red-500 text-sm"
          >
            {err}
          </p>
        ))}
      <div className="mt-2">
        <Label>Сложность пароля</Label>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(passwordStrength / 4) * 100}%` }}
          style={{
            height: 4,
            backgroundColor: strengthColors[passwordStrength - 1] || '#d9d9d9',
            transition: 'width 0.3s, background-color 0.3s',
          }}
        />
        <p className="text-sm text-muted-foreground mt-1">
          {value
            ? strengthLabels[passwordStrength - 1] || 'Очень слабый'
            : 'Введите пароль'}
        </p>
      </div>
    </div>
  )
}
