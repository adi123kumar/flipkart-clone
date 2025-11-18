import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  saved: JSON.parse(localStorage.getItem("savedItems")) || [],
  buyNow: JSON.parse(localStorage.getItem("buyNowItem")) || null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((p) => p.id === item.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((p) => p.id === id);
      if (item) item.quantity = Math.max(1, qty);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    saveForLater: (state, action) => {
      const item = state.items.find((p) => p.id === action.payload);
      if (item) {
        state.saved.push(item);
        state.items = state.items.filter((p) => p.id !== action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("savedItems", JSON.stringify(state.saved));
    },

    moveToCart: (state, action) => {
      const item = action.payload;
      state.saved = state.saved.filter((p) => p.id !== item.id);
      state.items.push({ ...item, quantity: 1 });
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("savedItems", JSON.stringify(state.saved));
    },

    removeSaved: (state, action) => {
      state.saved = state.saved.filter((p) => p.id !== action.payload);
      localStorage.setItem("savedItems", JSON.stringify(state.saved));
    },

    setBuyNow: (state, action) => {
      state.buyNow = action.payload;
      localStorage.setItem("buyNowItem", JSON.stringify(state.buyNow));
    },

    clearBuyNow: (state) => {
      state.buyNow = null;
      localStorage.removeItem("buyNowItem");
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveForLater,
  moveToCart,
  removeSaved,
  setBuyNow,
  clearBuyNow
} = cartSlice.actions;

export default cartSlice.reducer;
