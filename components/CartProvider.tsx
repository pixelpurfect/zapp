import React, { createContext, useContext, useState, useCallback } from 'react';

interface CartItem {
  id: number;
  image: string;
  title: string;
  weight: string;
  description: string;
  rating: number;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((newItem: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...prevItems[existingItemIndex],
          quantity: prevItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      }
      
      return [...prevItems, { ...newItem, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: number, newQuantity: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(1, newQuantity) // Ensure quantity never goes below 1
          };
        }
        return item;
      });
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};