'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Home, ArrowLeft } from 'lucide-react'
import { useOrderStore } from '@/lib/orderStore'
import Confetti from 'react-confetti'

function SuccessPageContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const { orders } = useOrderStore()
  const [showConfetti, setShowConfetti] = useState(true)

  const order = orders.find(o => o.id === orderId)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!orderId || !order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Commande introuvable
          </h2>
          <p className="text-gray-600 mb-6">
            Impossible de trouver les détails de votre commande.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Commande Confirmée ! 🎉
              </h1>
              <p className="text-green-50 text-lg">
                Merci {order.customerName} !
              </p>
            </div>

            {/* Order Details */}
            <div className="p-6 sm:p-8">
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Numéro de commande</p>
                    <p className="text-2xl font-bold text-charcoal">#{order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Table</p>
                    <p className="text-2xl font-bold text-primary">{order.tableNumber}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-center">
                  Votre commande a été envoyée à la cuisine
                </p>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-charcoal mb-4">Votre commande</h2>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <div className="font-semibold text-charcoal">{item.menuItemName}</div>
                        {item.specialInstructions && (
                          <div className="text-sm text-gray-600 mt-1">
                            Note: {item.specialInstructions}
                          </div>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-bold text-primary">×{item.quantity}</div>
                        <div className="text-sm text-gray-600">
                          {(item.unitPrice * item.quantity).toFixed(2)}€
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t-2 border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Sous-total</span>
                  <span className="font-semibold">{order.subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">TVA (10%)</span>
                  <span className="font-semibold">{order.tax.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-charcoal pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-primary">{order.total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/order?table=${order.tableNumber}`}
                  className="flex-1 px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-center transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Commander à nouveau
                </Link>
                <Link
                  href="/"
                  className="flex-1 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-charcoal rounded-xl font-bold text-center transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Accueil
                </Link>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <p className="text-blue-900 font-semibold">
              💡 Un membre de notre équipe vous servira bientôt !
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-charcoal font-medium">Chargement...</p>
          </div>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  )
}
