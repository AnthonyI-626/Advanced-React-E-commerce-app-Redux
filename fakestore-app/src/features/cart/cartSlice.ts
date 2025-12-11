import type { PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string;
    count: number;
}

export interface CartState {
    items: CartItem[];

}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'count'>>) => {
            const existing = state.items.find(item => item.id === action.payload.id);
            if (existing) {
                existing.count += 1;
            } else {
                state.items.push({ ...action.payload, count: 1});
            }
          },
          removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
          },
          clearCart: (state) => {
            state.items = [];
          },

          updateQuantity: (state, action: PayloadAction<{id: string; count: number;}>) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.count = action.payload.count;
            }
          },
        }
    });

    export const { addToCart, removeFromCart, clearCart, updateQuantity} = cartSlice.actions;
    export default cartSlice.reducer;