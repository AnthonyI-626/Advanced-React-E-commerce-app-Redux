import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../store/store';
import {removeFromCart, clearCart, updateQuantity} from '../features/cart/cartSlice';

const ShoppingCart = () => {

    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: number, count: number) => {
        dispatch(updateQuantity({id, count}));
    };

    return (
        <div>
            <h2>Cart</h2>
            {items.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <>
                    {items.map(item => (
                <div key={item.id} style={{marginBottom: '1rem'}}>
                        <img src={item.image} alt={item.title} width={50} />
                        <span>{item.title} - ${item.price}</span>
                        <span> x {item.count}</span>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                        <input
                            type="number"
                            value={item.count}
                            min={1}
                            onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                        />
                    </div>
                    ))}
                    <button onClick={handleClear}>Clear Cart</button>
                </>
            )}
        </div>
    
        
    );
};
export default ShoppingCart;