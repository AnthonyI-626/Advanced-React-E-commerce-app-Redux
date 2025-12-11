import {useDispatch} from 'react-redux';
import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import {addToCart} from '../features/cart/cartSlice';
import {Link} from 'react-router-dom';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {db} from '../firebaseConfig';




interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
    rating?: { rate: number; count: number};
}

const productsCol = collection(db, "products");

const fetchAllProducts = async (): Promise<Product[]> => {
  const snap = await getDocs(productsCol);
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, "id">) }));
};

const fetchCategories = async (): Promise<string[]> => {
  const snap = await getDocs(productsCol);
  const set = new Set<string>();
  snap.forEach((doc) => {
    const data = doc.data() as Product;
    if (data.category) set.add(data.category);
  });
  return Array.from(set).sort();
};

const fetchByCategory = async (category: string | null): Promise<Product[]> => {
  if (!category) return fetchAllProducts();
  const q = query(productsCol, where("category", "==", category));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Product, "id">) }));
};

const Home = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: categoryProducts = [], isLoading: loadingCategory } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchByCategory(selectedCategory),
    enabled: selectedCategory !== undefined,
  });

  if (loadingProducts || loadingCategory) return <div>Loading...</div>;

  const displayedProducts = selectedCategory ? categoryProducts : products;

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to="/cart">
        <button style={{ marginBottom: "1rem", marginRight: "1rem" }}>Go To Cart</button>
      </Link>

      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {displayedProducts.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
          <img
            src={p.image || "https://via.placeholder.com/150"}
            alt={p.title}
            width={150}
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150";
            }}
          />
          <h2>{p.title}</h2>
          <p>Category: {p.category || "Uncategorized"}</p>
          <p>${p.price}</p>
          {p.description && <p>{p.description}</p>}
          <button onClick={() => handleAddToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Home;