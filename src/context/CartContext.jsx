import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) { setCart([]); return; }
    try {
      const { data } = await API.get('/cart');
      setCart(data);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => { fetchCart(); }, [user]);

  const addToCart = async (bookId) => {
    await API.post('/cart', { book_id: bookId });
    await fetchCart();
  };

  const removeFromCart = async (cartId) => {
    await API.delete(`/cart/${cartId}`);
    await fetchCart();
  };

  const cartTotal = cart.reduce((sum, item) => sum + Number(item.selling_price), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartTotal, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
