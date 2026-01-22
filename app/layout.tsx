import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Votre Café - Restaurant Moderne avec Commande QR',
  description: 'Site web moderne pour votre café-restaurant avec système de commande QR intégré. Solution clé en main pour restaurants, cafés et brasseries.',
  keywords: 'café, restaurant, commande QR, menu digital, site web restaurant',
  openGraph: {
    title: 'Votre Café - Solution Digitale Moderne',
    description: 'Site web et système de commande pour restaurants',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
