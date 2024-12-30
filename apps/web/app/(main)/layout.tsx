import React from 'react'
import { Navigation } from '$/widgets/Navigation'
import { Footer } from '$/widgets/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
