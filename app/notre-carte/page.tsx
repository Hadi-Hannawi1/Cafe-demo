'use client'

import { motion } from 'framer-motion'
import MenuSection from '@/components/MenuSection'

export default function NotreCartePage() {
  const menuData = {
    "Petit Déjeuner": {
      subtitle: "7h30 - 11h30",
      items: [
        { name: "Croissant au Beurre", description: "Croissant artisanal pur beurre", price: "2.50" },
        { name: "Pain au Chocolat", description: "Viennoiserie traditionnelle", price: "2.80" },
        { name: "Tartine Beurre Confiture", description: "Pain de campagne, beurre demi-sel, confiture maison", price: "5.50" },
        { name: "Œufs Brouillés sur Toast", description: "Œufs bio, pain grillé, salade verte", price: "9.50" },
        { name: "Granola Maison", description: "Yaourt grec, fruits frais, miel de lavande", price: "8.00" },
      ]
    },
    "Entrées": {
      subtitle: "À partir de 12h00",
      items: [
        { name: "Soupe à l'Oignon Gratinée", description: "Recette traditionnelle, croûtons, gruyère fondu", price: "12.50" },
        { name: "Œufs Mayonnaise", description: "Le grand classique revisité", price: "8.50" },
        { name: "Terrine de Campagne", description: "Terrine maison, cornichons, pain grillé", price: "10.50" },
        { name: "Salade de Chèvre Chaud", description: "Mesclun, toasts de chèvre, miel, noix", price: "14.50" },
        { name: "Escargots de Bourgogne", description: "6 escargots, beurre persillé", price: "15.00" },
      ]
    },
    "Plats Principaux": {
      subtitle: "Notre Sélection",
      items: [
        { name: "Croque-Monsieur", description: "Jambon, béchamel, gruyère, salade", price: "12.00" },
        { name: "Quiche Lorraine", description: "Pâte feuilletée maison, lardons, salade", price: "13.50" },
        { name: "Steak Frites", description: "Entrecôte (200g), frites maison, salade", price: "22.00" },
        { name: "Confit de Canard", description: "Cuisse de canard confite, pommes sarladaises", price: "24.00" },
        { name: "Bœuf Bourguignon", description: "Mijoté 5h, carottes, pommes de terre", price: "23.00" },
        { name: "Coq au Vin", description: "Recette de grand-mère, champignons, lardons", price: "22.00" },
        { name: "Salmon Grillé", description: "Pavé de saumon, légumes de saison, sauce citron", price: "21.00" },
      ]
    },
    "Desserts": {
      subtitle: "La Touche Sucrée",
      items: [
        { name: "Tarte Tatin", description: "Pommes caramélisées, crème fraîche", price: "8.50" },
        { name: "Mousse au Chocolat", description: "Chocolat noir 70%, chantilly", price: "7.50" },
        { name: "Crème Brûlée", description: "Vanille de Madagascar", price: "8.00" },
        { name: "Profiteroles", description: "Choux, glace vanille, sauce chocolat chaude", price: "9.50" },
        { name: "Tarte au Citron", description: "Citron de Menton, meringue italienne", price: "8.50" },
        { name: "Café Gourmand", description: "Espresso + assortiment de mini-desserts", price: "10.00" },
      ]
    },
    "Boissons": {
      subtitle: "Cafés, Thés & Plus",
      items: [
        { name: "Espresso", description: "Arabica torréfié localement", price: "2.50" },
        { name: "Café Crème", description: "Espresso, lait moussé", price: "3.50" },
        { name: "Cappuccino", description: "Espresso, mousse de lait", price: "4.00" },
        { name: "Thé (sélection)", description: "Earl Grey, Menthe, Fruits rouges", price: "3.50" },
        { name: "Chocolat Chaud", description: "Chocolat noir, chantilly", price: "5.00" },
        { name: "Perrier / Eau Minérale", description: "33cl", price: "4.50" },
        { name: "Jus Frais", description: "Orange, pomme, ou pamplemousse", price: "5.50" },
        { name: "Vin Rouge / Blanc (verre)", description: "Sélection du mois", price: "7.00" },
        { name: "Kir", description: "Vin blanc, crème de cassis", price: "8.50" },
        { name: "Bière Pression", description: "25cl / 50cl", price: "5.00 / 8.00" },
      ]
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">Notre Carte</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une cuisine française authentique, préparée avec passion et les meilleurs ingrédients locaux
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          {Object.entries(menuData).map(([category, data], index) => (
            <MenuSection
              key={category}
              category={category}
              subtitle={data.subtitle}
              items={data.items}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-charcoal">Prêt à Commander?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-lg">
            Utilisez notre système de commande QR pour une expérience rapide et sans contact
          </p>
          <a
            href="/commander"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Commander Maintenant
          </a>
        </div>
      </section>
    </div>
  )
}
