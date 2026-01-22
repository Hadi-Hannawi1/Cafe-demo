'use client'

import { motion } from 'framer-motion'
import { Palette, Heart, Users } from 'lucide-react'

export default function About() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070"
                alt="Café des Arts Interior"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent"></div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 artistic-gradient rounded-full blur-3xl opacity-30"></div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-semibold uppercase tracking-wide text-sm">Notre Histoire</span>
            <h2 className="text-5xl font-serif font-bold mt-2 mb-6 text-charcoal">
              L'Art de Vivre Parisien
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Niché au cœur du Marais, Café des Arts est né de la passion pour l'art, la gastronomie et la convivialité. Depuis notre ouverture, nous cultivons un espace où créativité et saveurs se rencontrent.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Notre café est bien plus qu'un simple lieu de restauration : c'est un carrefour culturel où artistes, écrivains et amoureux de la vie se retrouvent autour d'une cuisine française authentique et d'un café exceptionnel.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2 text-charcoal">Ambiance Artistique</h3>
                  <p className="text-gray-600">
                    Expositions mensuelles d'artistes locaux, concerts intimistes et soirées poésie.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2 text-charcoal">Cuisine Passionnée</h3>
                  <p className="text-gray-600">
                    Recettes traditionnelles françaises préparées avec des ingrédients frais et locaux.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2 text-charcoal">Communauté Chaleureuse</h3>
                  <p className="text-gray-600">
                    Un lieu de rencontre où chacun se sent chez soi, qu'il soit du quartier ou de passage.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/notre-histoire"
                className="inline-block px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
              >
                En Savoir Plus
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
