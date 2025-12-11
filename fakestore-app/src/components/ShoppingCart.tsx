import {useSelector, useDispatch} from 'react-redux';
import type {RootState} from '../store/store';
import {removeFromCart, clearCart, updateQuantity} from '../features/cart/cartSlice';
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import { auth, db} from '../firebaseConfig';

const ShoppingCart = () => {

    const dispatch = useDispatch();
    const items = useSelector((state: RootState) => state.cart.items);

    const totalItems = items.reduce((sum, item) => sum + item.count, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.count * item.price, 0);

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleClear = () => {
        dispatch(clearCart());
    };

    const handleCheckout = async () => {
        try { 
            const user = auth.currentUser;
            if (!user) { 
                alert('Please log in to proceed with checkout.');
                return;
            }
            await addDoc(collection(db, 'orders'), { 
                userId: user.uid,
                products: items,
                totalPrice,
                ccreatedAt: serverTimestamp(),
            });
            dispatch(clearCart());
            sessionStorage.removeItem('cart');
            alert('Order placed successfully!');
        } catch (err) {
            console.error('Checkout error:', err);
        }
    }

    const handleQuantityChange = (id: string, count: number) => {
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
                        <button style = {{marginRight: '1rem', marginLeft: '1rem'}} onClick={() => handleRemove(item.id)}>Remove</button>
                        <input
                            type="number"
                            value={item.count}
                            min={1}
                            onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                        />
                    </div>
                    ))}
                    <div style={{marginTop: '1rem', fontWeight: 'bold'}}>
                        <strong>Total Items: {totalItems}</strong>
                        <strong>Total Price: {totalPrice.toFixed(2)}</strong>
                    </div>
                    <button onClick={handleCheckout}>Checkout</button>
                    <button style={{marginLeft: '1rem'}} onClick={handleClear}>Clear Cart</button>
                </>
            )}
        </div>
    
        
    );
};
export default ShoppingCart;