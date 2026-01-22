'use client'

import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-charcoal text-white relative overflow-hidden">
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
            <h1 className="text-6xl md:text-7xl font-serif font-bold mb-6">Contact</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Une question? Une réservation? Nous sommes à votre écoute
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif font-bold mb-8 text-charcoal">Venez Nous Voir</h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-charcoal">Adresse</h3>
                    <p className="text-gray-600">
                      5 Rue Saint-Martin<br />
                      75004 Paris, France
                    </p>
                    <a
                      href="https://www.google.com/maps/place/Caf%C3%A9+des+arts/@48.8444511,2.3495869,20z"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-2 inline-block font-semibold"
                    >
                      Voir sur Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-charcoal">Téléphone</h3>
                    <a href="tel:+33142777777" className="text-gray-600 hover:text-primary transition-colors">
                      +33 1 42 77 77 77
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-charcoal">Email</h3>
                    <a href="mailto:bonjour@cafedesarts.fr" className="text-gray-600 hover:text-primary transition-colors">
                      bonjour@cafedesarts.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-charcoal">Horaires</h3>
                    <div className="text-gray-600 space-y-1">
                      <p><span className="font-semibold">Lun-Ven:</span> 7h30 - 22h00</p>
                      <p><span className="font-semibold">Sam-Dim:</span> 8h00 - 23h00</p>
                      <p className="text-primary font-semibold mt-2">Cuisine non-stop!</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
                <h2 className="text-3xl font-serif font-bold mb-6 text-charcoal">Envoyez-nous un Message</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[500px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.3474122!3d48.844444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671ef30ce24c9%3A0x972a57012be5d76b!2sCaf%C3%A9%20des%20arts!5e0!3m2!1sen!2sfr!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  )
}
