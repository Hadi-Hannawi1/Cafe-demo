'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useOrderStore } from '@/lib/orderStore'
import { Order, OrderStatus } from '@/lib/types'
import { Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, ChefHat, Flame, Package, ArrowLeft, Home, LogOut } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function KitchenDashboard() {
  const router = useRouter()
  const { orders, updateOrderStatus } = useOrderStore()
  const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready'>('all')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const [navbarVisible, setNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

  // Calculate counts from ALL orders (not filtered)
  const allActiveOrders = orders.filter(
    order => order.status !== 'delivered' && order.status !== 'cancelled'
  )
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const preparingCount = orders.filter(o => o.status === 'preparing').length
  const readyCount = orders.filter(o => o.status === 'ready').length

  // Filter orders for display only
  const filteredOrders = orders
    .filter(order => {
      if (filter === 'all') return order.status !== 'delivered' && order.status !== 'cancelled'
      return order.status === filter
    })
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus)
    
    const statusMessages: Record<OrderStatus, string> = {
      pending: '⏸️ Commande remise en attente',
      preparing: '👨‍🍳 Préparation commencée',
      ready: '✅ Commande prête!',
      delivered: '🎉 Commande livrée',
      cancelled: '❌ Commande annulée'
    }
    
    toast.success(statusMessages[newStatus])
  }

  const getStatusColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      pending: 'from-[#8B1538] to-[#6B0F2A]',
      preparing: 'from-[#3D5A80] to-[#2C4A66]',
      ready: 'from-[#E07A5F] to-[#C96A4F]',
      delivered: 'from-gray-500 to-gray-600',
      cancelled: 'from-red-600 to-red-700'
    }
    return colors[status]
  }

  const getStatusBadge = (status: OrderStatus) => {
    const badges: Record<OrderStatus, { text: string; className: string; icon: JSX.Element }> = {
      pending: { 
        text: 'NOUVEAU', 
        className: 'bg-[#8B1538] text-white',
        icon: <AlertCircle className="w-4 h-4" />
      },
      preparing: { 
        text: 'EN COURS', 
        className: 'bg-[#3D5A80] text-white',
        icon: <Flame className="w-4 h-4" />
      },
      ready: { 
        text: 'PRÊTE', 
        className: 'bg-[#E07A5F] text-white',
        icon: <Package className="w-4 h-4" />
      },
      delivered: { 
        text: 'LIVRÉE', 
        className: 'bg-gray-500 text-white',
        icon: <CheckCircle className="w-4 h-4" />
      },
      cancelled: { 
        text: 'ANNULÉE', 
        className: 'bg-red-600 text-white',
        icon: <XCircle className="w-4 h-4" />
      }
    }
    return badges[status]
  }

  const getElapsedTime = (createdAt: string) => {
    if (!mounted) return '0:00'
    const elapsed = Math.floor((currentTime.getTime() - new Date(createdAt).getTime()) / 1000)
    const minutes = Math.floor(elapsed / 60)
    const seconds = elapsed % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getTimeColor = (createdAt: string) => {
    if (!mounted) return 'text-gray-400'
    const minutes = Math.floor((currentTime.getTime() - new Date(createdAt).getTime()) / 1000 / 60)
    if (minutes < 5) return 'text-green-400'
    if (minutes < 10) return 'text-yellow-400'
    if (minutes < 15) return 'text-orange-400'
    return 'text-red-400 animate-pulse'
  }

  const getEmptyMessage = () => {
    switch (filter) {
      case 'all':
        return {
          title: 'Aucune commande en cours',
          subtitle: 'Les nouvelles commandes apparaîtront ici'
        }
      case 'pending':
        return {
          title: 'Aucune nouvelle commande',
          subtitle: 'Changez de filtre pour voir les autres commandes'
        }
      case 'preparing':
        return {
          title: 'Aucune commande en préparation',
          subtitle: 'Changez de filtre pour voir les autres commandes'
        }
      case 'ready':
        return {
          title: 'Aucune commande prête',
          subtitle: 'Changez de filtre pour voir les autres commandes'
        }
      default:
        return {
          title: 'Aucune commande',
          subtitle: 'Les nouvelles commandes apparaîtront ici'
        }
    }
  }

  return (
    <div className="min-h-screen bg-[#2B2D42]">
      <Toaster position="top-center" />

      {/* Header - Adjusts position based on navbar visibility */}
      <div 
        className={`bg-gradient-to-r from-[#2B2D42] to-[#1a1b2e] border-b-4 border-[#8B1538] fixed left-0 right-0 z-50 shadow-2xl transition-all duration-300 ${
          navbarVisible ? 'top-20' : 'top-0'
        }`}
      >
        <div className="w-full px-4 sm:px-6 py-4 sm:py-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4 sm:mb-6">
            {/* Left: Logo + Title */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => router.push('/')}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-[#3D5A80] hover:bg-[#4A6A9A] rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-lg"
                title="Retour à l'accueil"
              >
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F2A] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                <ChefHat className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Kitchen Display
                </h1>
                <p className="text-[#E07A5F] text-xs sm:text-sm font-semibold">
                  {mounted ? currentTime.toLocaleTimeString('fr-FR') : '--:--:--'}
                </p>
              </div>
            </div>

            {/* Right: Stats + Exit */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Stats Cards */}
              <div className="flex gap-2 sm:gap-4">
                <div className="bg-gradient-to-br from-[#8B1538] to-[#6B0F2A] rounded-xl sm:rounded-2xl p-3 sm:p-4 min-w-[80px] sm:min-w-[100px] shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-black text-white">{pendingCount}</div>
                    <div className="text-[10px] sm:text-xs text-white/80 font-bold uppercase tracking-wide mt-1">
                      Nouveau
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#3D5A80] to-[#2C4A66] rounded-xl sm:rounded-2xl p-3 sm:p-4 min-w-[80px] sm:min-w-[100px] shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-black text-white">{preparingCount}</div>
                    <div className="text-[10px] sm:text-xs text-white/80 font-bold uppercase tracking-wide mt-1">
                      En Cours
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-[#E07A5F] to-[#C96A4F] rounded-xl sm:rounded-2xl p-3 sm:p-4 min-w-[80px] sm:min-w-[100px] shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl sm:text-4xl font-black text-white">{readyCount}</div>
                    <div className="text-[10px] sm:text-xs text-white/80 font-bold uppercase tracking-wide mt-1">
                      Prête
                    </div>
                  </div>
                </div>
              </div>

              {/* Exit Button (Desktop) */}
              <button
                onClick={() => router.push('/')}
                className="hidden sm:flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Quitter</span>
              </button>
            </div>
          </div>

          {/* Filters - Added "Prête" button */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg text-sm sm:text-base ${
                filter === 'all'
                  ? 'bg-[#F2E9E4] text-[#2B2D42] scale-105'
                  : 'bg-[#3D5A80] text-white hover:bg-[#4A6A9A]'
              }`}
            >
              Toutes ({allActiveOrders.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg text-sm sm:text-base ${
                filter === 'pending'
                  ? 'bg-gradient-to-r from-[#8B1538] to-[#6B0F2A] text-white scale-105'
                  : 'bg-[#3D5A80] text-white hover:bg-[#4A6A9A]'
              }`}
            >
              Nouveau ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('preparing')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg text-sm sm:text-base ${
                filter === 'preparing'
                  ? 'bg-gradient-to-r from-[#3D5A80] to-[#2C4A66] text-white scale-105'
                  : 'bg-[#3D5A80] text-white hover:bg-[#4A6A9A]'
              }`}
            >
              En Cours ({preparingCount})
            </button>
            <button
              onClick={() => setFilter('ready')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all whitespace-nowrap shadow-lg text-sm sm:text-base ${
                filter === 'ready'
                  ? 'bg-gradient-to-r from-[#E07A5F] to-[#C96A4F] text-white scale-105'
                  : 'bg-[#3D5A80] text-white hover:bg-[#4A6A9A]'
              }`}
            >
              Prête ({readyCount})
            </button>
          </div>
        </div>
      </div>

      {/* Orders Grid - Dynamic padding based on navbar visibility */}
      <div 
        className={`w-full px-4 sm:px-6 py-6 sm:py-8 transition-all duration-300 ${
          navbarVisible ? 'pt-[280px] sm:pt-[320px]' : 'pt-[200px] sm:pt-[240px]'
        }`}
      >
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20 sm:py-32">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#3D5A80]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-12 h-12 sm:w-16 sm:h-16 text-[#3D5A80]" />
            </div>
            <p className="text-2xl sm:text-3xl text-gray-400 font-bold mb-4">
              {getEmptyMessage().title}
            </p>
            <p className="text-sm sm:text-base text-gray-500 mb-8">
              {getEmptyMessage().subtitle}
            </p>
            
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B1538] hover:bg-[#6B0F2A] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
            {filteredOrders.map(order => {
              const badge = getStatusBadge(order.status)
              return (
                <div
                  key={order.id}
                  className={`bg-[#1a1b2e] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 transition-all hover:scale-105 ${
                    order.status === 'pending' 
                      ? 'border-[#8B1538] animate-pulse' 
                      : 'border-[#3D5A80] hover:border-[#E07A5F]'
                  }`}
                >
                  {/* Order Header */}
                  <div className={`bg-gradient-to-r ${getStatusColor(order.status)} p-4 sm:p-5`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`px-3 py-1.5 sm:px-4 sm:py-2 ${badge.className} rounded-full flex items-center gap-2 font-bold text-xs sm:text-sm shadow-lg`}>
                        {badge.icon}
                        {badge.text}
                      </div>
                      <div className={`text-2xl sm:text-3xl font-black ${getTimeColor(order.createdAt)}`}>
                        {getElapsedTime(order.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs sm:text-sm text-white/80 font-semibold">Commande</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">#{order.orderNumber}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs sm:text-sm text-white/80 font-semibold">Table</div>
                        <div className="text-2xl sm:text-3xl font-black text-white">{order.tableNumber}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-white/90 font-semibold text-sm sm:text-base">
                      👤 {order.customerName}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-5">
                    <div className="mb-4 sm:mb-5">
                      <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-3">
                        Articles ({order.items.length})
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="bg-[#2B2D42]/50 rounded-xl p-3 sm:p-4 hover:bg-[#2B2D42] transition-colors"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-white text-sm sm:text-lg truncate">{item.menuItemName}</div>
                                {item.specialInstructions && (
                                  <div className="mt-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
                                    <div className="text-xs text-yellow-300 font-semibold break-words">
                                      ⚠️ {item.specialInstructions}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex-shrink-0">
                                <div className="text-2xl sm:text-3xl font-black text-[#E07A5F]">
                                  ×{item.quantity}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.specialInstructions && (
                      <div className="bg-yellow-500/20 border-2 border-yellow-500 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div className="text-xs sm:text-sm text-yellow-300 font-semibold break-words">
                            {order.specialInstructions}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-2 sm:space-y-3">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                          className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#3D5A80] to-[#2C4A66] hover:from-[#4A6A9A] hover:to-[#3A5A80] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-sm sm:text-lg"
                        >
                          <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
                          Commencer
                        </button>
                      )}

                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'ready')}
                          className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#E07A5F] to-[#C96A4F] hover:from-[#F08A6F] hover:to-[#D97A5F] text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-sm sm:text-lg"
                        >
                          <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                          Marquer Prête
                        </button>
                      )}

                      {order.status === 'ready' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'delivered')}
                          className="w-full py-3 sm:py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2 text-sm sm:text-lg"
                        >
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                          Livrée
                        </button>
                      )}

                      {(order.status === 'pending' || order.status === 'preparing') && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="w-full py-2 sm:py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border-2 border-red-500/50 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                          Annuler
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Floating Exit Button (Mobile) */}
      <button
        onClick={() => router.push('/')}
        className="sm:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
        title="Quitter"
      >
        <Home className="w-6 h-6" />
      </button>
    </div>
  )
}
