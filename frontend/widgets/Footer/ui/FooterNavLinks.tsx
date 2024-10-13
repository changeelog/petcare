import Link from 'next/link'
import { quickLinks } from '../config/footerLinks'

export function FooterNavLinks() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
      <nav className="flex flex-col space-y-2">
        {quickLinks.map(({ href, label }) => (
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
