import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  farmer: string;
  rating: number;
  reviews: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface ShopState {
  products: Product[];
  cart: CartItem[];
  favorites: string[];
  orders: any[]; // We'll type this properly when implementing orders
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = {
  products: [],
  cart: [],
  favorites: [],
  orders: [],
  loading: false,
  error: null,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.cart.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    addOrder: (state, action: PayloadAction<any>) => {
      state.orders.push(action.payload);
      state.cart = []; // Clear cart after order
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  toggleFavorite,
  addOrder,
  setLoading,
  setError,
} = shopSlice.actions;

export default shopSlice.reducer; 