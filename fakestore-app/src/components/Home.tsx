import {useDispatch} from 'react-redux';
import {addToCart} from '../features/cart/cartSlice';

const Home = () => {
    const dispatch = useDispatch();

    const handleAddToCart =(product: {id: number; title: string; price: number; image: string;}) => {
        dispatch(addToCart({...product, count: 1}));

    };
    
    return (
        <div>
            {products.map(p => (
                <div key={p.id}>
                    <h2>{p.title}</h2>
                    <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
                </div>
            ))}
        </div>
    )
}
export default Home;