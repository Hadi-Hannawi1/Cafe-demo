import { MenuItem } from './types'

export const menuData: MenuItem[] = [
  // Petit Déjeuner
  {
    id: 'pd-1',
    name: 'Croissant au Beurre',
    description: 'Croissant artisanal pur beurre',
    price: 2.50,
    category: 'Petit Déjeuner',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
    available: true
  },
  {
    id: 'pd-2',
    name: 'Pain au Chocolat',
    description: 'Viennoiserie traditionnelle',
    price: 2.80,
    category: 'Petit Déjeuner',
    image: 'https://images.unsplash.com/photo-1623334044303-241021148842?w=400',
    available: true
  },
  {
    id: 'pd-3',
    name: 'Œufs Brouillés sur Toast',
    description: 'Œufs bio, pain grillé, salade verte',
    price: 9.50,
    category: 'Petit Déjeuner',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400',
    available: true
  },

  // Entrées
  {
    id: 'en-1',
    name: 'Soupe à l\'Oignon Gratinée',
    description: 'Recette traditionnelle, croûtons, gruyère fondu',
    price: 12.50,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400',
    allergens: ['Gluten', 'Lactose'],
    available: true
  },
  {
    id: 'en-2',
    name: 'Salade de Chèvre Chaud',
    description: 'Mesclun, toasts de chèvre, miel, noix',
    price: 14.50,
    category: 'Entrées',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    allergens: ['Lactose', 'Noix'],
    available: true
  },

  // Plats Principaux
  {
    id: 'pp-1',
    name: 'Steak Frites',
    description: 'Entrecôte (200g), frites maison, salade',
    price: 22.00,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    available: true
  },
  {
    id: 'pp-2',
    name: 'Confit de Canard',
    description: 'Cuisse de canard confite, pommes sarladaises',
    price: 24.00,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400',
    available: true
  },
  {
    id: 'pp-3',
    name: 'Bœuf Bourguignon',
    description: 'Mijoté 5h, carottes, pommes de terre',
    price: 23.00,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400',
    available: true
  },
  {
    id: 'pp-4',
    name: 'Croque-Monsieur',
    description: 'Jambon, béchamel, gruyère, salade',
    price: 12.00,
    category: 'Plats Principaux',
    image: 'https://images.unsplash.com/photo-1619096252214-ef06c45683e3?w=400',
    allergens: ['Gluten', 'Lactose'],
    available: true
  },

  // Desserts
  {
    id: 'ds-1',
    name: 'Tarte Tatin',
    description: 'Pommes caramélisées, crème fraîche',
    price: 8.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400',
    allergens: ['Gluten', 'Lactose'],
    available: true
  },
  {
    id: 'ds-2',
    name: 'Mousse au Chocolat',
    description: 'Chocolat noir 70%, chantilly',
    price: 7.50,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=400',
    allergens: ['Lactose', 'Œufs'],
    available: true
  },
  {
    id: 'ds-3',
    name: 'Crème Brûlée',
    description: 'Vanille de Madagascar',
    price: 8.00,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400',
    allergens: ['Lactose', 'Œufs'],
    available: true
  },

  // Boissons
  {
    id: 'bv-1',
    name: 'Espresso',
    description: 'Arabica torréfié localement',
    price: 2.50,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400',
    available: true
  },
  {
    id: 'bv-2',
    name: 'Café Crème',
    description: 'Espresso, lait moussé',
    price: 3.50,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
    allergens: ['Lactose'],
    available: true
  },
  {
    id: 'bv-3',
    name: 'Jus d\'Orange Frais',
    description: 'Pressé minute',
    price: 5.50,
    category: 'Boissons',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
    available: true
  }
]

export const categories = [
  'Petit Déjeuner',
  'Entrées',
  'Plats Principaux',
  'Desserts',
  'Boissons'
]
