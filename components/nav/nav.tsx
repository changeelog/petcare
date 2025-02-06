'use client'

import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { useToggleMenu } from '$/hooks/use-toggle-menu'
import { cva } from 'class-variance-authority'
import { AnimatePresence, motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { LogoWithText } from '../logo-text'

const NAVIGATION_ITEMS = [
  { href: '/features', label: 'Возможности' },
  { href: '/services', label: 'Услуги' },
  { href: '/forum', label: 'Форум' },
  { href: '/support', label: 'Поддержка' },
] as const

const navigationLinkVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-primary relative overflow-hidden',
        ghost: 'hover:bg-accent hover:text-accent-foreground px-4 py-2 relative overflow-hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface NavigationLinkProps
  extends ComponentProps<typeof Link>,
  VariantProps<typeof navigationLinkVariants> {
  children: React.ReactNode
  disableAnimation?: boolean
}

function NavigationLink({
  className,
  variant,
  children,
  disableAnimation = false,
  ...props
}: Readonly<NavigationLinkProps>) {
  if (disableAnimation) {
    return (
      <Link className={cn(navigationLinkVariants({ variant, className }))} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <Link className={cn(navigationLinkVariants({ variant, className }))} {...props}>
      <motion.div className="relative cursor-pointer" whileHover="hover" initial="initial">
        <motion.span
          className="block"
          variants={{
            initial: { y: 0 },
            hover: { y: -30 },
          }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.span>
        <motion.span
          className="absolute top-0 left-0"
          variants={{
            initial: { y: 30 },
            hover: { y: 0 },
          }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  )
}

function MobileMenuButton({ isOpen, onClick }: Readonly<{ isOpen: boolean, onClick: () => void }>) {
  const buttonVariants = {
    top: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: 45, y: 2 },
    },
    middle: {
      closed: { opacity: 1 },
      open: { opacity: 0 },
    },
    bottom: {
      closed: { rotate: 0, y: 0 },
      open: { rotate: -45, y: -2 },
    },
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="sm:hidden ml-auto rounded-full p-2 hover:bg-muted/50 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="sr-only">Открыть меню</span>
      <motion.div
        animate={isOpen ? 'open' : 'closed'}
        className="flex w-5 h-5 flex-col justify-center items-center"
      >
        <motion.span
          variants={buttonVariants.top}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="absolute w-4 h-0.5 bg-foreground"
        />
        <motion.span
          variants={buttonVariants.middle}
          transition={{ duration: 0.1 }}
          className="absolute w-4 h-0.5 bg-foreground"
        />
        <motion.span
          variants={buttonVariants.bottom}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="absolute w-4 h-0.5 bg-foreground"
        />
      </motion.div>
    </button>
  )
}

function Navigation() {
  const { isMenuOpen, toggleMenu, closeMenu } = useToggleMenu()
  useResponsiveMenu(isMenuOpen, closeMenu)
  const pathname = usePathname()

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <motion.header
        className="w-full"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="relative flex items-center justify-between h-14 px-6 rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-sm">
          <Link href="/">
            <LogoWithText />
          </Link>

          <nav className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center h-8 space-x-1 rounded-full px-1.5">
            {NAVIGATION_ITEMS.map(({ href, label }) => (
              <NavigationLink
                key={href}
                href={href}
                className={`
                  relative px-4 py-1.5 text-base font-medium rounded-full transition-all duration-200
                  ${pathname === href
                ? 'text-primary bg-background shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
              }
                `}
              >
                {label}
              </NavigationLink>
            ))}
          </nav>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden sm:block"
          >
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-xl transition-colors hover:bg-primary/90"
            >
              Войти
              <LogIn className="w-4 h-4 ml-2" />
            </Link>
          </motion.div>

          <MobileMenuButton isOpen={isMenuOpen} onClick={toggleMenu} />
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                onClick={closeMenu}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute top-20 inset-x-0 mx-auto bg-background border border-border/40 rounded-2xl shadow-lg overflow-hidden sm:hidden"
              >
                <nav className="flex flex-col p-4 space-y-2">
                  {NAVIGATION_ITEMS.map(({ href, label }) => (
                    <NavigationLink
                      key={href}
                      href={href}
                      className={`
                        px-4 py-2 text-sm font-medium rounded-lg transition-colors
                        ${pathname === href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:bg-muted/50'
                    }
                      `}
                      onClick={closeMenu}
                    >
                      {label}
                    </NavigationLink>
                  ))}
                  <div className="pt-2 mt-2 border-t border-border/40">
                    <Link
                      href="/login"
                      className="flex items-center w-full px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                      onClick={closeMenu}
                    >
                      Войти
                      <LogIn className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  )
}

export { Navigation }
