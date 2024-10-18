import { Mail } from 'lucide-react'

export function FooterContact() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Контакты</h3>
      <address className="not-italic text-sm text-gray-600 dark:text-gray-400 space-y-2">
        <p>ул. Милашек Котятковых, 123</p>
        <p>г. Москва, 123456</p>
        <p className="flex items-center">
          <Mail
            size={16}
            className="mr-2"
          />
          <a
            href="mailto:info@petcare.com"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            info@petcare.com
          </a>
        </p>
      </address>
    </div>
  )
}
