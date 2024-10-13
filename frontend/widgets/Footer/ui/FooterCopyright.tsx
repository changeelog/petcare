import Link from 'next/link'
import { legalLinks } from '../config/footerLinks'

export function FooterCopyright() {
  return (
    <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
        © {new Date().getFullYear()} PetCare Portal. Все права защищены.
      </p>
      <nav className="flex gap-4">
        {legalLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="text-sm hover:text-primary transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
