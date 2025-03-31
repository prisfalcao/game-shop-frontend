import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import StoreCatalog from './components/StoreCatalog';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import './components/App.css';
import PsControllerIcon from './assets/ps-controller.svg';

function App() {
  return (
    <CartProvider>
      <Router>
        <nav className="navbar">
          <div className="navbar-left">
            <img src={PsControllerIcon} alt="PlayStation Controller" className="navbar-icon" />
            <span className="navbar-title">Pinti Games</span>
          </div>
          <div className="navbar-links">
            <Link to="/" className="nav-link">Store</Link>
            <Link to="/cart" className="nav-link">Cart</Link>
            <Link to="/admin" className="nav-link">Admin</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<StoreCatalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;