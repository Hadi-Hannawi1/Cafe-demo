'use client'

import { motion } from 'framer-motion'

interface MenuItem {
  name: string
  description: string
  price: string
}

interface MenuSectionProps {
  category: string
  subtitle: string
  items: MenuItem[]
  index: number
}

export default function MenuSection({ category, subtitle, items, index }: MenuSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-16 last:mb-0"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif font-bold mb-2 text-charcoal">{category}</h2>
          <p className="text-primary font-semibold">{subtitle}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="space-y-8">
            {items.map((item, itemIndex) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                className="group"
              >
                <div className="flex justify-between items-start gap-4 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">{item.price}€</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
