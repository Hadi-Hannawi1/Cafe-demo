export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  allergens?: string[]
  available: boolean
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  specialInstructions: string
}

export interface Order {
  id: string
  orderNumber: number
  tableNumber: number
  items: OrderItem[]
  customerName: string
  subtotal: number
  tax: number
  total: number
  status: OrderStatus
  createdAt: string
  specialInstructions?: string
}

export interface OrderItem {
  menuItemId: string
  menuItemName: string
  quantity: number
  unitPrice: number
  specialInstructions: string
}

// CLEANED: Removed 'paid' status (not used in demo)
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'

export interface Table {
  id: number
  number: number
  capacity: number
  status: 'available' | 'occupied'
}
