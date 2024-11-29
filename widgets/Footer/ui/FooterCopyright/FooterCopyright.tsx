import Link from 'next/link'
import { legalLinks } from '../../config/footerLinks'

export function FooterCopyright() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
        © {new Date().getFullYear()} PetCare Portal. Все права защищены.
      </p>
      <nav className="flex gap-4">
        {legalLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
