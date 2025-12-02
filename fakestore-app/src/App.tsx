import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import Home from './components/Home';

function App() {
  

  return (
    <BrowserRouter>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/cart'>Cart</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<ShoppingCart />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
