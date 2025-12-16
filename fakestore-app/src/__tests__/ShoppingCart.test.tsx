import {render, screen, fireEvent} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import ShoppingCart from '../components/ShoppingCart';

const mockStore = configureStore([]);

describe("SHoppingCart", () => {
    it("shows empty cart message", () => {
        const store = mockStore({ cart: { items: []}});
        render(
            <Provider store={store}>
                <ShoppingCart />
            </Provider>
        );
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
    it("removes item when remove button is clicked", () => {
        const store = mockStore({
            cart: { items: [{ id: '1', title:'Test Product', price: 50, image: 'test.jpg', count: 1 }]}
        });
        render(
            <Provider store={store}>
                <ShoppingCart />
            </Provider>
        );

        expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/remove/i));

        const actions = store.getActions();
        expect(actions[0].type).toBe("cart/removeFromCart")
    }
    );
});