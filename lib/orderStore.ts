import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Order, CartItem, OrderStatus } from './types'
import { menuData } from './menuData'

interface OrderStore {
  orders: Order[]
  cart: CartItem[]
  currentTable: number | null
  
  // Cart actions
  addToCart: (itemId: string, quantity: number, specialInstructions: string) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  
  // Order actions
  createOrder: (customerName: string, tableNumber: number, specialInstructions?: string) => string
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  getOrders: () => Order[]
  getPendingOrders: () => Order[]
  
  // Table actions
  setCurrentTable: (tableNumber: number) => void
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      cart: [],
      currentTable: null,

      addToCart: (itemId, quantity, specialInstructions) => {
        const menuItem = menuData.find(item => item.id === itemId)
        if (!menuItem) return

        set(state => {
          const existingItem = state.cart.find(
            item => item.menuItem.id === itemId && item.specialInstructions === specialInstructions
          )

          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.menuItem.id === itemId && item.specialInstructions === specialInstructions
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          }

          return {
            cart: [...state.cart, { menuItem, quantity, specialInstructions }]
          }
        })
      },

      removeFromCart: (itemId) => {
        set(state => ({
          cart: state.cart.filter(item => item.menuItem.id !== itemId)
        }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId)
          return
        }

        set(state => ({
          cart: state.cart.map(item =>
            item.menuItem.id === itemId ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => set({ cart: [] }),

      createOrder: (customerName, tableNumber, specialInstructions = '') => {
        const { cart, orders } = get()
        
        const subtotal = cart.reduce(
          (sum, item) => sum + item.menuItem.price * item.quantity,
          0
        )
        const tax = subtotal * 0.1 // 10% tax
        const total = subtotal + tax

        const newOrder: Order = {
          id: `order-${Date.now()}`,
          orderNumber: orders.length + 1,
          tableNumber,
          customerName,
          items: cart.map(item => ({
            menuItemId: item.menuItem.id,
            menuItemName: item.menuItem.name,
            quantity: item.quantity,
            unitPrice: item.menuItem.price,
            specialInstructions: item.specialInstructions
          })),
          subtotal,
          tax,
          total,
          status: 'pending',
          createdAt: new Date().toISOString(),
          specialInstructions
        }

        set(state => ({
          orders: [...state.orders, newOrder],
          cart: []
        }))

        return newOrder.id
      },

      updateOrderStatus: (orderId, status) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }))
      },

      getOrders: () => get().orders,

      getPendingOrders: () => {
        return get().orders.filter(
          order => order.status === 'pending' || order.status === 'preparing'
        )
      },

      setCurrentTable: (tableNumber) => set({ currentTable: tableNumber })
    }),
    {
      name: 'cafe-order-storage',
      storage: createJSONStorage(() => localStorage)
    }

  )
)
