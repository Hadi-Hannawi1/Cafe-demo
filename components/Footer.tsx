import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full artistic-gradient flex items-center justify-center">
                <Coffee className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold">Votre Café</span>
            </div>
            <p className="text-gray-400 mb-6">
              Une expérience culinaire moderne avec système de commande QR intégré.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="/notre-carte" className="text-gray-400 hover:text-white transition-colors">Notre Carte</a></li>
              <li><a href="/commander" className="text-gray-400 hover:text-white transition-colors">Commander</a></li>
              <li><a href="/notre-histoire" className="text-gray-400 hover:text-white transition-colors">Notre Histoire</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Horaires</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <span className="font-semibold text-white">Lundi - Vendredi</span>
                <br />7h30 - 22h00
              </li>
              <li>
                <span className="font-semibold text-white">Samedi - Dimanche</span>
                <br />8h00 - 23h00
              </li>
              <li className="pt-3">
                <span className="text-secondary font-semibold">Service continu</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Votre Adresse<br />
                  Code Postal, Ville
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+33000000000" className="text-gray-400 hover:text-white transition-colors">
                  +33 X XX XX XX XX
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:contact@votrecafe.fr" className="text-gray-400 hover:text-white transition-colors">
                  contact@votrecafe.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm mb-2 md:mb-0">
                © 2026 Votre Café. Tous droits réservés.
              </p>
              <a 
                href="https://hadi-hannawi.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary transition-colors text-sm font-semibold inline-flex items-center gap-1"
              >
                Site créé par Hadi Hannawi
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
