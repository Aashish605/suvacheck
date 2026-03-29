"use client"
import { createSlice } from '@reduxjs/toolkit'

// Helper to load cart from localStorage
const loadCart = () => {
    try {
        const data = localStorage.getItem('SuvaCartItems');
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

// Helper to save cart to localStorage
const saveCart = (items) => {
    localStorage.setItem('SuvaCartItems', JSON.stringify(items));
};

const initialState = {
    items: loadCart(),
};

export const CartSlice = createSlice({
    name: 'SuvaCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.items.find(i => i.id === item.id);
            if (existing) {
                existing.quantity += item.quantity || 1;
            } else {
                state.items.push({ ...item, quantity: item.quantity || 1 });
            }
            saveCart(state.items);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(i => i.id !== action.payload);
            saveCart(state.items);
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
            saveCart(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            saveCart(state.items);
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = CartSlice.actions
export default CartSlice.reducer