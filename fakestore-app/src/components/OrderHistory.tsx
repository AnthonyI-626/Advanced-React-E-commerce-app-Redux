import {useState, useEffect} from 'react';
import {collection, query, where, getDocs} from 'firebase/firestore';
import {auth, db} from '../firebaseConfig';
import { Timestamp } from 'firebase/firestore';

interface Order {
    id: string;
    userId: string;
    products: {id:string, name: string, price: number, quantity: number}[];
    totalPrice: number;
    createdAt: Timestamp;
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
            const querySnapshot = await getDocs(q);
            const dataArray: Order[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Order, 'id'>),
                
            }));
            setOrders(dataArray);
        };
        fetchOrders();
    }, [user]);

    return (
        <div>
            <h2> Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} style={{border: '1px solid gray', margin: '10px', padding: '10px'}}>
                        <p>Order ID: {order.id}</p>
                        <p>Total Price: ${order.totalPrice}</p>
                        <p>Date: {order.createdAt?.toDate().toLocaleString()}</p>
                        <h3>Products:</h3>
                        <ul>
                            {order.products.map((p) => (
                                <li key={p.id}>
                                    {p.name} - ${p.price} x {p.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};
export default OrderHistory;