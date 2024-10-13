import { Mail } from 'lucide-react'

export function FooterContact() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Контакты</h3>
      <address className="not-italic">
        <p className="text-sm mb-2">ул. Милашек Котятковых, 123</p>
        <p className="text-sm mb-2">г. Москва, 123456</p>
        <p className="text-sm mb-2 flex items-center">
          <Mail
            size={16}
            className="mr-2"
          />
          <a
            href="mailto:info@petcare.com"
            className="hover:text-primary transition-colors"
          >
            info@petcare.com
          </a>
        </p>
      </address>
    </div>
  )
}
