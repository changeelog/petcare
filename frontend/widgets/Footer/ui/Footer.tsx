import { FooterContact } from "./FooterContact";
import { FooterCopyright } from "./FooterCopyright";
import { FooterLogo } from "./FooterLogo";
import { FooterNavLinks } from "./FooterNavLinks";
import { FooterSocialLinks } from "./FooterSocialLinks";

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
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
