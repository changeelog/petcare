import type { Metadata } from 'next'
import './globals.css'
import { fonts } from './fonts'
import { Toaster } from '@/shared/ui/Toaster'

export const metadata: Metadata = {
  title: 'PetCare Portal',
  description: 'Ваш надежный помощник в заботе о питомцах',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${fonts.minSans.variable} ${fonts.geistSans.variable} ${fonts.geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
