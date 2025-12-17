import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import Home from './components/Home';

function App() {
  
console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
  return (
    <BrowserRouter>
    <nav>
      <div style ={{display: 'flex', gap: '1rem', padding: '1rem'}}>
      <Link to='/'>Home</Link>
      <Link to='/cart'>Cart</Link>
      </div>
    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<ShoppingCart />} />
    </Routes>
    </BrowserRouter>
  )
  
}

export default App
