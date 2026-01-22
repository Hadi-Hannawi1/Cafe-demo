'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Clock, Utensils } from 'lucide-react'
import { useOrderStore } from '@/lib/orderStore'
import { Order } from '@/lib/types'
import Confetti from 'react-confetti'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const orderId = searchParams.get('orderId')
  const { orders } = useOrderStore()
  
  const [order, setOrder] = useState<Order | null>(null)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find(o => o.id === orderId)
      setOrder(foundOrder || null)
    }

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [orderId, orders])

  if (!order) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <p className="text-gray-600">Commande introuvable...</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={typeof window !== 'undefined' ? window.innerWidth : 300}
          height={typeof window !== 'undefined' ? window.innerHeight : 200}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-charcoal mb-2">
            Commande Confirmée!
          </h1>
          <p className="text-xl text-gray-600">
            Merci {order.customerName}
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-cream rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">#{order.orderNumber}</div>
              <div className="text-sm text-gray-600">Numéro de commande</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">Table {order.tableNumber}</div>
              <div className="text-sm text-gray-600">Votre table</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <h3 className="font-serif font-bold text-lg text-charcoal mb-3">Votre Commande</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.menuItemName}
                  </span>
                  <span className="font-semibold text-charcoal">
                    {(item.unitPrice * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary text-lg">{order.total.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6">
          <h3 className="font-serif font-bold text-lg text-charcoal mb-4 text-center">
            Statut de votre commande
          </h3>
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-center font-semibold text-green-600">Reçue</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-300 relative">
              <div className="absolute top-0 left-0 h-full bg-primary animate-pulse w-1/2"></div>
            </div>
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2 animate-pulse">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-center font-semibold text-primary">En préparation</span>
            </div>
            
            <div className="flex-1 h-1 bg-gray-300"></div>
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <Utensils className="w-6 h-6 text-gray-500" />
              </div>
              <span className="text-xs text-center font-semibold text-gray-500">Prête</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Votre commande a été envoyée en cuisine. Nous vous servirons dès qu'elle sera prête!
          </p>
          
          {order.specialInstructions && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Instructions: </span>
                {order.specialInstructions}
              </p>
            </div>
          )}

          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => router.push(`/order?table=${order.tableNumber}`)}
              className="px-6 py-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-semibold transition-all hover:scale-105"
            >
              Commander Plus
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all hover:scale-105"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
