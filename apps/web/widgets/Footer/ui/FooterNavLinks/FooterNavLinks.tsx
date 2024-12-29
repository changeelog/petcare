import Link from 'next/link'
import { quickLinks } from '../../config/footerLinks'

export function FooterNavLinks() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Быстрые ссылки</h3>
      <nav className="flex flex-col space-y-2">
        {quickLinks.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
