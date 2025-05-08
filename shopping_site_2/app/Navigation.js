import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const { cart, totalAmount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    // Calculate the total number of items in cart
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-4">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>E-Commerce Shop</Navbar.Brand>
        </Link>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            
            <Link href="/add-campaign" passHref>
              <Nav.Link>
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                Add Campaign
              </Nav.Link>
            </Link>
            
            <Link href="/cart" passHref>
              <Nav.Link className="d-flex align-items-center">
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" />
                Cart
                {cartCount > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {cartCount}
                  </Badge>
                )}
                {totalAmount > 0 && (
                  <span className="ms-2">${totalAmount.toFixed(2)}</span>
                )}
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;