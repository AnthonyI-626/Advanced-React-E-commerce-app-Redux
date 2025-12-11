import {useEffect, useState} from 'react';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import {db} from '../firebaseConfig';

interface Product { 
    id: string;
    name: string;
    price: number;
    category: string;
    createdAt?: Date;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const dataArray: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, "id">),
    }));
    setProducts(dataArray);
  };

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      name: "New Product",
      price: 100,
      category: "Misc",
      createdAt: new Date(),
    });
    fetchProducts(); 
  };

   useEffect(() => {
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const dataArray: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Product, "id">),
    }));
    setProducts(dataArray); 
  };
        fetchProducts();
    }, []);

    return ( 
        <div>
            <h2>Products</h2>
            <button onClick={addProduct}>Add Product</button>
            {products.map((p) => (
                <div key = {p.id} style={{border: '1px solid gray', margin: '10px', padding: '10px'}}>
                    <p>Name: {p.name}</p>
                    <p>Price: ${p.price}</p>
                    <p>Category: {p.category}</p>
                </div>
            ))}
        </div>
    );
};
export default ProductList;