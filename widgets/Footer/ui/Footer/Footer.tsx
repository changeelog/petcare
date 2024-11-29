import { FooterContact } from '../FooterContact/FooterContact'
import { FooterCopyright } from '../FooterCopyright'
import { FooterLogo } from '../FooterLogo/FooterLogo'
import { FooterNavLinks } from '../FooterNavLinks'
import { FooterSocialLinks } from '../FooterSocialLinks'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <FooterLogo />
            <FooterSocialLinks />
          </div>
          <FooterNavLinks />
          <FooterContact />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  )
}
