'use client'

import { motion } from 'framer-motion'

export default function FeaturedDishes() {
  const dishes = [
    {
      name: "Bœuf Bourguignon",
      description: "Mijoté pendant 5 heures avec amour, accompagné de pommes de terre fondantes",
      price: "23.00€",
      image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070",
      badge: "Signature"
    },
    {
      name: "Confit de Canard",
      description: "Cuisse de canard confite maison, servie avec une salade de saison",
      price: "24.00€",
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=2013",
      badge: "Chef's Choice"
    },
    {
      name: "Tarte Tatin",
      description: "Notre célèbre tarte aux pommes caramélisées, servie tiède avec crème fraîche",
      price: "8.50€",
      image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=2065",
      badge: "Artisanal"
    }
  ]

  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold uppercase tracking-wide text-sm">Nos Spécialités</span>
          <h2 className="text-5xl font-serif font-bold mt-2 mb-4 text-charcoal">Plats d'Exception</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Chaque plat est préparé avec passion et les meilleurs ingrédients locaux
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-full shadow-lg">
                    {dish.badge}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-serif font-bold text-charcoal">{dish.name}</h3>
                  <span className="text-xl font-bold text-primary">{dish.price}</span>
                </div>
                <p className="text-gray-600 leading-relaxed">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="/notre-carte"
            className="inline-block px-8 py-4 bg-charcoal hover:bg-charcoal/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Voir la Carte Complète
          </a>
        </motion.div>
      </div>
    </section>
  )
}
