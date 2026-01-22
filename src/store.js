import { configureStore, createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Phone', price: 599 }
    ]
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push({ ...action.payload, id: Date.now() });
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    }
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export const { addToCart, removeFromCart } = cartSlice.actions;

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer
  }
});