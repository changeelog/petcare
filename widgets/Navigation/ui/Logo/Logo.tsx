import Link from 'next/link'
import { PawPrint } from 'lucide-react'

export function Logo() {
  return (
    <Link
      className="group inline-flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
      href="/"
      aria-label="PetCare Portal - Home"
    >
      <PawPrint
        className="h-6 w-6 text-primary transition-transform group-hover:scale-110 group-focus:scale-110"
        aria-hidden="true"
      />
      <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary group-focus:text-primary">
        PetCare Portal
      </span>
    </Link>
  )
}
