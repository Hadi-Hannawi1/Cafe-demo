'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // FormSubmit will handle the form submission
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form
      action="https://formsubmit.co/YOUR_EMAIL@example.com"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Hidden inputs for FormSubmit */}
      <input type="hidden" name="_subject" value="Nouveau message depuis Café des Arts" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
          Nom Complet *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formState.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
          placeholder="Jean Dupont"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formState.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
          placeholder="jean.dupont@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
          Téléphone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-charcoal mb-2">
          Sujet *
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={formState.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
        >
          <option value="">Sélectionnez un sujet</option>
          <option value="reservation">Réservation</option>
          <option value="information">Information</option>
          <option value="evenement">Événement Privé</option>
          <option value="partenariat">Partenariat</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formState.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
          placeholder="Votre message..."
        />
      </div>

      <button
        type="submit"
        className="w-full px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Envoyer le Message
      </button>

      <p className="text-sm text-gray-500 text-center">
        * Champs obligatoires
      </p>
    </form>
  )
}
