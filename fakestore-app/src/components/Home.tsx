import {useDispatch} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
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
    rating?: { rate: number; count: number};
}

const Home = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const {data: products = [], isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: async () => { 
            const response = await api.get<Product[]>('/products');
            return response.data;

        },
    });

    const {data: categories = []} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
        const response = await api.get<string[]>('/products/categories');
        return response.data;
    },
    });

    const {data: categoryProducts = []} = useQuery({
         queryKey: ['products', selectedCategory],
         queryFn: async () => {
            const response = await api.get<Product[]>(`/products/category/${selectedCategory}`);
            return response.data;
         },
    });

    
  
   
    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleAddToCart =(product:Product) => {
        dispatch(addToCart(product));

    };
    const displayedProducts = selectedCategory ? categoryProducts : products;
    
    return (
        <div>
            <h1>Products</h1>
            <Link to='/cart'>
                <button style={{marginBottom: '1rem', marginRight: '1rem'}}>Go To Cart</button>
            </Link>

            <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}>
                    <option value="">All</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            {displayedProducts.map(p => (
                <div key={p.id} style = {{border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
                    <img src = {p.image} alt = {p.title} width = {150} onError={(e) => {
                        e.currentTarget.src='https://via.placeholder.com/150';
                    }} />
                     <h2>{p.title}</h2>
                    <p>Category: {p.category}</p>
                    <p>${p.price}</p>
                    <p>{p.description}</p>
                    <p> {p.rating?.rate} ({p.rating?.count} reviews)</p>
                    <button  onClick={() => handleAddToCart(p)}>Add to Cart</button>
                </div>
            ))}
        </div>
    )
 
}
export default Home;