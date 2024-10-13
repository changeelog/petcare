import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { socialLinks } from '../config/footerLinks'

export function FooterSocialLinks() {
  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ href, icon, label }) => (
        <Link
          key={label}
          href={href}
          className="text-gray-400 hover:text-primary transition-colors"
          aria-label={label}
        >
          {icon === 'Facebook' && <Facebook size={20} />}
          {icon === 'Twitter' && <Twitter size={20} />}
          {icon === 'Instagram' && <Instagram size={20} />}
        </Link>
      ))}
    </div>
  )
}
