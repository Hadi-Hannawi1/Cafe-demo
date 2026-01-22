'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ShoppingCart, Plus, Minus, AlertCircle, ArrowRight } from 'lucide-react'
import { useOrderStore } from '@/lib/orderStore'
import { menuData, categories } from '@/lib/menuData'
import { MenuItem } from '@/lib/types'
import toast, { Toaster } from 'react-hot-toast'

function OrderPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tableNumber = searchParams.get('table')
  
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  const { cart, addToCart, setCurrentTable } = useOrderStore()
  
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)

  useEffect(() => {
    if (tableNumber) {
      setCurrentTable(parseInt(tableNumber))
    }
  }, [tableNumber, setCurrentTable])

  // Track navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false)
      } else {
        setNavbarVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1
    addToCart(item.id, quantity, '')
    toast.success(`${item.name} ajouté au panier!`)
    setQuantities(prev => ({ ...prev, [item.id]: 1 }))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1
      const newValue = Math.max(1, Math.min(99, current + delta))
      return { ...prev, [itemId]: newValue }
    })
  }

  const filteredItems = menuData.filter(
    item => item.category === selectedCategory && item.available
  )

  if (!tableNumber) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">
            Table non spécifiée
          </h2>
          <p className="text-gray-600 mb-6">
            Veuillez scanner le code QR sur votre table pour commander.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream pb-32">
      <Toaster position="top-center" />
      
      {/* Header - Adjusts position based on navbar visibility */}
      <div 
        className={`bg-charcoal text-white fixed left-0 right-0 z-40 shadow-lg transition-all duration-300 ${
          navbarVisible ? 'top-20' : 'top-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-serif font-bold">Votre Café</h1>
              <p className="text-xs sm:text-sm text-gray-300">Table {tableNumber}</p>
            </div>
            
            {/* Desktop Cart Button */}
            <button
              onClick={() => router.push('/order/cart')}
              className="relative px-4 sm:px-6 py-2 sm:py-3 bg-primary hover:bg-primary/90 rounded-full font-semibold transition-all hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Panier</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-secondary text-white rounded-full text-xs flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Cart Summary Bar */}
      {cartItemCount > 0 && (
        <div 
          className={`bg-green-50 border-b-2 border-green-200 fixed left-0 right-0 z-30 transition-all duration-300 ${
            navbarVisible ? 'top-[152px]' : 'top-[72px]'
          }`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  {cartItemCount} article{cartItemCount > 1 ? 's' : ''} dans le panier
                </span>
              </div>
              <button
                onClick={() => router.push('/order/cart')}
                className="px-4 sm:px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
              >
                Voir le panier ({cartTotal.toFixed(2)}€)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div 
        className={`bg-white fixed left-0 right-0 z-30 border-b border-gray-200 shadow-sm transition-all duration-300 ${
          cartItemCount > 0 
            ? (navbarVisible ? 'top-[208px]' : 'top-[128px]')
            : (navbarVisible ? 'top-[152px]' : 'top-[72px]')
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold whitespace-nowrap transition-all text-sm sm:text-base ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div 
        className={`container mx-auto px-4 py-8 transition-all duration-300 ${
          cartItemCount > 0
            ? (navbarVisible ? 'mt-[264px]' : 'mt-[184px]')
            : (navbarVisible ? 'mt-[208px]' : 'mt-[128px]')
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-charcoal">{item.name}</h3>
                  <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap ml-2">
                    {item.price.toFixed(2)}€
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                {item.allergens && item.allergens.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.allergens.map(allergen => (
                      <span
                        key={allergen}
                        className="px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded-full"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-gray-200 rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-semibold">{quantities[item.id] || 1}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 px-4 sm:px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold transition-all hover:scale-105 text-sm sm:text-base"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => router.push('/order/cart')}
            className="relative px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold shadow-2xl flex items-center gap-3 transition-all hover:scale-105 animate-bounce"
          >
            <ShoppingCart className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-90">{cartItemCount} article{cartItemCount > 1 ? 's' : ''}</div>
              <div className="font-bold text-lg">{cartTotal.toFixed(2)}€</div>
            </div>
            <span className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-white rounded-full text-sm flex items-center justify-center font-bold border-2 border-white">
              {cartItemCount}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function OrderPage() {
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
      <OrderPageContent />
    </Suspense>
  )
}
