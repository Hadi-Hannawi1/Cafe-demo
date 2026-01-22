import Hero from '@/components/Hero'
import FeaturedDishes from '@/components/FeaturedDishes'
import About from '@/components/About'
import { Coffee, QrCode, MapPin } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                <Coffee className="w-8 h-8 sm:w-10 sm:h-10 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-charcoal">Café Artisanal</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                Grains sélectionnés avec soin, torréfiés localement pour une expérience café exceptionnelle.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary transition-all duration-300">
                <QrCode className="w-8 h-8 sm:w-10 sm:h-10 text-secondary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-charcoal">Commande QR</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                Scannez, commandez, savourez. Notre système de commande moderne pour une expérience sans contact.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-charcoal">Cœur du Marais</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                Idéalement situé au 5 Rue Saint-Martin, au cœur du quartier artistique de Paris.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedDishes />
      <About />

      {/* CTA Section */}
<section className="py-24 bg-charcoal text-white relative overflow-hidden">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
  </div>
  
  <div className="container mx-auto px-4 text-center relative z-10">
    <h2 className="text-5xl font-serif font-bold mb-6">Prêt à Découvrir?</h2>
    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
      Rejoignez-nous pour une expérience culinaire unique avec notre système de commande moderne.
    </p>
    
    {/* Demo Links */}
    <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
      <a
        href="/order?table=1"
        className="px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
      >
        🍽️ Commander (Table 1)
      </a>
      <a
        href="/admin/kitchen"
        className="px-6 py-4 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
      >
        👨‍🍳 Cuisine (Admin)
      </a>
      <a
        href="/admin/qr-generator"
        className="px-6 py-4 bg-accent hover:bg-accent/90 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
      >
        📱 Générateur QR
      </a>
    </div>
    
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a 
        href="/notre-carte" 
        className="px-8 py-4 bg-white text-charcoal hover:bg-gray-100 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
      >
        Voir Notre Carte
      </a>
    </div>
  </div>
</section>

    </>
  )
}
