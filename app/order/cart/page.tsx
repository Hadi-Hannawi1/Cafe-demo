'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CheckCircle } from 'lucide-react'
import { useOrderStore } from '@/lib/orderStore'
import toast, { Toaster } from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, createOrder, currentTable, clearCart } = useOrderStore()
  
  const [customerName, setCustomerName] = useState('')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% TVA
  const total = subtotal + tax

  const handleSubmitOrder = async () => {
    if (!customerName.trim()) {
      toast.error('Veuillez entrer votre nom')
      return
    }

    if (cart.length === 0) {
      toast.error('Votre panier est vide')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const orderId = createOrder(
        customerName,
        currentTable || 1,
        specialInstructions
      )

      toast.success('Commande envoyée avec succès!')
      
      // Redirect to success page
      setTimeout(() => {
        router.push(`/order/success?orderId=${orderId}`)
      }, 500)
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la commande')
      setIsSubmitting(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <Toaster position="top-center" />
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
            Panier Vide
          </h2>
          <p className="text-gray-600 mb-6">
            Votre panier est vide. Ajoutez des plats pour commencer!
          </p>
          <button
            onClick={() => router.push(`/order?table=${currentTable || 1}`)}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors"
          >
            Retour au Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pb-8">
      <Toaster position="top-center" />

      {/* Header */}
      <div className="bg-charcoal text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-serif font-bold">Votre Panier</h1>
              <p className="text-sm text-gray-300">Table {currentTable}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                Articles ({cart.length})
              </h2>

              {cart.map((item, index) => (
                <div
                  key={`${item.menuItem.id}-${index}`}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-serif font-bold text-charcoal">
                            {item.menuItem.name}
                          </h3>
                          <p className="text-sm text-gray-600">{item.menuItem.description}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border-2 border-gray-200 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500">{item.menuItem.price.toFixed(2)}€ × {item.quantity}</div>
                          <div className="text-xl font-bold text-primary">
                            {(item.menuItem.price * item.quantity).toFixed(2)}€
                          </div>
                        </div>
                      </div>

                      {item.specialInstructions && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Instructions: </span>
                            {item.specialInstructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                  Résumé
                </h2>

                {/* Customer Info */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Votre Nom *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ex: Jean Dupont"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                    required
                  />
                </div>

                {/* Special Instructions */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-charcoal mb-2">
                    Instructions Spéciales (optionnel)
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Allergies, préférences..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Sous-total</span>
                    <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>TVA (10%)</span>
                    <span className="font-semibold">{tax.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-charcoal pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-primary">{total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || !customerName.trim()}
                  className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirmer la Commande</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  En confirmant, vous acceptez nos conditions de service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
