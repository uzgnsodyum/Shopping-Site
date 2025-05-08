import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await api.getCart();
        setCart(cartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    // Calculate total amount whenever cart changes
    const total = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotalAmount(total);
  }, [cart]);

  const addToCart = async (product, quantity, specialNote = '') => {
    try {
      const cartItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: quantity,
        specialNote: specialNote
      };

      const updatedItem = await api.addToCart(cartItem);
      
      // Update local state
      setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(item => item.productId === product.id);
        
        if (existingItemIndex >= 0) {
          const newCart = [...prevCart];
          newCart[existingItemIndex] = updatedItem;
          return newCart;
        } else {
          return [...prevCart, updatedItem];
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const updateCartItem = async (id, quantity, specialNote) => {
    try {
      const updatedItem = await api.updateCartItem(id, quantity, specialNote);
      
      // Update local state
      setCart(prevCart => {
        return prevCart.map(item => {
          if (item.id === id) {
            return updatedItem;
          }
          return item;
        });
      });
      
      return true;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return false;
    }
  };

  const removeFromCart = async (id) => {
    try {
      await api.removeFromCart(id);
      
      // Update local state
      setCart(prevCart => {
        return prevCart.filter(item => item.id !== id);
      });
      
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return false;
    }
  };

  const emptyCart = async () => {
    try {
      await api.emptyCart();
      
      // Update local state
      setCart([]);
      
      return true;
    } catch (error) {
      console.error('Error emptying cart:', error);
      return false;
    }
  };

  const getDeliveryFee = () => {
    return totalAmount < 1000 ? 50 : 0;
  };

  const getTotalWithDelivery = () => {
    return totalAmount + getDeliveryFee();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        emptyCart,
        getDeliveryFee,
        getTotalWithDelivery
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;