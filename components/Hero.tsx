'use client'

import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>
      </div>

      {/* Artistic Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 sm:right-20 w-48 sm:w-96 h-48 sm:h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-4 sm:mb-6 text-balance leading-tight">
          Votre Café
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 mb-3 sm:mb-4 font-light">
          Où la Tradition Rencontre la Modernité
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
          Découvrez une expérience culinaire unique avec notre système de commande moderne et notre cuisine authentique.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <a
            href="/commander"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold inline-flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-2xl text-sm sm:text-base"
          >
            Commander via QR
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <a
            href="/notre-carte"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl text-sm sm:text-base"
          >
            Découvrir la Carte
          </a>
        </div>
      </div>
    </section>
  )
}
