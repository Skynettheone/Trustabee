import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export type Product = {
  id: string;
  name: string;
  farm: string;
  price: number;
  quantity: number;
  unit: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  type: string;
  region: string;
  organic: boolean;
  image: string;
};

export type CartItem = Product & { cartQuantity: number };
export type Order = {
  id: string;
  date: string;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  total: number;
  items: CartItem[];
};

// Initial products (from your Browse page, using local images)
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Wildflower Honey',
    farm: 'Happy Bee Farm',
    price: 12.99,
    quantity: 500,
    unit: 'g',
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    type: 'Wildflower',
    region: 'Central Province',
    organic: true,
    image: '/images/honey1.webp',
  },
  {
    id: '2',
    name: 'Cinnamon Honey',
    farm: 'Spice Garden Apiary',
    price: 15.99,
    quantity: 500,
    unit: 'g',
    rating: 4.9,
    reviewCount: 87,
    verified: true,
    type: 'Cinnamon',
    region: 'Western Province',
    organic: true,
    image: '/images/honey-e396fd81cc2d4275bfaee2948d414fd8.jpg',
  },
  {
    id: '3',
    name: 'Forest Honey',
    farm: 'Green Hills Farm',
    price: 14.49,
    quantity: 350,
    unit: 'g',
    rating: 4.7,
    reviewCount: 56,
    verified: true,
    type: 'Forest',
    region: 'Uva Province',
    organic: false,
    image: '/images/Honey-Cake-take-3_5.jpg',
  },
  {
    id: '4',
    name: 'Coconut Flower Honey',
    farm: 'Coastal Bee Haven',
    price: 16.99,
    quantity: 500,
    unit: 'g',
    rating: 4.9,
    reviewCount: 102,
    verified: true,
    type: 'Coconut Flower',
    region: 'Southern Province',
    organic: true,
    image: '/images/honey-1296x728-header.webp',
  },
  {
    id: '5',
    name: 'Mountain Honey',
    farm: 'Highland Apiaries',
    price: 19.99,
    quantity: 500,
    unit: 'g',
    rating: 4.8,
    reviewCount: 73,
    verified: true,
    type: 'Mountain',
    region: 'Central Province',
    organic: true,
    image: '/images/Honey_Skin_Benefits_1.webp',
  },
  {
    id: '6',
    name: 'Raw Jackfruit Honey',
    farm: 'Tropical Treasures',
    price: 13.99,
    quantity: 400,
    unit: 'g',
    rating: 4.6,
    reviewCount: 41,
    verified: true,
    type: 'Jackfruit',
    region: 'North Western Province',
    organic: false,
    image: '/images/honey1.webp',
  },
];

// Context
interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  favorites: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  checkout: () => void;
  isFavorite: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item);
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, cartQuantity: quantity } : item));
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prev => prev.some(item => item.id === product.id) ? prev : [...prev, product]);
  };

  const removeFromFavorites = (productId: string) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  const isFavorite = (productId: string) => favorites.some(item => item.id === productId);
  const isInCart = (productId: string) => cart.some(item => item.id === productId);

  const checkout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `ORD-${1000 + orders.length + 1}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Processing',
      total: cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0),
      items: cart,
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      favorites,
      orders,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      addToFavorites,
      removeFromFavorites,
      checkout,
      isFavorite,
      isInCart,
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within a ShopProvider');
  return ctx;
}; 