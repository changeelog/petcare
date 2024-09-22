import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">PetCare Portal</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Заботимся о ваших питомцах с любовью и профессионализмом.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                О нас
              </Link>
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                Услуги
              </Link>
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                Советы
              </Link>
              <Link
                className="text-sm hover:text-primary transition-colors"
                href="#"
              >
                Форум
              </Link>
            </nav>
          </div>
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
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            © 2024 PetCare Portal. Все права защищены.
          </p>
          <nav className="flex gap-4">
            <Link
              className="text-sm hover:text-primary transition-colors"
              href="#"
            >
              Условия использования
            </Link>
            <Link
              className="text-sm hover:text-primary transition-colors"
              href="#"
            >
              Политика конфиденциальности
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
