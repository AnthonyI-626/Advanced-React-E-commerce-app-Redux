import {useDispatch} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import {addToCart} from '../features/cart/cartSlice';
import {Link} from 'react-router-dom';
import api from '../api/axios';



interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
}

const Home = () => {
    const dispatch = useDispatch();

    const {data: products = [], isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => { 
            const response = await api.get<Product[]>('/products');
            return response.data;

        },
    });
  
    console.log('Products:', products);
    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleAddToCart =(product:Product) => {
        dispatch(addToCart(product));

    };
    
    return (
        <div>
            <h1>Products</h1>
            <Link to='/cart'>
                <button style={{marginBottom: '1rem'}}>Go To Cart</button>
            </Link>
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