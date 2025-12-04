import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import type { CartState} from '../features/cart/cartSlice';

const loadCart = (): CartState => {
    const data = sessionStorage.getItem('cart');
    return data ? JSON.parse(data) : { items: []};
}

export const store = configureStore({
    reducer: { 
        cart: cartReducer
    },
    preloadedState: { 
        cart: loadCart(),
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
