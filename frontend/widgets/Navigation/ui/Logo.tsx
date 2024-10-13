import Link from 'next/link'
import { PawPrint } from 'lucide-react'

export function Logo() {
  return (
    <Link
      className="flex items-center justify-center transition-opacity hover:opacity-80"
      href="#"
      aria-label="PetCare Portal"
    >
      <PawPrint className="h-6 w-6 text-primary" />
      <span className="ml-2 text-lg font-semibold">PetCare Portal</span>
    </Link>
  )
}
