import { Checkbox } from '@pc/ui/components/ui/Checkbox'
import { Label } from '@pc/ui/components/ui/Label'

interface RememberMeCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function RememberMeCheckbox({
  checked,
  onCheckedChange,
}: RememberMeCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="rememberMe"
        name="rememberMe"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label
        htmlFor="rememberMe"
        className="text-sm"
      >
        Запомнить меня
      </Label>
    </div>
  )
}
