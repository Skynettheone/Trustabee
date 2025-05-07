import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './slices/shopSlice';
import farmerReducer from './slices/farmerSlice';

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    farmer: farmerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 