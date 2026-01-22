'use client'

import { motion } from 'framer-motion'
import { Heart, Award, Users, Coffee } from 'lucide-react'

export default function NotreHistoirePage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">Notre Histoire</h1>
            <p className="text-xl text-gray-300">
              Une passion pour l'art, la gastronomie et la convivialité au cœur du Marais depuis 2015
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-white rounded-2xl p-12 shadow-xl mb-12">
                <h2 className="text-4xl font-serif font-bold mb-6 text-charcoal">L'Histoire Commence...</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  En 2015, Café des Arts ouvre ses portes au 5 Rue Saint-Martin, dans le cœur battant du Marais. Créé par deux amis passionnés d'art et de gastronomie, Sophie Moreau et Julien Dubois, le café naît du désir de créer un espace où la créativité et les saveurs françaises authentiques se rencontrent.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Le concept est simple mais puissant : offrir un lieu où artistes, écrivains, et amoureux de la vie peuvent se retrouver autour d'une cuisine française traditionnelle préparée avec passion, dans une ambiance bohème et chaleureuse qui rappelle les cafés littéraires parisiens d'antan.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Aujourd'hui, Café des Arts est devenu bien plus qu'un simple café-restaurant. C'est un carrefour culturel du quartier, accueillant des expositions d'artistes locaux, des concerts intimistes et des soirées poésie, tout en servant une cuisine qui honore les traditions culinaires françaises.
                </p>
              </div>
            </motion.div>

            {/* Values */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: Heart,
                  color: 'primary',
                  title: 'Passion',
                  description: 'Chaque plat est préparé avec amour et les meilleurs ingrédients locaux'
                },
                {
                  icon: Award,
                  color: 'secondary',
                  title: 'Excellence',
                  description: 'Une cuisine française authentique qui respecte les traditions'
                },
                {
                  icon: Users,
                  color: 'accent',
                  title: 'Communauté',
                  description: 'Un lieu de rencontre pour tous, habitants et visiteurs'
                },
                {
                  icon: Coffee,
                  color: 'gold',
                  title: 'Qualité',
                  description: 'Café torréfié localement et sélectionné avec soin'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-lg"
                >
                  <div className={`w-14 h-14 rounded-full bg-${value.color}/10 flex items-center justify-center mb-4`}>
                    <value.icon className={`w-7 h-7 text-${value.color}`} style={{ color: `var(--${value.color})` }} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-3 text-charcoal">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-serif font-bold mb-6 text-charcoal">Notre Équipe</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Une équipe passionnée et dévouée à vous offrir la meilleure expérience possible
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Sophie Moreau",
                role: "Co-Fondatrice & Chef",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976",
                description: "Formée dans les meilleures écoles culinaires parisiennes"
              },
              {
                name: "Julien Dubois",
                role: "Co-Fondateur & Sommelier",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070",
                description: "Expert en vins français et accords mets-vins"
              },
              {
                name: "Marie Laurent",
                role: "Pâtissière",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961",
                description: "Créatrice de nos délicieuses pâtisseries artisanales"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2 text-charcoal">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Rejoignez Notre Communauté</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
            Venez découvrir l'esprit unique du Café des Arts au cœur du Marais
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Nous Contacter
          </a>
        </div>
      </section>
    </div>
  )
}
