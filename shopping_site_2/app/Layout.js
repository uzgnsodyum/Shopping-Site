import Head from 'next/head';
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';
import { CartProvider } from '../context/CartContext';

const Layout = ({ children }) => {
  return (
    <CartProvider>
      <Navigation />
      <main className="container py-4">
        {children}
      </main>
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <div className="container">
          <p className="mb-0">© 2025 E-Commerce Shop. All rights reserved.</p>
        </div>
      </footer>
    </CartProvider>
  );
};

export default Layout;